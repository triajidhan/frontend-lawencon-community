import { User } from './user'
import { Post } from './post'

export interface Like {
	id: string
	version: number
	user: User
	post: Post
	countOfLike: number
	userLikePost: number
}

