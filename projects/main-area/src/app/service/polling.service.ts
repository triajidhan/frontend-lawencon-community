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

	getAll(startPosition: number, limit: number): Observable<Polling> {
		return this.httpClient.get<Polling>(`${Object.values(BASE_URL)[0]}/pollings/?startPosition=${startPosition}&limit=${limit}`)
	}

	getById(id: string): Observable<Polling> {
		return this.httpClient.get<Polling>(`${Object.values(BASE_URL)[0]}/pollings/id/${id}`)
	}

	getByPost(postId: string): Observable<Polling> {
		return this.httpClient.get<Polling>(`${Object.values(BASE_URL)[0]}/pollings/posts/postId=${postId}`)
	}

	getByUser(userId: string): Observable<Polling> {
		return this.httpClient.get<Polling>(`${Object.values(BASE_URL)[0]}/pollings/users/userId=${userId}`)
	}

	getByIsActive(startPosition: number, limit: number): Observable<Polling> {
		return this.httpClient.get<Polling>(`${Object.values(BASE_URL)[0]}/pollings/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

	insert(data: any): Observable<Polling> {
		return this.httpClient.post<Polling>(`${Object.values(BASE_URL)[0]}/pollings`, data)
	}

	update(data: any): Observable<Polling> {
		return this.httpClient.put<Polling>(`${Object.values(BASE_URL)[0]}/pollings`, data)
	}
}