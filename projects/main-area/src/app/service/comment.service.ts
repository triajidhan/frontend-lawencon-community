import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Comment } from "projects/interface/comment";
import { ResponseMessage } from "projects/interface/response-messge";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})


export class CommentService {
  constructor(private http: HttpClient) { }

  getById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${Object.values(BASE_URL)[0]}/comments/id/${id}`)
  }
  
  insert(data: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/comments`, data)
  }

  update(data: any): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${Object.values(BASE_URL)[0]}/comments`, data)
  }
}