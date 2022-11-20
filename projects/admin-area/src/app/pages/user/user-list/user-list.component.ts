import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    users!: any
    cols: any[] = []
    items!: MenuItem[]
    sideBars!: MenuItem[]

    ngOnInit(): void {
        this.cols = [
            { field: "no", header: "No." },
            { field: "fullname", header: "Full Name" },
            { field: "email", header: "Email" },
            { field: "imgSrc", header: "Photo" },
            { field: "isActive", header: "Is Active" },
            { field: "action", header: "Action" }
        ]
        this.users =
            [
                {
                    fullName: "Vincensius",
                    email: "vincensius@email.com",
                    imgSrc: "../../../../assets/images/img (1).jpg",
                    isActive: "true",
                },
                {
                    fullName: "Gunawan",
                    email: "gunawan@email.com",
                    imgSrc: "../../../../assets/images/img (2).jpg",
                    isActive: "true",
                },
                {
                    fullName: "Agus",
                    email: "agus@email.com",
                    imgSrc: "../../../../assets/images/img (3).jpg",
                    isActive: "true",
                },
                {
                    fullName: "Priyono",
                    email: "priyono@email.com",
                    imgSrc: "../../../../assets/images/img (4).jpg",
                    isActive: "true",
                },
                {
                    fullName: "Marlita",
                    email: "marlita@email.com",
                    imgSrc: "../../../../assets/images/img (5).jpg",
                    isActive: "true",
                },
            ]
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Admin User' }
        ]

        this.sideBars = [
            {
                label: 'Master Data',
                items: [{
                    label: 'Users',
                    icon: 'fa-solid fa-users',
                    routerLink: './users'
                },
                {
                    label: 'Industries',
                    icon: 'fa-solid fa-industry',
                    routerLink: './industries'
                },
                {
                    label: 'Positions',
                    icon: 'fa-solid fa-briefcase',
                    routerLink: './positions'
                }
                ]
            },
            {
                label: 'Information Reports',
                title: 'start',
                items: [
                    {
                        label: 'Members',
                        icon: 'fa-solid fa-users',
                        routerLink: './member-information-reports/super-admin'
                    },
                    {
                        label: 'Incomes',
                        icon: 'fa-solid fa-coins',
                        routerLink: './income-information-reports/super-admin'
                    }
                ]
            }
        ]
    }
}