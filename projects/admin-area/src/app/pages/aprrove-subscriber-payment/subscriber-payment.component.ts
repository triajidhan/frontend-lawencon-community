import { Component, OnDestroy, OnInit } from "@angular/core"
import { LazyLoadEvent, MenuItem } from "primeng/api"
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
  data: any[] = []

  id!: number
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

    this.getAllSubs = this.paymentSubscribeService.getByIsActiveTrueAndApprovedFalse(startPage, maxPage,false).subscribe(
      result => {
        console.log(result)
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

  approvePayment(paymentSubsId: string) {
    this.loadingSubscribe = true
    this.getByIdPaymentSubscribe = this.paymentSubscribeService.getById(paymentSubsId).pipe(finalize(() => this.loadingSubscribe = false)).subscribe(result => {
      this.paymentSubscribe = result
      this.paymentSubscribe.approve = true

      console.log(this.paymentSubscribe);

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
