import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'activity-payment',
    templateUrl: './activity-payment.component.html'
})
export class ActivityPaymentComponent implements OnInit {
    activities!: any
    items!: MenuItem[]
    sideBars!: MenuItem[]

    ngOnInit(): void {
        this.activities =
            [
                {
                    fullName: "Rifki Dzaky",
                    type: 'Event',
                    title: 'Leadership Seminar'
                },
                {
                    fullName: "Irwansyah",
                    type: 'Course',
                    title: 'Java Basic'
                },
                {
                    fullName: "Tri Aji",
                    type: 'Event',
                    title: 'Programming Seminar'
                }
            ]
        this.items = [
            { label: 'Home', routerLink: "/dashboard/admin" },
            { label: 'Member Activity Payment' }
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