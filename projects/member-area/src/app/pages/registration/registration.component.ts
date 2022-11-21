import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    providers: []
})
export class RegistrationComponent {

    display: boolean = false

    registerForm = this.fb.group({
        fullName: ['', Validators.required, Validators.maxLength(30)],
        email: ['', Validators.required, Validators.email, Validators.maxLength(50)],
        pass: ['', Validators.required],
        company: ['', Validators.required, Validators.maxLength(100)],
        industry: ['', Validators.required],
        position: ['', Validators.required]
    })

    constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    showDialog() {
        this.display = true
    }
}