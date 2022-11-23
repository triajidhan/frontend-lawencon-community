import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../../../../projects/constant/base-url";
import { Position } from "../../../../../projects/interface/position";
import { Observable } from "rxjs";


@Injectable({
    providedIn:"root"
})

export class PositionService{

    constructor(private httpClient:HttpClient){}

    getTotalPosition():Observable<Position> {
		return this.httpClient.get<Position>(`${Object.values(BASE_URL)[0]}/positions/total-position`)
	}
	
	getAll():Observable<Position>{
		return this.httpClient.get<Position>(`${Object.values(BASE_URL)[0]}/positions/`)
	}
	
	getById(id:string):Observable<Position>{
		return this.httpClient.get<Position>(`${Object.values(BASE_URL)[0]}/positions/${id}/get`)
	}
	
	getByIsActiveAll():Observable<Position>{
        return this.httpClient.get<Position>(`${Object.values(BASE_URL)[0]}/positions/is-active-all/`)
	}
	
	getByIsActive(startPosition:number,limit:number):Observable<Position>{
		return this.httpClient.get<Position>(`${Object.values(BASE_URL)[0]}/positions/is-active/?startPosition=${startPosition}&limit=${limit}`)
	}

    insert(position:Position):Observable<Position>{
        return this.httpClient.post<Position>(`${Object.values(BASE_URL)[0]}/positions`,position)
    }

    update(position:Position):Observable<Position>{
        return this.httpClient.put<Position>(`${Object.values(BASE_URL)[0]}/positions`,position)
    }
}