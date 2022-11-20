import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { HeaderAdminComponent } from "./admin/header-admin.component"
import { HeaderSuperAdminComponent } from "./super-admin/header-super-admin.component"
import { MenubarModule } from 'primeng/menubar'

@NgModule({
    declarations: [
        HeaderAdminComponent, HeaderSuperAdminComponent
    ],
    imports: [
        RouterModule, CommonModule, MenubarModule
    ],
    exports: [
        HeaderAdminComponent, HeaderSuperAdminComponent
    ]
})
export class HeaderModule { }