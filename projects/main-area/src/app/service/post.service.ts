import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "projects/constant/base-url"
import { Post } from "projects/interface/post"
import { Observable } from "rxjs"

@Injectable({
    providedIn: "root"
})

export class PostService {
    
    constructor(private httpClient: HttpClient) { }
    
    
    
    getByUserAndOrder(userId: string, startPosition: number, limit: number, asc: boolean): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/posts/users-order/?userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${asc}`)
    }

    getById(id: string): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/posts/id/${id}`)
    }




 

    getIsActiveAndOrder(startPosition: number, limit: number, asc: boolean): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/posts/is-active-order/?startPosition=${startPosition}&limit=${limit}&asc=${asc}`)
    }


    insert(data: any): Observable<any> {
        return this.httpClient.post<Post>(`${Object.values(BASE_URL)[0]}/posts/`, data)
    }

    update(data: any): Observable<any> {
        return this.httpClient.put<Post>(`${Object.values(BASE_URL)[0]}/posts/`, data)
    }
}