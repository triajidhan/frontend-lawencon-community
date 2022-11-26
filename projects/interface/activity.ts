import { ActivityType } from './activity-type'
import { File } from './file'

export interface Activity extends File, ActivityType {
	id: string
	version: number
	activityCode: string
	title: string
	provider: string
	location: string
	beginSchedule: string
	finishSchedule: string
	price: number
	activityType: ActivityType
	file: File
	createdBy: string
	userName: string
	totalParticipant: number
}

