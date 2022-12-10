import { Component, OnDestroy, OnInit } from "@angular/core"
import { ConfirmationService, LazyLoadEvent, MenuItem, PrimeNGConfig } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { Article } from "projects/interface/article"
import { ArticleService } from "projects/main-area/src/app/service/article.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'article-list',
    templateUrl: './article-list.component.html',
    providers: [ConfirmationService]
})
export class ArticleListComponent implements OnInit, OnDestroy {
    items!: MenuItem[]
    data: any[] = []

    id!: number
    article!: Article
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true
    display: boolean = false
    resultExtension!: string
    resultFile !: string

    urlFile = `${BASE_URL.LOCALHOST}/files/download/`

    private getAllSubs?: Subscription
    private getByIdSubs?: Subscription
    private deleteSubs?: Subscription
    private contDataSubs?: Subscription

    constructor(private articleService: ArticleService, private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Home', routerLink: "/dashboard/admin" },
            { label: 'Article' }
        ]
    }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first, event.rows)
    }

    getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true
        this.startPage = startPage
        this.maxPage = maxPage


        this.getAllSubs = this.articleService.getByIsActive(startPage, maxPage).subscribe(
            result => {
                this.data = result
                this.loading = false

                this.contDataSubs = this.articleService.getTotalArticle().subscribe(result => {
                    this.totalData = result.countOfArticle
                })
            }
        )
    }

    getDeleteId(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this article?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.getByIdSubs = this.articleService.getById(id).subscribe(result => {
                    this.article = result
                    this.article.isActive = false

                    this.deleteSubs = this.articleService.update(this.article).subscribe(() => {
                        this.getData()
                    })
                })
            }
        })
    }

    fileUpload(event: any): void {
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

    ngOnDestroy(): void {
        this.getAllSubs?.unsubscribe()
        this.getByIdSubs?.unsubscribe()
        this.deleteSubs?.unsubscribe()
        this.contDataSubs?.unsubscribe()
    }
}
