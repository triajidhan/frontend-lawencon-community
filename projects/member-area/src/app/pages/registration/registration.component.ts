import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PrimeNGConfig } from 'primeng/api';
import { Industry } from "projects/interface/industry";
import { Position } from "projects/interface/position";
import { Subscription } from "rxjs";
import { IndustryService } from "../../service/industry.service";
import { PositionService } from "../../service/position.service";


@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    providers: []
})
export class RegistrationComponent implements OnInit, OnDestroy {

    private registerSubscription?: Subscription
    private positionsSubscription?: Subscription
    private industriesSubscription?: Subscription

    positionsRes!: Position[]
    industriesRes!: Industry[]

    positions: any[] = []
    industries: any[] = []

    display: boolean = false

    registerForm = this.fb.group({
        fullName: ['', Validators.required, Validators.maxLength(30)],
        email: ['', Validators.required, Validators.email, Validators.maxLength(50)],
        pass: ['', Validators.required],
        company: ['', Validators.required, Validators.maxLength(100)],
        industry: ['', Validators.required],
        position: ['', Validators.required]
    })


    constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder,
        private positionService: PositionService, private industryService: IndustryService) { }


    ngOnInit() {
        this.primengConfig.ripple = true

        this.positionsSubscription = this.positionService.getAll().subscribe(result => {
            this.positionsRes = result
            for (let i = 0; i < this.positionsRes.length; i++) {
                this.positions.push({
                    name: this.positionsRes[i].positionName,
                    code: this.positionsRes[i].positionCode,
                    id: this.positionsRes[i].id
                })
            }
        })
        this.industriesSubscription = this.industryService.getAll().subscribe(result => {
            this.industriesRes = result
            for (let i = 0; i < this.industriesRes.length; i++) {
                this.industries.push({
                    name: this.industriesRes[i].industryName,
                    code: this.industriesRes[i].industryCode,
                    id: this.industriesRes[i].id
                })
            }
        })
    }

    showDialog() {
        this.display = true
    }

    ngOnDestroy(): void {
        this.registerSubscription?.unsubscribe()
        this.positionsSubscription?.unsubscribe()
        this.industriesSubscription?.unsubscribe()
    }


}