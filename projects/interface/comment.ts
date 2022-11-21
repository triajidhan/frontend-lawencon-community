import { Post } from './post'
import { User } from './user'

export interface Comment extends Post, User {
	id: string
	version: number
	commentBody: string
	post: Post
	user: User
}

