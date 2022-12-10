import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { LazyLoadEvent, MenuItem } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { PaymentSubscribe } from "projects/interface/payment-subscribe"
import { PaymentSubscribeService } from "projects/main-area/src/app/service/payment-subscribe.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { finalize, Subscription } from "rxjs"

@Component({
  selector: 'subscriber-payment',
  templateUrl: './subscriber-payment.component.html'
})
export class SubscriberPaymentComponent implements OnInit, OnDestroy {
  loadingSubscribe = false;
  items!: MenuItem[]
  navMenus!: MenuItem[]
  data: any[] = []
  dataApprove: any[] = []
  dataReject: any[] = []

  urlFile = `${BASE_URL.LOCALHOST}/files/download/`

  id!: number
  type!: string
  paymentSubscribe!: PaymentSubscribe
  startPage: number = 0
  maxPage: number = 5
  totalData: number = 0
  loading: boolean = true

  private getTotalDataSubs?: Subscription
  private getAllSubs?: Subscription
  private getByIdUserSubs?: Subscription
  private getByIdPaymentSubscribe?: Subscription
  private approvePaymentSubs?: Subscription
  private rejectPaymentSubs?: Subscription

  constructor(private paymentSubscribeService: PaymentSubscribeService,
    private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(result => {
      this.type = result['type']
    })

    this.items = [
      { label: 'Home', routerLink: "/dashboard/admin" },
      { label: 'Member Subscriber Payment' }
    ]

    this.navMenus = [
      { label: 'Approve Payment', routerLink: "/approve-subscriber-payments/approve-payments" },
      { label: 'Approved', routerLink: "/approve-subscriber-payments/approves" },
      { label: 'Rejected', routerLink: "/approve-subscriber-payments/rejects" }
    ]


    this.getAllSubs = this.paymentSubscribeService.getByIsActiveTrueAndApprovedFalse(this.startPage, this.maxPage, false).subscribe(
      result => {
        this.getTotalDataSubs = this.paymentSubscribeService.getTotalByIsActiveTrueAndApprovedFalse().subscribe(
          totalData => {
            this.data = result
            this.loading = false
            this.totalData = totalData.countOfPaymentSubscribe

          }
        )
      }
    )
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
    this.loading = true;
    this.startPage = startPage
    this.maxPage = maxPage

    this.getAllSubs = this.paymentSubscribeService.getByIsActiveTrueAndApprovedFalse(startPage, maxPage, false).subscribe(
      result => {
        this.getTotalDataSubs = this.paymentSubscribeService.getTotalByIsActiveTrueAndApprovedFalse().subscribe(
          totalData => {
            this.data = result
            this.loading = false
            this.totalData = totalData.countOfPaymentSubscribe

          }
        )
      }
    )
  }

  loadDataApproved(event: LazyLoadEvent) {
    this.getDataApproved(event.first, event.rows)
  }

  getDataApproved(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
    this.loading = true;
    this.startPage = startPage
    this.maxPage = maxPage

    this.getAllSubs = this.paymentSubscribeService.getByPaymentApproved(startPage, maxPage, false).subscribe(
      result => {
        this.getTotalDataSubs = this.paymentSubscribeService.getTotalByPaymentApproved().subscribe(
          totalData => {
            this.dataApprove = result
            this.loading = false
            this.totalData = totalData.countOfPaymentSubscribe

          }
        )
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

    this.getAllSubs = this.paymentSubscribeService.getByPaymentReject(startPage, maxPage, false).subscribe(
      result => {
        this.getTotalDataSubs = this.paymentSubscribeService.getTotalByPaymentReject().subscribe(
          totalData => {
            this.dataReject = result
            this.loading = false
            this.totalData = totalData.countOfPaymentSubscribe

          }
        )
      }
    )
  }

  approvePayment(paymentSubsId: string) {
    this.loadingSubscribe = true
    this.getByIdPaymentSubscribe = this.paymentSubscribeService.getById(paymentSubsId).pipe(finalize(() => this.loadingSubscribe = false)).subscribe(result => {
      this.paymentSubscribe = result
      this.paymentSubscribe.approve = true

      this.approvePaymentSubs = this.paymentSubscribeService.update(this.paymentSubscribe).subscribe(() => {
        this.getData()
      })
    })
  }


  rejectPayment(paymentSubsId: string) {
    this.getByIdPaymentSubscribe = this.paymentSubscribeService.getById(paymentSubsId).subscribe(result => {
      this.paymentSubscribe = result
      this.paymentSubscribe.isActive = false
      this.rejectPaymentSubs = this.paymentSubscribeService.update(this.paymentSubscribe).subscribe(() => {
        this.getData()
      })
    })
  }

  ngOnDestroy(): void {
    this.getTotalDataSubs?.unsubscribe()
    this.getAllSubs?.unsubscribe()
    this.getByIdUserSubs?.unsubscribe()
    this.getByIdPaymentSubscribe?.unsubscribe()
    this.approvePaymentSubs?.unsubscribe()
    this.rejectPaymentSubs?.unsubscribe()
  }
}
