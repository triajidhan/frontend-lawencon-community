import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'user-update',
    templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Admin User', routerLink: '/users' },
            { label: 'Admin User Update' }
        ]
    }
}