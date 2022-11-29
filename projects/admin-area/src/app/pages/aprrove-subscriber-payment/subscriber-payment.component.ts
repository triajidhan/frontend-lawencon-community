import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { PaymentSubscribe } from "projects/interface/payment-subscribe"
import { PaymentSubscribeService } from "projects/main-area/src/app/service/payment-subscribe.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'subscriber-payment',
    templateUrl: './subscriber-payment.component.html'
})
export class SubscriberPaymentComponent implements OnInit, OnDestroy {
    items!: MenuItem[]
    data: any[] = []

    id!: number
    paymentSubscribe!: PaymentSubscribe
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true

    getAllSubs?: Subscription
    getByIdUserSubs?: Subscription
    getByIdPaymentSubscribe?: Subscription
    approvePaymentSubs?: Subscription

    constructor(private paymentSubscribeService: PaymentSubscribeService,
        private userService: UserService) { }

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: "/dashboard/admin" },
            { label: 'Member Subscriber Payment' }
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

        this.getAllSubs = this.paymentSubscribeService.getAll(startPage, maxPage).subscribe(
            result => {
                console.log(result)
                for (let i = 0; result.length; i++) {
                    this.getByIdUserSubs = this.userService.getById(result[i].createdBy ?? '').subscribe(resultUser => {
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
        this.getByIdPaymentSubscribe = this.paymentSubscribeService.getById(paymentSubsId).subscribe(result => {
            this.paymentSubscribe = result
            this.paymentSubscribe.approve = true

            console.log(this.paymentSubscribe);

            this.approvePaymentSubs = this.paymentSubscribeService.update(this.paymentSubscribe).subscribe(() => {
                this.getData()
            })
        })
    }

    ngOnDestroy(): void {
        this.getAllSubs?.unsubscribe()
        this.getByIdUserSubs?.unsubscribe()
        this.getByIdPaymentSubscribe?.unsubscribe()
        this.approvePaymentSubs?.unsubscribe()
    }
}