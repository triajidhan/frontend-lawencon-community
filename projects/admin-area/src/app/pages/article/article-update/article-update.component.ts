import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { ConfirmationService, MenuItem } from "primeng/api"
import { ArticleService } from "projects/main-area/src/app/service/article.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'article-update',
  templateUrl: './article-update.component.html',
  providers: [ConfirmationService]
})
export class ArticleUpdateComponent implements OnInit, OnDestroy {
  items!: MenuItem[]
  resultExtension!: string
  resultFile !: string
  article: any = new Object()

  updateArticleForm = this.fb.group({
    id: [''],
    title: [''],
    contents: [''],
    file: this.fb.group({
      files: [''],
      ext: ['']
    })
  })

  private updateSubscription?: Subscription
  private getByIdSubscription?: Subscription

  constructor(private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.init()
  }

  init() {
    this.items = [
      { label: 'Home', routerLink: '/dashboard/admin' },
      { label: 'Article', routerLink: '/articles' },
      { label: 'Article Update' }
    ]

    this.activatedRoute.params.subscribe(id => {
      console.log(id);
      this.getByIdSubscription = this.articleService.getById(id['id']).subscribe(result => {
        console.log(result);
        this.article = result
        this.updateArticleForm.controls.title.setValue(result.title)
        this.updateArticleForm.controls.contents.setValue(result.contents)
        this.updateArticleForm.controls.id.setValue(result.id)
        this.updateArticleForm.patchValue({
          file: {
            files: result.file.files,
            ext: result.file.ext
          }
        })
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

  submitUpdate() {
    console.log(this.resultFile);
    if (this.resultFile) {
      this.updateArticleForm.patchValue({
        file: {
          files: this.resultFile,
          ext: this.resultExtension
        }
      })
    }
    this.updateSubscription = this.articleService.update(this.updateArticleForm.value).subscribe(() => {
      console.log("save")
      this.router.navigateByUrl(`/articles`)
    })
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe()
    this.getByIdSubscription?.unsubscribe()
  }
}
