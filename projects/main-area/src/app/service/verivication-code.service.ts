import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "projects/constant/base-url"
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class VerificationCodeService {

    constructor(private http: HttpClient) { }

    generateCode(data: any): Observable<any> {
        return this.http.post<any>(`${BASE_URL.LOCALHOST}/verification-code/generate`, data)
    }

    validate(data: any): Observable<any> {
        return this.http.post<any>(`${BASE_URL.LOCALHOST}/verification-code/validate`, data)
    }
}