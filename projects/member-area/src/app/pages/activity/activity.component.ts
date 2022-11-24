import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'activity',
    templateUrl: './activity.component.html',
    styleUrls: ['../../../styles.css']
})
export class ActivityComponent implements OnInit {

    items!: MenuItem[]
    type!: string

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        this.items = [
            { label: 'All', routerLink: '/activities/all' },
            { label: 'Event', routerLink: '/activities/events' },
            { label: 'Course', routerLink: '/activities/courses' },
            { label: 'My Activity', routerLink: '/activities/my-activities' },
            { label: 'My Event', routerLink: '/activities/my-events' },
            { label: 'My Course', routerLink: '/activities/my-courses' }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
            this.init()
        })
    }

    init() { }
}