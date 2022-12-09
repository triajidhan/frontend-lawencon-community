import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { DropdownModule } from 'primeng/dropdown'
import { RouterModule } from "@angular/router"
import { ToastrModule } from 'ngx-toastr'
import { DialogModule } from 'primeng/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from "@angular/forms"
import { PasswordModule } from 'primeng/password'


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
        ReactiveFormsModule,
        PasswordModule,
        ToastrModule.forRoot()
    ]

})

export class MemberAreaModule { }
