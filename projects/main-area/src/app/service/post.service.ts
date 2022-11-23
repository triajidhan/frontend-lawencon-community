import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Post } from "projects/interface/post";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class PostService{

    constructor(private httpClient:HttpClient){}

    getAll(startPosition:number,limit:number): Observable<Post>{
        return this.httpClient.get<Post>(`${Object.values(BASE_URL)[0]}/posts/?startPosition=${startPosition}&limit=${limit}`)
    }

    getByUser(userId:string): Observable<Post>{
        return this.httpClient.get<Post>(`${Object.values(BASE_URL)[0]}/posts/user/?userId=${userId}`)
    }

    getByPost(postCode:string):Observable<Post>{
        return this.httpClient.get<Post>(`${Object.values(BASE_URL)[0]}/posts/post-code/?postCode=${postCode}`)
    }

    getById(id:string):Observable<Post>{
        return this.httpClient.get<Post>(`${Object.values(BASE_URL)[0]}/posts/${id}/get`)
    }

    getTotalByUser(userId:string):Observable<Post>{
        return this.httpClient.get<Post>(`${Object.values(BASE_URL)[0]}/posts/total-post-user/?userId=${userId}`)
    }

    getTotalByPostType(postTypeId:string):Observable<Post>{
        return this.httpClient.get<Post>(`${Object.values(BASE_URL)[0]}/posts/total-post-type/?postTypeId=${postTypeId}`)
    }

    getTotalPost():Observable<Post>{
        return this.httpClient.get<Post>(`${Object.values(BASE_URL)[0]}/posts/total-post/`)
    }

    insert(post:Post):Observable<Post>{
        return this.httpClient.post<Post>(`${Object.values(BASE_URL)[0]}/posts/`,post)
    }

    update(post:Post):Observable<Post>{
        return this.httpClient.put<Post>(`${Object.values(BASE_URL)[0]}/posts/`,post)
    }
    
}