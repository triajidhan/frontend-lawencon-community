import { User } from './user'
import { Post } from './post'

export interface Bookmark {
	id: string
	version: number
	userId: User
	postId: Post
}

