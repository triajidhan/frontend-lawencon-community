import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { BASE_URL } from "projects/constant/base-url"
import { ArticleService } from "projects/main-area/src/app/service/article.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['../../../../styles.css']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  article: any = new Object()
  resultExtension!: string
  resultFile !: string
  urlFile = `${BASE_URL.LOCALHOST}/files/download/`

  getByIdSubscription?: Subscription

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.activatedRoute.params.subscribe(id => {
      this.getByIdSubscription = this.articleService.getById(id['id']).subscribe(result => {
        this.article = result
      })
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
    this.getByIdSubscription?.unsubscribe()
  }

}
