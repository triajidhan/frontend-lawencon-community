import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../../../../projects/constant/base-url"
import { Activity } from "../../../../../projects/interface/activity"
import { Observable } from "rxjs";


@Injectable({
	providedIn: "root"
})


export class ActivityService {

	constructor(private httpClient: HttpClient) { }

	getById(activityId: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/id/${activityId}`)
	}

	getByActivityTypeCodeOrder(activityTypeCode: string, startPosition: number, limit: number,ascending:boolean): Observable<Activity[]> {
		return this.httpClient.get<Activity[]>(`${Object.values(BASE_URL)[0]}/activities/activity-type-code-order/?activityTypeCode=${activityTypeCode}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getByIsActiveAndOrder(startPosition: number, limit: number, ascending: boolean): Observable<Activity[]> {
		return this.httpClient.get<Activity[]>(`${Object.values(BASE_URL)[0]}/activities/is-active-order/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getByUser(userId:string,startPosition: number, limit: number, ascending: boolean): Observable<Activity[]> {
		return this.httpClient.get<Activity[]>(`${Object.values(BASE_URL)[0]}/activities/users/?userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getByUserAndActivityTypeCode(userId:string,activityTypeCode:string,startPosition: number, limit: number, ascending: boolean): Observable<Activity[]> {
		return this.httpClient.get<Activity[]>(`${Object.values(BASE_URL)[0]}/activities/users-activity-type-code/?userId=${userId}&activityTypeCode=${activityTypeCode}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	insert(data: any): Observable<any> {
		return this.httpClient.post<any>(`${Object.values(BASE_URL)[0]}/activities`, data)
	}
}