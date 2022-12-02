import { Component } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'header-non-admin',
    templateUrl: './header-admin.component.html',
    styleUrls: ['../../../../styles.css']
})
export class HeaderAdminComponent {

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
                label: 'Article',
                routerLink: '/articles'
            },
            {
                label: 'Approve Payment',
                items: [
                    {
                        label: 'Subscribers',
                        icon: 'fa-solid fa-users',
                        routerLink: '/approve-subscriber-payments/approve-payments'
                    },
                    {
                        label: 'Activities',
                        icon: 'fa-solid fa-coins',
                        routerLink: '/approve-activity-payments/approve-payments'
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
                        routerLink: '/profiles/admin'
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