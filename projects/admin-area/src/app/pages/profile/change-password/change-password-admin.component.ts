import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { ConfirmationService } from "primeng/api"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'change-password-admin',
    templateUrl: './change-password-admin.component.html',
    providers: [ConfirmationService]
})
export class ChangePasswordAdminComponent implements OnInit, OnDestroy {

    myId: string = ""
    myRoleCode: string = ""
    user: any = new Object()

    userUpdate: any = {
        id: '',
        pass: '',
        version: ''
    }

    inputPassForm = this.fb.group({
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    })

    private getByIdUserSubscription?: Subscription
    private editUserSubscription?: Subscription

    constructor(private fb: FormBuilder, private userService: UserService, private apiService: ApiService
        , private router: Router, private activatedRoute: ActivatedRoute, private toastrService: ToastrService,
        private confirmationService: ConfirmationService) { }


    ngOnInit() {
        this.myId = String(this.apiService.getId())
        this.myRoleCode = String(this.apiService.getRoleCode())

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

    back() {
        if (this.myRoleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin")
        } else {
            this.router.navigateByUrl("/profiles/admin")
        }
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
                        if (this.myRoleCode == "SA") {
                            this.router.navigateByUrl("/profiles/super-admin")
                        } else {
                            this.router.navigateByUrl("/profiles/admin")
                        }
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