import { Comment } from './comment'
import { File } from './file'

export interface CommentAttachment extends File, Comment {
	id: string
	version: number
	comment: Comment
	file: File
}

