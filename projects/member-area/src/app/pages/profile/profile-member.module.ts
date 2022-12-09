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
import { PanelMenuModule } from 'primeng/panelmenu'
import { DropdownModule } from "primeng/dropdown"
import { ProfileListMemberComponent } from "./profile-list/profile-list-member.component"
import { EditProfileMemberComponent } from "./edit-profile/edit-profile-member.component"
import { ChangePasswordMemberComponent } from "./change-password/change-password-member.component"
import { ProfileMemberRouting } from "./profile-member.routing"
import { DialogModule } from "primeng/dialog"
import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { StyleClassModule } from "primeng/styleclass"
import { ImageModule } from "primeng/image"
import { GalleriaModule } from "primeng/galleria"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { TimeAgoModule } from "projects/main-area/src/app/module/times-ago.mudule"
import { PasswordModule } from 'primeng/password'

@NgModule({
    declarations: [
        ProfileListMemberComponent, EditProfileMemberComponent, ChangePasswordMemberComponent
    ],
    imports: [
        ProfileMemberRouting, CommonModule, FormsModule,
        ButtonModule, InputTextModule,
        CardModule, BreadcrumbModule,
        InputTextareaModule, TableModule,
        FileUploadModule, HttpClientModule,
        MenuModule, TabMenuModule, PanelMenuModule,
        ReactiveFormsModule, DropdownModule, DialogModule,
        InfiniteScrollModule, StyleClassModule, ImageModule,
        GalleriaModule, ConfirmDialogModule, TimeAgoModule,
        PasswordModule
    ],
    exports: [
        ProfileListMemberComponent, EditProfileMemberComponent, ChangePasswordMemberComponent
    ]
})
export class ProfileMemberModule { }
