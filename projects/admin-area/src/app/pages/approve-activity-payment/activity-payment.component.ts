import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { PaymentActivityDetail } from "projects/interface/payment-activity-detail"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'activity-payment',
    templateUrl: './activity-payment.component.html'
})
export class ActivityPaymentComponent implements OnInit, OnDestroy {

    items!: MenuItem[]
    data: any[] = []

    id!: number
    paymentActivityDetail!: PaymentActivityDetail
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true

    getAllPaymentActivitySubs?: Subscription
    getByIdUserSubs?: Subscription
    getByIdPaymentActivitySubs?: Subscription
    approvePaymentSubs?: Subscription

    constructor(private paymentActivityDetailService: PaymentActivityDetailService,
        private userService: UserService) { }


    ngOnInit(): void {

        this.items = [
            { label: 'Home', routerLink: "/dashboard/admin" },
            { label: 'Member Activity Payment' }
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

        this.getAllPaymentActivitySubs = this.paymentActivityDetailService.getAll(startPage, maxPage).subscribe(
            result => {
                console.log(result)
                for (let i = 0; result.length; i++) {
                    this.getByIdUserSubs = this.userService.getById(result[i].createdBy).subscribe(resultUser => {
                        result[i].userName = resultUser.fullName
                        this.data = result
                        this.loading = false
                        this.totalData = result.length
                    })

                }
            }
        )
    }

    approvePayment(paymentSubsId: string) {
        this.getByIdPaymentActivitySubs = this.paymentActivityDetailService.getById(paymentSubsId).subscribe(result => {
            this.paymentActivityDetail = result
            this.paymentActivityDetail.approve = true

            console.log(this.paymentActivityDetail);

            this.approvePaymentSubs = this.paymentActivityDetailService.update(this.paymentActivityDetail).subscribe(() => {
                this.getData()
            })
        })
    }

    ngOnDestroy(): void {
        this.getAllPaymentActivitySubs?.unsubscribe()
        this.getByIdUserSubs?.unsubscribe()
        this.getByIdPaymentActivitySubs?.unsubscribe()
        this.approvePaymentSubs?.unsubscribe()
    }
}