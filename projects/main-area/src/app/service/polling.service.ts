import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Polling } from "projects/interface/polling";
import { Observable } from "rxjs";


@Injectable({
	providedIn: "root"
})

export class PollingService {

	constructor(private httpClient: HttpClient) { }

	getById(id: string): Observable<Polling> {
		return this.httpClient.get<Polling>(`${Object.values(BASE_URL)[0]}/pollings/id/${id}`)
	}


	getByIsActive(startPosition: number, limit: number): Observable<Polling> {
		return this.httpClient.get<Polling>(`${Object.values(BASE_URL)[0]}/pollings/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

	update(data: any): Observable<Polling> {
		return this.httpClient.put<Polling>(`${Object.values(BASE_URL)[0]}/pollings`, data)
	}
}