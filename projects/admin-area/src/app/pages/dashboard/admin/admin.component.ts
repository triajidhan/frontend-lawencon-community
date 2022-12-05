import { Component, OnDestroy, OnInit } from "@angular/core"
import { ArticleService } from "projects/main-area/src/app/service/article.service"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.conmponent.html'
})
export class AdminComponent implements OnDestroy, OnInit {
    fullName!: string
    totalArticle!: number

    private articleGetCountSubscription?: Subscription

    constructor(private articleService: ArticleService,
        private apiService: ApiService) { }

    ngOnInit(): void {
        this.fullName = String(this.apiService.getName())

        this.articleGetCountSubscription = this.articleService.getTotalArticle().subscribe(result => {
            this.totalArticle = result.countOfArticle
        })
    }

    ngOnDestroy(): void {
        this.articleGetCountSubscription?.unsubscribe()
    }

}