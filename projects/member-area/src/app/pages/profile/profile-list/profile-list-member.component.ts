import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { POST_TYPE_CODE } from "projects/constant/post-type"
import { Bookmark } from "projects/interface/bookmark"
import { PostAttachment } from "projects/interface/post-attachment"
import { PostType } from "projects/interface/post-type"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { BookmarkService } from "projects/main-area/src/app/service/bookmark.service"
import { LikeService } from "projects/main-area/src/app/service/like.service"
import { PostAttachmentService } from "projects/main-area/src/app/service/post-attachment.service"
import { PostTypeService } from "projects/main-area/src/app/service/post-type.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { Subscription } from "rxjs"
import { UserService } from "../../../service/user.service"



@Component({
    selector: 'profile-list-member',
    templateUrl: './profile-list-member.component.html'
})
export class ProfileListMemberComponent implements OnInit, OnDestroy {
    myId: string = ""
    myFullName: string = ""
    myProfile: string = ""

    roleName?: string | null
    roleCode?: string | null
    email?: string | null
    photoId?: number | null


    items!: MenuItem[]
    fileDownload = `${BASE_URL.LOCALHOST}/files/download/`

    startPositionPost = 0
    limitPost = 5

    type!: string
    postType!: string
    display: boolean = false
    isShowComment: boolean = true

    fileArray: any[] = [];
    postTypesRes!: PostType[]
    postTypes: any[] = []

    post: any[] = []
    postAttachment: any[] = []

    postLike: any[] = []
    postAttachmentLike: any[] = []

    postBookmark: any[] = []
    postAttachmentBookmark: any[] = []

    getByPostIdForLike: any = new Object();
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

    private getPostLikeDataSubs?: Subscription
    private getPostLikeAttachmentDataSubs?: Subscription

    private getPostBookmarkDataSubs?: Subscription
    private getPostBookmarkAttachmentDataSubs?: Subscription

    private getCountLikeDataSubs?: Subscription
    private insertLikeDataSubs?: Subscription
    private updateLikeDataSubs?: Subscription
    private getIdLikeDataSubs?: Subscription

    private getCountBookmarkDataSubs?: Subscription
    private insertBookmarkDataSubs?: Subscription
    private updateBookmarkDataSubs?: Subscription
    private getIdBookmarkDataSubs?: Subscription

    private getDataLikeSubs?: Subscription
    private getDataBookmarkSubs?: Subscription

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

    constructor(private apiService: ApiService, private router: Router,
        private fb: FormBuilder, private userService: UserService,
        private postService: PostService, private postAttachmentService: PostAttachmentService,
        private likeService: LikeService, private bookmarkService: BookmarkService, private postTypeService: PostTypeService) { }


    ngOnInit(): void {
        this.items = [
            { label: 'Edit Profile', routerLink: '/profiles/member/edit/1' },
            { label: 'Change Password', routerLink: '/profiles/member/change-password/1' },
            { label: 'Log Out', routerLink: '/' }
        ]

        this.myId = String(this.apiService.getId())
        this.myFullName = String(this.apiService.getName())
        this.myProfile = String(this.apiService.getPhotoId())


        if (this.apiService.getEmail()) {
            this.email = this.apiService.getEmail()
        }
        if (this.apiService.getRoleName()) {
            this.roleName = this.apiService.getRoleName()
        }
        if (this.apiService.getRoleCode()) {
            this.roleCode = this.apiService.getRoleCode()
        }
        if (this.apiService.getPhotoId()) {
            this.photoId = this.apiService.getPhotoId()
        }

        this.init()

    }

    onScroll() {
        this.startPositionPost += this.limitPost
        this.initPost()
    }


    init() {
        this.startPositionPost = 0
        this.limitPost = 5
        this.post = [];

        this.initPost()
    }

    initPost() {
        this.getPostDataSubs = this.postService.getByUserAndOrder(this.myId, this.startPositionPost, this.limitPost, false).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.getCountLikeDataSubs = this.likeService.getUserLikePost(result[i].id, this.myId).subscribe(userLike => {
                    result[i].likeId = userLike.likeId
                    result[i].countOfLike = userLike.countOfLike
                })

                this.getCountBookmarkDataSubs = this.bookmarkService.getUserBookmarkPost(result[i].id, this.myId).subscribe(userBookmark => {
                    result[i].bookmarkId = userBookmark.id
                })

                this.addDataPost(result[i])

                console.log(result[i])
            }
        })
    }

    addDataPost(post: any) {

        this.getPostAttachmentDataSubs = this.postAttachmentService.getByPost(post.id).subscribe(result => {
            post.postAttachment = result
        })

        this.userService.getById(post.createdBy).subscribe(result => {
            post.user = result
        })

        this.post.push(post)
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
                    this.postForm.controls.title.setValue("")
                    this.postForm.controls.contents.setValue("")
                    this.postForm.controls.titlePoll.setValue("")
                    this.init()
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
                    this.init()
                })
            })
        }
    }


    actBookmark(postId: string, bookmarkId: string, i: any) {
        if (bookmarkId) {
            this.getIdBookmarkDataSubs = this.bookmarkService.getById(bookmarkId).subscribe(result => {
                if (result.isActive) {
                    this.updateBookmark.controls.isActive.setValue(false)
                } else {
                    this.updateBookmark.controls.isActive.setValue(true)
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
                this.bookmark[i].bookmarkId = response.id
            })
        }
    }

    actLikePost(postId: string, likeId: string, i: any) {
        if (likeId) {
            this.getIdLikeDataSubs = this.likeService.getById(likeId).subscribe(result => {
                if (result.isActive) {
                    this.updateLike.controls.isActive.setValue(false)
                    this.post[i].countOfLike = this.post[i].countOfLike - 1;
                } else {
                    this.updateLike.controls.isActive.setValue(true)
                    this.post[i].countOfLike = this.post[i].countOfLike + 1;
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
            })
        }

    }

    actLikePostLike(postId: string, likeId: string, i: any) {
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

    actBookmarkPostBookmark(postId: string, bookmarkId: string, i: any) {
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

    changePass() {
        this.router.navigateByUrl("/profiles/member/change-password/" + this.myId)
    }

    editProfile() {
        this.router.navigateByUrl("/profiles/member/edit/" + this.myId)
    }

    ngOnDestroy(): void {
        this.postInsertSubs?.unsubscribe()
        this.postAttachInsertSubs?.unsubscribe()
        this.getByCodePostTypeSubsc?.unsubscribe()

        this.getPostDataSubs?.unsubscribe()
        this.getPostAttachmentDataSubs?.unsubscribe()

        this.getPostLikeDataSubs?.unsubscribe()
        this.getPostLikeAttachmentDataSubs?.unsubscribe()

        this.getPostBookmarkDataSubs?.unsubscribe()
        this.getPostBookmarkAttachmentDataSubs?.unsubscribe()

        this.getCountLikeDataSubs?.unsubscribe()
        this.insertLikeDataSubs?.unsubscribe()
        this.updateLikeDataSubs?.unsubscribe()
        this.getIdLikeDataSubs?.unsubscribe()

        this.getCountBookmarkDataSubs?.unsubscribe()
        this.insertBookmarkDataSubs?.unsubscribe()
        this.updateBookmarkDataSubs?.unsubscribe()
        this.getIdBookmarkDataSubs?.unsubscribe()

        this.getDataLikeSubs?.unsubscribe()
        this.getDataBookmarkSubs?.unsubscribe()
    }
}