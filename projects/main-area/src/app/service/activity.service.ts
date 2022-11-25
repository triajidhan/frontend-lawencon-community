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


	getAll(startPosition: number, limit: number): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/?startPosition=${startPosition}&limit=${limit}`)
	}

	getById(activityId: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/id/${activityId}`)
	}

	getByActivityCode(activityCode: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/activity-code/?activityCode=${activityCode}`)
	}

	getTotalActivity(): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/total-activity/`)
	}

	getByActivityType(activityTypeId: string, startPosition: number, limit: number): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/activity-type/?activityTypeId=${activityTypeId}&startPosition=${startPosition}&limit=${limit}`)
	}

	getTotalByActivityType(activityTypeId: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/total-activity-type/?${activityTypeId}`)
	}

	getByActivityTypeCode(activityTypeCode: string, startPosition: number, limit: number): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/activity-type-code/?activityTypeCode=${activityTypeCode}&startPosition=${startPosition}&limit=${limit}`)
	}

	getTotalByActivityCode(activityTypeCode: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/total-activity-type-code/?activityTypeCode=${activityTypeCode}`)
	}

	getByIsActive(startPosition: number, limit: number): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

	getByIsActiveAndOrder(startPosition: number, limit: number, ascending: boolean): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/activities/is-active-order/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	insert(data: any): Observable<any> {
		return this.httpClient.post<any>(`${Object.values(BASE_URL)[0]}/activities`, data)
	}
}