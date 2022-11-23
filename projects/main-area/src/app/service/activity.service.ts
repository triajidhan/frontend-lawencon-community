import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../../../../projects/constant/base-url"
import { Activity } from "../../../../../projects/interface/activity"
import { Observable } from "rxjs";


Injectable({
    providedIn:"root"
})


export class ActivityService{

    constructor(private httpClient:HttpClient){}


	getAll(startPosition:number,limit:number):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/?startPosition=${startPosition}&limit=${limit}`)
	}

	getById(activityId:string):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/${activityId}/get/`)
	}

	getByActivityCode(activityCode:string):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/activity-code/?activityCode=${activityCode}`)
	}

	getTotalActivity():Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/total-activity/`)
	}

	getByActivityType(activityTypeId:string,startPosition:number,limit:number):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/activity-type/?activityTypeId=${activityTypeId}&startPosition=${startPosition}&limit=${limit}`)
	}

	getTotalByActivityType(activityTypeId:string):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/total-activity-type/?${activityTypeId}`)
	}
	
	getByActivityTypeCode(activityTypeCode:string,startPosition:number,limit:number):Observable<Activity>{
	return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/activity-type-code/?activityTypeCode=${activityTypeCode}&startPosition=${startPosition}&limit=${limit}`)
	}

    getTotalByActivityCode(activityTypeCode:string):Observable<Activity> {
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/total-activity-type-code/?activityTypeCode=${activityTypeCode}`)
	}
	
	getByIsActive(startPosition:number,limit:number):Observable<Activity>{
		return this.httpClient.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}
	
    insert(activity:Activity):Observable<Activity>{
        return this.httpClient.post<Activity>(`${Object.values(BASE_URL)[0]}/activities`,activity)
    } 

}