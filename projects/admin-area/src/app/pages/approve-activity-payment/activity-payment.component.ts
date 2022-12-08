import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { PaymentActivityDetail } from "projects/interface/payment-activity-detail"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: 'activity-payment',
    templateUrl: './activity-payment.component.html'
})
export class ActivityPaymentComponent implements OnInit, OnDestroy {
    loadingActivityPayment: boolean = false
    items!: MenuItem[]
    navMenus!: MenuItem[]
    data: any[] = []
    dataApprove: any[] = []
    dataReject: any[] = []

    urlFile = `${BASE_URL.LOCALHOST}/files/download/`


    id!: number
    type!: string
    paymentActivityDetail!: PaymentActivityDetail

    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true

    getAllPaymentActivitySubs?: Subscription
    getByIdUserSubs?: Subscription
    getByIdPaymentActivitySubs?: Subscription
    approvePaymentSubs?: Subscription
    rejectPaymentSubs?: Subscription
    getTotalDataSubs?: Subscription


    constructor(private paymentActivityDetailService: PaymentActivityDetailService,
        private userService: UserService, private activatedRoute: ActivatedRoute) { }


    ngOnInit(): void {

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
        })

        this.items = [
            { label: 'Home', routerLink: "/dashboard/admin" },
            { label: 'Member Activity Payment' }
        ]

        this.navMenus = [
            { label: 'Approve Payment', routerLink: "/approve-activity-payments/approve-payments" },
            { label: 'Approved', routerLink: "/approve-activity-payments/approves" },
            { label: 'Rejected', routerLink: "/approve-activity-payments/rejects" }
        ]

    }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first, event.rows)
    }

    getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage

        this.getAllPaymentActivitySubs = this.paymentActivityDetailService.getByIsActiveTrueAndApprovedFalse(startPage, maxPage, false).subscribe(
            result => {
                this.getTotalDataSubs = this.paymentActivityDetailService.getTotalByIsActiveTrueAndApprovedFalse().subscribe(total => {
                    this.data = result
                    this.loading = false
                    this.totalData = total.countOfPaymentActivity
                })
            }
        )
    }

    loadDataApprove(event: LazyLoadEvent) {
        this.getDataApprove(event.first, event.rows)
    }

    getDataApprove(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage

        this.getAllPaymentActivitySubs = this.paymentActivityDetailService.getByPaymentApproved(startPage, maxPage, false).subscribe(
            result => {
                this.getTotalDataSubs = this.paymentActivityDetailService.getTotalByPaymentApproved().subscribe(total => {
                    this.dataApprove = result
                    this.loading = false
                    this.totalData = total.countOfPaymentActivity
                })
            }
        )
    }


    loadDataReject(event: LazyLoadEvent) {
        this.getDataReject(event.first, event.rows)
    }

    getDataReject(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage

        this.getAllPaymentActivitySubs = this.paymentActivityDetailService.getByPaymentReject(startPage, maxPage, false).subscribe(
            result => {
                this.getTotalDataSubs = this.paymentActivityDetailService.getTotalByPaymentReject().subscribe(total => {
                    this.dataReject = result
                    this.loading = false
                    this.totalData = total.countOfPaymentActivity
                })
            }
        )
    }

    approvePayment(paymentSubsId: string) {
        this.loadingActivityPayment = true
        this.getByIdPaymentActivitySubs = this.paymentActivityDetailService.getById(paymentSubsId).subscribe(result => {
            this.paymentActivityDetail = result
            this.paymentActivityDetail.approve = true
            this.approvePaymentSubs = this.paymentActivityDetailService.update(this.paymentActivityDetail).pipe(finalize(() => this.loadingActivityPayment = false)).subscribe(() => {
                this.getData()
            })
        })
    }

    rejectPayment(paymentSubsId: string) {
        this.getByIdPaymentActivitySubs = this.paymentActivityDetailService.getById(paymentSubsId).subscribe(result => {
            this.paymentActivityDetail = result
            this.paymentActivityDetail.isActive = false
            this.rejectPaymentSubs = this.paymentActivityDetailService.update(this.paymentActivityDetail).subscribe(() => {
                this.getData()
            })
        })
    }

    ngOnDestroy(): void {
        this.getAllPaymentActivitySubs?.unsubscribe()
        this.getByIdUserSubs?.unsubscribe()
        this.getByIdPaymentActivitySubs?.unsubscribe()
        this.approvePaymentSubs?.unsubscribe()
        this.rejectPaymentSubs?.unsubscribe()
    }
}
