import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityPaymentComponent } from "./activity-payment.component"

const routes: Routes = [
    {
        path: ':type',
        component: ActivityPaymentComponent
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
export class ActivityPaymentRouting { }