import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeInsertComponent } from "./home-insert/home-insert.component"
import { HomeComponent } from "./home-list/home.component"
const routes: Routes = [
    {
        path: 'type/:type',
        component: HomeComponent
    },
    {
        path: 'new',
        component: HomeInsertComponent
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