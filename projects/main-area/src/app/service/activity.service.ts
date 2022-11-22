import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Activity } from "projects/interface/activity";
import { Observable } from "rxjs";


Injectable({
    providedIn:"root"
})


export class ActivityService{

    constructor(private httpClient:HttpClient){}

    getTotalByActivityCode(activityTypeCode:string):Observable<Activity> {
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/total-activity-type-code/?activityTypeCode=${activityTypeCode}`)
	}
	
	getAll(startPosition:number,limit:number):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/?startPosition=${startPosition}&limit=${limit}`)
	}
	
	getByActivityType(activityTypeId:string,startPosition:number,limit:number):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/total-activity-type-code/?activityTypeId=${activityTypeId}&startPosition=${startPosition}&limit=${limit}`)
	}
	

    insert(activity:Activity):Observable<Activity>{
        return this.httpClient.post<Activity>(`${Object.values(BASE_URL)[0]}/activities`,activity)
    }

  
}