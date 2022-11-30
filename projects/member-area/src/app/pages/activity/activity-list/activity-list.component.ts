import { Component, OnInit } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { FileService } from "projects/main-area/src/app/service/file.service"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['../../../../styles.css']
})
export class ActivityListComponent implements OnInit {

    myId = ""

    startPosition = 0
    limit = 6

    startPositionCourse = 0
    limitCourse = 6

    startPositionEvent = 0
    limitEvent = 6

    startPositionMyActivity = 0
    limitMyActivity = 6

    startPositionMyCourse = 0
    limitMyCourse = 6

    startPositionMyEvent = 0
    limitMyEvent = 6

    items!: MenuItem[]
    type!: string

    activities: any[] = []
    activitiesCourse: any[] = []
    activitiesEvent: any[] = []

    myActivities: any[] = []
    myActivitiesByEvent: any[] = []
    myActivitiesByCourse: any[] = []

    activityId?: string
    activityTitle?: string
    activityPrice?: string

    resultExtension!: string
    resultFile !: string
    display: boolean = false

    urlFile = `${BASE_URL.LOCALHOST}/files/download/`
    paymentActivityForm = this.fb.group({
        net: [''],
        approve: [false],
        activity: this.fb.group({
            id: ['']
        }),
        file: this.fb.group({
            files: [''],
            ext: ['']
        })
    })

    private getAllActivitySubs?: Subscription
    private getAllActivityByEvent?: Subscription
    private getAllActivityByCourse?: Subscription

    private getAllMyActivitiesSubs?: Subscription
    private getAllMyActivityEventSubs?: Subscription
    private getAllMyActivityCourseSubs?: Subscription

    private paymentActivityDetailSubs?: Subscription

    constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder,
        private activatedRoute: ActivatedRoute, private fileService: FileService,
        private activityService: ActivityService, private paymentActivityDetailService: PaymentActivityDetailService,
        private apiService: ApiService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.myId = String(this.apiService.getId())

        this.items = [
            {
                label: 'Activity',
                items: [
                    { label: 'All', routerLink: '/activities/type/all',command:()=>this.init()},
                    { label: 'Event', routerLink: '/activities/type/events',command:()=>this.init()},
                    { label: 'Course', routerLink: '/activities/type/courses',command:()=>this.init()}
                ]
            },
            {
                label: 'My Activity',
                items: [
                    { label: 'All', routerLink: '/activities/type/my-activities',command:()=>this.init()},
                    { label: 'My Event', routerLink: '/activities/type/my-events' ,command:()=>this.init()},
                    { label: 'My Course', routerLink: '/activities/type/my-courses' ,command:()=>this.init()}
                ]
            }
        ]

        this.init()
    }

    onScroll() {
        this.startPosition += this.limit
        this.initAllActivity()
    }

    onScrollActivityByCourse() {
        this.startPositionCourse += this.limitCourse
        this.initAllActivityCourse()
    }

    onScrollActivityByEvent() {
        this.startPositionEvent += this.limitEvent
        this.initAllActivityEvent()
    }

    onScrollMyActivity() {
        this.startPositionMyActivity += this.limitMyActivity
        this.initMyActivity()
    }

    onScrollMyActivityCourse() {
        this.startPositionMyCourse += this.limitMyCourse
        this.initMyActivityCourse()
    }

    onScrollMyActivityEvent() {
        this.startPositionMyEvent += this.limitMyEvent
        this.initMyActivityEvent()
    }

    init() {

        this.activities =  []
        this.activitiesCourse =  []
        this.activitiesEvent = []

        this.myActivities =  []
        this.myActivitiesByEvent = []
        this.myActivitiesByCourse =  []

        this.startPosition = 0
        this.limit = 6

        this.startPositionCourse = 0
        this.limitCourse = 6

        this.startPositionEvent = 0
        this.limitEvent = 6

        this.startPositionMyActivity = 0
        this.limitMyActivity = 6

        this.startPositionMyCourse = 0
        this.limitMyCourse = 6

        this.startPositionMyEvent = 0
        this.limitMyEvent = 6

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })

        this.initAllActivity()
        this.initAllActivityCourse()
        this.initAllActivityEvent()
        this.initMyActivity()
        this.initMyActivityCourse()
        this.initMyActivityEvent()

    }

    initAllActivity() {
        this.getAllActivitySubs = this.activityService.getByIsActiveAndOrder(this.startPosition, this.limit, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addData(result[i])
            }
        })
    }

    initAllActivityCourse() {
        this.getAllActivityByCourse = this.activityService.getByActivityTypeCodeOrder('C', this.startPositionCourse, this.limitCourse, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addDataActivityByCourse(result[i])
            }
        })
    }

    initAllActivityEvent() {
        this.getAllActivityByEvent = this.activityService.getByActivityTypeCodeOrder('E', this.startPositionEvent, this.limitEvent, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addDataActivityByEvent(result[i])
            }
        })
    }

    initMyActivity() {
        this.getAllMyActivitiesSubs = this.activityService.getByUser(this.myId, this.startPositionMyActivity, this.limitMyActivity, false).subscribe(result => {
            
            for (let i = 0; i < result.length; i++) {
                this.addDataMyActivities(result[i])
            }
        })
    }

    initMyActivityCourse() {
        this.getAllMyActivityCourseSubs = this.activityService.getByUserAndActivityTypeCode(this.myId, 'C', this.startPositionMyCourse, this.limitMyCourse, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addDataMyActivitiesCourse(result[i])
            }
        })
    }

    initMyActivityEvent() {
        this.getAllMyActivityEventSubs = this.activityService.getByUserAndActivityTypeCode(this.myId, 'E', this.startPositionMyEvent, this.limitMyCourse, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addDataMyActivitiesEvent(result[i])
            }
        })
    }


    addData(activity: any) {
        this.activities.push(activity)
    }

    addDataActivityByCourse(activity: any) {
        this.activitiesCourse.push(activity)
    }

    addDataActivityByEvent(activity: any) {
        this.activitiesEvent.push(activity)
    }


    addDataMyActivities(activity: any) {
        this.myActivities.push(activity)
    }

    addDataMyActivitiesCourse(activity: any) {
        this.myActivitiesByCourse.push(activity)
    }

    addDataMyActivitiesEvent(activity: any) {
        this.myActivitiesByEvent.push(activity)
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

    showPopUpDialog(activityId: string, price: string, title: string) {
        this.display = true
        this.activityId = activityId
        this.activityPrice = price
        this.activityTitle = title
    }

    submitInsert() {
        this.paymentActivityForm.patchValue({
            file: {
                files: this.resultFile,
                ext: this.resultExtension
            },
            activity: {
                id: this.activityId
            }
        })

        this.paymentActivityForm.value.net = this.activityPrice

        this.paymentActivityDetailSubs = this.paymentActivityDetailService.insert(this.paymentActivityForm.value).subscribe(() => {
            this.display = false
        })
    }


    ngOnDestroy(): void {
        this.getAllActivitySubs?.unsubscribe()
        this.getAllActivityByEvent?.unsubscribe()
        this.getAllActivityByCourse?.unsubscribe()

        this.getAllMyActivitiesSubs?.unsubscribe()
        this.getAllMyActivityCourseSubs?.unsubscribe()
        this.getAllMyActivityEventSubs?.unsubscribe()

        this.paymentActivityDetailSubs?.unsubscribe()
    }
}