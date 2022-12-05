import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdminGuard } from "projects/main-area/src/app/guard/admin.guard"
import { SuperAdminGuard } from "projects/main-area/src/app/guard/super-admin.guard"
import { ContentAdminComponent } from "../../components/content/admin/content-admin.component"
import { ContentSuperAdminComponent } from "../../components/content/super-admin/content-super-admin.component"
import { ChangePasswordAdminComponent } from "./change-password/change-password-admin.component"
import { EditProfileAdminComponent } from "./edit-profile/edit-profile-admin.component"
import { ProfileListAdminComponent } from "./profile-list/profile-list-admin.component"
const routes: Routes = [
    {
        path: 'super-admin',
        component: ContentSuperAdminComponent,
        children: [
            {
                path: "",
                component: ProfileListAdminComponent
            },
            {
                path: 'change-password/:id',
                component: ChangePasswordAdminComponent
            },
            {
                path: 'edit/:id',
                component: EditProfileAdminComponent
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
                component: ProfileListAdminComponent
            },
            {
                path: 'change-password/:id',
                component: ChangePasswordAdminComponent
            },
            {
                path: 'edit/:id',
                component: EditProfileAdminComponent
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
export class ProfileAdminRouting { }
