import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'member-report',
    templateUrl: './member-report.component.html'
})
export class MemberReportComponent implements OnInit {
    positions!: any
    cols: any[] = []
    items!: MenuItem[]

    ngOnInit(): void {
        this.cols = [
            { field: "no", header: "No." },
            { field: "positionName", header: "Position Name" },
            { field: "positionCode", header: "Position Code" },
            { field: "isActive", header: "Is Active" },
            { field: "action", header: "Action" }
        ]
        this.positions =
            [
                {
                    positionName: "Administrator",
                    positionCode: "ADM",
                    isActive: "true",
                },
                {
                    positionName: "Frontend Development",
                    positionCode: "FRD",
                    isActive: "true",
                },
                {
                    positionName: "Trainer",
                    positionCode: "TRN",
                    isActive: "true",
                },
                {
                    positionName: "Human Resourch",
                    positionCode: "HRD",
                    isActive: "true",
                },
                {
                    positionName: "Backend Development",
                    positionCode: "BCD",
                    isActive: "true",
                },
            ]
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Position' }
        ]
    }
}