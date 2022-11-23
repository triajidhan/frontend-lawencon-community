import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class Role{

    constructor(private httpClient:HttpClient){}

    getAll(startPosition:number,limit:number):Observable<Role>{
        return this.httpClient.get<Role>(`${Object.values(BASE_URL)[0]}/roles/?startPosition=${startPosition}&limit=${limit}`) 
    }

    getByRoleCode(roleCode:string):Observable<Role>{
        return this.httpClient.get<Role>(`${Object.values(BASE_URL)[0]}/roles/${roleCode}/get`)
    }
}