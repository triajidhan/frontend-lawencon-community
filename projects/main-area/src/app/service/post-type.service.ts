import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "projects/constant/base-url"
import { Observable } from "rxjs"

@Injectable({
    providedIn: "root"
})

export class PostTypeService {

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/post-types/`)
    }

    getById(id:string): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/post-types/id/${id}`)
    }

    getByPostTypeCode(id:string): Observable<any> {
        return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/post-types/post-code/postTypeCode=${id}`)
    }
}