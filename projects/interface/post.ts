import { PostType } from './post-type'
import { File } from './file'

export interface Post extends File, PostType {
	id: string
	version: number
	postCode: string
	title: string
	contents: string
	titlePoll: string
	postType: PostType
	file: File
	userId: string
	userName : string
	userPhotoId: string
	userCompany:string
	userPosition:string
}