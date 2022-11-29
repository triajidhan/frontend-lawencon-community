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

	getAll(startPosition: number, limit: number): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/?startPosition=${startPosition}&limit=${limit}`)
	}

	getById(id: string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/id/${id}`)
	}

	getByActivityAll(activityId: string): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/activity-all/?activityId=${activityId}`)
	}

	getByActivity(activityId: string,startPosition: number, limit: number): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/activity/?activityId=${activityId}&startPosition=${startPosition}&limit=${limit}`)
	}

	getByUser(userId:string,startPosition: number, limit: number,ascending:boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/users/?userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getByActivityTypeAndUser(activityTypeId: string,userId:string,startPosition: number, limit: number,ascending:boolean): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/activity-type-user/?activityTypeId=${activityTypeId}&userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
	}

	getTotalByActivity(activityId: string): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-activity/?activityId=${activityId}`)
	}

	getByIsActive(startPosition: number, limit: number): Observable<PaymentActivityDetail[]> {
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

	getTotalPaymentActivity(): Observable<PaymentActivityDetail> {
		return this.httpClient.get<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total/`)
	}

	getReportPartisipationMember(beginDate:string,finishDate:string,startPosition: number, limit: number):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/partisipatian-member/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}`)
	}

	getReportPartisipationMemberAll(beginDate:string,finishDate:string):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/partisipatian-member-all/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}

	getReportPartisipationSuper(beginDate:string,finishDate:string,startPosition: number, limit: number):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/partisipatian-super/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}`)
	}

	getReportPartisipationSuperAll(beginDate:string,finishDate:string):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/partisipatian-super-all/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}


	getReportIncomeMember(beginDate:string,finishDate:string,startPosition: number, limit: number):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-income-member/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}`)
	}

	getReportIncomeAllMember(beginDate:string,finishDate:string):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-income-member-all/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}


	getReportIncomeSuper(beginDate:string,finishDate:string,startPosition: number, limit: number):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-income-super/?beginDate=${beginDate}&finishDate=${finishDate}&startPosition=${startPosition}&limit=${limit}`)
	}

	getReportIncomeAllSuper(beginDate:string,finishDate:string):Observable<PaymentActivityDetail[]>{
		return this.httpClient.get<PaymentActivityDetail[]>(`${Object.values(BASE_URL)[0]}/payment-activity-details/total-income-super-all/?beginDate=${beginDate}&finishDate=${finishDate}`)
	}

	insert(data: any): Observable<any> {
		return this.httpClient.post<any>(`${Object.values(BASE_URL)[0]}/payment-activity-details`, data)
	}

	update(data: any): Observable<PaymentActivityDetail> {
		return this.httpClient.put<PaymentActivityDetail>(`${Object.values(BASE_URL)[0]}/payment-activity-details`, data)
	}
}