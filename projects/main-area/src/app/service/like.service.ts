import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../../../../projects/constant/base-url";

import { ResponseMessage } from "projects/interface/response-messge";
import { Observable } from "rxjs";
import { Like } from "projects/interface/like";


@Injectable({
    providedIn:"root"
})

export class LikeService{
    constructor(private http: HttpClient) { }

    getAll(startPosition: number, limit: number): Observable<Like[]> {
      return this.http.get<Like[]>(`${Object.values(BASE_URL)[0]}/likes?startPosition=${startPosition}&limit=${limit}`)
    }

    getById(id: string): Observable<Like> {
      return this.http.get<Like>(`${Object.values(BASE_URL)[0]}/likes/id/${id}`)
    }

    getByUser(userId: string,startPosition: number, limit: number): Observable<Like[]> {
      return this.http.get<Like[]>(`${Object.values(BASE_URL)[0]}/likes/users/?userId=${userId}&startPosition=${startPosition}&limit=${limit}`)
    }

    getByUserOrder(userId: string,startPosition: number, limit: number,ascending:boolean): Observable<Like[]> {
      return this.http.get<Like[]>(`${Object.values(BASE_URL)[0]}/likes/users/?userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
    }

    getByUserAll(userId: string): Observable<Like[]> {
        return this.http.get<Like[]>(`${Object.values(BASE_URL)[0]}/likes/users-all/?userId=${userId}`)
    }

    getByPost(postId: string): Observable<Like[]> {
        return this.http.get<Like[]>(`${Object.values(BASE_URL)[0]}/likes/users/?postId=${postId}`)
    }

    getTotalByUser(userId: string): Observable<Like> {
      return this.http.get<Like>(`${Object.values(BASE_URL)[0]}/likes/total-users/?userId=${userId}`)
    }

    getTotalByPost(postId: string): Observable<Like> {
        return this.http.get<Like>(`${Object.values(BASE_URL)[0]}/likes/total-posts/?postId=${postId}`)
    }

    getUserLikePost(postId: string,userId:string): Observable<Like> {
        return this.http.get<Like>(`${Object.values(BASE_URL)[0]}/likes/user-like/?postId=${postId}&userId=${userId}`)
    }

    getByIsActive(startPosition: number, limit: number): Observable<Like> {
      return this.http.get<Like>(`${Object.values(BASE_URL)[0]}/likes/is-active/?startPosition=${startPosition}&limit=${limit}`)
    }

    insert(data: any): Observable<ResponseMessage> {
      return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/likes`, data)
    }

    update(data: any): Observable<ResponseMessage> {
      return this.http.put<ResponseMessage>(`${Object.values(BASE_URL)[0]}/likes`, data)
    }
}
