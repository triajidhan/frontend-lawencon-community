import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Activity } from "projects/interface/activity";
import { ResponseMessage } from "projects/interface/response-messge";
import { Observable } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class ActivityService{

  constructor(private http: HttpClient) {}

  getAll(startPosition: number, limit: number): Observable<Activity> {
    return this.http.get<Activity>(`${Object.values(BASE_URL)[0]}/activities?startPostion=${startPosition}&limit=${limit}`)
  }

  getByCode(code : string): Observable<Activity> {
    return this.http.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/activity-code?activityCode=${code}`)
  }

  getByActivity(id : string, startPosition : number, limit :number): Observable<Activity> {
    return this.http.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/activity-type?activityTypeId=${id}&startPosition=${startPosition}&limit=${limit}}`)
  }

  getTotalByActivityCode(activityTypeCode:string): Observable<Activity>{
    return this.http.get<Activity>(`${Object.values(BASE_URL)[0]}/activities/total-activity-type-code?activityTypeCode=${activityTypeCode}`)
  }

  insert(data: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/activities`, data)
  }

  }
