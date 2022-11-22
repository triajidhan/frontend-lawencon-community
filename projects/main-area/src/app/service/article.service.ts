import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "projects/constant/base-url"
import { Article } from "projects/interface/article"
import { ResponseMessage } from "projects/interface/response-messge"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAll(startPosition: number, limit: number): Observable<Article> {
    return this.http.get<Article>(`${Object.values(BASE_URL)[0]}/articles?startPostion=${startPosition}&limit=${limit}`)
  }

  insert(data: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${Object.values(BASE_URL)[0]}/articles`, data)
  }

  update(data: any): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${Object.values(BASE_URL)[0]}/articles`, data)
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${Object.values(BASE_URL)[0]}/${id}/articles/get`)
  }

  getTotal(): Observable<Article> {
    return this.http.get<Article>(`${Object.values(BASE_URL)[0]}/articles/total-article`)
  }

  getByArticleCode(articleCode:string): Observable<Article> {
    return this.http.get<Article>(`${Object.values(BASE_URL)[0]}/articles/article-code/$articleCode=${articleCode}`)
  }
}
