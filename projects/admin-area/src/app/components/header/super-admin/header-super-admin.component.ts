import { Component, OnInit } from "@angular/core"
import { MenuItem } from 'primeng/api'

const BASE_URL: string = 'http://localhost:8080'

@Component({
    selector: 'header-super-admin',
    templateUrl: './header-super-admin.component.html',
    styleUrls: ['./header-super-admin.component.css']
})
export class HeaderSuperAdminComponent implements OnInit {


    navMenus!: MenuItem[]

    profiles!: MenuItem[]

    ngOnInit() {
        this.profiles = [
            {
                items: [{
                    label: 'Profile',
                    icon: 'fa-solid fa-user',
                    routerLink: './profiles/super-admin'
                },
                {
                    label: 'Log Out',
                    icon: 'fa-solid fa-power-off',
                    routerLink: './login/admin'
                }
                ]
            }
        ]

        this.navMenus = [
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