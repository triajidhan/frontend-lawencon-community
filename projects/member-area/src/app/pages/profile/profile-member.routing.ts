import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ContentMemberComponent } from "../../components/content/content-member.component"
import { ChangePasswordMemberComponent } from "./change-password/change-password-member.component"
import { EditProfileMemberComponent } from "./edit-profile/edit-profile-member.component"
import { ProfileListMemberComponent } from "./profile-list/profile-list-member.component"
const routes: Routes = [
    {
        path: 'member',
        children: [
            {
                path: "",
                component: ProfileListMemberComponent
            },
            {
                path: 'change-password/:id',
                component: ChangePasswordMemberComponent
            },
            {
                path: 'edit/:id',
                component: EditProfileMemberComponent
            }
        ]
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
export class ProfileMemberRouting { }
