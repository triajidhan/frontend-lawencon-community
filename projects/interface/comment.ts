import { Post } from './post'
import { User } from './user'

export interface Comment {
	id: string
	version: number
	commentBody: string
	post: Post
	user: User
}

