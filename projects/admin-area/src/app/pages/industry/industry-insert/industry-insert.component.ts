import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { IndustryService } from "projects/main-area/src/app/service/industry.service"
import { finalize, Subscription } from "rxjs"

@Component({
  selector: 'industry-insert',
  templateUrl: './industry-insert.component.html'
})
export class IndustryInsertComponent implements OnInit, OnDestroy {
  loadingInsert = false;

  items!: MenuItem[]

  private insertSubscription?: Subscription;

  insertIndustryForm = this.fb.group({
    industryName: ['', [Validators.required, Validators.maxLength(30)]],
  })

  constructor(private fb: FormBuilder,
    private industryService: IndustryService,
    private router: Router) { }
  ngOnInit(): void {
    this.items = [
      { label: 'Home', routerLink: '/dashboard/super-admin' },
      { label: 'Industry', routerLink: '/industries' },
      { label: 'Industry Insert' }
    ]


  }

  submitInsert() {
    this.loadingInsert = true;
    this.insertSubscription = this.industryService.insert(this.insertIndustryForm.value).pipe(finalize(() => this.loadingInsert = false)).subscribe(() => {
      this.router.navigateByUrl(`/industries`)
    })
  }

  ngOnDestroy(): void {
    this.insertSubscription?.unsubscribe();
  }
}
