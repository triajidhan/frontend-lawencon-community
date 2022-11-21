import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "projects/constant/base-url"
import { Industry } from "projects/interface/industry"
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Industry[]> {
        return this.http.get<Industry[]>(`${BASE_URL.LOCALHOST}/industries`)
    }

    getById(data: number): Observable<Industry> {
        return this.http.get<Industry>(`${BASE_URL.LOCALHOST}/industries/${data}`);
    }
}