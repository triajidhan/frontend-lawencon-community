import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityInsertComponent } from "./activity-insert/activity-insert.component"
import { ActivityListComponent } from "./activity-list/activity-list.component"

const routes: Routes = [
    {
        path: 'type/:type',
        component: ActivityListComponent
    },
    {
        path: 'new',
        component: ActivityInsertComponent
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
export class ActivityRouting { }