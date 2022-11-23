import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../../../../projects/constant/base-url";

import { ResponseMessage } from "projects/interface/response-messge";
import { Observable } from "rxjs";
import { Bookmark } from "projects/interface/bookmark";


@Injectable({
    providedIn:"root"
})

export class BookmarkService{
    constructor(private http: HttpClient) { }

    getAll(startPosition: number, limit: number): Observable<Bookmark> {
      return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/bookmarks?startPosition=${startPosition}&limit=${limit}`)
    }
  
    getById(id: string): Observable<Bookmark> {
      return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/${id}/bookmarks/get`)
    }

    getByUser(userId: string): Observable<Bookmark> {
        return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/bookmarks/users/?userId=${userId}`)
    }

    getByPost(postId: string): Observable<Bookmark> {
        return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/bookmarks/users/?postId=${postId}`)
    }
  
    getTotalByUser(userId: string): Observable<Bookmark> {
      return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/bookmarks/total-users/?userId=${userId}`)
    }

    getTotalByPost(postId: string): Observable<Bookmark> {
        return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/bookmarks/total-posts/?postId=${postId}`)
    }

    getUserBookmarkPost(postId: string,userId:string): Observable<Bookmark> {
        return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/bookmarks/user-bookmark/?postId=${postId}&userId=${userId}`)
    }
  
    getByIsActive(startPosition: number, limit: number): Observable<Bookmark> {
      return this.http.get<Bookmark>(`${Object.values(BASE_URL)[0]}/bookmarks/is-active/?startPosition=${startPosition}&limit=${limit}`)
    }
  
    insert(data: any): Observable<ResponseMessage> {
      return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/bookmarks`, data)
    }
  
    update(data: any): Observable<ResponseMessage> {
      return this.http.put<ResponseMessage>(`${Object.values(BASE_URL)[0]}/bookmarks`, data)
    }
}
