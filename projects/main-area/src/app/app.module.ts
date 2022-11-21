import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTokenInterceptor } from './filter/filter-token.interceptor';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent } from './pages/login/login.component';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { RouterModule } from '@angular/router'



@NgModule({
  declarations: [
    AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
=======
    HttpClientModule
>>>>>>> 03edb81d63432027f26e6f5fd925b0cb5cbec60e
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: FilterTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
