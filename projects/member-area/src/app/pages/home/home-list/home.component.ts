import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormArray, FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"
import { InitEditableRow } from "primeng/table"
import { BASE_URL } from "projects/constant/base-url"
import { POST_TYPE_CODE } from "projects/constant/post-type"
import { Bookmark } from "projects/interface/bookmark"
import { Like } from "projects/interface/like"
import { PostType } from "projects/interface/post-type"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { BookmarkService } from "projects/main-area/src/app/service/bookmark.service"
import { FileService } from "projects/main-area/src/app/service/file.service"
import { LikeService } from "projects/main-area/src/app/service/like.service"
import { PostAttachmentService } from "projects/main-area/src/app/service/post-attachment.service"
import { PostTypeService } from "projects/main-area/src/app/service/post-type.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { Subscription } from "rxjs"
import { UserService } from "../../../service/user.service"

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['../../../../styles.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    myId: string = ""

    startPosition = 0
    limit = 5

    items!: MenuItem[]
    type!: string
    postType!: string
    display: boolean = false
    // resultExtension!: string
    // resultFile !: string

    urlFile = `${BASE_URL.LOCALHOST}/files/download/`

    fileArray: any[] = [];
    postTypesRes!: PostType[]
    postTypes: any[] = []

    post: any[] = []
    user: any[] = []
    postAttachment: any[] = []

    likeRes!: Like[]
    like: any[] = []

    addLike = this.fb.group({
        post: this.fb.group({
            id: ['']
        })
    })

    updateLike = this.fb.group({
        id: [''],
        isActive: [false]
    })

    bookmarkRes!: Bookmark[]
    bookmark: any[] = []

    addBookmark = this.fb.group({
        post: this.fb.group({
            id: ['']
        })
    })

    updateBookmark = this.fb.group({
        id: [''],
        isActive: [false]
    })


    userObj: Object = new Object()
    postAttachmentObj: Object = new Object()

    private postInsertSubs?: Subscription
    private postAttachInsertSubs?: Subscription
    private getByCodePostTypeSubsc?: Subscription

    private getPostDataSubs?: Subscription
    private getPostAttachmentDataSubs?: Subscription
    private getCountLikeDataSubs?: Subscription
    private getUserDataSubs?: Subscription

    private insertLikeDataSubs?: Subscription
    private updateLikeDataSubs?: Subscription
    private getIdLikeDataSubs?: Subscription
    private getPostDataByIdSubs?: Subscription
    private getLikeDataSubs?: Subscription


    private getBookmarkDataSubs?: Subscription
    private getCountBookmarkDataSubs?: Subscription

    private insertBookmarkDataSubs?: Subscription
    private updateBookmarkDataSubs?: Subscription
    private getIdBookmarkDataSubs?: Subscription


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


    constructor(private primengConfig: PrimeNGConfig, private activatedRoute: ActivatedRoute,
        private fb: FormBuilder, private postService: PostService, private postTypeService: PostTypeService,
        private userService: UserService, private fileService: FileService, private postAttachmentService: PostAttachmentService,
        private apiService: ApiService, private likeService: LikeService, private bookmarkService: BookmarkService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.myId = String(this.apiService.getId())

        this.items = [
            { label: 'Thread', routerLink: '/homes/type/threads' },
            { label: 'Likes', routerLink: '/homes/type/likes' },
            { label: 'Bookmark', routerLink: '/homes/type/bookmarks' }
        ]

        this.init()
    }

    onScroll() {
        this.startPosition += this.limit
        this.initPost()
    }


    onScrollLike() {
        this.startPosition += this.limit
        this.initPost()
    }

    init() {
        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })

        this.initPost()
        this.initLike()
        this.initBookmark()
    }

    initPost() {
        this.getPostDataSubs = this.postService.getIsActiveAndOrder(this.startPosition, this.limit, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {

                this.getCountLikeDataSubs = this.likeService.getUserLikePost(result[i].id, this.myId).subscribe(userLike => {

                    result[i].likeId = userLike.likeId
                    result[i].countOfLike = userLike.countOfLike
                })

                this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(result[i].id, this.myId).subscribe(userBookmark => {

                    result[i].bookmarkId = userBookmark.id
                    result[i].countOfBookmark = userBookmark.countOfBookmark
                })

                this.addData(result[i])
            }
        })
    }

    initLike() {
        this.getLikeDataSubs = this.likeService.getByUserOrder(this.myId, this.startPosition, this.limit, true).subscribe(result => {
            this.likeRes = result
            for (let i = 0; i < this.likeRes.length; i++) {

                this.getCountLikeDataSubs = this.likeService.getUserLikePost(this.likeRes[i].post.id, this.myId).subscribe(userLike => {

                    this.likeRes[i].likeId = userLike.likeId
                    this.likeRes[i].countOfLike = userLike.countOfLike
                })

                this.addLikeData(this.likeRes[i])
            }
        })
    }

    initBookmark() {
        this.getBookmarkDataSubs = this.bookmarkService.getByUserOrder(this.myId, this.startPosition, this.limit, true).subscribe(result => {
            this.bookmarkRes = result
            for (let i = 0; i < this.bookmarkRes.length; i++) {

                this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(this.bookmarkRes[i].post.id, this.myId).subscribe(bookmarkLike => {
                    this.bookmarkRes[i].countOfBookmark = bookmarkLike.countOfBookmark
                })

                this.addBookmarkData(this.bookmarkRes[i])
            }
        })
    }

    addData(post: any) {
        this.getUserDataSubs = this.userService.getById(post.createdBy).subscribe(resultUser => {
            this.userObj = resultUser;
            post.userName = resultUser.fullName
            post.userId = resultUser.id
            post.userPhotoId = resultUser.file.id
            post.userCompany = resultUser.company
            post.userPosition = resultUser.position.positionName
            this.user.push(this.userObj)
        })

        this.getPostAttachmentDataSubs = this.postAttachmentService.getByPost(post.id).subscribe(result => {
            post.postAttachment = result
        })

        console.log(post)

        this.post.push(post)
    }

    addLikeData(like: any) {
        this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(like.post.id, this.myId).subscribe(userBookmark => {

            like.bookmarkId = userBookmark.id
            like.countOfBookmark = userBookmark.countOfBookmark
        })

        this.getPostAttachmentDataSubs = this.postAttachmentService.getByPost(like.post.id).subscribe(result => {
            like.postAttachment = result
        })

        this.like.push(like)
    }


    addBookmarkData(bookmark: any) {
        this.getCountLikeDataSubs = this.likeService.getUserLikePost(bookmark.post.id, this.myId).subscribe(userLike => {
            bookmark.likeId = userLike.likeId
            bookmark.countOfLike = userLike.countOfLike
        })

        this.getPostAttachmentDataSubs = this.postAttachmentService.getByPost(bookmark.post.id).subscribe(result => {
            bookmark.postAttachment = result
        })

        this.bookmark.push(bookmark)
    }


    fileUpload(event: any): void {

        for (let i = 0; i < event.files.length; i++) {
            this.fileUploadMultiple(event, i).then(result => {
                this.fileArray.push({ ext: result[0], files: result[1] })
            })
        }
        //console.log(this.fileArray);
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
            this.getByCodePostTypeSubsc = this.postTypeService.getByPostTypeCode(POST_TYPE_CODE.REGULAR).subscribe(result => {
                this.postForm.patchValue({
                    postType: {
                        id: result.id
                    }
                })
                this.postForm.value.postTypeId = result.id
                this.postForm.value.file = this.fileArray

                this.postInsertSubs = this.postService.insert(this.postForm.value).subscribe(() => {
                    this.display = false
                })
            })
        } else if (this.postType == 'premium') {
            this.getByCodePostTypeSubsc = this.postTypeService.getByPostTypeCode(POST_TYPE_CODE.PREMIUM).subscribe(result => {
                this.postForm.patchValue({
                    postType: {
                        id: result.id
                    }
                })
                this.postForm.value.postTypeId = result.id
                this.postForm.value.file = this.fileArray

                this.postInsertSubs = this.postService.insert(this.postForm.value).subscribe(() => {
                    this.display = false
                })
            })
        }
    }

    actBookmark(postId: string, bookmarkId: string) {

        if (bookmarkId) {
            this.getIdBookmarkDataSubs = this.bookmarkService.getById(bookmarkId).subscribe(result => {

                if (result.isActive) {
                    this.updateBookmark.controls.isActive.setValue(false)
                } else {
                    this.updateBookmark.controls.isActive.setValue(true)
                }

                this.updateBookmark.controls['id'].setValue(result.id)

                this.updateBookmarkDataSubs = this.bookmarkService.update(this.updateBookmark.value).subscribe(() => {
                    for (let i = 0; i < this.post.length; i++) {
                        this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(this.post[i].id, this.myId).subscribe(userBookmark => {
                            this.post[i].bookmarkId = userBookmark.id
                            this.post[i].countOfBookmark = userBookmark.countOfBookmark
                        })

                        this.getCountLikeDataSubs = this.likeService.getUserLikePost(this.post[i].id, this.myId).subscribe(userLike => {
                            this.post[i].likeId = userLike.likeId
                            this.post[i].countOfLike = userLike.countOfLike
                        })
                    }
                })
            })
        } else {

            this.addBookmark.patchValue({
                post: {
                    id: postId
                }
            })

            this.insertBookmarkDataSubs = this.bookmarkService.insert(this.addBookmark.value).subscribe(() => {

                for (let i = 0; i < this.post.length; i++) {
                    this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(this.post[i].id, this.myId).subscribe(userBookmark => {
                        this.post[i].bookmarkId = userBookmark.id
                        this.post[i].countOfBookmark = userBookmark.countOfBookmark
                    })

                    this.getCountLikeDataSubs = this.likeService.getUserLikePost(this.post[i].id, this.myId).subscribe(userLike => {
                        this.post[i].likeId = userLike.likeId
                        this.post[i].countOfLike = userLike.countOfLike
                    })
                }

                // belum buat insert otomatis
            })
        }
    }

    actLike(postId: string, likeId: string) {

        if (likeId) {

            this.getIdLikeDataSubs = this.likeService.getById(likeId).subscribe(result => {

                if (result.isActive) {
                    this.updateLike.controls.isActive.setValue(false)
                } else {
                    this.updateLike.controls.isActive.setValue(true)
                }

                this.updateLike.controls['id'].setValue(result.id)

                this.updateLikeDataSubs = this.likeService.update(this.updateLike.value).subscribe(() => {
                    for (let i = 0; i < this.post.length; i++) {
                        this.getCountLikeDataSubs = this.likeService.getUserLikePost(this.post[i].id, this.myId).subscribe(userLike => {
                            this.post[i].likeId = userLike.likeId
                            this.post[i].countOfLike = userLike.countOfLike
                        })


                    }
                })
            })
        } else {

            this.addLike.patchValue({
                post: {
                    id: postId
                }
            })

            this.insertLikeDataSubs = this.likeService.insert(this.addLike.value).subscribe(() => {

                for (let i = 0; i < this.post.length; i++) {
                    this.getCountLikeDataSubs = this.likeService.getUserLikePost(this.post[i].id, this.myId).subscribe(userLike => {
                        this.post[i].likeId = userLike.likeId
                        this.post[i].countOfLike = userLike.countOfLike
                    })
                }

                // belum buat insert otomatis
            })
        }

    }

    ngOnDestroy(): void {
        this.postInsertSubs?.unsubscribe()
        this.postAttachInsertSubs?.unsubscribe()
        this.getPostDataSubs?.unsubscribe()
        this.getByCodePostTypeSubsc?.unsubscribe()

        this.getUserDataSubs?.unsubscribe()
        this.getPostAttachmentDataSubs?.unsubscribe()
        this.getCountLikeDataSubs?.unsubscribe()

        this.insertLikeDataSubs?.unsubscribe()
        this.updateLikeDataSubs?.unsubscribe()
        this.getIdLikeDataSubs?.unsubscribe()


        this.getLikeDataSubs?.unsubscribe()
        this.getPostDataByIdSubs?.unsubscribe()

        this.getBookmarkDataSubs?.unsubscribe()
        this.getCountBookmarkDataSubs?.unsubscribe()

        this.insertBookmarkDataSubs?.unsubscribe()
        this.updateBookmarkDataSubs?.unsubscribe()
        this.getIdBookmarkDataSubs?.unsubscribe()
    }

}