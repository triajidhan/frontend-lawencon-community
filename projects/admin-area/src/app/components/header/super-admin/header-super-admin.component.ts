import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { MenuItem } from 'primeng/api'
import { BASE_URL } from "projects/constant/base-url"
import { ApiService } from "projects/main-area/src/app/service/api.service"

@Component({
    selector: 'header-super-admin',
    templateUrl: './header-super-admin.component.html',
    styleUrls: ['../../../../styles.css']
})
export class HeaderSuperAdminComponent implements OnInit {

    myProfile?: string
    navMenus!: MenuItem[]
    profiles!: MenuItem[]
    urlFile = `${BASE_URL.LOCALHOST}/files/download/`

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        if (this.apiService.getPhotoId()) {
            this.myProfile = String(this.apiService.getPhotoId())
        }

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
                    label: 'Admin User',
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
                        command: () => this.logOut()
                    }
                ]
            }
        ]
    }

    logOut() {
        this.apiService.logOut()
        this.router.navigateByUrl("/login/admin")
    }

}