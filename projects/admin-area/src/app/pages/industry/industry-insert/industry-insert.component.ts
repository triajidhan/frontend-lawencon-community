import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'industry-insert',
    templateUrl: './industry-insert.component.html'
})
export class IndustryInsertComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Industry', routerLink: '/industries' },
            { label: 'Industry Insert' }
        ]
    }
}