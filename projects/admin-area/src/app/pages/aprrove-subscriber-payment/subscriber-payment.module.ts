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
import { SubscriberPaymentComponent } from "./subscriber-payment.component"
import { SubscriberPaymentRouting } from "./subscriber-payment.routing"
import { TabMenuModule } from "primeng/tabmenu"

@NgModule({
    declarations: [
        SubscriberPaymentComponent
    ],
    imports: [
        SubscriberPaymentRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, TabMenuModule
    ],
    exports: [
        SubscriberPaymentComponent
    ]
})
export class SubscriberPaymentModule { }