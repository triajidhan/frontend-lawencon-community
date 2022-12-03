import { NgModule } from "@angular/core";
import { CardModule } from "primeng/card";
import { AdminComponent } from "./admin/admin.component";
import { DashboardRouting } from "./dashboard.routing";
import { SuperAdminComponent } from "./super-admin/super-admin.component";

@NgModule({
    declarations: [
        SuperAdminComponent, AdminComponent
    ],
    imports: [
        DashboardRouting, CardModule
    ],
    exports: [
        SuperAdminComponent, AdminComponent
    ]
})
export class DashboardModule { }