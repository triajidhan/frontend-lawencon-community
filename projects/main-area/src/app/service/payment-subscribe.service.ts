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

    getAll(startPosition: number, limit: number): Observable<PaymentSubscribe[]> {
        return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/?startPosition=${startPosition}&limit=${limit}`)
    }

    getById(id: string): Observable<PaymentSubscribe> {
        return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/id/${id}`)
    }

    getByIsActive(startPosition: number, limit: number): Observable<PaymentSubscribe[]> {
        return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/is-active/?startPosition=${startPosition}&limit=${limit}`)
    }

    getTotalPaymentSubscribe(): Observable<PaymentSubscribe> {
        return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/total/`)
    }

    getByIsActiveTrueAndApprovedFalse(startPosition: number, limit: number,ascending:boolean): Observable<PaymentSubscribe[]>{
		return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/is-active-approve-false/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

    getTotalByIsActiveTrueAndApprovedFalse(): Observable<PaymentSubscribe>{
		return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/total-is-active-approve-false/`)
	}

    getByIsActiveTrueAndApprovedTrue(startPosition: number, limit: number,ascending:boolean): Observable<PaymentSubscribe[]>{
		return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/is-active-approve-true/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

    getTotalByIsActiveTrueAndApprovedTrue(): Observable<PaymentSubscribe>{
		return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/total-is-active-approve-true/`)
	}

	getByIsActiveFalse(startPosition: number, limit: number,ascending:boolean): Observable<PaymentSubscribe[]>{
		return this.httpClient.get<PaymentSubscribe[]>(`${Object.values(BASE_URL)[0]}/payment-subscribes/is-active-false/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

    insert(data: any): Observable<any> {
        return this.httpClient.post<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes`, data)
    }

    update(data: any): Observable<any> {
        return this.httpClient.put<any>(`${Object.values(BASE_URL)[0]}/payment-subscribes`, data)
    }
}