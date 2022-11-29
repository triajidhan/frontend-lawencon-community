import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { Activity } from "projects/interface/activity"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'information-report-income-admin',
    templateUrl: './information-report-income-admin.component.html'
})
export class InformationReportIncomeAdminComponent implements OnInit, OnDestroy {
    items!: MenuItem[]
    data: any[] = []

    id!: number
    activity!: Activity
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true

    beginSchedule = new Date("2020-01-01").toISOString()
    finishSchedule = new Date("2025-01-01").toISOString()

    getAllReportSubs?: Subscription

    constructor(private paymentActivityDetailService: PaymentActivityDetailService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Income Information Report' }

        ]
    }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first, event.rows)
    }

    getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage

        this.getAllReportSubs = this.paymentActivityDetailService.getReportIncomeSuper(this.beginSchedule, this.finishSchedule, startPage, maxPage).subscribe(
            result => {
                console.log(result)
                this.data = result
                this.loading = false
                this.totalData = result.length
            }
        )
    }

    exportData() {

    }

    ngOnDestroy(): void {
        this.getAllReportSubs?.unsubscribe()
    }
}