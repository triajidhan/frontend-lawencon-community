import { formatDate } from "@angular/common"
import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { Activity } from "projects/interface/activity"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
import { ReportService } from "projects/main-area/src/app/service/report.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'information-report-member-admin',
    templateUrl: './information-report-member-admin.component.html'
})
export class InformationReportMemberAdminComponent implements OnInit, OnDestroy {
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

    rangeDates: any[] = []

    private getAllPaymentSubs?: Subscription
    private getTotalReportSubs?:Subscription
    private exportsSubscription?: Subscription

    constructor(private paymentActivityDetailService: PaymentActivityDetailService,private reportService:ReportService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Member Information Report' }

        ]

        this.getAllPaymentSubs = this.paymentActivityDetailService.getReportPartisipationSuper(this.beginSchedule, this.finishSchedule, 0, 10, false).subscribe(result => {
            this.getTotalReportSubs = this.paymentActivityDetailService.getTotalByReportIncomeSuper(this.beginSchedule,this.finishSchedule).subscribe(total=>{
                this.data = result
                this.loading = false
                this.totalData = total.countOfPaymentActivity
            })
        })
    }

    getTimeZone() {
        var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first, event.rows)
    }

    getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage


        this.getAllPaymentSubs = this.paymentActivityDetailService.getReportPartisipationSuper(this.beginSchedule, this.finishSchedule, startPage, maxPage, false).subscribe(
            result => {
                this.getTotalReportSubs = this.paymentActivityDetailService.getTotalByReportIncomeSuper(this.beginSchedule,this.finishSchedule).subscribe(total=>{
                    this.data = result
                    this.loading = false
                    this.totalData = total.countOfPaymentActivity
                })
            }
        )
    }

    getValueDate() {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            this.beginSchedule = formatDate(this.rangeDates[0] ?? '', `yyyy-MM-dd'T'HH:mm:ss`, 'en')
            this.finishSchedule = formatDate(this.rangeDates[1] ?? '', `yyyy-MM-dd'T'HH:mm:ss`, 'en')


            this.getAllPaymentSubs = this.paymentActivityDetailService.getReportPartisipationSuper(this.beginSchedule, this.finishSchedule, this.startPage, this.maxPage, false).subscribe(
                result => {
                    this.getTotalReportSubs = this.paymentActivityDetailService.getTotalByReportIncomeSuper(this.beginSchedule,this.finishSchedule).subscribe(total=>{
                        this.data = result
                        this.loading = false
                        this.totalData = total.countOfPaymentActivity
                    })
                }
            )
        }
    }

    exportData() {
        this.exportsSubscription = this.reportService.getReportPartisipationSuper(this.beginSchedule, this.finishSchedule).subscribe(result => {
            const anchor = document.createElement('a');
            anchor.download = "partisipation-super.pdf";
            anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
            anchor.click();
        })
    }

    ngOnDestroy(): void {
        this.getAllPaymentSubs?.unsubscribe()
        this.getTotalReportSubs?.unsubscribe()
        this.exportsSubscription?.unsubscribe()
    }
}
