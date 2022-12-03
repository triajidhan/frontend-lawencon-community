import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { Industry } from "projects/interface/industry"
import { Position } from "projects/interface/position"
import { User } from "projects/interface/user"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { IndustryService } from "projects/member-area/src/app/service/industry.service"
import { PositionService } from "projects/member-area/src/app/service/position.service"
import { UserService } from "projects/member-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'edit-profile-admin',
  templateUrl: './edit-profile-admin.conmponent.html'
})
export class EditProfileAdminComponent implements OnInit, OnDestroy {

  private positionsSubscription?: Subscription
  private industriesSubscription?: Subscription
  private getByIdUserSubscription?: Subscription
  private editUserSubscription?: Subscription
  private positionGetByIdSubscription?: Subscription
  private industriesGetByIdSubscription?: Subscription

  resultExtension!: string
  resultFile !: string
  positionsRes: any[] = []
  industriesRes: any[] = []
  user: any = new Object()
  roleCode: string | null = ""
  fullName: string = ''
  email: string = ''
  positions: any[] = []
  industries: any[] = []

  editProfileForm = this.fb.group({
    id: [''],
    fullName: [''],
    email: [''],
    company: [''],
    industry: this.fb.group({
      id: ['']
    }),
    position: this.fb.group({
      id: ['']
    }),
    file: this.fb.group({
      files: [''],
      ext: ['']
    }),
    version: [''],
    industryId: [''],
    positionId: ['']
  })

  constructor(private fb: FormBuilder, private positionService: PositionService, private industryService: IndustryService,
    private router: Router, private userService: UserService, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.positions = []
    this.industries = []
    this.activatedRoute.params.subscribe(result => {
      this.getByIdUserSubscription = this.userService.getById(result['id']).subscribe(user => {
        this.user = user
        this.editProfileForm.controls['id'].setValue(result[`id`])
        this.editProfileForm.controls['fullName'].setValue(user[`fullName`])
        if (user[`company`]) {
          this.editProfileForm.controls['company'].setValue(user[`company`])
        }
        this.email = user.email
        if (user[`industry`]) {
          this.editProfileForm.controls['industryId'].setValue(user[`industry`].id)
        }
        if (user[`position`]) {
          this.editProfileForm.controls['positionId'].setValue(user[`position`].id)
        }
        this.editProfileForm.value.email = user.email
        if (user[`file`]) {
          this.editProfileForm.patchValue({
            file: {
              files: user.file.files,
              ext: user.file.ext
            }
          })
        }
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

  back() {
    if (this.roleCode == "SA") {
      this.router.navigateByUrl("/profiles/super-admin")
    } else {
      this.router.navigateByUrl("/profiles/admin")
    }
  }

  updateUser() {
    if (this.resultFile) {
      this.editProfileForm.patchValue({
        file: {
          files: this.resultFile,
          ext: this.resultExtension
        }
      })
    }
    this.editProfileForm.patchValue({
      position: {
        id: this.editProfileForm.value.positionId
      }
    })

    this.editProfileForm.patchValue({
      industry: {
        id: this.editProfileForm.value.industryId
      }
    })

    this.editUserSubscription = this.userService.update(this.editProfileForm.value).subscribe(() => {
      if (this.roleCode == "SA") {
        this.router.navigateByUrl("/profiles/super-admin")
      } else {
        this.router.navigateByUrl("/profiles/admin")
      }
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
