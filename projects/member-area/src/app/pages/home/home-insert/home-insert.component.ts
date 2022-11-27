import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { POST_TYPE_CODE } from "projects/constant/post-type"
import { ActivityType } from "projects/interface/activity-type"
import { Polling } from "projects/interface/polling"
import { PostAttachmentService } from "projects/main-area/src/app/service/post-attachment.service"
import { PostTypeService } from "projects/main-area/src/app/service/post-type.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'home-insert',
    templateUrl: './home-insert.component.html',
    styleUrls: ['../../../../styles.css']
})
export class HomeInsertComponent implements OnInit, OnDestroy {

    items!: MenuItem[]
    type!: string
    date?: Date

    activityTypesRes!: ActivityType[]
    activityTypes: any[] = []
    optionValue = '1'
    pollings: Polling[] = []
    post: any[] = []
    fileArray: any[] = []

    insertPostSubscription?: Subscription
    getPostAttachmentDataSubscription?: Subscription
    getByCodePostTypeSubscription?: Subscription

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

    pollingForm = this.fb.group({
        pollContent: ['', Validators.required],
        post: ['']
    })

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private router: Router, private postAttachmentService: PostAttachmentService,
        private postService: PostService, private postTypeService: PostTypeService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'All', routerLink: '/activities/type/all' },
            { label: 'Event', routerLink: '/activities/type/events' },
            { label: 'Course', routerLink: '/activities/type/courses' },
            { label: 'My Activity', routerLink: '/activities/type/my-activities' },
            { label: 'My Event', routerLink: '/activities/type/my-events' },
            { label: 'My Course', routerLink: '/activities/type/my-courses' }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })
    }

    addData(post: any) {
        this.getPostAttachmentDataSubscription = this.postAttachmentService.getByPost(post.id).subscribe(result => {
            post.postAttachment = result
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


    postInsert() {
        this.getByCodePostTypeSubscription = this.postTypeService.getByPostTypeCode(POST_TYPE_CODE.POLL).subscribe(result => {
            this.postForm.patchValue({
                postType: {
                    id: result.id
                }
            })
            this.postForm.value.postTypeId = result.id
            this.postForm.value.file = this.fileArray

            this.insertPostSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
                this.router.navigateByUrl("/homes/type/threads")
            })
        })

    }

    onChange(event: any) {
        this.optionValue = event.target.value
    }

    addInsert() {
        // this.pollings.push(pollingForm)
    }

    remove(i: number) {
        this.pollings.splice(i, 1);
    }

    changePollings(i: number, event: any) {
        this.pollings[i].pollContent = event.target.value
    }

    ngOnDestroy(): void {
        this.insertPostSubscription?.unsubscribe()
        this.getPostAttachmentDataSubscription?.unsubscribe()
        this.getByCodePostTypeSubscription?.unsubscribe()
    }
}