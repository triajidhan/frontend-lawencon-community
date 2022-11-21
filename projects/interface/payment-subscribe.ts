import { User } from './user'
import { File } from './file'

export interface PaymentSubscribe extends File {
	id: string
	version: number
	paymentCode: string
	price: number
	approve: boolean
	user: User
}

