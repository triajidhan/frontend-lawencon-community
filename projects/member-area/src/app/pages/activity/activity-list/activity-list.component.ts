import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { MenuItem } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"
import { FileService } from "projects/main-area/src/app/service/file.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['../../../../styles.css']
})
export class ActivityListComponent implements OnInit {

    startPosition = 0
    limit = 3
    items!: MenuItem[]
    type!: string
    activities: any[] = []

    urlFile = `${BASE_URL.LOCALHOST}/files/download/`

    private getAllActivitySubs?: Subscription

    constructor(private activatedRoute: ActivatedRoute, private fileService: FileService,
        private activityService: ActivityService) { }

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

        this.init()
    }

    init() {
        this.getAllActivitySubs = this.activityService.getByIsActiveAndOrder(this.startPosition, this.limit, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addData(result[i])
            }
        })
    }


    onScroll() {
        this.startPosition += this.limit
        this.init()
    }

    addData(activity: any) {
        this.activities.push(activity)
        console.log(this.activities)
    }


    ngOnDestroy(): void {
        this.getAllActivitySubs?.unsubscribe()
    }
}