import { Component, OnDestroy, OnInit } from "@angular/core"
import { ArticleService } from "projects/main-area/src/app/service/article.service"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { Subscription } from "rxjs"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { PaymentActivityDetailService } from "projects/main-area/src/app/service/payment-activity-detail.service"

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.conmponent.html'
})
export class AdminComponent implements OnDestroy, OnInit {
    fullName!: string
    totalArticle!: number
    totalUserSubsribe!: number
    totalApproveEvent!: number
    totalApproveCourse!: number

    private totalApprovedAndActivityTypeEvent?: Subscription
    private totalApprovedAndActivityTypeCourse?: Subscription

    private articleGetCountSubscription?: Subscription
    private userSubscribeGetCountSubscription?: Subscription


    constructor(private articleService: ArticleService,
        private userService: UserService,
        private apiService: ApiService,
        private paymentActivityDetailService: PaymentActivityDetailService) { }

    ngOnInit(): void {
        this.fullName = String(this.apiService.getName())

        this.articleGetCountSubscription = this.articleService.getTotalArticle().subscribe(result => {
            this.totalArticle = result.countOfArticle
        })

        this.userSubscribeGetCountSubscription = this.userService.getTotalSubscribe().subscribe(result => {
            this.totalUserSubsribe = result.countOfUser
        })

        this.totalApprovedAndActivityTypeEvent = this.paymentActivityDetailService.getTotalByPaymentApprovedAndActivityTypeId('event').subscribe(result => {
            this.totalApproveEvent = result.countOfPaymentActivity
        })

        this.totalApprovedAndActivityTypeCourse = this.paymentActivityDetailService.getTotalByPaymentApprovedAndActivityTypeId('course').subscribe(result => {
            this.totalApproveCourse = result.countOfPaymentActivity
        })
    }

    ngOnDestroy(): void {
        this.articleGetCountSubscription?.unsubscribe()
        this.userSubscribeGetCountSubscription?.unsubscribe()
        this.totalApprovedAndActivityTypeCourse?.unsubscribe()
        this.totalApprovedAndActivityTypeEvent?.unsubscribe()
    }

}