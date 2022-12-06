import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Industry } from "projects/interface/industry";
import { Observable } from "rxjs";


@Injectable({
	providedIn: "root"
})


export class IndustryService {

	constructor(private httpClient: HttpClient) { }

	getAll(): Observable<Industry[]> {
		return this.httpClient.get<Industry[]>(`${Object.values(BASE_URL)[0]}/industries/`)
	}

	getById(id: string): Observable<Industry> {
		return this.httpClient.get<Industry>(`${Object.values(BASE_URL)[0]}/industries/id/${id}`)
	}

	getTotalIndustry(): Observable<Industry> {
		return this.httpClient.get<Industry>(`${Object.values(BASE_URL)[0]}/industries/total-industry`)
	}

	getByIsActiveAll(): Observable<Industry[]> {
		return this.httpClient.get<Industry[]>(`${Object.values(BASE_URL)[0]}/industries/is-active-all/`)
	}

	getByIsActive(startPosition: number, limit: number): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/industries/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

	insert(data: any): Observable<Industry> {
		return this.httpClient.post<Industry>(`${Object.values(BASE_URL)[0]}/industries`, data)
	}

	update(data: any): Observable<Industry> {
		return this.httpClient.put<Industry>(`${Object.values(BASE_URL)[0]}/industries`, data)
	}

}