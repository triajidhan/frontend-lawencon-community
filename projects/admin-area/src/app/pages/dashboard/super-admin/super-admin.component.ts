import { Component, OnDestroy, OnInit } from "@angular/core"
import { ROLE_CODE } from "projects/main-area/src/app/constant/role-type"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { IndustryService } from "projects/main-area/src/app/service/industry.service"
import { PositionService } from "projects/main-area/src/app/service/position.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'super-admin-dashboard',
  templateUrl: './super-admin.conmponent.html'
})
export class SuperAdminComponent implements OnInit, OnDestroy {
  fullName!: string
  totalIndustry!: number
  totalPosition!: number
  totalAdminUser: number = 0
  totalMemberUser: number = 0

  positionGetCountSubscription!: Subscription
  industryGetCountSubscription!: Subscription
  adminUserGetCountSubscription!: Subscription
  memberUserGetCountSubscription!: Subscription

  constructor(private positionService: PositionService, private industryService: IndustryService, private userService: UserService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.fullName = String(this.apiService.getName())

    this.adminUserGetCountSubscription = this.userService.getTotalByRole(ROLE_CODE.ADMIN).subscribe(result => {
      this.totalAdminUser = result.countOfUser
    })

    this.memberUserGetCountSubscription = this.userService.getTotalByRole(ROLE_CODE.MEMBER).subscribe(result => {
      this.totalMemberUser = result.countOfUser
    })

    this.positionGetCountSubscription = this.positionService.getTotalPosition().subscribe(result => {
      this.totalPosition = result.countOfPosition
    })

    this.industryGetCountSubscription = this.industryService.getTotalIndustry().subscribe(result => {
      this.totalIndustry = result.countOfIndustry
    })
  }

  ngOnDestroy(): void {
    this.positionGetCountSubscription.unsubscribe()
    this.industryGetCountSubscription.unsubscribe()
    this.adminUserGetCountSubscription.unsubscribe()
    this.memberUserGetCountSubscription.unsubscribe()
  }

}
