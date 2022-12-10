import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { finalize, Subscription } from "rxjs"
import { ROLE_CODE } from "../../constant/role-type"
import { ApiService } from "../../service/api.service"
import { UserService } from "../../service/user.service"

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../app.component.css'],
    providers: []
})
export class LoginComponent implements OnInit, OnDestroy {

    loadingLogin: boolean = false
    isAdmin: boolean = false

    private loginSubscription?: Subscription

    loginReq = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        pass: ['', [Validators.required]]
    })

    constructor(private userService: UserService,
        private apiService: ApiService, private router: Router,
        private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }


    ngOnInit(): void {
        if (this.activatedRoute.snapshot.url[1].path == 'admin') {
            this.isAdmin = true
        }
    }

    submit(): void {
        this.loadingLogin = true
        this.loginSubscription = this.userService.login(this.loginReq.value).pipe(finalize(() => this.loadingLogin = false)).subscribe(result => {
            this.apiService.saveData(result)
            if (result.role.roleCode == ROLE_CODE.MEMBER) {
                this.router.navigateByUrl("/homes/type/threads")
            } else if (result.role.roleCode == ROLE_CODE.ADMIN) {
                this.router.navigateByUrl("/dashboard/admin")
            } else if (result.role.roleCode == ROLE_CODE.SUPER_ADMIN) {
                this.router.navigateByUrl("/dashboard/super-admin")
            }
        })
    }

    ngOnDestroy(): void {
        this.loginSubscription?.unsubscribe()
    }
}
