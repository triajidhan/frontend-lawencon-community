import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { ResponseMessage } from "projects/interface/response-messge";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})


export class CommentService {
  constructor(private http: HttpClient) { }

  getAll(startPosition: number, limit: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${Object.values(BASE_URL)[0]}/comments?startPosition=${startPosition}&limit=${limit}`)
  }

  getById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${Object.values(BASE_URL)[0]}/comments/id/${id}`)
  }

  
  getByUser(userId: string,startPosition: number,limit:number,asc:boolean): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${Object.values(BASE_URL)[0]}/comments/users/?userId=${userId}&startPosition=${startPosition}&limit=${limit}&asc=${asc}`)
  }

  getByUserAndOrder(userId: string, asc: boolean): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${Object.values(BASE_URL)[0]}/comments/users-order/?userId=${userId}&asc=${asc}`)
  }
  

  getByPost(postId: string,startPosition: number,limit:number,asc:boolean): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${Object.values(BASE_URL)[0]}/comments/users/?postId=${postId}&startPosition=${startPosition}&limit=${limit}&asc=${asc}`)
  }

  getByPostAndOrder(postId: string, asc: boolean): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${Object.values(BASE_URL)[0]}/comments/posts-order/?postId=${postId}&asc=${asc}`)
  }

  getTotalByUser(userId: string): Observable<Comment> {
    return this.http.get<Comment>(`${Object.values(BASE_URL)[0]}/comments/total-user/?userId=${userId}`)
  }

  getTotalByPost(postId: string): Observable<Comment> {
    return this.http.get<Comment>(`${Object.values(BASE_URL)[0]}/comments/total-post/?postId=${postId}`)
  }

  getByIsActive(startPosition: number, limit: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${Object.values(BASE_URL)[0]}/comments/is-active/?startPosition=${startPosition}&limit=${limit}`)
  }

  insert(data: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/comments`, data)
  }

  update(data: any): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${Object.values(BASE_URL)[0]}/comments`, data)
  }
}