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
import { ActivityPaymentComponent } from "./activity-payment.component"
import { ActivityPaymentRouting } from "./activity-payment.routing"
import {TabMenuModule} from 'primeng/tabmenu'

@NgModule({
    declarations: [
        ActivityPaymentComponent
    ],
    imports: [
        ActivityPaymentRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, TabMenuModule
    ],
    exports: [
        ActivityPaymentComponent
    ]
})
export class ActivityPaymentModule { }