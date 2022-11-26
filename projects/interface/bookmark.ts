import { User } from './user'
import { Post } from './post'

export interface Bookmark extends User, Post {
	id: string
	version: number
	user: User
	post: Post

	countOfBookmark: number
	userBookmarkPost: number

	likeId: string
	countOfLike: number

	isActive: boolean

	postAttachment:any[]
}

