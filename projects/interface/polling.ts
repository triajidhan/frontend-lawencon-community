import { Post } from './post'

export interface Polling extends Post {
	id: string
	version: number
	pollContent: string
	totalPoll: number
	post: Post
}

