import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})


export class PaymentSubscribeService {

    constructor(private httpClient: HttpClient) { }

    getAll(startPosition: number, limit: number): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes/?startPosition=${startPosition}&limit=${limit}`)
    }

    getById(id: string): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes/id/${id}`)
    }

    getByActivity(activityId: string): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes/activity/?activityId=${activityId}`)
    }

    getByIsActive(startPosition: number, limit: number): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes/is-active/?startPosition=${startPosition}&limit=${limit}`)
    }

    insert(data: any): Observable<any> {
        return this.httpClient.post<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes`, data)
    }

    update(data: any): Observable<any> {
        return this.httpClient.put<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes`, data)
    }
}