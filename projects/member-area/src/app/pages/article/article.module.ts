import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TableModule } from 'primeng/table'
import { MenuModule } from 'primeng/menu'
import { ArticleRouting } from "./article.routing"
import { TabMenuModule } from 'primeng/tabmenu'
import { ReactiveFormsModule } from "@angular/forms"
import { CalendarModule } from "primeng/calendar"
import { DropdownModule } from "primeng/dropdown"
import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { DialogModule } from "primeng/dialog"
import { ArticleListComponent } from "./article-list/article-list.component"

@NgModule({
    declarations: [
        ArticleListComponent
    ],
    imports: [
        ArticleRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, TabMenuModule, ReactiveFormsModule,
        CalendarModule, DropdownModule, InfiniteScrollModule,
        DialogModule
    ],
    exports: [
        ArticleListComponent
    ]
})
export class ArticleModule { }