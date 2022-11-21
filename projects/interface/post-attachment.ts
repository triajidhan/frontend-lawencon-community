import { Post } from './post'
import { File } from './file'

export interface PostAttachment extends File {
	id: string
	version: number
	post: Post
}

