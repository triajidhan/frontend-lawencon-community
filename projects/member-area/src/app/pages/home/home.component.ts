import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormArray, FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"
import { InitEditableRow } from "primeng/table"
import { Post } from "projects/interface/post"
import { PostType } from "projects/interface/post-type"
import { PostTypeService } from "projects/main-area/src/app/service/post-type.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['../../../styles.css']
})
export class HomeComponent implements OnInit, OnDestroy {


    startPosition = 0
    limit = 2
    maxLimit = this.startPosition + this.limit

    items!: MenuItem[]
    type!: string
    postType!: string
    display: boolean = false
    // resultExtension!: string
    // resultFile !: string

    fileArray: any[] = [];
    postTypesRes!: PostType[]
    postTypes: any[] = []

    post: any[] = []

    private postInsertSubs?: Subscription
    private postAttachInsertSubs?: Subscription
    private getAllPostTypeSubs?: Subscription

    private getPostDataSubs?: Subscription


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
        private fb: FormBuilder, private postService: PostService, private postTypeService: PostTypeService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Thread', routerLink: '/homes/threads' },
            { label: 'Likes', routerLink: '/homes/likes' },
            { label: 'Bookmark', routerLink: '/homes/bookmarks' }
        ]

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

        this.init();

    }

    onScroll() {
        this.startPosition += this.limit
        this.init()
    }

    init() {
        this.getPostDataSubs = this.postService.getAll(this.startPosition, this.limit).subscribe(result => {

            for(let i = 0; i<result.length; i++){
                this.addData(result[i])
            }
        })
    }

    addData(post:any) {
            this.post.push(post)
            console.log(this.post)
    }

    fileUpload(event: any): void {

        for (let i = 0; i < event.files.length; i++) {
            this.fileUploadMultiple(event, i).then(result => {
                this.fileArray.push({ ext: result[0], files: result[1] })
            })
        }
        console.log(this.fileArray);
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

        console.log(this.postForm.value)
        this.postInsertSubs = this.postService.insert(this.postForm.value).subscribe(() => {
            this.display = false
        })
    }

    ngOnDestroy(): void {
        this.postInsertSubs?.unsubscribe()
        this.postAttachInsertSubs?.unsubscribe()
        this.getAllPostTypeSubs?.unsubscribe()
        this.getPostDataSubs?.unsubscribe()
    }

}