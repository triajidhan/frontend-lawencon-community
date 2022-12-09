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

    getCompany(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).company
        }
        return result
    }


    getIndustry(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).industry.industryName
        }
        return result
    }

    getIndustryObj(): object | null {
        const data = localStorage.getItem('data')
        let result: null | object = {}
        if (data) {
            result = JSON.parse(data).industry
        }
        return result
    }

    getPosition(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).position.positionName
        }
        return result
    }

    getPositionObj(): Object | null {
        const data = localStorage.getItem('data')
        let result: null | Object = {}
        if (data) {
            result = JSON.parse(data).position
        }
        return result
    }

    getPhotoId(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).file.id
        }
        return result
    }

    getFiles(): Object | null {
        const data = localStorage.getItem('data')
        let result: null | Object = ''
        if (data) {
            result = JSON.parse(data).file
        }
        return result
    }

    getStatusSubscribe(): boolean | null {
        const data = localStorage.getItem('data')
        let result: null | boolean = false
        if (data) {
            result = JSON.parse(data).statusSubscribe
        }
        return result
    }

    getBalances(): number | null {
        const data = localStorage.getItem('data')
        let result: null | number = 0
        if (data) {
            result = JSON.parse(data).balance.totalBalance
        }
        return result
    }


    logOut() {
        localStorage.clear()
    }
}
