import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { InformationReportIncomeComponent } from "./information-report-income.component"

const routes: Routes = [
    {
        path: '',
        component: InformationReportIncomeComponent
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
export class InformationReportIncomeRouting { }