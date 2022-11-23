import { Component, OnDestroy, OnInit } from "@angular/core"
import { ConfirmationService, LazyLoadEvent, MenuItem, PrimeNGConfig } from "primeng/api"
import { Industry } from "projects/interface/industry"
import { IndustryService } from "projects/main-area/src/app/service/industry.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'industry-list',
    templateUrl: './industry-list.component.html',
    providers: [ConfirmationService]
})
export class IndustryListComponent implements OnInit, OnDestroy {
    items!: MenuItem[]
    data: any[] = []

    id!: number
    industry!: Industry
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true
    display: boolean = false

    getAllSubs?: Subscription
    getByIdSubs?: Subscription
    deleteSubs?: Subscription
    contDataSubs?: Subscription

    constructor(private industryService: IndustryService, private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'industry' }
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

        this.getAllSubs = this.industryService.getByIsActive(startPage, maxPage).subscribe(
            result => {
                this.data = result
                this.loading = false
                this.contDataSubs = this.industryService.getTotalIndustry().subscribe(result => {
                    this.totalData = result.countOfIndustry
                })
                console.log(this.data)
            }
        )
    }

    getDeleteId(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this industry?',
            accept: () => {
                this.getByIdSubs = this.industryService.getById(id).subscribe(result => {
                    this.industry = result
                    this.industry.isActive = false

                    this.deleteSubs = this.industryService.update(this.industry).subscribe(() => {
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