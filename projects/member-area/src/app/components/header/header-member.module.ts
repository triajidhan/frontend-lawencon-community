import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { MenubarModule } from 'primeng/menubar'
import { StyleClassModule } from 'primeng/styleclass'
import { HeaderMemberComponent } from "./header-member.component"

@NgModule({
    declarations: [
        HeaderMemberComponent
    ],
    imports: [
        RouterModule, CommonModule, MenubarModule, StyleClassModule
    ],
    exports: [
        HeaderMemberComponent
    ]
})
export class HeaderMemberModule { }