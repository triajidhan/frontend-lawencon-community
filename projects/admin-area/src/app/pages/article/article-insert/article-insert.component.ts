import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { ArticleService } from "projects/main-area/src/app/service/article.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'article-insert',
  templateUrl: './article-insert.component.html'
})
export class ArticleInsertComponent implements OnInit, OnDestroy {
  items!: MenuItem[]
  resultExtension!: string
  resultFile !: string

  insertArticleForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    contents: ['', Validators.required],
    file: this.formBuilder.group({
      files: [''],
      ext: ['']
    })
  })

  private insertSubscription?: Subscription

  constructor(private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Home', routerLink: '/dashboard/admin' },
      { label: 'Article', routerLink: '/articles/admin' },
      { label: 'Article Insert' }
    ]
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

  submitInsert() {
    this.insertArticleForm.patchValue({
      file: {
        files: this.resultFile,
        ext: this.resultExtension
      }
    });
    this.insertSubscription = this.articleService.insert(this.insertArticleForm.value).subscribe(() => {
      this.router.navigateByUrl(`/articles/admin`)
    })
  }

  ngOnDestroy(): void {
    this.insertSubscription?.unsubscribe();
  }
}