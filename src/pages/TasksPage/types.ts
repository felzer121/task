import { FileType } from '../../components/FilesTable/types'
import { CommentType } from '../../components/Discussion/types'

export enum CATEGORY_TYPE {
  TODO = 'todo',
  BACKLOG = 'backlog'
}

export type TaskType = {
  id: number
  title: string
  author: string
  createdAt: number
  category: CATEGORY_TYPE
  assignTo: string
  dueOn: string
  tag: string
  followers: string[]
  description: string
  files: FileType[]
  comments: CommentType[]
}
