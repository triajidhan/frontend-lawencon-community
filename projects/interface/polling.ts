import { PollingStatus } from './polling-status'
import { Post } from './post'

export interface Polling{
	id: string
	version: number
	pollContent: string
	totalPoll: number
	post: Post
  	pollingStatus:PollingStatus
}

