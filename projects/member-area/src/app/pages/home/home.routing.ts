import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeDetailComponent } from "./home-detail/home-detail.component"
import { HomeInsertComponent } from "./home-insert/home-insert.component"
import { HomeComponent } from "./home-list/home.component"
const routes: Routes = [
    {
        path: 'type/:type',
        component: HomeComponent
    },
    {
        path: ':type/new',
        component: HomeInsertComponent
    },
    {
        path: 'details/:id',
        component: HomeDetailComponent
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
export class HomeRouting { }
