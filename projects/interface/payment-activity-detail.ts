import { Activity } from './activity'
import { File } from './file'

export interface PaymentActivityDetail extends File {
	id: string
	version: number
	paymentCode: string
	net: number
	approve: boolean
	activity: Activity
}

