import { Component, OnDestroy, OnInit } from "@angular/core";
import { IndustryService } from "projects/main-area/src/app/service/industry.service";
import { PositionService } from "projects/main-area/src/app/service/position.service";
import { UserService } from "projects/main-area/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'super-admin-dashboard',
  templateUrl: './super-admin.conmponent.html'
})
export class SuperAdminComponent implements OnInit, OnDestroy {
  totalIndustry!: number
  totalPosition!: number
  totalUser!: number
  positionGetCountSubscription!: Subscription;
  industryGetCountSubscription!: Subscription;
  userGetCountSubscription!: Subscription;

  constructor(private positionService: PositionService, private industryService: IndustryService, private userService: UserService) { }
  ngOnInit(): void {
    this.userGetCountSubscription = this.userService.getTotalUser().subscribe(result => {
      this.totalUser = result.countOfUser;
    })

    this.positionGetCountSubscription = this.positionService.getTotalPosition().subscribe(result => {
      this.totalPosition = result.countOfPosition;
    })

    this.industryGetCountSubscription = this.industryService.getTotalIndustry().subscribe(result => {
      this.totalIndustry = result.countOfIndustry;
    })
  }
  ngOnDestroy(): void {
    this.positionGetCountSubscription.unsubscribe();
    this.industryGetCountSubscription.unsubscribe();
    this.userGetCountSubscription.unsubscribe();
  }

}
