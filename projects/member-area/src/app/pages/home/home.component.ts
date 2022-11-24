import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { MenuItem } from "primeng/api"
import { InitEditableRow } from "primeng/table"

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['../../../styles.css']
})
export class HomeComponent implements OnInit {

    items!: MenuItem[]
    type!: string

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        this.items = [
            { label: 'Thread', routerLink: '/homes/threads' },
            { label: 'Likes', routerLink: '/homes/likes' },
            { label: 'Bookmark', routerLink: '/homes/bookmarks' }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
            this.init()
        })
    }

    init() { }
}