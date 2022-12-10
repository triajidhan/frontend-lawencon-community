import { Component, OnDestroy, OnInit } from "@angular/core"
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api"

import { PositionService } from "projects/main-area/src/app/service/position.service";

import { finalize, Subscription } from "rxjs";

@Component({
  selector: 'position-insert',
  templateUrl: './position-insert.component.html'
})
export class PositionInsertComponent implements OnInit, OnDestroy {
  loadingInsert = false
  items!: MenuItem[]

  private insertSubscription?: Subscription;

  insertPositionForm = this.fb.group({
    positionName: ['', [Validators.required, Validators.maxLength(30)]],
  })

  constructor(private fb: FormBuilder,
    private positionService: PositionService,
    private router: Router) { }
  ngOnInit(): void {
    this.items = [
      { label: 'Home', routerLink: '/dashboard/super-admin' },
      { label: 'Position', routerLink: '/positions' },
      { label: 'Position Insert' }
    ]
  }

  submitInsert() {
    this.loadingInsert = true
    this.insertSubscription = this.positionService.insert(this.insertPositionForm.value).pipe(finalize(() => this.loadingInsert = false)).subscribe(() => {
      this.router.navigateByUrl(`/positions`)
    })
  }

  ngOnDestroy(): void {
    this.insertSubscription?.unsubscribe();
  }
}
