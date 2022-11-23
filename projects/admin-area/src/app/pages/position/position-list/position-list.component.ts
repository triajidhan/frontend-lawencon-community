import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { Position } from "projects/interface/position"
import { PositionService } from "projects/main-area/src/app/service/position.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'position-list',
    templateUrl: './position-list.component.html'
})
export class PositionListComponent implements OnInit, OnDestroy {
    items!: MenuItem[]
    data: any[] = []

    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    query?: string
    loading: boolean = true

    getAllSubs?: Subscription
    deleteSubs?: Subscription
    contDataSubs?: Subscription

    constructor(private positionService: PositionService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Position' }
        ]
    }

    loadData(event: LazyLoadEvent) {
        console.log(event)
        this.getData(event.first, event.rows)
    }

    getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage

        this.getAllSubs = this.positionService.getByIsActive(startPage, maxPage).subscribe(
            result => {
                this.data = result
                this.loading = false
                this.contDataSubs = this.positionService.getTotalPosition().subscribe(result => {
                    this.totalData = result.countOfPosition
                })
                console.log(this.data)
            },
        )
    }


    ngOnDestroy(): void {
        this.getAllSubs?.unsubscribe()
        this.deleteSubs?.unsubscribe()
        this.contDataSubs?.unsubscribe()
    }


}