import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "projects/main-area/src/app/service/api.service";
import { UserService } from "projects/main-area/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'change-password-admin',
    templateUrl: './change-password-admin.component.html'
})
export class ChangePasswordAdminComponent implements OnInit, OnDestroy {

    private getByIdUserSubscription!: Subscription
    private editUserSubscription!: Subscription

    user: any = new Object();
    roleCode: string | null = ""
    editProfileForm = this.fb.group({
        id: [''],
        pass: ['']
    })

    constructor(private fb: FormBuilder, private router: Router, private userService: UserService,
        private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.init()
    }

    init() {
        this.activatedRoute.params.subscribe(result => {
            this.getByIdUserSubscription = this.userService.getById(result['id']).subscribe(user => {
                this.user = user
                this.editProfileForm.controls['id'].setValue(result[`id`])
            })
        })
    }

    logOut() {
        this.apiService.logOut()
        this.router.navigateByUrl("/login/member")
    }

    back() {
        if (this.roleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin")
        } else if (this.roleCode == "A") {
            this.router.navigateByUrl("/profiles/admin")
        }
    }

    updateUser() {
        this.editUserSubscription = this.userService.update(this.editProfileForm.value).subscribe(() => {
            this.init()
        })

    }


    ngOnDestroy(): void {
        this.getByIdUserSubscription?.unsubscribe()
        this.editUserSubscription?.unsubscribe()
    }


}