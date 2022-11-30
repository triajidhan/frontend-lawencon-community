import { User } from './user'
import { Post } from './post'

export interface Like extends User, Post {
	id: string
	version: number
	user: User
	post: Post

	countOfLike: number
	userLikePost: number

	isActive: boolean
	likeId: string
	postAttachment: any[]
}

