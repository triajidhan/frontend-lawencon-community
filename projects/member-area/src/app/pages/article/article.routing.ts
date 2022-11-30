import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ArticleDetailComponent } from "./article-detail/article-detail.component"
import { ArticleListComponent } from "./article-list/article-list.component"

const routes: Routes = [
    {
        path: '',
        component: ArticleListComponent
    },
    {
        path: 'details/:id',
        component: ArticleDetailComponent
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