import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'thread',
    templateUrl: './thread.component.html',
    styleUrls: ['../../../styles.css']
})
export class ThreadComponent implements OnInit {

    items!: MenuItem[]

    ngOnInit(): void {

        this.items = [
            { label: 'Thread', routerLink: '/threads' },
            { label: 'Likes', routerLink: '/likes' },
            { label: 'Bookmark', routerLink: '/bookmarks' }
        ]
    }
}