import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "projects/constant/base-url";
import { PostAttachment } from "projects/interface/post-attachment";
import { Observable } from "rxjs";



@Injectable({
    providedIn:"root"
})

export class PostAttachmentService{

    constructor(private httpClient:HttpClient){}

    getByPost(postId:string): Observable<PostAttachment[]> {
		return this.httpClient.get<PostAttachment[]>(`${Object.values(BASE_URL)[0]}/post-attachments/posts/?postId=${postId}`)
	}
}