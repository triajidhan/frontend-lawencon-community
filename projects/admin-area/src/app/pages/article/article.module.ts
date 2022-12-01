import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { ArticleRouting } from "./article.routing"
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TableModule } from 'primeng/table'
import { MenuModule } from 'primeng/menu'
import { ArticleUpdateComponent } from "./article-update/article-update.component"
import { ArticleInsertComponent } from "./article-insert/article-insert.component"
import { ArticleListComponent } from "./article-list/article-list.component"
import { ReactiveFormsModule } from "@angular/forms"
import { ImageModule } from "primeng/image"
import { ConfirmDialogModule } from "primeng/confirmdialog"

@NgModule({
    declarations: [
        ArticleListComponent, ArticleInsertComponent, ArticleUpdateComponent
    ],
    imports: [
        ArticleRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, ReactiveFormsModule, ImageModule,
        ConfirmDialogModule
    ],
    exports: [
        ArticleListComponent, ArticleInsertComponent, ArticleUpdateComponent
    ]
})
export class ArticleModule { }