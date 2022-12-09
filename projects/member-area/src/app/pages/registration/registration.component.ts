import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { PrimeNGConfig } from 'primeng/api'
import { Industry } from "projects/interface/industry"
import { Position } from "projects/interface/position"
import { VerificationCodeService } from "projects/main-area/src/app/service/verivication-code.service"
import { Subscription } from "rxjs"
import { IndustryService } from "projects/main-area/src/app/service/industry.service"
import { PositionService } from "projects/main-area/src/app/service/position.service"
import { UserService } from "projects/main-area/src/app/service/user.service"


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
    private insertMemberSubscription?: Subscription

    positionsRes!: Position[]
    industriesRes!: Industry[]

    positions: any[] = []
    industries: any[] = []

    display: boolean = false

    registerForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
        pass: ['', [Validators.required]],
        company: ['', [Validators.required, Validators.maxLength(100)]],
        industryId: [''],
        positionId: ['']
    })

    verifCodeForm: any = this.fb.group({
        code: ['', [Validators.required]],
    })


    constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder,
        private positionService: PositionService, private industryService: IndustryService,
        private verificationCodeService: VerificationCodeService, private router: Router,
        private userService: UserService) { }


    ngOnInit() {
        this.primengConfig.ripple = true

        this.positionsSubscription = this.positionService.getByIsActiveAll().subscribe(result => {
            this.positionsRes = result
            for (let i = 0; i < this.positionsRes.length; i++) {
                this.positions.push({
                    positionName: this.positionsRes[i].positionName,
                    positionCode: this.positionsRes[i].positionCode,
                    id: this.positionsRes[i].id
                })
            }
        })
        this.industriesSubscription = this.industryService.getByIsActiveAll().subscribe(result => {
            this.industriesRes = result
            for (let i = 0; i < this.industriesRes.length; i++) {
                this.industries.push({
                    industryName: this.industriesRes[i].industryName,
                    industryCode: this.industriesRes[i].industryCode,
                    id: this.industriesRes[i].id
                })
            }
        })
    }

    getVerificationCode() {
        this.verificationCodeSubscription = this.verificationCodeService.generateCode(this.registerForm.value).subscribe(() => {
            this.display = true
        })
    }

    verifCode() {
        this.verifCodeForm.addControl('email', this.fb.control(this.registerForm.get('email')?.value, [Validators.required]))
        this.validateSubscription = this.verificationCodeService.validate(this.verifCodeForm.value).subscribe(result => {
            if (result) {
                this.validateSubscription = this.userService.registerUser(this.registerForm.value).subscribe(() => {
                    this.display = false
                    this.router.navigateByUrl('/login/member')
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.registerSubscription?.unsubscribe()
        this.positionsSubscription?.unsubscribe()
        this.industriesSubscription?.unsubscribe()
        this.verificationCodeSubscription?.unsubscribe()
        this.validateSubscription?.unsubscribe()
        this.insertMemberSubscription?.unsubscribe()
    }
}
