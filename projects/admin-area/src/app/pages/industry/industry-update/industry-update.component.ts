import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { IndustryService } from "projects/main-area/src/app/service/industry.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'industry-update',
  templateUrl: './industry-update.component.html'
})
export class IndustryUpdateComponent implements OnInit, OnDestroy {
  items!: MenuItem[]
  updateSubscription!: Subscription
  getByIdSubscription!: Subscription

  industry: any = new Object();

  updateIndustryForm = this.fb.group({
    industryName: ['', Validators.required],
    id : [''],
    versions : ['']
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
      this.updateSubscription = this.industryService.getById(result['id']).subscribe(result => {
        this.industry = result
      })
    })
  }

  submitUpdate(){
    this.updateIndustryForm.value.id = this.industry.id
    this.updateIndustryForm.value.versions = this.industry.versions
    this.updateSubscription = this.industryService.update(this.updateIndustryForm.value).subscribe(()=>{
      this.router.navigateByUrl(`/industries`)
    })
  }
  ngOnDestroy(): void {

  }
}
