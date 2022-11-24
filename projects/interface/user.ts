import { Industry } from './industry'
import { Position } from './position'
import { Balance } from './balance'
import { Role } from './role'
import { File } from './file'

export interface User extends File, Industry, Position, Balance, Role {
	id: string
	version: number
	fullName: string
	email: string
	pass: string
	company: string
	industry: Industry
	position: Position
	balance: Balance
	role: Role
	statusSubscribe: boolean
	file: File
	countOfUser: number;
}

