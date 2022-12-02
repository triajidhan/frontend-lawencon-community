import { PostType } from './post-type'
import { File } from './file'
import { User } from './user'

export interface Post extends File, PostType, User {
	id: string
	version: number
	postCode: string
	title: string
	contents: string
	titlePoll: string
	postType: PostType
	file: File
	userId: string
	userName: string
	userPhotoId: string
	userCompany: string
	userPosition: string
	postAttachment: any[]
	pollContents: any[]
	comments: any[]
	totalPoll: any
	isActiveLike: any
	isActiveBookmark: any
	isActive: boolean
	countOfComment: number
}
