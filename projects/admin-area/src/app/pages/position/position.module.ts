import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { PositionRouting } from "./position.routing"
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TableModule } from 'primeng/table'
import { PositionListComponent } from "./position-list/position-list.component"
import { PositionInsertComponent } from "./position-insert/position-insert.component"
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { PositionUpdateComponent } from "./position-update/position-update.component"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    declarations: [
        PositionListComponent, PositionInsertComponent, PositionUpdateComponent
    ],
    imports: [
        PositionRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        ConfirmDialogModule, ReactiveFormsModule
    ],
    exports: [
        PositionListComponent, PositionInsertComponent, PositionUpdateComponent
    ]
})
export class PositionModule { }