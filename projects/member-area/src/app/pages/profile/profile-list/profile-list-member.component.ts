import { Component, OnDestroy, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ApiService } from "projects/main-area/src/app/service/api.service"

const BASE_URL: string = 'http://localhost:8080'

@Component({
    selector: 'profile-list-member',
    templateUrl: './profile-list-member.component.html'
})
export class ProfileListMemberComponent implements OnInit, OnDestroy {
    id?: string | null
    name?: string | null
    roleName?: string | null
    roleCode?: string | null
    email?: string | null
    photoId?: number | null
    fileDownload = `${BASE_URL}/files/download/`

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
        if (this.apiService.getRoleName()) {
            this.roleName = this.apiService.getRoleName()
        }
        if (this.apiService.getRoleCode()) {
            this.roleCode = this.apiService.getRoleCode()
        }
        if (this.apiService.getPhotoId()) {
            this.photoId = this.apiService.getPhotoId()
        }
    }

    changePass() {
        if (this.roleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin/change-password/" + this.id)
        } else if (this.roleCode == "A") {
            this.router.navigateByUrl("/profiles/admin/change-password/" + this.id)
        } else {
            this.router.navigateByUrl("/profiles/admin/change-password/" + this.id)
        }
    }

    editProfile() {
        if (this.roleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin/edit/" + this.id)
        } else if (this.roleCode == "A") {
            this.router.navigateByUrl("/profiles/admin/edit/" + this.id)
        } else {
            this.router.navigateByUrl("/profiles/admin/edit/" + this.id)
        }
    }

    ngOnDestroy(): void { }
}