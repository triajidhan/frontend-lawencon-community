import { Injectable } from "@angular/core";
import { CanLoad, CanActivate, Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ROLE_CODE } from "../constant/role-type";
import { ApiService } from "../service/api.service";

@Injectable({
    providedIn:'root'
})

export class MemberGuard implements CanLoad,CanActivate{

    constructor(private router:Router, private apiService:ApiService){}


    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const token = this.apiService.getToken();
        const role = this.apiService.getRoleCode();

        if(token){
            if(role == ROLE_CODE.ADMIN.toString()){
                this.router.navigateByUrl("/dashboard/admin")
            }else if(role == ROLE_CODE.SUPER_ADMIN.toString()){
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
            if(role == ROLE_CODE.ADMIN.toString()){
                this.router.navigateByUrl("/dashboard/admin")
            }else if(role == ROLE_CODE.SUPER_ADMIN.toString()){
                this.router.navigateByUrl("/dashboard/super-admin")
            }

            return true
        }

        this.router.navigateByUrl("/login/member")
        return false
    }

}