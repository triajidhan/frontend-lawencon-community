import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { Subscription } from "rxjs"
import { ApiService } from "../../service/api.service"
import { UserService } from "../../service/user.service"

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../app.component.css'],
    providers: []
})
export class LoginComponent implements OnInit, OnDestroy {


    private loginSubscription?: Subscription

    loginReq = this.fb.group({
        email: ['', Validators.required],
        pass: ['', Validators.required]
    })

    constructor(private userService: UserService,
        private apiService: ApiService, private router: Router,
        private fb: FormBuilder) { }


    ngOnInit(): void {

    }

    submit(): void {
        this.loginSubscription = this.userService.login(this.loginReq.value).subscribe(result => {
            this.apiService.saveData(result)
            console.log(result)
            if (result.role.roleCode == 'M') {
                this.router.navigateByUrl("/threads")
            }
        })
    }

    ngOnDestroy(): void {
        this.loginSubscription?.unsubscribe()
    }
}