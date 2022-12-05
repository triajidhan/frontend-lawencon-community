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
import { TabMenuModule } from 'primeng/tabmenu'
import { HomeRouting } from "./home.routing"
import { DialogModule } from "primeng/dialog"
import { ReactiveFormsModule } from "@angular/forms"
import { DropdownModule } from "primeng/dropdown"
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { HomeComponent } from "./home-list/home.component"
import { HomeInsertComponent } from "./home-insert/home-insert.component"
import { StyleClassModule } from "primeng/styleclass"
import { HomeDetailComponent } from "./home-detail/home-detail.component"
import { CarouselModule } from 'primeng/carousel'
import { ImageModule } from 'primeng/image'
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { GalleriaModule } from 'primeng/galleria'
import { TimeAgoModule } from "projects/main-area/src/app/module/times-ago.mudule"

@NgModule({
    declarations: [
        HomeComponent, HomeInsertComponent, HomeDetailComponent
    ],
    imports: [
        HomeRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, TabMenuModule, DialogModule,
        ReactiveFormsModule, DropdownModule,
        InfiniteScrollModule, StyleClassModule,
        CarouselModule, ImageModule, ConfirmDialogModule,
        GalleriaModule, TimeAgoModule
    ],
    exports: [
        HomeComponent, HomeInsertComponent, HomeDetailComponent
    ]
})
export class HomeModule { }