import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'position-insert',
    templateUrl: './position-insert.component.html'
})
export class PositionInsertComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Position', routerLink: '/positions' },
            { label: 'Position Insert' }
        ]
    }
}