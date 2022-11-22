import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FooterMemberComponent } from "../footer/footer-member.component"
import { HeaderMemberModule } from "../header/header-member.module"
import { ContentMemberComponent } from "./content-member.component"

@NgModule({
    declarations: [
        ContentMemberComponent, FooterMemberComponent
    ],
    imports: [
        RouterModule, HeaderMemberModule
    ],
    exports: [
        ContentMemberComponent, FooterMemberComponent
    ]
})
export class ContentMemberModule { }