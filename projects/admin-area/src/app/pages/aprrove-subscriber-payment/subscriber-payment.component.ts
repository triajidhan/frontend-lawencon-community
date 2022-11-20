import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'subscriber-payment',
    templateUrl: './subscriber-payment.component.html'
})
export class SubscriberPaymentComponent implements OnInit {
    activities!: any
    items!: MenuItem[]
    sideBars!: MenuItem[]

    ngOnInit(): void {

        this.activities =
            [
                {
                    fullName: "Rifki Dzaky",
                },
                {
                    fullName: "Irwansyah",
                },
                {
                    fullName: "Tri Aji",
                }
            ]
        this.items = [
            { label: 'Home', routerLink: "/dashboard/admin" },
            { label: 'Member Subscriber Payment' }
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