import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BreadcrumbModule } from "primeng/breadcrumb"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { FileUploadModule } from "primeng/fileupload"
import { InputTextModule } from "primeng/inputtext"
import { InputTextareaModule } from "primeng/inputtextarea"
import { MenuModule } from "primeng/menu"
import { TableModule } from "primeng/table"
import { TabMenuModule } from "primeng/tabmenu"
import { ChangePasswordAdminComponent } from "./change-password/change-password-admin.component"
import { EditProfileAdminComponent } from "./edit-profile/edit-profile-admin.component"
import { ProfileAdminRouting } from "./profile-admin.routing"
import { ProfileListAdminComponent } from "./profile-list/profile-list-admin.component"
import { PanelMenuModule } from 'primeng/panelmenu'
import { DropdownModule } from "primeng/dropdown"
import { ImageModule } from "primeng/image"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { PasswordModule } from "primeng/password"

@NgModule({
    declarations: [
        ProfileListAdminComponent, EditProfileAdminComponent, ChangePasswordAdminComponent
    ],
    imports: [
        ProfileAdminRouting, CommonModule, FormsModule,
        ButtonModule, InputTextModule,
        CardModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, TabMenuModule, PanelMenuModule,
        ReactiveFormsModule, DropdownModule, ImageModule,
        ConfirmDialogModule, PasswordModule
    ],
    exports: [
        ProfileListAdminComponent, EditProfileAdminComponent, ChangePasswordAdminComponent
    ]
})
export class ProfileAdminModule { }
