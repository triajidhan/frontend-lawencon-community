import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { PartisipatianReport } from "projects/interface/report-partisipation";
import { TotalIncomeReport } from "projects/interface/report-total-income";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class ReportService{

    constructor(private httpClient: HttpClient) { }
    
	getReportPartisipationMember(beginDate: string, finishDate: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/reports/payment-partisipation-member/?beginDate=${beginDate}&finishDate=${finishDate}`, {responseType:'blob' as 'json',observe: 'response'})
	}

	getReportPartisipationSuper(beginDate: string, finishDate: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/reports/payment-partisipation-super/?beginDate=${beginDate}&finishDate=${finishDate}`, {responseType:'blob' as 'json',observe: 'response'})
	}

	getReportIncomeMember(beginDate: string, finishDate: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/reports/payment-total-income-member/?beginDate=${beginDate}&finishDate=${finishDate}`, {responseType:'blob' as 'json',observe: 'response'})
	}

	getReportIncomeSuper(beginDate: string, finishDate: string): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/reports/payment-total-income-super/?beginDate=${beginDate}&finishDate=${finishDate}`, {responseType:'blob' as 'json',observe: 'response'})
	}
}