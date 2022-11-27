import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { ActivityType } from "projects/interface/activity-type"
import { ActivityTypeService } from "projects/main-area/src/app/service/activity-type.service"
import { Subscription } from "rxjs"
import { ActivityService } from "../../../service/activity.service"

@Component({
    selector: 'activity-insert',
    templateUrl: './activity-insert.component.html',
    styleUrls: ['../../../../styles.css']
})
export class ActivityInsertComponent implements OnInit, OnDestroy {

    items!: MenuItem[]
    type!: string
    date?: Date

    activityTypesRes!: ActivityType[]
    activityTypes: any[] = []

    resultExtension!: string
    resultFile !: string

    insertActivitySubscription?: Subscription
    getAllActivityTypeSubscription?: Subscription

    activityForm = this.fb.group({
        title: ['', Validators.required],
        provider: ['', Validators.required],
        location: ['', Validators.required],
        beginSchedule: ['', Validators.required],
        finishSchedule: ['', Validators.required],
        price: ['', Validators.required],
        activityType: this.fb.group({
            id: ['']
        }),
        file: this.fb.group({
            files: [''],
            ext: ['']
        }),
        activityTypeId: ['']
    })

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private router: Router, private activityService: ActivityService,
        private activityTypeService: ActivityTypeService) { }

    ngOnInit(): void {
        this.items = [
            {
                label: 'Activity',
                items: [
                    { label: 'All', routerLink: '/activities/type/all' },
                    { label: 'Event', routerLink: '/activities/type/events' },
                    { label: 'Course', routerLink: '/activities/type/courses' }
                ]
            },
            {
                label: 'My Activity',
                items: [
                    { label: 'All', routerLink: '/activities/type/my-activities' },
                    { label: 'My Event', routerLink: '/activities/type/my-events' },
                    { label: 'My Course', routerLink: '/activities/type/my-courses' }
                ]
            }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })

        this.getAllActivityTypeSubscription = this.activityTypeService.getAll().subscribe(result => {
            this.activityTypesRes = result
            for (let i = 0; i < this.activityTypesRes.length; i++) {
                this.activityTypes.push({
                    activityTypeName: this.activityTypesRes[i].activityTypeName,
                    activityTypeCode: this.activityTypesRes[i].activityTypeCode,
                    id: this.activityTypesRes[i].id
                })
            }
        })
    }

    fileUpload(event: any): void {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(event.files[0])
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        })

        toBase64(event.files[0].name).then(result => {
            this.resultFile = result.substring(result.indexOf(",") + 1, result.length)
            this.resultExtension = result.split(";")[0].split('/')[1]
        })
    }

    submitInsert() {
        this.activityForm.patchValue({
            file: {
                files: this.resultFile,
                ext: this.resultExtension
            },
            activityType: {
                id: this.activityForm.value.activityTypeId
            }
        })
        this.insertActivitySubscription = this.activityService.insert(this.activityForm.value).subscribe(() => {
            this.router.navigateByUrl(`/activities/type/all`)
        })
    }

    ngOnDestroy(): void {
        this.insertActivitySubscription?.unsubscribe()
        this.getAllActivityTypeSubscription?.unsubscribe()
    }
}