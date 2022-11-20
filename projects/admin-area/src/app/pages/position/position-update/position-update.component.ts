import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'position-update',
    templateUrl: './position-update.component.html'
})
export class PositionUpdateComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Position', routerLink: '/positions' },
            { label: 'Position Update' }
        ]
    }
}