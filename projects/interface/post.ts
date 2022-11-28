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
  user: User
	postAttachment:any[]
}
