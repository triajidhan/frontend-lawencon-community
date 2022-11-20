import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { PositionInsertComponent } from "./position-insert/position-insert.component"
import { PositionListComponent } from "./position-list/position-list.component"
import { PositionUpdateComponent } from "./position-update/position-update.component"

const routes: Routes = [
    {
        path: '',
        component: PositionListComponent
    },
    {
        path: 'new',
        component: PositionInsertComponent
    },
    {
        path: 'edit/:id',
        component: PositionUpdateComponent
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
export class PositionRouting { }