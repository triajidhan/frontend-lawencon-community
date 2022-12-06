import { PostType } from './post-type'
import { File } from './file'
import { User } from './user'
import { Like } from './like'
import { Bookmark } from './bookmark'

export interface Post extends File, PostType, User{
	id: string
	version: number
	postCode: string
	title: string
	contents: string
	titlePoll: string
	postType: PostType
	fileId: String[]
	pollContents:String[]
	pollId:string[]
	totalPoll: number[]
	statusPolling:boolean
	user: User
	totalVote: number
	statusBookmark:string
	bookmarkId:string
	statusLike:string
	likekId:string
	countOfLike:number
	commentId : string
	createdAtComment: string
	commentBody : string
	userComment: User
	choosenPolling: string
	countOfComment:number;

}
