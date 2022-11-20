import { Component } from "@angular/core";
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    providers: []
})
export class RegistrationComponent {

    display: boolean = false

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    showDialog() {
        this.display = true
    }
}