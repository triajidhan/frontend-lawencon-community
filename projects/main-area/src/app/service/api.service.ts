import { Injectable } from "@angular/core";
import { Login } from "projects/interface/login";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    saveData(data: Login): void {
        localStorage.setItem('data', JSON.stringify(data))
    }

    getId(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).id
        }
        return result
    }

    getToken(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).token
        }
        return result
    }

    getRoleCode(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).role.roleCode
        }
        return result
    }

    getRoleName(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).role.roleName
        }
        return result
    }

    getName(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).fullName
        }
        return result
    }

    getEmail(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).email
        }
        return result
    }

    getPhotoId(): number | null {
        const data = localStorage.getItem('data')
        let result: null | number = 0
        if (data) {
            result = JSON.parse(data).file
        }
        return result
    }

    logOut() {
        localStorage.clear()
    }

}