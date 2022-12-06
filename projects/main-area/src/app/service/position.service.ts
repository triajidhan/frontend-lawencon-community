import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../../../../projects/constant/base-url";
import { Position } from "../../../../../projects/interface/position";
import { Observable } from "rxjs";


@Injectable({
	providedIn: "root"
})

export class PositionService {

	constructor(private httpClient: HttpClient) { }

	getTotalPosition(): Observable<Position> {
		return this.httpClient.get<Position>(`${Object.values(BASE_URL)[0]}/positions/total-position`)
	}

	getAll(): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/positions/`)
	}

	getById(id: string): Observable<Position> {
		return this.httpClient.get<Position>(`${Object.values(BASE_URL)[0]}/positions/id/${id}`)
	}

	getByIsActiveAll(): Observable<Position[]> {
		return this.httpClient.get<Position[]>(`${Object.values(BASE_URL)[0]}/positions/is-active-all/`)
	}

	getByIsActive(startPosition: number, limit: number): Observable<any> {
		return this.httpClient.get<any>(`${Object.values(BASE_URL)[0]}/positions/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}
  
   insert(data:any):Observable<Position>{
       return this.httpClient.post<Position>(`${Object.values(BASE_URL)[0]}/positions`,data)
   }

   update(data:any):Observable<Position>{
       return this.httpClient.put<Position>(`${Object.values(BASE_URL)[0]}/positions`,data)
   }

}