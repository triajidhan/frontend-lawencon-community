import { Industry } from './industry'
import { Position } from './position'
import { Balance } from './balance'
import { Role } from './role'
import { File } from './file'

export interface User extends File {
	id: string
	version: number
	fullname: string
	email: string
	pass: string
	company: string
	industry: Industry
	position: Position
	balance: Balance
	role: Role
	statusSubscribe: boolean
}

