import { File } from './file'

export interface Article extends File {
	id: string
	version: number
	articleCode: string
	title: string
	contents: string
	file: File
	isActive: boolean
	countOfArticle:number
}

