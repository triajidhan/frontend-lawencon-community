import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { InformationReportMemberAdminComponent } from "./information-report-member-admin.component"

const routes: Routes = [
    {
        path: '',
        component: InformationReportMemberAdminComponent
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
export class InformationReportMemberAdminRouting { }