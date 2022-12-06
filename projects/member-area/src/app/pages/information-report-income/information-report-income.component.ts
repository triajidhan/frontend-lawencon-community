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
    selector: 'information-report-income',
    templateUrl: './information-report-income.component.html'
})
export class InformationReportIncomeComponent implements OnInit, OnDestroy {
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

    getAllPaymentSubs?: Subscription
    getTotalPaymentSubs?: Subscription
    exportsSubscription?:Subscription

    constructor(private paymentActivityDetailService: PaymentActivityDetailService,private reportService:ReportService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Income Information Report' }

        ]
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


        

        this.getAllPaymentSubs = this.paymentActivityDetailService.getReportIncomeMember(this.beginSchedule, this.finishSchedule, startPage, maxPage,false).subscribe(
            result => {
                this.getTotalPaymentSubs = this.paymentActivityDetailService.getTotalByReportIncomeMember(this.beginSchedule,this.finishSchedule).subscribe(total=>{
                    this.data = result
                    this.loading = false
                    this.totalData = total.countOfPaymentActivity
                 })         
            }
        )
    }

    getValueDate(){
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            this.beginSchedule = formatDate(this.rangeDates[0]?? '', `yyyy-MM-dd'T'HH:mm:ss`, 'en')
            this.finishSchedule =  formatDate(this.rangeDates[1]?? '', `yyyy-MM-dd'T'HH:mm:ss`, 'en')  
    
            
            this.getAllPaymentSubs = this.paymentActivityDetailService.getReportIncomeMember(this.beginSchedule, this.finishSchedule, this.startPage, this.maxPage,false).subscribe(
                result => {
                    this.getTotalPaymentSubs = this.paymentActivityDetailService.getTotalByReportIncomeMember(this.beginSchedule,this.finishSchedule).subscribe(total=>{
                        this.data = result
                        this.loading = false
                        this.totalData = total.countOfPaymentActivity
                    })
                }
            )
        }
    }

    exportData() {
        this.exportsSubscription = this.reportService.getReportIncomeMember(this.beginSchedule, this.finishSchedule).subscribe(result => {
            const anchor = document.createElement('a');
            anchor.download = "total-income-member.pdf";
            anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
            anchor.click();
        })

    }

    ngOnDestroy(): void {
        this.getAllPaymentSubs?.unsubscribe()
        this.getTotalPaymentSubs?.unsubscribe()
        this.exportsSubscription?.unsubscribe()
    }
}