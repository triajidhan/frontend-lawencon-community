import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Polling } from "projects/interface/polling";
import { PollingStatus } from "projects/interface/polling-status";
import { Observable } from "rxjs";


@Injectable({
    providedIn:"root"
})

export class PollingStatusService{

    constructor(private httpClient:HttpClient){}

    getAll():Observable<PollingStatus>{
		return this.httpClient.get<PollingStatus>(`${Object.values(BASE_URL)[0]}/polling-status/`)
	}

	getById(id:string):Observable<PollingStatus>{
		return this.httpClient.get<PollingStatus>(`${Object.values(BASE_URL)[0]}/polling-status/id/${id}`)
	}

    getByPost(postId:string):Observable<PollingStatus>{
		return this.httpClient.get<PollingStatus>(`${Object.values(BASE_URL)[0]}/polling-status/posts/postId=${postId}`)
	}

    getByUser(userId:string):Observable<PollingStatus>{
		return this.httpClient.get<PollingStatus>(`${Object.values(BASE_URL)[0]}/polling-status/users/userId=${userId}`)
	}

	getByIsActive(startPosition:number,limit:number):Observable<PollingStatus>{
		return this.httpClient.get<PollingStatus>(`${Object.values(BASE_URL)[0]}/polling-status/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

}