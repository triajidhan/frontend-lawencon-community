import { formatDate } from "@angular/common"
import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { ActivityType } from "projects/interface/activity-type"
import { ActivityTypeService } from "projects/main-area/src/app/service/activity-type.service"
import { finalize, Subscription } from "rxjs"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"

@Component({
    selector: 'activity-insert',
    templateUrl: './activity-insert.component.html',
    styleUrls: ['../../../../styles.css']
})
export class ActivityInsertComponent implements OnInit, OnDestroy {
    loadingActivity: boolean = false
    showFinishSchedule: boolean = true

    items!: MenuItem[]
    type!: string
    minDate!: Date
    startDate: Date = new Date()
    minFinishDate: Date = new Date()

    activityTypesRes!: ActivityType[]
    activityTypes: any[] = []

    resultExtension!: string
    resultFile !: string

    private insertActivitySubscription?: Subscription
    private getAllActivityTypeSubscription?: Subscription

    activityForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(50)]],
        provider: ['', [Validators.required, Validators.maxLength(100)]],
        location: ['', Validators.required],
        beginSchedule: ['', Validators.required],
        finishSchedule: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(5000)]],
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
        this.minDate = new Date(new Date().setHours(new Date().getHours() + 1))

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
            },
            {
                label: 'On Going',
                items: [
                    { label: 'All', routerLink: '/activities/type/my-activities-on-going' },
                    { label: 'My Event', routerLink: '/activities/type/my-events-on-going' },
                    { label: 'My Course', routerLink: '/activities/type/my-courses-on-going' }
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
        this.loadingActivity = true;
        function getTimeZone() {
            var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
            return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
        }

        this.activityForm.controls.beginSchedule.setValue(formatDate(this.activityForm.value.beginSchedule ?? '', `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en'))
        this.activityForm.controls.finishSchedule.setValue(formatDate(this.activityForm.value.finishSchedule ?? '', `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en'))

        this.activityForm.patchValue({
            file: {
                files: this.resultFile,
                ext: this.resultExtension
            },
            activityType: {
                id: this.activityForm.value.activityTypeId
            }
        })
        this.insertActivitySubscription = this.activityService.insert(this.activityForm.value).pipe(finalize(() => this.loadingActivity = false)).subscribe(() => {
            this.router.navigateByUrl(`/activities/type/all`)
        })
    }

    getValueDate() {
        this.startDate = new Date(this.activityForm.value.beginSchedule ?? '')
        this.minFinishDate = new Date(this.startDate.setHours(this.startDate.getHours() + 1))
        this.showFinishSchedule = false
    }

    ngOnDestroy(): void {
        this.insertActivitySubscription?.unsubscribe()
        this.getAllActivityTypeSubscription?.unsubscribe()
    }
}
