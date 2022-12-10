import { Component } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { ConfirmationService, MenuItem } from "primeng/api"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { Subscription } from "rxjs"
import { UserService } from "projects/main-area/src/app/service/user.service"

@Component({
    selector: 'change-password-member',
    templateUrl: './change-password-member.component.html',
    providers: [ConfirmationService]
})
export class ChangePasswordMemberComponent {
    myId: string = ""
    items!: MenuItem[]
    user: any = new Object()

    userUpdate: any = {
        id: '',
        pass: '',
        version: ''
    }

    inputPassForm = this.fb.group({
        newPassword: [''],
        confirmPassword: ['']
    })

    private getByIdUserSubscription?: Subscription
    private editUserSubscription?: Subscription

    constructor(private fb: FormBuilder, private userService: UserService, private apiService: ApiService
        , private router: Router, private activatedRoute: ActivatedRoute, private toastrService: ToastrService,
        private confirmationService: ConfirmationService) { }


    ngOnInit() {
        this.myId = String(this.apiService.getId())

        this.items = [
            { label: 'Edit Profile', routerLink: '/profiles/member/edit/' + this.myId },
            { label: 'Change Password', routerLink: '/profiles/member/change-password/' + this.myId },
            { label: 'Log Out', command: () => this.apiService.logOut(), routerLink: '/' }
        ]
        this.init()
    }

    init() {
        this.activatedRoute.params.subscribe(result => {
            this.getByIdUserSubscription = this.userService.getById(result['id']).subscribe(user => {
                this.user = user
                this.userUpdate.id = result[`id`]
            })
        })
    }

    showPopUpUpdate() {
        if (this.inputPassForm.value.newPassword != this.inputPassForm.value.confirmPassword) {
            this.toastrService.warning('new password and confirmation passsword area not the same')
        } else {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to change your password?',
                header: 'Change Password Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.userUpdate.pass = this.inputPassForm.value.newPassword
                    this.editUserSubscription = this.userService.update(this.userUpdate).subscribe(() => {
                        this.router.navigateByUrl("/profiles/member")
                    })
                }
            })
        }
    }

    ngOnDestroy(): void {
        this.getByIdUserSubscription?.unsubscribe()
        this.editUserSubscription?.unsubscribe()
    }

}