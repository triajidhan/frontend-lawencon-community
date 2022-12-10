import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { ApiService } from "projects/main-area/src/app/service/api.service"

@Component({
    selector: 'header-non-admin',
    templateUrl: './header-admin.component.html',
    styleUrls: ['../../../../styles.css']
})
export class HeaderAdminComponent {

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
                label: 'Article',
                routerLink: '/articles/admin'
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