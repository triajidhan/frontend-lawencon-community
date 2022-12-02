import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { SubscriberPaymentComponent } from "./subscriber-payment.component"

const routes: Routes = [
    {
        path: ':type',
        component: SubscriberPaymentComponent
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
export class SubscriberPaymentRouting { }