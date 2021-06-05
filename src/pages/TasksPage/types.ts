import { FileType } from '../../components/FilesTable/types'

export type TaskType = {
  id: number
  title: string
  author: string
  createdAt: number
  category: 'todo' | 'backlog'
  assignTo: string
  dueOn: string
  tag: string
  followers: string[]
  description: string
  files: FileType[]
}
