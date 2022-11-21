import { User } from './user'
import { Post } from './post'

export interface Bookmark extends User, Post {
	id: string
	version: number
	userId: User
	postId: Post
}

