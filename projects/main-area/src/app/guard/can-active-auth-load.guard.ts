import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ROLE_CODE } from "../constant/role-type";
import { ApiService } from "../service/api.service";

@Injectable({
    providedIn: 'root'
})

export class CanActiveAuth implements CanActivate{

    constructor(private router: Router,private apiService:ApiService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const data = this.apiService.getRoleCode()

        if(data){


            if(data == ROLE_CODE.SUPER_ADMIN.toString()){
                this.router.navigateByUrl('/dashboard/super')
            }else if(data == ROLE_CODE.MEMBER.toString()){
                this.router.navigateByUrl('/homes/type/threads')
            }else if(data == ROLE_CODE.ADMIN.toString()){
                this.router.navigateByUrl('/dashboard/admin')
            }
            return false
        }else{
            return true
        }
    }
}
