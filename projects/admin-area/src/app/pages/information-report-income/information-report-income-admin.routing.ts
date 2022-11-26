import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { InformationReportIncomeAdminComponent } from "./information-report-income-admin.component"

const routes: Routes = [
    {
        path: '',
        component: InformationReportIncomeAdminComponent
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
export class InformationReportIncomeAdminRouting { }