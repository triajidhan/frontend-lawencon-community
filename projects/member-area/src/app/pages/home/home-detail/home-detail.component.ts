import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { BASE_URL } from "projects/constant/base-url"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { BookmarkService } from "projects/main-area/src/app/service/bookmark.service"
import { CommentService } from "projects/main-area/src/app/service/comment.service"
import { LikeService } from "projects/main-area/src/app/service/like.service"
import { PollingStatusService } from "projects/main-area/src/app/service/polling-status.service"
import { PollingService } from "projects/main-area/src/app/service/polling.service"
import { PostAttachmentService } from "projects/main-area/src/app/service/post-attachment.service"
import { PostTypeService } from "projects/main-area/src/app/service/post-type.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['../../../../styles.css']
})
export class HomeDetailComponent implements OnInit, OnDestroy {

  myId: string = ""
  post: any = new Object()
  fileArray: any[] = []
  pollOption: any[] = []
  polling: any = new Object()

  urlFile = `${BASE_URL.LOCALHOST}/files/download/`

  addLike = this.fb.group({
    post: this.fb.group({
      id: ['']
    })
  })

  updateLike = this.fb.group({
    id: [''],
    isActive: [false]
  })

  addBookmark = this.fb.group({
    post: this.fb.group({
      id: ['']
    })
  })

  updateBookmark = this.fb.group({
    id: [''],
    isActive: [false]
  })

  commentForm = this.fb.group({
    commentBody: ['', Validators.required],
    post: this.fb.group({
      id: ['']
    })
  })

  private getByIdPostSubscription?: Subscription
  private getCountLikeDataSubs?: Subscription
  private getCountBookmarkDataSubs?: Subscription
  private getPostAttachmentDataSubs?: Subscription
  private getDataPollContentSubs?: Subscription
  private getByIdPollOptionSubs?: Subscription
  private choosePollOptionSubs?: Subscription
  private getByIdPollingStatusSubs?: Subscription
  private getIdBookmarkDataSubs?: Subscription
  private insertBookmarkDataSubs?: Subscription
  private updateBookmarkDataSubs?: Subscription
  private getIdLikeDataSubs?: Subscription
  private updateLikeDataSubs?: Subscription
  private insertLikeDataSubs?: Subscription
  private getAllCommentByPostSubs?: Subscription
  private commentInsertSubs?: Subscription
  private getByIdCommentsSubs?: Subscription

  constructor(private fb: FormBuilder, private postService: PostService, private postTypeService: PostTypeService,
    private postAttachmentService: PostAttachmentService, private apiService: ApiService,
    private likeService: LikeService, private bookmarkService: BookmarkService,
    private pollingService: PollingService, private polingStatusService: PollingStatusService,
    private commentService: CommentService, private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.init()
  }

  init() {
    this.myId = String(this.apiService.getId())

    this.activatedRoute.params.subscribe(id => {
      this.getByIdPostSubscription = this.postService.getById(id['id']).subscribe(result => {
        this.post = result

        this.getCountLikeDataSubs = this.likeService.getUserLikePost(result.id, this.myId).subscribe(userLike => {
          result.likeId = userLike.likeId
          result.countOfLike = userLike.countOfLike
          result.isActiveLike = userLike.isActive
        })

        this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(result.id, this.myId).subscribe(userBookmark => {
          result.bookmarkId = userBookmark.id
          result.isActiveBookmark = userBookmark.isActive
        })
        this.addDataPost(result)

      })
    })
  }

  addDataPost(post: any) {
    this.getPostAttachmentDataSubs = this.postAttachmentService.getByPost(post.id).subscribe(result => {
      post.postAttachment = result
    })

    this.getAllCommentByPostSubs = this.commentService.getByPostAndOrder(post.id, true).subscribe(result => {
      post.comments = result
    })

    this.getDataPollContentSubs = this.pollingService.getByPost(post.id).subscribe(result => {
      this.pollOption = result
      let totalTemp = 0
      for (let j = 0; j < result.length; j++) {
        totalTemp += result[j].totalPoll
        post.totalPoll = totalTemp
      }
    })
  }

  fileUpload(event: any): void {
    for (let i = 0; i < event.files.length; i++) {
      this.fileUploadMultiple(event, i).then(result => {
        this.fileArray.push({ ext: result[0], files: result[1] })
      })
    }
  }

