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

    login(data: any): Observable<Login> {
        return this.http.post<Login>(`${BASE_URL.LOCALHOST}/login`, data)
    }

    getTotalUser():Observable<User>{
      return this.http.get<User>(`${BASE_URL.LOCALHOST}/users/total-user`)
    }

  }
