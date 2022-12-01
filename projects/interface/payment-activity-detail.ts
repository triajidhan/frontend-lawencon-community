import { Activity } from './activity'
import { ActivityType } from './activity-type'
import { File } from './file'

export interface PaymentActivityDetail extends File, Activity {
	id: string
	version: number
	paymentCode: string
	net: number
	approve: boolean
	activity: Activity
	file: File
	userName: string
	createdBy: string
	countOfPaymentActivity: number
	isActive: boolean
}

