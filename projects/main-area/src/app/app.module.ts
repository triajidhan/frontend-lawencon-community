import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FilterTokenInterceptor } from './filter/filter-token.interceptor'
import { AppComponent } from './app.component'
import { AppRouting } from './app.routing'
import { LoginComponent } from './pages/login/login.component'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { RouterModule } from '@angular/router'
import { ToastrModule } from 'ngx-toastr'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { PasswordModule } from 'primeng/password'

@NgModule({
  declarations: [
    AppComponent, LoginComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: FilterTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
