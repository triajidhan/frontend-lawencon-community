import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { UserInsertComponent } from "./user-insert/user-insert.component"
import { UserListComponent } from "./user-list/user-list.component"
import { UserUpdateComponent } from "./user-update/user-update.component"
import { UserRouting } from "./user.routing"
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TableModule } from 'primeng/table'
import { MenuModule } from 'primeng/menu'
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { ReactiveFormsModule } from "@angular/forms"
import { ImageModule } from "primeng/image"
import { PasswordModule } from "primeng/password"

@NgModule({
    declarations: [
        UserListComponent, UserInsertComponent, UserUpdateComponent
    ],
    imports: [
        UserRouting, ButtonModule, InputTextModule,
        CardModule, CommonModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, ConfirmDialogModule, ReactiveFormsModule,
        ImageModule, PasswordModule
    ],
    exports: [
        UserListComponent, UserInsertComponent, UserUpdateComponent
    ]
})
export class UserModule { }