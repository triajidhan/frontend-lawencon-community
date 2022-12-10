import { Component, OnDestroy, OnInit } from "@angular/core"
import { ConfirmationService, LazyLoadEvent, MenuItem, PrimeNGConfig } from "primeng/api"
import { Industry } from "projects/interface/industry"
import { IndustryService } from "projects/main-area/src/app/service/industry.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: 'industry-list',
    templateUrl: './industry-list.component.html',
    providers: [ConfirmationService]
})
export class IndustryListComponent implements OnInit, OnDestroy {
    loadingDelete: boolean = false
    items!: MenuItem[]
    data: any[] = []

    id!: number
    industry!: Industry
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true
    display: boolean = false

    private getAllSubs?: Subscription
    private getByIdSubs?: Subscription
    private deleteSubs?: Subscription
    private contDataSubs?: Subscription

    constructor(private industryService: IndustryService, private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Industry' }
        ]
    }


    loadData(event: LazyLoadEvent) {
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
            }
        )
    }

    getDeleteId(id: string) {
        this.loadingDelete = true
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this industry?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.getByIdSubs = this.industryService.getById(id).subscribe(result => {
                    this.industry = result
                    this.industry.isActive = false

                    this.deleteSubs = this.industryService.update(this.industry).pipe(finalize(() => this.loadingDelete = false)).subscribe(() => {
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
