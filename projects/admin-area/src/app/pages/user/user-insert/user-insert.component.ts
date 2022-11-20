import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'user-insert',
    templateUrl: './user-insert.component.html'
})
export class UserInsertComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Admin User', routerLink: '/users' },
            { label: 'Admin User Insert' }
        ]
    }
}