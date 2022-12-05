import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, UrlSegment, RouterStateSnapshot, Router } from "@angular/router";
import { ROLE_CODE } from "../constant/role-type";
import { ApiService } from "../service/api.service";


@Injectable({
    providedIn:'root'
})

export class AdminGuard implements CanLoad,CanActivate{

    constructor(private router:Router, private apiService:ApiService){}


    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const token = this.apiService.getToken();
        const role = this.apiService.getRoleCode();

        if(token){
            if(role == ROLE_CODE.MEMBER){
                this.router.navigateByUrl("/homes/type/threads")
            }else if(role == ROLE_CODE.SUPER_ADMIN){
                this.router.navigateByUrl("/dashboard/super-admin")
            }

            return true
        }

        this.router.navigateByUrl("/login/admin")
        return false
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.apiService.getToken();
        const role = this.apiService.getRoleCode();

        if(token){
            if(role == ROLE_CODE.MEMBER.toString()){
                this.router.navigateByUrl("/homes/type/threads")
            }else if(role == ROLE_CODE.SUPER_ADMIN.toString()){
                this.router.navigateByUrl("/dashboard/super-admin")
            }

            return true
        }

        this.router.navigateByUrl("/login/admin")
        return false
    }

}