import { Component, OnDestroy, OnInit } from "@angular/core"
import { ConfirmationService, LazyLoadEvent, MenuItem, PrimeNGConfig } from "primeng/api"
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

    getAllSubs?: Subscription
    getByIdSubs?: Subscription
    deleteSubs?: Subscription
    contDataSubs?: Subscription

    constructor(private userService: UserService, private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Home', routerLink: "/dashboard/super-admin" },
            { label: 'User' }
        ]
    }

    loadData(event: LazyLoadEvent) {
        console.log(event)
        this.getData(event.first, event.rows)
    }

    getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage

        this.getAllSubs = this.userService.getByRoleCode('A', startPage, maxPage).subscribe(
            result => {
                this.data = result
                console.log(this.data)
                this.loading = false
                this.contDataSubs = this.userService.getTotalByRole('A').subscribe(result => {
                    this.totalData = result.countOfUser
                })
                console.log(this.data)
            }
        )
    }

    getDeleteId(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
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

    ngOnDestroy(): void {
        this.getAllSubs?.unsubscribe()
        this.getByIdSubs?.unsubscribe()
        this.deleteSubs?.unsubscribe()
        this.contDataSubs?.unsubscribe()
    }
}