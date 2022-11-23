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
export class ArticleInsertComponent implements OnInit,OnDestroy {
    items!: MenuItem[]
    insertSubscription!: Subscription

    insertArticleForm = this.formBuilder.group({
        title: ['', Validators.required],
        articleCode: ['', Validators.required],
        contents: ['', Validators.required],
        file: this.formBuilder.group({
            files: [''],
            ext : ['']
        })
    })

    constructor(private formBuilder: FormBuilder,
        private articleService: ArticleService,
        private router: Router) {}

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/admin' },
            { label: 'Article', routerLink: '/articles' },
            { label: 'Article Insert' }
        ]
    }

    fileUpload(event : any) : void {
        console.log(event.files[0])

        const toBase64 = (file : File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          if(typeof reader.result === "string") resolve(reader.result)
         
        }
        reader.onerror = error => reject(error)
    })
  
      toBase64(event.files[0]).then(result =>{
          const resulltStr = result.substring(result.indexOf(",")+1,result.length)
          const resultExtension = result.split(";")[0].split('/')[1]
            this.insertArticleForm.patchValue({
              file: {
                files: resulltStr,
                ext : resultExtension
              }
            });
          })
      }

    submitInsert(){
        this.insertSubscription = this.articleService.insert(this.insertArticleForm.value).subscribe(()=>{
            console.log("save")
          this.router.navigateByUrl(`/articles`)
        })
    }

    ngOnDestroy(): void {
        this.insertSubscription.unsubscribe();
      }
}