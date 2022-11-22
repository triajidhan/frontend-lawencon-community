import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PrimeNGConfig } from 'primeng/api';
import { Industry } from "projects/interface/industry";
import { Position } from "projects/interface/position";
import { Subscription } from "rxjs";
import { IndustryService } from "../../service/industry.service";
import { PositionService } from "../../service/position.service";
import { VerificationCodeService } from "../../service/verivication-code.service";


@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    providers: []
})
export class RegistrationComponent implements OnInit, OnDestroy {

    private registerSubscription?: Subscription
    private positionsSubscription?: Subscription
    private industriesSubscription?: Subscription
    private verificationCodeSubscription?: Subscription
    private validateSubscription?: Subscription

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

    verifCode: any = this.fb.group({
        code: ['', [Validators.required]],
    })


    constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder,
        private positionService: PositionService, private industryService: IndustryService,
        private verificationCodeService: VerificationCodeService) { }


    ngOnInit() {
        this.primengConfig.ripple = true

        this.positionsSubscription = this.positionService.getAll().subscribe(result => {
            console.log(result);
            this.positionsRes = result
            for (let i = 0; i < this.positionsRes.length; i++) {
                this.positions.push({
                    positionName: this.positionsRes[i].positionName,
                    positionCode: this.positionsRes[i].positionCode,
                    id: this.positionsRes[i].id
                })
            }
        })
        this.industriesSubscription = this.industryService.getAll().subscribe(result => {
            this.industriesRes = result
            for (let i = 0; i < this.industriesRes.length; i++) {
                this.industries.push({
                    industryName: this.industriesRes[i].industryName,
                    industryCode: this.industriesRes[i].industryCode,
                    id: this.industriesRes[i].id
                })
            }
            console.log(this.industries);
        })
    }

    getVerivicationCode() {
        this.display = true

    }

    // clickVerify() {
    //     this.verifCode.addControl('email', this.fb.control(this.registerForm.value.email, [Validators.required]))
    //     this.verificationCodeSubscription = this.verificationCodeService.validate(this.verifCode.value).subscribe(u => {
    //         if (u) {
    //             this.registerSubscription = this.userService.register(this.registerForm.value).subscribe(() => { })
    //             this.signUpView = false
    //             this.verificationSuccess = true
    //         }
    //     })
    // }

    ngOnDestroy(): void {
        this.registerSubscription?.unsubscribe()
        this.positionsSubscription?.unsubscribe()
        this.industriesSubscription?.unsubscribe()
        this.verificationCodeSubscription?.unsubscribe()
        this.validateSubscription?.unsubscribe()
    }


}