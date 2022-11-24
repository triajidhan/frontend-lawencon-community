import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { PositionService } from "projects/main-area/src/app/service/position.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'position-update',
    templateUrl: './position-update.component.html'
})
export class PositionUpdateComponent implements OnInit,OnDestroy {
    items!: MenuItem[]
    updateSubscription!: Subscription
    getByIdSubscription!: Subscription

    position:any = new Object()

    updatePositionForm = this.fb.group({
        positionName:['',Validators.required],
        id:[''],

    })

    constructor(private fb:FormBuilder,
        private positionService: PositionService,
        private router: Router, private activatedRoute:ActivatedRoute){}

    ngOnInit(): void {
        this.items = [
            { label: 'Home', routerLink: '/dashboard/super-admin' },
            { label: 'Position', routerLink: '/positions' },
            { label: 'Position Update' }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.updateSubscription = this.positionService.getById(result['id']).subscribe(position => {
              this.position = position;
              this.updatePositionForm.controls['positionName'].setValue(position.positionName)
              this.updatePositionForm.controls['id'].setValue(position.id)
            })
        })
    }

    submitUpdate(){
        this.updateSubscription = this.positionService.update(this.updatePositionForm.value).subscribe(()=>{
            this.router.navigateByUrl(`/positions`)
        })
    }

    ngOnDestroy(): void {

    }
}
