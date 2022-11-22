import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Industry } from "../../../../interface/industry"
import { BASE_URL } from "../../../../constant/base-url"

@Injectable({
    providedIn: 'root'
})
export class IndustryService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/industries?startPosition=0&limit=1`)
    }

    getById(data: number): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/industries/${data}`);
    }
}