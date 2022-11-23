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
import { IndustryListComponent } from "./industry-list/industry-list.component"
import { IndustryInsertComponent } from "./industry-insert/industry-insert.component"
import { IndustryUpdateComponent } from "./industry-update/industry-update.component"
import { IndustryRouting } from "./industry.routing"
import { ReactiveFormsModule } from "@angular/forms"
import { ConfirmDialogModule } from "primeng/confirmdialog"

@NgModule({
    declarations: [
        IndustryListComponent, IndustryInsertComponent, IndustryUpdateComponent
    ],
    imports: [
        IndustryRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule, ReactiveFormsModule,
        ConfirmDialogModule
    ],
    exports: [
        IndustryListComponent, IndustryInsertComponent, IndustryUpdateComponent
    ]
})
export class IndustryModule { }