  async fileUploadMultiple(event: any, index: number) {
    const file: [string, string] = ['', '']
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      }
      reader.onerror = error => reject(error)
    })
    const result = await toBase64(event.files[index])
    const resultStr = result.substring(result.indexOf(",") + 1, result.length)
    const resultExt = result.substring(result.indexOf("/") + 1, result.indexOf(";"))
    file[0] = resultExt
    file[1] = resultStr
    return file
  }

  // calculateDiff(sentDate: string) {
  //   var date1: any = new Date(sentDate)
  //   var date2: any = new Date()
  //   var diff: any = Math.floor((date2 - date1) / (1000))
  //   if (diff < 60) {
  //     return diff + " seconds ago"
  //   } else {
  //     diff = Math.floor(diff / 60)
  //     if (diff < 60) {
  //       return diff + " minutes ago"
  //     } else {
  //       diff = Math.floor(diff / 60)
  //       if (diff < 24) {
  //         return diff + " hours ago"
  //       } else {
  //         diff = Math.floor(diff / 24)
  //         return diff + " days ago"
  //       }
  //     }
  //   }
  // }

  choosePollOption(pollId: string, j: any) {
    this.getByIdPollOptionSubs = this.pollingService.getById(pollId).subscribe(result => {
      this.polling = result
      this.choosePollOptionSubs = this.pollingService.update(this.polling).subscribe(polling => {
        this.pollOption[j].totalPoll = this.pollOption[j].totalPoll + 1
        this.getByIdPollingStatusSubs = this.polingStatusService.getById(polling.id).subscribe(pollingStatus => {
          for (let k = 0; k < this.pollOption.length; k++) {
            this.pollOption[k].pollingStatus = pollingStatus;
          }
        })
      })
    })
  }

  actBookmark(postId: string, bookmarkId: string) {
    if (bookmarkId) {
      this.getIdBookmarkDataSubs = this.bookmarkService.getById(bookmarkId).subscribe(result => {
        if (result.isActive) {
          this.updateBookmark.controls.isActive.setValue(false)
          this.post.isActiveBookmark = false
        } else {
          this.updateBookmark.controls.isActive.setValue(true)
          this.post.isActiveBookmark = true
        }
        this.updateBookmark.controls['id'].setValue(result.id)

        this.updateBookmarkDataSubs = this.bookmarkService.update(this.updateBookmark.value).subscribe(() => {
        })
      })
    } else {
      this.addBookmark.patchValue({
        post: {
          id: postId
        }
      })
      this.insertBookmarkDataSubs = this.bookmarkService.insert(this.addBookmark.value).subscribe(response => {
        this.post.isActiveBookmark = true
        this.post.bookmarkId = response.id
      }

      )
    }
  }

  actLikePost(postId: string, likeId: string) {
    if (likeId) {
      this.getIdLikeDataSubs = this.likeService.getById(likeId).subscribe(result => {
        if (result.isActive) {
          this.updateLike.controls.isActive.setValue(false)
          this.post.countOfLike = this.post.countOfLike - 1;
          this.post.isActiveLike = false
        } else {
          this.updateLike.controls.isActive.setValue(true)
          this.post.countOfLike = this.post.countOfLike + 1;
          this.post.isActiveLike = true
        }
        this.updateLike.controls['id'].setValue(result.id)

        this.updateLikeDataSubs = this.likeService.update(this.updateLike.value).subscribe(() => {
        })
      })
    } else {
      this.addLike.patchValue({
        post: {
          id: postId
        }
      })
      this.insertLikeDataSubs = this.likeService.insert(this.addLike.value).subscribe(response => {
        this.post.countOfLike = this.post.countOfLike + 1;
        this.post.likeId = response.id
        this.post.isActiveLike = true

      })
    }

  }

  insertComment(postId: string) {
    this.commentForm.patchValue({
      post: {
        id: postId
      }
    })

    this.commentInsertSubs = this.commentService.insert(this.commentForm.value).subscribe(commentInsert => {
      this.getByIdCommentsSubs = this.commentService.getById(commentInsert.id).subscribe(resultId => {
        this.post.comments.push(resultId ?? '')

      })
    })
  }


  ngOnDestroy(): void {
    this.getByIdPostSubscription?.unsubscribe()
    this.getCountLikeDataSubs?.unsubscribe()
    this.getCountBookmarkDataSubs?.unsubscribe()
    this.getPostAttachmentDataSubs?.unsubscribe()
    this.getDataPollContentSubs?.unsubscribe()
    this.getByIdPollOptionSubs?.unsubscribe()
    this.choosePollOptionSubs?.unsubscribe()
    this.getByIdPollingStatusSubs?.unsubscribe()
    this.getIdBookmarkDataSubs?.unsubscribe()
    this.insertBookmarkDataSubs?.unsubscribe()
    this.updateBookmarkDataSubs?.unsubscribe()
    this.getIdLikeDataSubs?.unsubscribe()
    this.updateLikeDataSubs?.unsubscribe()
    this.insertLikeDataSubs?.unsubscribe()
    this.getAllCommentByPostSubs?.unsubscribe()
    this.commentInsertSubs?.unsubscribe()
    this.getByIdCommentsSubs?.unsubscribe()
  }

}
