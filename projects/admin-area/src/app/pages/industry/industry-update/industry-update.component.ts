import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
    selector: 'industry-update',
    templateUrl: './industry-update.component.html'
})
export class IndustryUpdateComponent implements OnInit {
    items!: MenuItem[]
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Industry', routerLink: '/industries' },
            { label: 'Industry Update' }
        ]
    }
}