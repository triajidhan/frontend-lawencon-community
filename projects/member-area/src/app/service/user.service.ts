import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "projects/constant/base-url"
import { Login } from "projects/interface/login"
import { User } from "projects/interface/user"
import { Observable } from "rxjs"



@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    registerUser(data: any): Observable<User> {
        return this.http.post<User>(`${BASE_URL.LOCALHOST}/users/register/`, data);
    }

    getById(data: any): Observable<User> {
        return this.http.get<User>(`${BASE_URL.LOCALHOST}/users/id/${data}`);
    }

    update(data: any): Observable<any> {
        return this.http.put<User>(`${BASE_URL.LOCALHOST}/users`, data);
    }
}