import { User } from './user'
import { File } from './file'

export interface PaymentSubscribe extends File, User {
	id: string
	version: number
	paymentCode: string
	price: number
	approve: boolean
	user: User
	file: File
	createdBy: string
	userName: string
	countOfPaymentSubscribe: number
	isActive: boolean
}

