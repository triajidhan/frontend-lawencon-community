import { Component, OnDestroy, OnInit } from "@angular/core"
import { ConfirmationService, LazyLoadEvent, MenuItem, PrimeNGConfig } from "primeng/api"
import { Position } from "projects/interface/position"
import { PositionService } from "projects/main-area/src/app/service/position.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: 'position-list',
    templateUrl: './position-list.component.html',
    providers: [ConfirmationService]
})
export class PositionListComponent implements OnInit, OnDestroy {
    loadingDeleted: boolean = false
    items!: MenuItem[]
    data: any[] = []

    id!: number
    position!: Position
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true
    display: boolean = false

    private getAllSubs?: Subscription
    private getByIdSubs?: Subscription
    private deleteSubs?: Subscription
    private contDataSubs?: Subscription

    constructor(private positionService: PositionService, private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Position' }
        ]
    }

    loadData(event: LazyLoadEvent) {
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
            }
        )
    }

    getDeleteId(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this position?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.getByIdSubs = this.positionService.getById(id).subscribe(result => {
                    this.position = result
                    this.position.isActive = false
                    this.loadingDeleted = true
                    this.deleteSubs = this.positionService.update(this.position).pipe(finalize(() => this.loadingDeleted = false)).subscribe(() => {
                        this.getData()
                    })
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.getAllSubs?.unsubscribe()
        this.getByIdSubs?.unsubscribe()
        this.deleteSubs?.unsubscribe()
        this.contDataSubs?.unsubscribe()
    }
}
