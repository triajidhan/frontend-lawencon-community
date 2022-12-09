import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "../../../../../projects/constant/base-url"
import { Article } from "../../../../../projects/interface/article"
import { ResponseMessage } from "projects/interface/response-messge"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<Article> {
    return this.http.get<Article>(`${Object.values(BASE_URL)[0]}/articles/id/${id}`)
  }

  getTotalArticle(): Observable<Article> {
    return this.http.get<Article>(`${Object.values(BASE_URL)[0]}/articles/total-article`)
  }

  getByIsActive(startPosition: number, limit: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${Object.values(BASE_URL)[0]}/articles/is-active/?startPosition=${startPosition}&limit=${limit}`)
  }

  getByIsActiveAndOrder(startPosition: number, limit: number, asc: boolean): Observable<Article[]> {
    return this.http.get<Article[]>(`${Object.values(BASE_URL)[0]}/articles/is-active-order/?startPosition=${startPosition}&limit=${limit}&asc=${asc}`)
  }

  insert(data: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/articles`, data)
  }

  update(data: any): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${Object.values(BASE_URL)[0]}/articles`, data)
  }


}
