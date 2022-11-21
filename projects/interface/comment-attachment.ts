import { Comment } from './comment'
import { File } from './file'

export interface CommentAttachment extends File {
	id: string
	version: number
	comment: Comment
}

