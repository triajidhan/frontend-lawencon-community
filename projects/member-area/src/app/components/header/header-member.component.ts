import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { MenuItem, PrimeNGConfig } from 'primeng/api'
import { BASE_URL } from "projects/constant/base-url"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { PaymentSubscribeService } from "projects/main-area/src/app/service/payment-subscribe.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'header-member',
    templateUrl: './header-member.component.html',
    styleUrls: ['../../../styles.css']
})
export class HeaderMemberComponent implements OnInit, OnDestroy {

    navMenus!: MenuItem[]
    profiles!: MenuItem[]
    resultExtension!: string
    resultFile !: string

    name?: string | null
    photoId?: number | null
    fileDownload = `${BASE_URL.LOCALHOST}/files/download/`
    display: boolean = false

    paymentSubsForm = this.fb.group({
        price: [50000],
        approve: [false],
        file: this.fb.group({
            files: [''],
            ext: ['']
        })
    })

    private premiumSubscription?: Subscription

    constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder,
        private apiService: ApiService, private router: Router,
        private paymentSubscribeService: PaymentSubscribeService) { }

    ngOnInit() {
        this.primengConfig.ripple = true

        if (this.apiService.getPhotoId()) {
            this.photoId = this.apiService.getPhotoId()
        }

        this.navMenus = [
            {
                label: 'Home',
                routerLink: '/homes/threads'
            },
            {
                label: 'Activity',
                routerLink: '/activities/type/all'
            },
            {
                label: 'Settings',
                styleClass: 'settings',
                items: [
                    {
                        label: 'Profile',
                        icon: 'fa-solid fa-user',
                        routerLink: '/profiles/member'
                    },
                    {
                        label: 'Log Out',
                        icon: 'fa-solid fa-power-off'
                    }
                ]
            }
        ]
    }

    fileUpload(event: any): void {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(event.files[0])
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        })

        toBase64(event.files[0].name).then(result => {
            this.resultFile = result.substring(result.indexOf(",") + 1, result.length)
            this.resultExtension = result.split(";")[0].split('/')[1]
        })
    }

    showPopUpDialog() {
        this.display = true
    }

    submitInsert() {
        this.paymentSubsForm.patchValue({
            file: {
                files: this.resultFile,
                ext: this.resultExtension
            }
        })

        this.premiumSubscription = this.paymentSubscribeService.insert(this.paymentSubsForm.value).subscribe(() => {
            this.display = false
        })
    }

    logOut() {
        this.apiService.logOut()
        this.router.navigateByUrl("/login/member")
    }

    ngOnDestroy(): void {
        this.premiumSubscription?.unsubscribe()
    }
}