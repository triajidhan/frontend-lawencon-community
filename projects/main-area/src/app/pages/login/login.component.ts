import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { UserService } from "../../service/user.service";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../app.component.css'],
    providers: []
})
export class LoginComponent implements OnInit, OnDestroy {


    constructor(private userService: UserService,
        private apiService: ApiService, private router: Router) { }

    ngOnInit(): void {

    }

    // submit(): void {
    //     this.userService.login(this.loginReqDto).subscribe(result => {
    //         this.apiService.saveData(result)

    //         if (result.roleCode == Object.values(ROLE_CODE)[0]) {
    //             this.router.navigateByUrl("/dashboard/super-admin")
    //         } else {
    //             this.router.navigateByUrl("/dashboard/admin")
    //         }
    //     })
    // }

    ngOnDestroy(): void {

    }
}