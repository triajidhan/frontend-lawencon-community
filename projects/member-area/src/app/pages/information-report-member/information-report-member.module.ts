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
import { InformationReportMemberComponent } from "./information-report-member.component"
import { InformationReportMemberRouting } from "./information-report-member.routing"
import { CalendarModule } from 'primeng/calendar'
import { FormsModule } from "@angular/forms"

@NgModule({
    declarations: [
        InformationReportMemberComponent
    ],
    imports: [
        InformationReportMemberRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, CalendarModule, FormsModule
    ],
    exports: [
        InformationReportMemberComponent
    ]
})
export class InformationReportMemberModule { }