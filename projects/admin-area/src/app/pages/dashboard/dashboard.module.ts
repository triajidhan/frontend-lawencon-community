import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin/admin.component";
import { DashboardRouting } from "./dashboard.routing";
import { SuperAdminComponent } from "./super-admin/super-admin.component";

@NgModule({
    declarations: [
        SuperAdminComponent, AdminComponent
    ],
    imports: [
        DashboardRouting
    ],
    exports: [
        SuperAdminComponent, AdminComponent
    ]
})
export class DashboardModule { }