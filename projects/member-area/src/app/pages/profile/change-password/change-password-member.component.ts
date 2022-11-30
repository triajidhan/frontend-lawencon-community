import { Component } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { MenuItem } from "primeng/api"
import { UserService } from "../../../service/user.service"

@Component({
    selector: 'change-password-member',
    templateUrl: './change-password-member.component.html'
})
export class ChangePasswordMemberComponent {
    items!: MenuItem[]

    changePassForm = this.fb.group({
        id: [''],
        pass: ['']
    })

    constructor(private fb: FormBuilder, private userService: UserService) { }


    ngOnInit() {
        this.items = [
            { label: 'Edit Profile', routerLink: '/profiles/member/edit/' },
            { label: 'Change Password', routerLink: '/profiles/member/change-password/' },
            { label: 'Log Out', routerLink: '/' }
        ]

    }
}