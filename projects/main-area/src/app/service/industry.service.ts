import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Industry } from "projects/interface/industry";

import { Observable } from "rxjs";


@Injectable({
    providedIn:"root"
})

export class IndustryService{

    constructor(private httpClient:HttpClient){}

    getTotalIndustry():Observable<Industry> {
		return this.httpClient.get<Industry>(`${Object.values(BASE_URL)[0]}/industries/total-industry`)
	}
	
	getAll():Observable<Industry>{
		return this.httpClient.get<Industry>(`${Object.values(BASE_URL)[0]}/industries/`)
	}
	
	getById(id:string):Observable<Industry>{
		return this.httpClient.get<Industry>(`${Object.values(BASE_URL)[0]}/industries/${id}/get`)
	}
	
	getByIsActiveAll():Observable<Industry>{
        return this.httpClient.get<Industry>(`${Object.values(BASE_URL)[0]}/industries/is-active-all/`)
	}
	
	getByIsActive(startPosition:number,limit:number):Observable<Industry>{
		return this.httpClient.get<Industry>(`${Object.values(BASE_URL)[0]}/industries/is-active/?startIndustry=${startPosition}&limit=${limit}`)
	}

    insert(industry:Industry):Observable<Industry>{
        return this.httpClient.post<Industry>(`${Object.values(BASE_URL)[0]}/industries`,industry)
    }

    update(industry:Industry):Observable<Industry>{
        return this.httpClient.put<Industry>(`${Object.values(BASE_URL)[0]}/industries`,industry)
    }
}