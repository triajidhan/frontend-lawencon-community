import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { ConfirmationService } from "primeng/api"
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
  styleUrls: ['../../../../styles.css'],
  providers: [ConfirmationService]
})
export class HomeDetailComponent implements OnInit, OnDestroy {

  myFullName = ""
  myId: string = ""
  myCompany: string = ""
  myProfile: string = ""
  myStatusSubscribe!: boolean

  loadingPost = false

  fileArray: any[] = []
  pollOption: any[] = []
  indexComment?: number | null

  polling: any = new Object()
  post: any = new Object()
  unitComment: any = new Object()
  displayEdit: boolean = false

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

  updatePostForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    contents: ['', Validators.required]
  })

  commentForm = this.fb.group({
    commentBody: ['', Validators.required],
    post: this.fb.group({
      id: ['']
    })
  })

  updateCommentForm = this.fb.group({
    id: [''],
    commentBody: ['', Validators.required],
    post: this.fb.group({
      id: ['']
    })
  })

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ]

  private getByIdPostSubscription?: Subscription
  private postDeleteSubs?: Subscription
  private postUpdateSubs?: Subscription
  private getCountLikeDataSubs?: Subscription
  private getCountBookmarkDataSubs?: Subscription
  private getByIdPollOptionSubs?: Subscription
  private choosePollOptionSubs?: Subscription
  private getIdBookmarkDataSubs?: Subscription
  private insertBookmarkDataSubs?: Subscription
  private updateBookmarkDataSubs?: Subscription
  private getIdLikeDataSubs?: Subscription
  private updateLikeDataSubs?: Subscription
  private insertLikeDataSubs?: Subscription
  private getAllCommentByPostSubs?: Subscription
  private commentInsertSubs?: Subscription
  private getByIdCommentsSubs?: Subscription
  private getByIdCommentUpdateSubs?: Subscription
  private getByIdCommentSubs?: Subscription
  private commentDeleteSubs?: Subscription
  private commentUpdateSubs?: Subscription

  constructor(private fb: FormBuilder, private postService: PostService, private apiService: ApiService,
    private likeService: LikeService, private bookmarkService: BookmarkService,
    private pollingService: PollingService, private commentService: CommentService, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private router: Router
  ) { }


  ngOnInit(): void {
    this.init()
  }

  init() {
    this.myId = String(this.apiService.getId())
    this.myFullName = String(this.apiService.getName())
    this.myStatusSubscribe = Boolean(this.apiService.getStatusSubscribe())
    if (this.apiService.getFiles()) {
      this.myProfile = String(this.apiService.getPhotoId())
    }
    if (this.apiService.getCompany()) {
      this.myCompany = String(this.apiService.getCompany())
    }

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
      })
    })
  }

  choosePollOption(pollId: string, j: number) {
    this.getByIdPollOptionSubs = this.pollingService.getById(pollId).subscribe(result => {
      this.polling = result
      this.choosePollOptionSubs = this.pollingService.update(this.polling).subscribe(polling => {
        this.post.totalVote = this.post.totalVote + 1
        this.post.statusPolling = true
        this.post.choosenPolling = pollId
        this.post.totalPoll[j] = this.post.totalPoll[j] + 1
      })
    })
  }

  postEditDialog() {
    this.updatePostForm.controls['title'].setValue(this.post.title)
    this.updatePostForm.controls['contents'].setValue(this.post.contents)
    this.updatePostForm.controls['id'].setValue(this.post.id)

    this.displayEdit = true
  }

  postUpdate() {
    this.postUpdateSubs = this.postService.update(this.updatePostForm.value).subscribe(() => {
      this.displayEdit = false
      this.post.title = this.updatePostForm.value.title
      this.post.contents = this.updatePostForm.value.contents
      this.updatePostForm.controls.title.setValue("")
      this.updatePostForm.controls.contents.setValue("")
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

  insertComment() {
    this.commentForm.patchValue({
      post: {
        id: this.post.id
      }
    })

    this.commentInsertSubs = this.commentService.insert(this.commentForm.value).subscribe(commentInsert => {
      this.post.countOfComment = this.post.countOfComment + 1
      this.commentForm.controls['commentBody'].setValue("")
      this.getByIdCommentsSubs = this.commentService.getById(commentInsert.id).subscribe(resultId => {
        this.post.commentBody.push(resultId.commentBody)
        this.post.userComment.push(resultId.user)
        this.post.commentId.push(resultId.id)
      })
    })
  }

  showPopUpDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this post?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.post.isActive = false
        this.postDeleteSubs = this.postService.update(this.post).subscribe(() => {
          this.router.navigateByUrl("/homes/type/threads")
        })
      }
    })
  }

  showPopUpDeleteComment(id: string, j: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this comment?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.getByIdCommentSubs = this.commentService.getById(id).subscribe(result => {
          this.unitComment = result
          this.unitComment.isActive = false

          this.commentDeleteSubs = this.commentService.update(this.unitComment).subscribe(() => {
            this.post.commentBody.splice(j, 1)
            this.post.userComment.splice(j, 1)
            this.post.commentId.splice(j, 1)
          })
        })
      }
    })
  }

  updateComment(commentId: string, j: number) {
    this.updateCommentForm.patchValue({
      post: {
        id: this.post.id
      }
    })
    this.commentUpdateSubs = this.commentService.update(this.updateCommentForm.value).subscribe(() => {
      this.indexComment = null
      this.getByIdCommentUpdateSubs = this.commentService.getById(commentId).subscribe(resultId => {
        this.post.commentBody.splice(j, 1, resultId.commentBody)
        this.post.userComment.splice(j, 1, resultId.user)
        this.post.commentId.splice(j, 1, resultId.id)
      })
    })
  }

  showEditComment(commentId: string, j: number) {
    this.indexComment = j
    this.getByIdCommentUpdateSubs = this.commentService.getById(commentId).subscribe(result => {
      this.updateCommentForm.controls['commentBody'].setValue(result.commentBody)
      this.updateCommentForm.controls['id'].setValue(result.id)
    })
  }


  ngOnDestroy(): void {
    this.getByIdPostSubscription?.unsubscribe()
    this.getCountLikeDataSubs?.unsubscribe()
    this.getCountBookmarkDataSubs?.unsubscribe()
    this.getByIdPollOptionSubs?.unsubscribe()
    this.choosePollOptionSubs?.unsubscribe()
    this.getIdBookmarkDataSubs?.unsubscribe()
    this.insertBookmarkDataSubs?.unsubscribe()
    this.updateBookmarkDataSubs?.unsubscribe()
    this.getIdLikeDataSubs?.unsubscribe()
    this.updateLikeDataSubs?.unsubscribe()
    this.insertLikeDataSubs?.unsubscribe()
    this.getAllCommentByPostSubs?.unsubscribe()
    this.commentInsertSubs?.unsubscribe()
    this.getByIdCommentsSubs?.unsubscribe()
    this.postDeleteSubs?.unsubscribe()
    this.postUpdateSubs?.unsubscribe()
    this.getByIdCommentUpdateSubs?.unsubscribe()
    this.getByIdCommentSubs?.unsubscribe()
    this.commentDeleteSubs?.unsubscribe()
    this.commentUpdateSubs?.unsubscribe()
  }

}
