import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { MenuItem, PrimeNGConfig } from "primeng/api"

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['../../../styles.css']
})
export class HomeComponent implements OnInit {

    items!: MenuItem[]
    type!: string
    display: boolean = false

    postForm = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        pass: ['', Validators.required],
        company: ['', Validators.required],
        industryId: [''],
        positionId: ['']
    })

    constructor(private primengConfig: PrimeNGConfig, private activatedRoute: ActivatedRoute,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true

        this.items = [
            { label: 'Thread', routerLink: '/homes/threads' },
            { label: 'Likes', routerLink: '/homes/likes' },
            { label: 'Bookmark', routerLink: '/homes/bookmarks' }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
            this.init()
        })
    }

    init() { }

    postDialog() {
        this.display = true
    }
}