import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { PaymentActivityDetail } from "projects/interface/payment-activity-detail";
import { Observable } from "rxjs";


@Injectable({
	providedIn: "root"
})


export class PaymentActivityDetailService {

	constructor(private httpClient: HttpClient) { }


	getById(id: string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/id/${id}`)
	}

	getByUser(userId: string, startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/users/?userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getByActivityTypeAndUser(activityTypeId: string, userId: string, startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/activity-type-user/?activityTypeId=${activityTypeId}&userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getByIsActiveTrueAndApprovedFalse(startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/is-active-approve-false/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getTotalByIsActiveTrueAndApprovedFalse(): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-is-active-approve-false/`)
	}

	getByPaymentApproved(startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/payment-approved/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getTotalByPaymentApproved(): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-payment-approved/`)
	}

	getTotalByPaymentApprovedAndActivityTypeId(activityTypeId:string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-payment-approved-activity-type/?activityType=${activityTypeId}`)
	}

	getByPaymentReject(startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/payment-reject/?startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getTotalByPaymentReject(): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-payment-reject/`)
	}


	
	getReportPartisipationMember(beginDate: string, finishDate: string, startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/partisipatian-member/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}


	getTotalByReportPartisipationMember(beginDate: string, finishDate: string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-partisipatian-member/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}

	getReportPartisipationSuper(beginDate: string, finishDate: string, startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/partisipatian-super/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}


	getTotalByReportPartisipationSuper(beginDate: string, finishDate: string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-partisipatian-super/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}


	getReportIncomeMember(beginDate: string, finishDate: string, startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-income-member/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getTotalByReportIncomeMember(beginDate: string, finishDate: string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-total-income-member/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}



	getReportIncomeSuper(beginDate: string, finishDate: string, startPosition: number, limit: number, ascending: boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-income-super/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}


	getTotalByReportIncomeSuper(beginDate: string, finishDate: string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-total-income-super/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}


	insert(data: any): Observable<any> {
		return this.httpClient.post<any>(`${Object.values(BASE_URL)[0]}/payment-activity-details`, data)
	}

	update(data: any): Observable<PaymentActivityDetail> {
		return this.httpClient.put<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details`, data)
	}
}