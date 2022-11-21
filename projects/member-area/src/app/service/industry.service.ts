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

    getAll(): Observable<Industry[]> {
        return this.http.get<Industry[]>(`${BASE_URL.LOCALHOST}/industries`)
    }

    getById(data: number): Observable<Industry> {
        return this.http.get<Industry>(`${BASE_URL.LOCALHOST}/industries/${data}`);
    }
}