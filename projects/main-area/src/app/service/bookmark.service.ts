import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../../../../projects/constant/base-url";

import { ResponseMessage } from "projects/interface/response-messge";
import { Observable } from "rxjs";
import { Bookmark } from "projects/interface/bookmark";


@Injectable({
  providedIn: "root"
})

export class BookmarkService {
  constructor(private http: HttpClient) { }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${Object.values(BASE_URL)[0]}/bookmarks/id/${id}`)
  }

  getByUserOrder(userId: string, startPosition: number, limit: number, ascending: boolean): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${Object.values(BASE_URL)[0]}/bookmarks/users-order/?userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
  }

  getByPost(postId: string, startPosition: number, limit: number, ascending: boolean): Observable<any> {
    return this.http.get<any>(`${Object.values(BASE_URL)[0]}/bookmarks/posts/?postId=${postId}&startPosition=${startPosition}&limit=${limit}&asc=${ascending}`)
  }

  getUserBookmarkPost(postId: string, userId: string): Observable<Bookmark> {
    return this.http.get<any>(`${Object.values(BASE_URL)[0]}/bookmarks/user-bookmark/?postId=${postId}&userId=${userId}`)
  }

  insert(data: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/bookmarks`, data)
  }

  update(data: any): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${Object.values(BASE_URL)[0]}/bookmarks`, data)
  }
}
