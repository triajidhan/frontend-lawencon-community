import { Component, OnDestroy, OnInit } from "@angular/core"
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api"
import { IndustryService } from "projects/main-area/src/app/service/industry.service";
import { PositionService } from "projects/main-area/src/app/service/position.service";

import { Subscription } from "rxjs";

@Component({
    selector: 'position-insert',
    templateUrl: './position-insert.component.html'
})
export class PositionInsertComponent implements OnInit,OnDestroy {
    items!: MenuItem[]
    insertSubscription!: Subscription;

    insertPositionForm = this.fb.group({
      positionName: ['', Validators.required],
  })

    constructor(private fb: FormBuilder,
      private positionService: PositionService,
      private router: Router) {}
    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Position', routerLink: '/Positions' },
            { label: 'Position Insert' }
        ]
    }

    submitInsert(){
      this.insertSubscription = this.positionService.insert(this.insertPositionForm.value).subscribe(()=>{
        console.log("tes")
        //this.router.navigateByUrl(`/positions`)
      })
    }

    ngOnDestroy(): void {
      this.insertSubscription.unsubscribe();
    }
}