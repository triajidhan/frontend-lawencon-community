import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { InformationReportMemberComponent } from "./information-report-member.component"

const routes: Routes = [
    {
        path: '',
        component: InformationReportMemberComponent
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
export class InformationReportMemberRouting { }