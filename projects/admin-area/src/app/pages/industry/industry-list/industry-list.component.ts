import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'industry-list',
    templateUrl: './industry-list.component.html'
})
export class IndustryListComponent implements OnInit {
    industries!: any
    cols: any[] = []
    items!: MenuItem[]

    ngOnInit(): void {
        this.cols = [
            { field: "no", header: "No." },
            { field: "industryName", header: "Industry Name" },
            { field: "industryCode", header: "Industry Code" },
            { field: "isActive", header: "Is Active" },
            { field: "action", header: "Action" }
        ]
        this.industries =
            [
                {
                    industryName: "Start Up",
                    industryCode: "STU",
                    isActive: "true",
                },
                {
                    industryName: "Corporated",
                    industryCode: "COR",
                    isActive: "true",
                },
                {
                    industryName: "Information Technology",
                    industryCode: "ITY",
                    isActive: "true",
                },
                {
                    industryName: "Food Industry",
                    industryCode: "FIY",
                    isActive: "true",
                },
                {
                    industryName: "Electronic",
                    industryCode: "ELC",
                    isActive: "true",
                },
            ]
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Industry' }
        ]
    }
}