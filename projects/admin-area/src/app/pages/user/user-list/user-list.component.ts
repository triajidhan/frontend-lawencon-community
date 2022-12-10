import { Component, OnDestroy, OnInit } from "@angular/core"
import { ConfirmationService, LazyLoadEvent, MenuItem, PrimeNGConfig } from "primeng/api"
import { BASE_URL } from "projects/constant/base-url"
import { User } from "projects/interface/user"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    providers: [ConfirmationService]
})
export class UserListComponent implements OnInit, OnDestroy {
    items!: MenuItem[]
    data: any[] = []

    id!: number
    user!: User
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    loading: boolean = true
    display: boolean = false
    resultExtension!: string
    resultFile !: string

    urlFile = `${BASE_URL.LOCALHOST}/files/download/`

    private getAllSubs?: Subscription
    private getByIdSubs?: Subscription
    private deleteSubs?: Subscription
    private contDataSubs?: Subscription

    constructor(private userService: UserService, private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'Admin User' }
        ]
    }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first, event.rows)
    }

    getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage

        this.getAllSubs = this.userService.getByRoleCode('A', startPage, maxPage).subscribe(
            result => {
                this.data = result
                this.loading = false
                this.contDataSubs = this.userService.getTotalByRole('A').subscribe(result => {
                    this.totalData = result.countOfUser
                })
            }
        )
    }

    getDeleteId(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.getByIdSubs = this.userService.getById(id).subscribe(result => {
                    this.user = result
                    this.user.isActive = false
                    this.deleteSubs = this.userService.update(this.user).subscribe(() => {
                        this.getData()
                    })
                })
            }
        })
    }

    fileUpload(event: any): void {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(event.files[0])
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        })

        toBase64(event.files[0].name).then(result => {
            this.resultFile = result.substring(result.indexOf(",") + 1, result.length)
            this.resultExtension = result.split(";")[0].split('/')[1]
        })
    }

    ngOnDestroy(): void {
        this.getAllSubs?.unsubscribe()
        this.getByIdSubs?.unsubscribe()
        this.deleteSubs?.unsubscribe()
        this.contDataSubs?.unsubscribe()
    }
}
