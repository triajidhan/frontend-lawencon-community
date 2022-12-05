import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdminGuard } from "projects/main-area/src/app/guard/admin.guard"
import { SuperAdminGuard } from "projects/main-area/src/app/guard/super-admin.guard"
import { ContentAdminComponent } from "../../components/content/admin/content-admin.component"
import { ContentSuperAdminComponent } from "../../components/content/super-admin/content-super-admin.component"
import { AdminComponent } from "./admin/admin.component"
import { SuperAdminComponent } from "./super-admin/super-admin.component"

const routes: Routes = [
    {
        path: 'super-admin',
        component: ContentSuperAdminComponent,
        children: [
            {
                path: "",
                component: SuperAdminComponent
            }
        ],
        canActivate:[SuperAdminGuard]
    },
    {
        path: 'admin',
        component: ContentAdminComponent,
        children: [
            {
                path: "",
                component: AdminComponent,
            }
        ],
        canActivate:[AdminGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRouting { }