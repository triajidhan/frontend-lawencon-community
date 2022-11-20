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
import { MemberReportComponent } from "./member-report.component"
import { MemberReportRouting } from "./member-report.routing"

@NgModule({
    declarations: [
        MemberReportComponent
    ],
    imports: [
        MemberReportRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule
    ],
    exports: [
        MemberReportComponent
    ]
})
export class MemberReportModule { }