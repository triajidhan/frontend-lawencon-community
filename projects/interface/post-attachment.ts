import { Post } from './post'
import { File } from './file'

export interface PostAttachment extends File, Post {
	id: string
	version: number
	post: Post
	file: File
}

