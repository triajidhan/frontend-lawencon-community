import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { IndustryService } from "projects/main-area/src/app/service/industry.service"
import { finalize, Subscription } from "rxjs"

@Component({
  selector: 'industry-update',
  templateUrl: './industry-update.component.html'
})
export class IndustryUpdateComponent implements OnInit, OnDestroy {
  loadingIndustry: boolean = false
  items!: MenuItem[]
  private updateSubscription?: Subscription
  private getByIdSubscription?: Subscription

  industry: any = new Object();

  updateIndustryForm = this.fb.group({
    industryName: ['', [Validators.required, Validators.maxLength(50)]],
    id: [''],
  })

  constructor(private fb: FormBuilder,
    private industryService: IndustryService,
    private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.items = [
      { label: 'Home', routerLink: '/dashboard/super-admin' },
      { label: 'Industry', routerLink: '/industries' },
      { label: 'Industry Update' }
    ]
    this.activatedRoute.params.subscribe(result => {
      this.updateSubscription = this.industryService.getById(result['id']).subscribe(industry => {
        this.industry = industry
        this.updateIndustryForm.controls['industryName'].setValue(industry.industryName)
        this.updateIndustryForm.controls['id'].setValue(industry.id)
      })
    })
  }

  submitUpdate() {
    this.loadingIndustry = true
    this.updateSubscription = this.industryService.update(this.updateIndustryForm.value).pipe(finalize(() => this.loadingIndustry)).subscribe(() => {
      this.router.navigateByUrl(`/industries`)
    })
  }
  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe()
    this.getByIdSubscription?.unsubscribe()
  }
}
