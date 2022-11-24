import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { Observable } from "rxjs";


@Injectable({
    providedIn:"root"
})

export class FileService{

    constructor(private httpClient:HttpClient){}

    download(id:string):Observable<any>{
        return this.httpClient.get(`${Object.values(BASE_URL)}/files/download/${id}`)
    }
}