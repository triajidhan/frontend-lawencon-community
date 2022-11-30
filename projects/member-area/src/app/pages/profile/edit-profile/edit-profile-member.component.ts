import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MenuItem } from "primeng/api"
import { Industry } from "projects/interface/industry"
import { Position } from "projects/interface/position"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { IndustryService } from "projects/member-area/src/app/service/industry.service"
import { PositionService } from "projects/member-area/src/app/service/position.service"
import { UserService } from "projects/member-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'edit-profile-member',
  templateUrl: './edit-profile-member.conmponent.html'
})
export class EditProfileMemberComponent implements OnInit, OnDestroy {

  private positionsSubscription?: Subscription
  private industriesSubscription?: Subscription
  private getByIdUserSubscription?: Subscription
  private editUserSubscription?: Subscription
  private positionGetByIdSubscription!: Subscription
  private industriesGetByIdSubscription!: Subscription

  myId: string = ""
  items!: MenuItem[]
  resultExtension!: string
  resultFile !: string
  positionsRes!: Position[]
  industriesRes!: Industry[]
  user: any = new Object();
  roleCode: string | null = ""
  fullName: string = ''
  email: string = ''
  company: string = ''
  industryId: string = ''
  positionId: string = ''
  id: string = ''
  positions: any[] = []
  industries: any[] = []

  editProfileForm = this.fb.group({
    id: [this.id],
    fullName: [this.fullName],
    email: [this.email],
    company: [this.company],
    industry: this.fb.group({
      id: [this.industryId]
    }),
    position: this.fb.group({
      id: [this.positionId]
    }),
    version: [''],
    industryId: [''],
    positionId: ['']
  })

  constructor(private fb: FormBuilder, private positionService: PositionService, private industryService: IndustryService,
    private router: Router, private userService: UserService, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myId = String(this.apiService.getId())

    this.items = [
      { label: 'Edit Profile', routerLink: '/profiles/member/edit/' + this.myId },
      { label: 'Change Password', routerLink: '/profiles/member/change-password/' + this.myId },
      { label: 'Log Out', routerLink: '/' }
    ]

    this.init()
  }

  init() {
    this.positions = [];
    this.industries = [];
    this.activatedRoute.params.subscribe(result => {
      this.getByIdUserSubscription = this.userService.getById(result[`id`]).subscribe(result => {
        this.user = result
        this.id = result.id
        this.fullName = result.fullName
        this.company = result.company
        // this.positionId = result.position.id
        this.industryId = result.industry.id
      })
    })

    this.positionsSubscription = this.positionService.getAll().subscribe(result => {
      this.positionsRes = result
      for (let i = 0; i < this.positionsRes.length; i++) {
        this.positions.push({
          positionName: this.positionsRes[i].positionName,
          positionCode: this.positionsRes[i].positionCode,
          id: this.positionsRes[i].id
        })
      }
    })

    this.industriesSubscription = this.industryService.getAll().subscribe(result => {
      this.industriesRes = result
      for (let i = 0; i < this.industriesRes.length; i++) {
        this.industries.push({
          industryName: this.industriesRes[i].industryName,
          industryCode: this.industriesRes[i].industryCode,
          id: this.industriesRes[i].id
        })
      }
    })
  }

  logOut() {
    this.apiService.logOut()
    this.router.navigateByUrl("/")
  }


  updateUser() {
    this.editProfileForm.patchValue({
      industry: {
        id: this.editProfileForm.value.industryId
      }
    })

    this.editProfileForm.patchValue({
      industry: {
        id: this.editProfileForm.value.industryId
      }
    })
    this.editProfileForm.value.id = this.user.id
    this.editUserSubscription = this.userService.update(this.editProfileForm.value).subscribe(() => {
      this.init()
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
    this.positionsSubscription?.unsubscribe()
    this.industriesSubscription?.unsubscribe()
    this.getByIdUserSubscription?.unsubscribe()
    this.editUserSubscription?.unsubscribe()
    this.positionGetByIdSubscription?.unsubscribe()
    this.industriesGetByIdSubscription?.unsubscribe()
  }

}
