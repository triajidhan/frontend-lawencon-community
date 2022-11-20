import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { UserInsertComponent } from "./user-insert/user-insert.component"
import { UserListComponent } from "./user-list/user-list.component"
import { UserUpdateComponent } from "./user-update/user-update.component"

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'new',
        component: UserInsertComponent
    },
    {
        path: 'edit/:id',
        component: UserUpdateComponent
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
export class UserRouting { }