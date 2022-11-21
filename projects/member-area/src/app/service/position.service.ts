import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Position } from "projects/interface/position";
import { Observable } from "rxjs";

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