import { Component, OnDestroy, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { PostAttachment } from "projects/interface/post-attachment"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { PostAttachmentService } from "projects/main-area/src/app/service/post-attachment.service"
import { PostService } from "projects/main-area/src/app/service/post.service"
import { Subscription } from "rxjs"



@Component({
    selector: 'profile-list-member',
    templateUrl: './profile-list-member.component.html'
})
export class ProfileListMemberComponent implements OnInit, OnDestroy {
    id?: string | null
    name?: string | null
    roleName?: string | null
    roleCode?: string | null
    email?: string | null
    photoId?: number | null
    items!: MenuItem[]
    fileDownload = `${BASE_URL.LOCALHOST}/files/download/`


    startPosition = 0
    limit = 5


    getDataMyPostSubs?:Subscription
    getPostAttachmentDataSubs?:Subscription

    postData: any[] = []

    constructor(private apiService: ApiService, private router: Router,
        private postService:PostService, private postAttachmentService:PostAttachmentService) { }


    ngOnInit(): void {
        this.items = [
            { label: 'Edit Profile', routerLink: '/activities/type/all' },
            { label: 'Change Password', routerLink: '/activities/type/events' },
            { label: 'Log Out', routerLink: '/activities/type/courses' }
        ]


        if (this.apiService.getId()) {
            this.id = this.apiService.getId()
        }
        if (this.apiService.getName()) {
            this.name = this.apiService.getName()
        }
        if (this.apiService.getEmail()) {
            this.email = this.apiService.getEmail()
        }
        if (this.apiService.getRoleName()) {
            this.roleName = this.apiService.getRoleName()
        }
        if (this.apiService.getRoleCode()) {
            this.roleCode = this.apiService.getRoleCode()
        }
        if (this.apiService.getPhotoId()) {
            this.photoId = this.apiService.getPhotoId()
        }

        this.init()
        
    }

    init(){
        this.getDataMyPostSubs = this.postService.getByUserAndOrder(String(this.id),this.startPosition,this.limit,false).subscribe(result=>{
            
            for(let i=0;i < result.length;i++){
                this.addPost(result[i])
            }
        })
    }

    addPost(post:any){
        this.getPostAttachmentDataSubs = this.postAttachmentService.getByPost(post.id).subscribe(result => {
            post.postAttachment = result
          })
          this.postData.push(post)
    }

    onScroll() {
        this.startPosition += this.limit
        this.init()
      }

    changePass() {
        if (this.roleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin/change-password/" + this.id)
        } else if (this.roleCode == "A") {
            this.router.navigateByUrl("/profiles/admin/change-password/" + this.id)
        } else {
            this.router.navigateByUrl("/profiles/admin/change-password/" + this.id)
        }
    }

    editProfile() {
        if (this.roleCode == "SA") {
            this.router.navigateByUrl("/profiles/super-admin/edit/" + this.id)
        } else if (this.roleCode == "A") {
            this.router.navigateByUrl("/profiles/admin/edit/" + this.id)
        } else {
            this.router.navigateByUrl("/profiles/admin/edit/" + this.id)
        }
    }

    ngOnDestroy(): void { }
}