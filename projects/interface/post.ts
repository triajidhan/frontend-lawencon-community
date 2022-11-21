import { PostType } from './post-type'
import { File } from './file'

export interface Post extends File {
	id: string
	version: number
	postCode: string
	title: string
	contents: string
	titlePoll: string
	postType: PostType
}