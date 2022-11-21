import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "projects/constant/base-url"
import { Login } from "projects/interface/login"
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    login(data: any): Observable<Login> {
        return this.http.post<Login>(`${Object.values(BASE_URL)[0]}/login`, data)
    }

}