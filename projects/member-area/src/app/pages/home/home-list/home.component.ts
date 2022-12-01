import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { POST_TYPE_CODE } from "projects/constant/post-type"
import { Bookmark } from "projects/interface/bookmark"
import { Polling } from "projects/interface/polling"
import { PostType } from "projects/interface/post-type"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { BookmarkService } from "projects/main-area/src/app/service/bookmark.service"
import { CommentService } from "projects/main-area/src/app/service/comment.service"
import { LikeService } from "projects/main-area/src/app/service/like.service"
import { PollingStatusService } from "projects/main-area/src/app/service/polling-status.service"
import { PollingService } from "projects/main-area/src/app/service/polling.service"
import { PostAttachmentService } from "projects/main-area/src/app/service/post-attachment.service"
import { PostTypeService } from "projects/main-area/src/app/service/post-type.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { finalize, Subscription } from "rxjs"

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../../styles.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  myId: string = ""
  myFullName: string = ""
  myProfile: string = ""

  startPositionPost = 0
  limitPost = 5
  startPositionPostLike = 0
  limitPostLike = 5
  startPositionPostBookmark = 0
  limitPostBookmark = 5
  startPositionPollOption = 0
  limitPollOption = 5

  urlFile = `${BASE_URL.LOCALHOST}/files/download/`

  items!: MenuItem[]
  type!: string
  postType!: string
  display: boolean = false
  isShowComment: boolean = true
  loadingPost = false

  polling: any = new Object()
  getByPostIdForLike: any = new Object()
  fileArray: any[] = []
  postTypesRes!: PostType[]
  postTypes: any[] = []
  post: any[] = []
  pollOption: any[] = []
  postAttachment: any[] = []
  postLike: any[] = []
  postAttachmentLike: any[] = []
  postBookmark: any[] = []
  postAttachmentBookmark: any[] = []
  postComments: any[] = []

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

  postForm = this.fb.group({
    title: ['', Validators.required],
    contents: ['', Validators.required],
    postType: this.fb.group({
      id: ['']
    }),
    titlePoll: [''],
    postTypeId: [''],
    file: this.fb.array([])
  })

  commentForm = this.fb.group({
    commentBody: ['', Validators.required],
    post: this.fb.group({
      id: ['']
    })
  })


  private postInsertSubs?: Subscription
  private getDataPollContentSubs?: Subscription
  private choosePollOptionSubs?: Subscription
  private getByIdPollOptionSubs?: Subscription
  private getByCodePostTypeSubsc?: Subscription
  private getByIdPollingStatusSubs?: Subscription
  private getPostDataSubs?: Subscription
  private getPostAttachmentDataSubs?: Subscription
  private getPostLikeAttachmentDataSubs?: Subscription
  private getPostBookmarkAttachmentDataSubs?: Subscription
  private getCountLikeDataSubs?: Subscription
  private insertLikeDataSubs?: Subscription
  private updateLikeDataSubs?: Subscription
  private getIdLikeDataSubs?: Subscription
  private getCountBookmarkDataSubs?: Subscription
  private insertBookmarkDataSubs?: Subscription
  private updateBookmarkDataSubs?: Subscription
  private getIdBookmarkDataSubs?: Subscription
  private getByIdCommentsSubs?: Subscription
  private getDataLikeSubs?: Subscription
  private getDataBookmarkSubs?: Subscription
  private commentInsertSubs?: Subscription
  private getAllCommentByPostSubs?: Subscription


  constructor(private primengConfig: PrimeNGConfig, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private postService: PostService, private postTypeService: PostTypeService,
    private postAttachmentService: PostAttachmentService, private apiService: ApiService,
    private likeService: LikeService, private bookmarkService: BookmarkService,
    private pollingService: PollingService, private polingStatusService: PollingStatusService,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true

    this.myId = String(this.apiService.getId())
    this.myFullName = String(this.apiService.getName())
    this.myProfile = String(this.apiService.getPhotoId())

    this.items = [
      { label: 'Thread', routerLink: '/homes/type/threads', command: () => this.init() },
      { label: 'Likes', routerLink: '/homes/type/likes', command: () => this.init() },
      { label: 'Bookmark', routerLink: '/homes/type/bookmarks', command: () => this.init() }
    ]

    this.init()
  }

  onScroll() {
    this.startPositionPost += this.limitPost
    this.initPost()
  }

  onScrollLike() {
    this.startPositionPostLike += this.limitPostLike
    this.initLike()
  }

  onScrollBookmark() {
    this.startPositionPostBookmark += this.limitPostBookmark
    this.initLike()
  }

  init() {
    this.activatedRoute.params.subscribe(result => {
      this.type = result['type']
    })

    this.startPositionPost = 0
    this.limitPost = 5
    this.startPositionPostLike = 0
    this.limitPostLike = 5
    this.startPositionPostBookmark = 0
    this.limitPostBookmark = 5

    this.post = []
    this.postLike = []
    this.postBookmark = []
    this.pollOption = []

    this.initPost()
    this.initLike()
    this.initBookmark()
  }

  initPost() {
    this.getPostDataSubs = this.postService.getIsActiveAndOrder(this.startPositionPost, this.limitPost, true).subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        this.getCountLikeDataSubs = this.likeService.getUserLikePost(result[i].id, this.myId).subscribe(userLike => {
          result[i].likeId = userLike.likeId
          result[i].countOfLike = userLike.countOfLike
          result[i].isActiveLike = userLike.isActive
        })

        this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(result[i].id, this.myId).subscribe(userBookmark => {
          result[i].bookmarkId = userBookmark.id
          result[i].isActiveBookmark = userBookmark.isActive
        })
        this.addDataPost(result[i])
      }
    })
  }

  initLike() {
    this.getDataLikeSubs = this.likeService.getByUserOrder(this.myId, this.startPositionPostLike, this.limitPostLike, false).subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        this.getCountLikeDataSubs = this.likeService.getUserLikePost(result[i].post.id, this.myId).subscribe(userLike => {
          result[i].likeId = userLike.likeId
          result[i].countOfLike = userLike.countOfLike
        })
        this.addDataLike(result[i])
      }
    })
  }

  initBookmark() {
    this.getDataBookmarkSubs = this.bookmarkService.getByUserOrder(this.myId, this.startPositionPostBookmark, this.limitPostBookmark, false).subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(result[i].post.id, this.myId).subscribe(userBookmark => {
          result[i].bookmarkId = userBookmark.bookmarkId

        })
        this.addDataBookmark(result[i])
      }
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
      this.pollOption.push(result)
      let totalTemp = 0
      for (let j = 0; j < result.length; j++) {
        totalTemp += result[j].totalPoll
        post.totalPoll = totalTemp
      }
      this.post.push(post)
    })
  }

  addDataLike(post: any) {
    this.getPostLikeAttachmentDataSubs = this.postAttachmentService.getByPost(post.post.id).subscribe(result => {
      post.post.postAttachment = result
    })
    this.postLike.push(post)
  }

  addDataBookmark(post: any) {
    this.getPostBookmarkAttachmentDataSubs = this.postAttachmentService.getByPost(post.post.id).subscribe(result => {
      post.post.postAttachment = result
    })
    this.postBookmark.push(post)
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

  postDialog(type: string) {
    this.postType = type
    this.display = true
  }

  postInsert() {
    if (this.postType == 'regular') {
      this.loadingPost = true
      this.getByCodePostTypeSubsc = this.postTypeService.getByPostTypeCode(POST_TYPE_CODE.REGULAR).pipe(finalize(() => this.loadingPost = false)).subscribe(result => {
        this.postForm.patchValue({
          postType: {
            id: result.id
          }
        })
        this.postForm.value.postTypeId = result.id
        this.postForm.value.file = this.fileArray

        this.postInsertSubs = this.postService.insert(this.postForm.value).subscribe(() => {
          this.display = false
          this.postForm.controls.title.setValue("")
          this.postForm.controls.contents.setValue("")
          this.postForm.controls.titlePoll.setValue("")
          this.fileArray = []
          this.init()
        })
      })
    } else if (this.postType == 'premium') {
      this.loadingPost = true
      this.getByCodePostTypeSubsc = this.postTypeService.getByPostTypeCode(POST_TYPE_CODE.PREMIUM).pipe(finalize(() => this.loadingPost)).subscribe(result => {
        this.postForm.patchValue({
          postType: {
            id: result.id
          }
        })
        this.postForm.value.postTypeId = result.id
        this.postForm.value.file = this.fileArray

        this.postInsertSubs = this.postService.insert(this.postForm.value).subscribe(() => {
          this.display = false
          this.postForm.controls.title.setValue("")
          this.postForm.controls.contents.setValue("")
          this.postForm.controls.titlePoll.setValue("")
          this.fileArray = []
          this.init()
        })
      })
    }
  }

  choosePollOption(pollId: string, i: any, j: any) {
    this.getByIdPollOptionSubs = this.pollingService.getById(pollId).subscribe(result => {
      this.polling = result
      this.choosePollOptionSubs = this.pollingService.update(this.polling).subscribe(polling => {
        this.pollOption[i][j].totalPoll = this.pollOption[i][j].totalPoll + 1
        this.getByIdPollingStatusSubs = this.polingStatusService.getById(polling.id).subscribe(pollingStatus => {
          let totalTemp = 0;
          for (let k = 0; k < this.pollOption[i].length; k++) {
            this.pollOption[i][k].pollingStatus = pollingStatus;
            totalTemp += this.pollOption[i][k].totalPoll
          }
          this.post[i].totalPoll = totalTemp
        })
      })
    })
  }

  actBookmark(postId: string, bookmarkId: string, i: any) {
    if (bookmarkId) {
      this.getIdBookmarkDataSubs = this.bookmarkService.getById(bookmarkId).subscribe(result => {
        if (result.isActive) {
          this.updateBookmark.controls.isActive.setValue(false)
          this.post[i].isActiveBookmark = false
        } else {
          this.updateBookmark.controls.isActive.setValue(true)
          this.post[i].isActiveBookmark = true
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
        this.post[i].isActiveBookmark = true
        this.post[i].bookmarkId = response.id
      }

      )
    }
  }

  actLikePost(postId: string, likeId: string, i: any) {
    if (likeId) {
      this.getIdLikeDataSubs = this.likeService.getById(likeId).subscribe(result => {
        if (result.isActive) {
          this.updateLike.controls.isActive.setValue(false)
          this.post[i].countOfLike = this.post[i].countOfLike - 1;
          this.post[i].isActiveLike = false
        } else {
          this.updateLike.controls.isActive.setValue(true)
          this.post[i].countOfLike = this.post[i].countOfLike + 1;
          this.post[i].isActiveLike = true
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
        this.post[i].countOfLike = this.post[i].countOfLike + 1;
        this.post[i].likeId = response.id
        this.post[i].isActiveLike = true

      })
    }

  }

  actLikePostLike(likeId: string, i: any) {
    if (likeId) {
      this.getIdLikeDataSubs = this.likeService.getById(likeId).subscribe(result => {
        this.updateLike.controls.isActive.setValue(false)
        this.updateLike.controls['id'].setValue(result.id)
        this.updateLikeDataSubs = this.likeService.update(this.updateLike.value).subscribe(() => {
          this.postLike.splice(i, 1);
        })
      })
    }
  }

  actBookmarkPostBookmark(bookmarkId: string, i: any) {
    if (bookmarkId) {
      this.getIdBookmarkDataSubs = this.bookmarkService.getById(bookmarkId).subscribe(result => {
        this.updateBookmark.controls.isActive.setValue(false)
        this.updateBookmark.controls['id'].setValue(result.id)
        this.updateBookmarkDataSubs = this.bookmarkService.update(this.updateBookmark.value).subscribe(() => {
          this.postBookmark.splice(i, 1);
        })
      })
    }
  }

  btnToggleComment() {
    this.isShowComment = !this.isShowComment
  }

  insertComment(postId: string, i: any) {
    this.commentForm.patchValue({
      post: {
        id: postId
      }
    })

    this.commentInsertSubs = this.commentService.insert(this.commentForm.value).subscribe(commentInsert => {
      this.getByIdCommentsSubs = this.commentService.getById(commentInsert.id).subscribe(resultId => {
        this.post[i].comments.push(resultId ?? '')

      })
    })
  }

  ngOnDestroy(): void {
    this.postInsertSubs?.unsubscribe()
    this.getDataPollContentSubs?.unsubscribe()
    this.choosePollOptionSubs?.unsubscribe()
    this.getByIdPollOptionSubs?.unsubscribe()
    this.getByCodePostTypeSubsc?.unsubscribe()
    this.getByIdPollingStatusSubs?.unsubscribe()
    this.getPostDataSubs?.unsubscribe()
    this.getPostAttachmentDataSubs?.unsubscribe()
    this.getPostLikeAttachmentDataSubs?.unsubscribe()
    this.getPostBookmarkAttachmentDataSubs?.unsubscribe()
    this.getCountLikeDataSubs?.unsubscribe()
    this.insertLikeDataSubs?.unsubscribe()
    this.updateLikeDataSubs?.unsubscribe()
    this.getIdLikeDataSubs?.unsubscribe()
    this.getCountBookmarkDataSubs?.unsubscribe()
    this.insertBookmarkDataSubs?.unsubscribe()
    this.updateBookmarkDataSubs?.unsubscribe()
    this.getIdBookmarkDataSubs?.unsubscribe()
    this.getByIdCommentsSubs?.unsubscribe()
    this.getDataLikeSubs?.unsubscribe()
    this.getDataBookmarkSubs?.unsubscribe()
    this.commentInsertSubs?.unsubscribe()
    this.getAllCommentByPostSubs?.unsubscribe()
  }

}
