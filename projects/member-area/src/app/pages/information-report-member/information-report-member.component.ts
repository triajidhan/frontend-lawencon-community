import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { Activity } from "projects/interface/activity"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'information-report-member',
    templateUrl: './information-report-member.component.html'
})
export class InformationReportMemberComponent implements OnInit, OnDestroy {
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

    getAllPaymentSubs?: Subscription

    constructor(private paymentActivityDetailService: PaymentActivityDetailService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Member Information Report' }

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

        this.getAllPaymentSubs = this.paymentActivityDetailService.getReportPartisipation(this.beginSchedule, this.finishSchedule, startPage, maxPage).subscribe(
            result => {
                this.data = result
                this.loading = false
                this.totalData = result.length
            }
        )
    }

    exportData() {

    }

    ngOnDestroy(): void {
        this.getAllPaymentSubs?.unsubscribe()
    }
}