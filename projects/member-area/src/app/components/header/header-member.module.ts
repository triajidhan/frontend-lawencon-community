import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { DialogModule } from "primeng/dialog"
import { FileUploadModule } from "primeng/fileupload"
import { InputTextModule } from "primeng/inputtext"
import { MenubarModule } from 'primeng/menubar'
import { StyleClassModule } from 'primeng/styleclass'
import { HeaderMemberComponent } from "./header-member.component"

@NgModule({
    declarations: [
        HeaderMemberComponent
    ],
    imports: [
        RouterModule, CommonModule,
        MenubarModule, StyleClassModule,
        DialogModule, ReactiveFormsModule,
        ButtonModule,
        InputTextModule, HttpClientModule,
        CardModule, FileUploadModule
    ],
    exports: [
        HeaderMemberComponent
    ]
})
export class HeaderMemberModule { }