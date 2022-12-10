import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'user-insert',
    templateUrl: './user-insert.component.html'
})
export class UserInsertComponent implements OnInit, OnDestroy {
    items!: MenuItem[]

    private insertSubscription?: Subscription

    insertUserForm = this.formBuilder.group({
        fullName: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
        pass: ['', Validators.required],
    })

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Admin User', routerLink: '/users' },
            { label: 'Admin User Insert' }
        ]
    }


    submitInsert() {
        this.insertSubscription = this.userService.insert(this.insertUserForm.value).subscribe(() => {
            this.router.navigateByUrl(`/users`)
        })
    }

    ngOnDestroy(): void {
        this.insertSubscription?.unsubscribe();
    }
}