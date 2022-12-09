import { Component, OnDestroy, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { BASE_URL } from "projects/constant/base-url"
import { ApiService } from "projects/main-area/src/app/service/api.service"


@Component({
    selector: 'profile-list-admin',
    templateUrl: './profile-list-admin.component.html'
})
export class ProfileListAdminComponent implements OnInit, OnDestroy {
    id?: string | null
    name?: string | null
    roleCode?: string | null
    email?: string | null
    balances?: number | null
    profile?: string | null
    urlFile = `${BASE_URL.LOCALHOST}/files/download/`

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit(): void {
        if (this.apiService.getId()) {
            this.id = this.apiService.getId()
        }
        if (this.apiService.getName()) {
            this.name = this.apiService.getName()
        }
        if (this.apiService.getEmail()) {
            this.email = this.apiService.getEmail()
        }
        if (this.apiService.getRoleCode()) {
            this.roleCode = this.apiService.getRoleCode()
        }
        if (this.apiService.getPhotoId()) {
            this.profile = this.apiService.getPhotoId()
        }

        this.balances = this.apiService.getBalances()

    }

    changePass() {
        if (this.roleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin/change-password/" + this.id)
        } else {
            this.router.navigateByUrl("/profiles/admin/change-password/" + this.id)
        }
    }

    editProfile() {
        if (this.roleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin/edit/" + this.id)
        } else {
            this.router.navigateByUrl("/profiles/admin/edit/" + this.id)
        }
    }

    ngOnDestroy(): void { }
}
