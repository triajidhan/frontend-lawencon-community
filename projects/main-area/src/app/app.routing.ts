import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminAreaModule } from "projects/admin-area/src/app/admin-area.module";
import { adminAreaRoutes } from "projects/admin-area/src/app/admin-area.routing";
import { ContentModuleAdmin } from "projects/admin-area/src/app/components/content/content.module";
import { MemberAreaModule } from "projects/member-area/src/app/member-area.module";
import { memberAreaRoutes } from "projects/member-area/src/app/member-area.routing";
import { LoginComponent } from "./pages/login/login.component";

export const mainRoutes: Routes = [
    ...adminAreaRoutes,
    ...memberAreaRoutes,
    {
        path: "login/member",
        component: LoginComponent
    },
    {
        path: "login/admin",
        component: LoginComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(mainRoutes),
        AdminAreaModule, MemberAreaModule, ContentModuleAdmin
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }