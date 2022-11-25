import { Balance } from "./balance"
import { Industry } from "./industry"
import { Position } from "./position"
import { Role } from "./role"

export interface Login extends File, Industry, Position, Balance, Role {
    id: string
    fullName: string
    email: string
    company: string
    statusSubscribe: boolean
    industry: Industry
    position: Position
    balance: Balance
    role: Role
    token: string
    file: File
}