import { Post } from './post'

export interface Polling {
	id: string
	version: number
	pollContent: string
	totalPoll: number
	post: Post
}

