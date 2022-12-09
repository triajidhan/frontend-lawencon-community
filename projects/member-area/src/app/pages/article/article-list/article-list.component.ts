import { Component, OnInit } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { ArticleService } from "projects/main-area/src/app/service/article.service"
import { FileService } from "projects/main-area/src/app/service/file.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['../../../../styles.css']
})
export class ArticleListComponent implements OnInit {

    startPosition = 0
    limit = 6
    items!: MenuItem[]
    type!: string
    article: any[] = []

    articleId?: string
    articleTitle?: string
    articleContents?: string

    resultExtension!: string
    resultFile !: string
    display: boolean = false

    urlFile = `${BASE_URL.LOCALHOST}/files/download/`

    paymentActivityForm = this.fb.group({
        net: [''],
        approve: [false],
        activity: this.fb.group({
            id: ['']
        }),
        file: this.fb.group({
            files: [''],
            ext: ['']
        })
    })

    private getAllActivitySubs?: Subscription
    private paymentActivityDetailSubs?: Subscription

    constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder,
        private activatedRoute: ActivatedRoute, private fileService: FileService,
        private articleService:ArticleService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

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
        this.getAllActivitySubs = this.articleService.getByIsActiveAndOrder(this.startPosition, this.limit, true).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.addData(result[i])
            }
        })
    }

    onScroll() {
        this.startPosition += this.limit
        this.init()
    }

    addData(article: any) {
        this.article.push(article)
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
        this.getAllActivitySubs?.unsubscribe()
        this.paymentActivityDetailSubs?.unsubscribe()
    }
}
