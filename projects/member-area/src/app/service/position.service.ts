import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Position } from "../../../../interface/position"
import { BASE_URL } from "../../../../constant/base-url"
@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Position[]> {
        return this.http.get<Position[]>(`${BASE_URL.LOCALHOST}/positions`)
    }

    getById(data: number): Observable<Position> {
        return this.http.get<Position>(`${BASE_URL.LOCALHOST}/positions/${data}`);
    }
}