import { Component, OnInit } from "@angular/core"
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'header-member',
    templateUrl: './header-member.component.html',
    styleUrls: ['../../../styles.css']
})
export class HeaderMemberComponent implements OnInit {


    navMenus!: MenuItem[]

    profiles!: MenuItem[]

    ngOnInit() {
        this.profiles = [
            {
                items: [{
                    label: 'Profile',
                    icon: 'fa-solid fa-user',
                    routerLink: '/profiles/member'
                },
                {
                    label: 'Log Out',
                    icon: 'fa-solid fa-power-off',
                    routerLink: '/login/member'
                }
                ]
            }
        ]

        this.navMenus = [
            {
                label: 'Home',
                routerLink: '/homes/threads'

            },
            {
                label: 'Activity',
                routerLink: '/activities/all'
            },
            {
                label: 'Settings',
                styleClass: 'settings',
                items: [
                    {
                        label: 'Profile',
                        icon: 'fa-solid fa-user',
                        routerLink: '/profiles/member'
                    },
                    {
                        label: 'Log Out',
                        icon: 'fa-solid fa-power-off',
                        routerLink: '/login/member'
                    }
                ]
            }
        ]

    }

}