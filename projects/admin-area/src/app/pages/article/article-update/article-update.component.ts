import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'article-update',
    templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/admin' },
            { label: 'Article', routerLink: '/articles' },
            { label: 'Article Update' }
        ]
    }
}