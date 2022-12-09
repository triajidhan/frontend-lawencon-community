import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { PaymentSubscribe } from "projects/interface/payment-subscribe";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})


export class PaymentSubscribeService {

    constructor(private httpClient: HttpClient) { }

    getById(id: string): Observable<PaymentSubscribe> {
        return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/id/${id}`)
    }

    getByIsActiveTrueAndApprovedFalse(startPosition: number, limit: number, ascending: boolean): Observable<PaymentSubscribe[]> {
        return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/is-active-approve-false/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
    }

    getTotalByIsActiveTrueAndApprovedFalse(): Observable<PaymentSubscribe> {
        return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/total-is-active-approve-false/`)
    }

    getByPaymentApproved(startPosition: number, limit: number, ascending: boolean): Observable<PaymentSubscribe[]> {
        return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/payment-approved/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
    }

    getTotalByPaymentApproved(): Observable<PaymentSubscribe> {
        return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/total-payment-approved/`)
    }

    getByPaymentReject(startPosition: number, limit: number, ascending: boolean): Observable<PaymentSubscribe[]> {
        return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/payment-reject/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
    }

    getTotalByPaymentReject(): Observable<PaymentSubscribe> {
        return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/total-payment-reject/`)
    }

    insert(data: any): Observable<any> {
        return this.httpClient.post<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes`, data)
    }

    update(data: any): Observable<any> {
        return this.httpClient.put<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes`, data)
    }
}