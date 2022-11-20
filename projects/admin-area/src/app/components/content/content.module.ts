import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FooterComponent } from "../footer/footer.component"
import { HeaderModule } from "../header/header.module"
import { ContentAdminComponent } from "./admin/content-admin.component"
import { ContentSuperAdminComponent } from "./super-admin/content-super-admin.component"

@NgModule({
    declarations: [
        ContentAdminComponent, ContentSuperAdminComponent, FooterComponent
    ],
    imports: [
        RouterModule, HeaderModule
    ],
    exports: [
        ContentAdminComponent, ContentSuperAdminComponent, FooterComponent
    ]
})
export class ContentModuleAdmin { }