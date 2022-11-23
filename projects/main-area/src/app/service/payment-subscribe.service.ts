import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { PaymentActivityDetail } from "projects/interface/payment-activity-detail";
import { PaymentSubscribe } from "projects/interface/payment-subscribe";
import { Observable } from "rxjs";


@Injectable({
    providedIn:"root"
})


export class PaymentSubscribeService{

    constructor(private httpClient:HttpClient){}

    getAll(startPosition:number,limit:number):Observable<PaymentSubscribe>{
		return this.httpClient.get<PaymentSubscribe>(`${Object.values(BASE_URL)[0]}/payment-subscribes/?startPosition=${startPosition}&limit=${limit}`)
	}

	getById(id:string):Observable<PaymentActivityDetail>{
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-subscribes/${id}/get`)
	}

    getByActivity(activityId:string):Observable<PaymentActivityDetail>{
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-subscribes/activity/?activityId=${activityId}`)
	}

	getByIsActive(startPosition:number,limit:number):Observable<PaymentActivityDetail>{
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

    insert(data:any):Observable<PaymentActivityDetail>{
        return this.httpClient.post<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details`,data)
    }

    update(data:any):Observable<PaymentActivityDetail>{
        return this.httpClient.put<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details`,data)
    }
}