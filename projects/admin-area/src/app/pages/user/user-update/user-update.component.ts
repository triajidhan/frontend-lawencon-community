import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'user-update',
    templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit, OnDestroy {
    loadingUpdate: boolean = false
    items!: MenuItem[]

    user: any = new Object()

    private updateSubscription?: Subscription
    private getByIdSubscription!: Subscription

    updateUserForm = this.formBuilder.group({
        id: [''],
        fullName: ['', Validators.required],
        email: [''], 
        version: [0]
    })

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Admin User', routerLink: '/users' },
            { label: 'Admin User Update' }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.updateSubscription = this.userService.getById(result['id']).subscribe(user => {
                this.user = user
                this.updateUserForm.controls['fullName'].setValue(user.fullName)
                this.updateUserForm.controls['email'].setValue(user.email)
                this.updateUserForm.controls['id'].setValue(user.id)
                this.updateUserForm.controls['version'].setValue(user.version)
            })
        })
    }

    userUpdate() {
        this.updateSubscription = this.userService.update(this.updateUserForm.value).subscribe(() => {
            console.log("save")
            this.router.navigateByUrl(`/users`)
        })
    }

    ngOnDestroy(): void {
        this.updateSubscription?.unsubscribe()
    }
}