import { Component } from "@angular/core"

const BASE_URL: string = 'http://localhost:8080'

@Component({
    selector: 'header-non-admin',
    templateUrl: './header-admin.component.html'
})
export class HeaderAdminComponent {

    // name: string | null = ""
    // photoId: number | null = 0
    // fileDownload = `${BASE_URL}/files/download/`

    // constructor(private apiService: ApiService, private router: Router) { }


    // ngOnInit(): void {
    //     if (this.apiService.getName()) {
    //         this.name = this.apiService.getName()
    //     }
    //     if (this.apiService.getPhotoId()) {
    //         this.photoId = this.apiService.getPhotoId()
    //     }
    // }

    // logOut() {
    //     this.apiService.logOut()
    //     this.router.navigateByUrl("/login")
    // }

    // ngOnDestroy(): void { }
}