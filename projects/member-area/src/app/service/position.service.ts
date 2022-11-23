import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { BASE_URL } from "../../../../constant/base-url"


@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/positions?startPosition=0&limit=2`)
    }

    getById(data: any): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/positions/${data}`);
    }
}
