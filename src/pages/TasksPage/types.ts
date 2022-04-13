import { FileType } from '../../components/FilesTable/types'
import { CommentType } from '../../components/Discussion/types'

export enum CATEGORY_TYPE {
  TODO = 'todo',
  BACKLOG = 'backlog'
}

export type TaskType = {
  userID: string;
  id: string
  position: number
  idProject: string
  title: string
  isDone: boolean
  author: string
  createdAt: any
  category: CATEGORY_TYPE
  assignTo: string
  dueOn: any
  tag: string
  followers: string[]
  description: string
  files: FileType[]
  comments: CommentType[]
}
