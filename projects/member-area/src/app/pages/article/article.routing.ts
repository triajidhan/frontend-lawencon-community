import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ArticleListComponent } from "./article-list/article-list.component"

const routes: Routes = [
    {
        path: '',
        component: ArticleListComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticleRouting { }