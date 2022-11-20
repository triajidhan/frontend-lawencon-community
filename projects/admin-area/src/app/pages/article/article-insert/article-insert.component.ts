import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'article-insert',
    templateUrl: './article-insert.component.html'
})
export class ArticleInsertComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/admin' },
            { label: 'Article', routerLink: '/articles' },
            { label: 'Article Insert' }
        ]
    }
}