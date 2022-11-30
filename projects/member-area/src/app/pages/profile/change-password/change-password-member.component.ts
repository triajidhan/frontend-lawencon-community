import { Component } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { MenuItem } from "primeng/api"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { UserService } from "../../../service/user.service"

@Component({
    selector: 'change-password-member',
    templateUrl: './change-password-member.component.html'
})
export class ChangePasswordMemberComponent {
    myId: string = ""
    items!: MenuItem[]

    changePassForm = this.fb.group({
        id: [''],
        pass: ['']
    })

    constructor(private fb: FormBuilder, private userService: UserService, private apiService: ApiService) { }


    ngOnInit() {
        this.myId = String(this.apiService.getId())

        this.items = [
            { label: 'Edit Profile', routerLink: '/profiles/member/edit/' + this.myId },
            { label: 'Change Password', routerLink: '/profiles/member/change-password/' + this.myId },
            { label: 'Log Out', routerLink: '/' }
        ]

    }
}