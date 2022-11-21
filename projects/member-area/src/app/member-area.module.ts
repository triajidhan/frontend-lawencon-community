import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { DropdownModule } from 'primeng/dropdown'
import { RouterModule } from "@angular/router"
import { DialogModule } from 'primeng/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        RegistrationComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        DropdownModule,
        DialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers: []
})

export class MemberAreaModule { }