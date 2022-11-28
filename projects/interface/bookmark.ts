import { User } from './user'
import { Post } from './post'

export interface Bookmark extends User, Post {
	id: string
	version: number
	user: User
	post: Post
	isActive: boolean

	postAttachment:any[]
}

