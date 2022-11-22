import { Component, OnInit } from "@angular/core"
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'header-super-admin',
    templateUrl: './header-super-admin.component.html',
    styleUrls: ['../../../../styles.css']
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
                    routerLink: '/profiles/super-admin'
                },
                {
                    label: 'Log Out',
                    icon: 'fa-solid fa-power-off',
                    routerLink: '/login/admin'
                }
                ]
            }
        ]

        this.navMenus = [
            {
                label: 'Master Data',
                items: [{
                    label: 'User',
                    icon: 'fa-solid fa-users',
                    routerLink: '/users'
                },
                {
                    label: 'Industry',
                    icon: 'fa-solid fa-industry',
                    routerLink: '/industries'
                },
                {
                    label: 'Position',
                    icon: 'fa-solid fa-briefcase',
                    routerLink: '/positions'
                }
                ]
            },
            {
                label: 'Information Report',
                items: [
                    {
                        label: 'Member',
                        icon: 'fa-solid fa-users',
                        routerLink: '/member-information-reports/super-admin'
                    },
                    {
                        label: 'Income',
                        icon: 'fa-solid fa-coins',
                        routerLink: '/income-information-reports/super-admin'
                    }
                ]
            },
            {
                label: 'Settings',
                styleClass: 'settings',
                items: [
                    {
                        label: 'Profile',
                        icon: 'fa-solid fa-user',
                        routerLink: '/profiles/super-admin'
                    },
                    {
                        label: 'Log Out',
                        icon: 'fa-solid fa-power-off',
                        routerLink: '/login/admin'
                    }
                ]
            }
        ]

    }

}