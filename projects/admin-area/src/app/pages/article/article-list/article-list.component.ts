import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
    articles!: any
    cols: any[] = []
    items!: MenuItem[]
    sideBars!: MenuItem[]

    ngOnInit(): void {
        this.cols = [
            { field: "no", header: "No." },
            { field: "title", header: "Title" },
            { field: "articleCode", header: "Article Code" },
            { field: "contents", header: "Contens" },
            { field: "file", header: "Photo" },
            { field: "isActive", header: "Is Active" },
            { field: "action", header: "Action" }
        ]
        this.articles =
            [
                {
                    title: "Kucing",
                    articleCode: "KCG",
                    contents: "Kucing adalah hewan berkaki 4",
                    file: "../../../../assets/images/img (1).jpg",
                    isActive: "true",
                },
                {
                    title: "Kucing",
                    articleCode: "KCG",
                    contents: "Kucing adalah hewan berkaki 4",
                    file: "../../../../assets/images/img (1).jpg",
                    isActive: "true",
                },
                {
                    title: "Kucing",
                    articleCode: "KCG",
                    contents: "Kucing adalah hewan berkaki 4",
                    file: "../../../../assets/images/img (1).jpg",
                    isActive: "true",
                },
                {
                    title: "Kucing",
                    articleCode: "KCG",
                    contents: "Kucing adalah hewan berkaki 4",
                    file: "../../../../assets/images/img (1).jpg",
                    isActive: "true",
                },
                {
                    title: "Kucing",
                    articleCode: "KCG",
                    contents: "Kucing adalah hewan berkaki 4",
                    file: "../../../../assets/images/img (1).jpg",
                    isActive: "true",
                }
            ]
        this.items = [
            { label: 'Home', routerLink: "/dashboard/admin" },
            { label: 'Article' }
        ]

        this.sideBars = [
            {
                label: 'Master Data',
                items: [{
                    label: 'Users',
                    icon: 'fa-solid fa-users',
                    routerLink: './users'
                },
                {
                    label: 'Industries',
                    icon: 'fa-solid fa-industry',
                    routerLink: './industries'
                },
                {
                    label: 'Positions',
                    icon: 'fa-solid fa-briefcase',
                    routerLink: './positions'
                }
                ]
            },
            {
                label: 'Information Reports',
                title: 'start',
                items: [
                    {
                        label: 'Members',
                        icon: 'fa-solid fa-users',
                        routerLink: './member-information-reports/super-admin'
                    },
                    {
                        label: 'Incomes',
                        icon: 'fa-solid fa-coins',
                        routerLink: './income-information-reports/super-admin'
                    }
                ]
            }
        ]
    }
}