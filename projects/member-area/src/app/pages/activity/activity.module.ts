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
import { ActivityRouting } from "./activity.routing"
import { TabMenuModule } from 'primeng/tabmenu'
import { ActivityListComponent } from "./activity-list/activity-list.component"
import { ActivityInsertComponent } from "./activity-insert/activity-insert.component"
import { ReactiveFormsModule } from "@angular/forms"
import { CalendarModule } from "primeng/calendar"
import { DropdownModule } from "primeng/dropdown"
import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { DialogModule } from "primeng/dialog"
import { PanelMenuModule } from 'primeng/panelmenu'
import { ImageModule } from "primeng/image"
import { TimeAgoModule } from "projects/main-area/src/app/module/times-ago.mudule"
import {InputNumberModule} from 'primeng/inputnumber'

@NgModule({
    declarations: [
        ActivityListComponent, ActivityInsertComponent
    ],
    imports: [
        ActivityRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, TabMenuModule, ReactiveFormsModule,
        CalendarModule, DropdownModule, InfiniteScrollModule,
        DialogModule, PanelMenuModule, ImageModule, TimeAgoModule,
        InputNumberModule
    ],
    exports: [
        ActivityListComponent, ActivityInsertComponent
    ]
})
export class ActivityModule { }
