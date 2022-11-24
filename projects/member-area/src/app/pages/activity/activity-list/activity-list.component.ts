import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['../../../../styles.css']
})
export class ActivityListComponent implements OnInit {

    items!: MenuItem[]
    type!: string

    constructor(private activatedRoute: ActivatedRoute) { }

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
            this.init()
        })
    }

    init() { }
}