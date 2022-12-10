import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { ROLE_CODE } from "projects/main-area/src/app/constant/role-type"
import { ApiService } from "projects/main-area/src/app/service/api.service"
import { UserService } from "projects/main-area/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'edit-profile-admin',
  templateUrl: './edit-profile-admin.conmponent.html'
})
export class EditProfileAdminComponent implements OnInit, OnDestroy {

  private getByIdUserSubscription?: Subscription
  private editUserSubscription?: Subscription
  private getByIdUserUpateSubscription?: Subscription

  resultExtension!: string
  resultFile !: string
  user: any = new Object()
  roleCode: string | null = ''
  fullName: string = ''
  email: string = ''

  newUser: any = {
    id: [''],
    fullName: [''],
    email: [''],
    company: [''],
    statusSubscribe: [false],
    industry: {},
    position: {},
    balance: {},
    role: {},
    token: [''],

    file: {}
  }

  editProfileForm = this.fb.group({
    id: [''],
    fullName: [''],
    file: this.fb.group({
      files: [''],
      ext: ['']
    }),
    version: [''],
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,
    private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.roleCode = this.apiService.getRoleCode()

    this.activatedRoute.params.subscribe(result => {
      this.getByIdUserSubscription = this.userService.getById(result['id']).subscribe(user => {
        this.user = user
        this.editProfileForm.controls['id'].setValue(result[`id`])
        this.editProfileForm.controls['fullName'].setValue(user[`fullName`])
        this.email = user.email
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

    this.editUserSubscription = this.userService.update(this.editProfileForm.value).subscribe(() => {
      const token = this.apiService.getToken()
      this.getByIdUserUpateSubscription = this.userService.getById(this.editProfileForm.value.id).subscribe(result => {
        this.newUser = result
        this.newUser.token = token
        this.apiService.saveData(this.newUser)
        if (this.roleCode == ROLE_CODE.SUPER_ADMIN) {
          this.router.navigateByUrl("/profiles/super-admin")
        } else {
          this.router.navigateByUrl("/profiles/admin")
        }
      })
    })

  }

  ngOnDestroy(): void {
    this.getByIdUserSubscription?.unsubscribe()
    this.editUserSubscription?.unsubscribe()
    this.getByIdUserUpateSubscription?.unsubscribe()
  }

}
