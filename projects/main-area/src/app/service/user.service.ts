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

    getAll(): Observable<any> {
      return this.http.get<any>(`${Object.values(BASE_URL)[0]}/users/`)
    }
  
    getById(id: string): Observable<User> {
      return this.http.get<User>(`${Object.values(BASE_URL)[0]}/users/id/${id}`)
    }
  
    getByRoleCode(roleCode: string): Observable<User> {
      return this.http.get<User>(`${Object.values(BASE_URL)[0]}/users/role/?roleCode=${roleCode}`)
    }

    getByEmail(email: string): Observable<User> {
      return this.http.get<User>(`${Object.values(BASE_URL)[0]}/users/email/?email=${email}`)
    }

    getTotal(){
      return this.http.get<User>(`${Object.values(BASE_URL)[0]}/users/total-user`)
    }

    getTotalByRole(roleCode: string){
      return this.http.get<User>(`${Object.values(BASE_URL)[0]}/users/total-user/role-code/?roleCode=${roleCode}`)
    }
  
    getByIsActive(startPosition: number, limit: number): Observable<any> {
      return this.http.get<any>(`${Object.values(BASE_URL)[0]}/users/is-active/?startPosition=${startPosition}&limit=${limit}`)
    }
    
    insert(data:any):Observable<User>{
        return this.http.post<User>(`${Object.values(BASE_URL)[0]}/users`,data)
    }

    update(data:any):Observable<User>{
        return this.http.put<User>(`${Object.values(BASE_URL)[0]}/users`,data)
    }
  }
