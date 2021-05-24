export type TaskType = {
  title: string
  author: string
  createdAt: number
  category: 'todo' | 'backlog'
  assignTo: string
  dueOn: string
  tag: string
  followers: string[]
  description: string
}
