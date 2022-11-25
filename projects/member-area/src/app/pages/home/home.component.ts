import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormArray, FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"
import { InitEditableRow } from "primeng/table"
import { BASE_URL } from "projects/constant/base-url"
import { Post } from "projects/interface/post"
import { PostType } from "projects/interface/post-type"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { FileService } from "projects/main-area/src/app/service/file.service"
import { LikeService } from "projects/main-area/src/app/service/like.service"
import { PostAttachmentService } from "projects/main-area/src/app/service/post-attachment.service"
import { PostTypeService } from "projects/main-area/src/app/service/post-type.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { Subscription } from "rxjs"
import { UserService } from "../../service/user.service"

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['../../../styles.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    myId: string = ""

    startPosition = 0
    limit = 2

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

    addLike = this.fb.group({
        post: this.fb.group({
            id: ['']
        })
    })

    updateLike = this.fb.group({
        id: [''],
        isActive: [false]
    })

    userObj: Object = new Object()
    postAttachmentObj: Object = new Object()

    private postInsertSubs?: Subscription
    private postAttachInsertSubs?: Subscription
    private getAllPostTypeSubs?: Subscription

    private getPostDataSubs?: Subscription
    private getPostAttachmentDataSubs?: Subscription
    private getCountLikeDataSubs?: Subscription
    private getUserDataSubs?: Subscription

    private insertLikeDataSubs?: Subscription
    private updateLikeDataSubs?: Subscription
    private getIdLikeDataSubs?: Subscription

    private getLikeDataSubs?: Subscription

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
        private apiService: ApiService, private likeService: LikeService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.myId = String(this.apiService.getId())

        console.log(this.myId)

        this.items = [
            { label: 'Thread', routerLink: '/homes/threads' },
            { label: 'Likes', routerLink: '/homes/likes' },
            { label: 'Bookmark', routerLink: '/homes/bookmarks' }
        ]
        this.init();
    }

    onScroll() {
        this.startPosition += this.limit
        this.init()
    }

    init() {

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })

        this.getAllPostTypeSubs = this.postTypeService.getAll().subscribe(result => {
            this.postTypesRes = result

            for (let i = 0; i < this.postTypesRes.length; i++) {
                this.postTypes.push({
                    postTypeName: this.postTypesRes[i].postTypeName,
                    postTypeCode: this.postTypesRes[i].postTypeCode,
                    id: this.postTypesRes[i].id
                })
            }
        })

        this.getPostDataSubs = this.postService.getIsActiveAndOrder(this.startPosition, this.limit, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.getCountLikeDataSubs = this.likeService.getUserLikePost(result[i].id, this.myId).subscribe(userLike => {
                    result[i].likeId = userLike.likeId
                    result[i].countOfLike = userLike.countOfLike
                })
                this.addData(result[i])
            }
        })


        console.log(this.post)
    }

    initLike() {
        // this.getLikeDataSubs = this.likeService.getByUser(this.myId, this.startPosition, this.limit).subscribe(result => {

        // })
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

        this.post.push(post)
        console.log(post)
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
        this.postForm.patchValue({
            postType: {
                id: this.postForm.value.postTypeId
            },
        })
        this.postForm.value.file = this.fileArray;

        //console.log(this.postForm.value)
        this.postInsertSubs = this.postService.insert(this.postForm.value).subscribe(() => {
            this.display = false
        })
    }

    actLike(postId: string, likeId: string) {
        if (likeId) {
            // this.activatedRoute.params.subscribe(result=>{

            // })
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
            })
        }
    }

    ngOnDestroy(): void {
        this.postInsertSubs?.unsubscribe()
        this.postAttachInsertSubs?.unsubscribe()
        this.getAllPostTypeSubs?.unsubscribe()
        this.getPostDataSubs?.unsubscribe()

        this.getUserDataSubs?.unsubscribe()
        this.getPostAttachmentDataSubs?.unsubscribe()
        this.getCountLikeDataSubs?.unsubscribe()

        this.insertLikeDataSubs?.unsubscribe()
        this.updateLikeDataSubs?.unsubscribe()
        this.getIdLikeDataSubs?.unsubscribe()
    }

}