import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { Activity } from "projects/interface/activity"
import { ActivityService } from "projects/main-area/src/app/service/activity.service"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
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

    getAllSubs?: Subscription
    getByIdUserSubs?: Subscription
    getTotalActivitySubs?: Subscription

    constructor(private activityService: ActivityService, private userService: UserService,
        private paymentActivityDetailService: PaymentActivityDetailService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Income Information Report' }

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

        this.getAllSubs = this.activityService.getAll(startPage, maxPage).subscribe(
            result => {
                for (let i = 0; result.length; i++) {
                    this.getByIdUserSubs = this.userService.getById(result[i].createdBy).subscribe(resultUser => {
                        result[i].userName = resultUser.fullName
                        // this.getTotalActivitySubs = this.paymentActivityDetailService.getTotalByActivity(result[i].id).subscribe(resultDetail => {
                        //     result[i].totalParticipant = resultDetail.totalParticipant
                        this.data = result
                        this.loading = false
                        this.totalData = result.length
                        // })
                    })
                }
                console.log(result)
            }
        )
    }

    exportData() {

    }

    ngOnDestroy(): void {
        this.getAllSubs?.unsubscribe()
        this.getByIdUserSubs?.unsubscribe()
        this.getTotalActivitySubs?.unsubscribe()
    }
}