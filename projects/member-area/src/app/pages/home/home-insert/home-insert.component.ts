import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormArray, FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { POST_TYPE_CODE } from "projects/constant/post-type"
import { ActivityType } from "projects/interface/activity-type"
import { Polling } from "projects/interface/polling"
import { PollingService } from "projects/main-area/src/app/service/polling.service"
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

    type!: string
    date?: Date

    activityTypesRes!: ActivityType[]
    activityTypes: any[] = []
    optionValue = '1'
    pollings: Polling[] = []
    post: any[] = []
    fileArray: any[] = []

    insertPostSubscription?: Subscription
    getByCodePostTypeSubscription?: Subscription

    postForm = this.fb.group({
        title: ['', Validators.required],
        contents: ['', Validators.required],
        postType: this.fb.group({
            id: ['']
        }),
        titlePoll: ['', Validators.required],
        postTypeId: [''],
        pollContents: this.fb.array([])
    })

    pollingArr = this.fb.group({
        details: this.fb.array([
            this.fb.group({ pollContent: ['', Validators.required] }),
            this.fb.group({ pollContent: ['', Validators.required] })
        ])
    })


    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private router: Router, private postService: PostService, private postTypeService: PostTypeService) { }

    ngOnInit(): void {

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })
    }

    postInsert() {
        this.getByCodePostTypeSubscription = this.postTypeService.getByPostTypeCode(POST_TYPE_CODE.POLL).subscribe(result => {
            this.postForm.patchValue({
                postType: {
                    id: result.id
                }
            })
            this.postForm.value.postTypeId = result.id
            for (let i = 0; i < this.details.value.length; i++) {
                this.postForm.value.pollContents?.push(this.details.value[i].pollContent)
            }
            this.insertPostSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
                this.router.navigateByUrl("/homes/type/threads")
            })
        })
    }

    addInsert() {
        const newUserReq = this.fb.group({
            pollContent: ['', Validators.required]
        })
        this.details.push(newUserReq)
    }

    get details(): FormArray {
        return this.pollingArr.get('details') as FormArray
    }

    remove(i: number) {
        this.details.removeAt(i)
    }

    changePollings(i: number, event: any) {
        this.pollings[i].pollContent = event.target.value
    }

    ngOnDestroy(): void {
        this.insertPostSubscription?.unsubscribe()
        this.getByCodePostTypeSubscription?.unsubscribe()
    }
}