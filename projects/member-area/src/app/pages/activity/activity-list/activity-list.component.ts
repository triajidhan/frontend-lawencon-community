import { Component, OnInit, ViewChild } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"
import { FileUpload } from "primeng/fileupload"
import { BASE_URL } from "projects/constant/base-url"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { FileService } from "projects/main-area/src/app/service/file.service"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['../../../../styles.css']
})
export class ActivityListComponent implements OnInit {
    loadingJoinActivity: boolean = false
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


    startPositionMyActivityOnGoing = 0
    limitMyActivityOnGoing = 6

    startPositionMyCourseOnGoing = 0
    limitMyCourseOnGoing = 6

    startPositionMyEventOnGoing = 0
    limitMyEventOnGoing = 6

    items!: MenuItem[]
    type!: string
    activitiyIdx: number = 0
    event: any = []

    activities: any[] = []
    activitiesCourse: any[] = []
    activitiesEvent: any[] = []

    myActivities: any[] = []
    myActivitiesByEvent: any[] = []
    myActivitiesByCourse: any[] = []

    myActivitiesOnGoing: any[] = []
    myActivitiesByEventOnGoing: any[] = []
    myActivitiesByCourseOnGoing: any[] = []

    @ViewChild('uploadComponent') upload!: FileUpload
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
    private getAllMyActivitiesOnGoingSubs?: Subscription
    private getAllMyActivityOnGoingEventSubs?: Subscription
    private getAllMyActivityOnGoingCourseSubs?: Subscription
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
                    { label: 'All', routerLink: '/activities/type/all', command: () => this.init() },
                    { label: 'Event', routerLink: '/activities/type/events', command: () => this.init() },
                    { label: 'Course', routerLink: '/activities/type/courses', command: () => this.init() }
                ]
            },
            {
                label: 'My Activity',
                items: [
                    { label: 'All', routerLink: '/activities/type/my-activities', command: () => this.init() },
                    { label: 'My Event', routerLink: '/activities/type/my-events', command: () => this.init() },
                    { label: 'My Course', routerLink: '/activities/type/my-courses', command: () => this.init() }
                ]
            },
            {
                label: 'On Going',
                items: [
                    { label: 'All', routerLink: '/activities/type/my-activities-on-going', command: () => this.init() },
                    { label: 'My Event', routerLink: '/activities/type/my-events-on-going', command: () => this.init() },
                    { label: 'My Course', routerLink: '/activities/type/my-courses-on-going', command: () => this.init() }
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


    onScrollMyActivityOnGoing() {
        this.startPositionMyActivityOnGoing += this.limitMyActivityOnGoing
        this.initMyActivityOnGoing()
    }

    onScrollMyActivityCourseOnGoing() {
        this.startPositionMyCourseOnGoing += this.limitMyCourseOnGoing
        this.initMyActivityCourseOnGoing()
    }

    onScrollMyActivityEventOnGoing() {
        this.startPositionMyEventOnGoing += this.limitMyEventOnGoing
        this.initMyActivityEventOnGoing()
    }

    init() {

        this.activities = []
        this.activitiesCourse = []
        this.activitiesEvent = []

        this.myActivities = []
        this.myActivitiesByEvent = []
        this.myActivitiesByCourse = []

        this.myActivitiesOnGoing = []
        this.myActivitiesByEventOnGoing = []
        this.myActivitiesByCourseOnGoing = []

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


        this.startPositionMyActivityOnGoing = 0
        this.limitMyActivityOnGoing = 6

        this.startPositionMyCourseOnGoing = 0
        this.limitMyCourseOnGoing = 6

        this.startPositionMyEventOnGoing = 0
        this.limitMyEventOnGoing = 6

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })

        this.initAllActivity()
        this.initAllActivityCourse()
        this.initAllActivityEvent()

        this.initMyActivity()
        this.initMyActivityCourse()
        this.initMyActivityEvent()

        this.initMyActivityOnGoing()
        this.initMyActivityCourseOnGoing()
        this.initMyActivityEventOnGoing()

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
        this.getAllMyActivitiesSubs = this.activityService.getByUser(this.myId, this.startPositionMyActivity, this.limitMyActivity, true).subscribe(result => {

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


    initMyActivityOnGoing() {
        this.getAllMyActivitiesOnGoingSubs = this.paymentActivityDetailService.getByUser(this.myId, this.startPositionMyActivityOnGoing, this.limitMyActivityOnGoing, true).subscribe(result => {

            for (let i = 0; i < result.length; i++) {
                this.addDataMyActivitiesOnGoing(result[i])
            }
        })
    }

    initMyActivityCourseOnGoing() {
        this.getAllMyActivityOnGoingCourseSubs = this.paymentActivityDetailService.getByActivityTypeAndUser('course', this.myId, this.startPositionMyCourseOnGoing, this.limitMyCourseOnGoing, true).subscribe(result => {

            for (let i = 0; i < result.length; i++) {
                this.addDataMyActivitiesOnGoingCourse(result[i])
            }
        })
    }

    initMyActivityEventOnGoing() {
        this.getAllMyActivityOnGoingEventSubs = this.paymentActivityDetailService.getByActivityTypeAndUser('event', this.myId, this.startPositionMyEventOnGoing, this.limitMyCourseOnGoing, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addDataMyActivitiesOnGoingEvent(result[i])
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



    addDataMyActivitiesOnGoing(activity: any) {
        this.myActivitiesOnGoing.push(activity)

    }

    addDataMyActivitiesOnGoingCourse(activity: any) {
        this.myActivitiesByCourseOnGoing.push(activity)
    }

    addDataMyActivitiesOnGoingEvent(activity: any) {
        this.myActivitiesByEventOnGoing.push(activity)
    }

    fileUpload(event: any): void {
        this.event.push(event.files)
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

    showPopUpDialog(activityId: string, price: string, title: string, i: number) {
        this.activitiyIdx = i
        this.display = true
        this.activityId = activityId
        this.activityPrice = price
        this.activityTitle = title
    }

    submitInsert() {
        this.loadingJoinActivity = true
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

        this.paymentActivityDetailSubs = this.paymentActivityDetailService.insert(this.paymentActivityForm.value).pipe(finalize(() => this.loadingJoinActivity = false)).subscribe(() => {
            this.display = false
            if (this.type == 'all') {
                this.activities.splice(this.activitiyIdx, 1)
            } else if (this.type == 'events') {
                this.activitiesEvent.splice(this.activitiyIdx, 1)
            } else {
                this.activitiesCourse.splice(this.activitiyIdx, 1)
            }
            this.upload.clear()
            this.event = []
        })
    }


    ngOnDestroy(): void {
        this.getAllActivitySubs?.unsubscribe()
        this.getAllActivityByEvent?.unsubscribe()
        this.getAllActivityByCourse?.unsubscribe()
        this.getAllMyActivitiesSubs?.unsubscribe()
        this.getAllMyActivityCourseSubs?.unsubscribe()
        this.getAllMyActivityEventSubs?.unsubscribe()
        this.getAllMyActivitiesOnGoingSubs?.unsubscribe()
        this.getAllMyActivityOnGoingEventSubs?.unsubscribe()
        this.getAllMyActivityOnGoingCourseSubs?.unsubscribe()
        this.paymentActivityDetailSubs?.unsubscribe()
    }
}
