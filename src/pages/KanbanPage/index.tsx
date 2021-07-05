import React from 'react'
import { TaskList } from '../../components/TaskList'
import { TaskType } from '../TasksPage/types'
import './style.scss'

interface KanbanPageProps {
  globalTaskUpdated: (task: TaskType) => void
  backlogTasks: TaskType[]
  toDoTasks: TaskType[]
}

export const KanbanPage = ({toDoTasks, backlogTasks, globalTaskUpdated}:KanbanPageProps) => {
  const onSelectedTask = (openedTask: TaskType): void => {
  }
  return (
    <div className='Kanban'>
      <div className='Kanban__backlog'>
        <TaskList tasks={backlogTasks} title='Backlog' onSelectedTask={onSelectedTask} globalTaskUpdated={globalTaskUpdated} />
      </div>
      <div className='Kanban__toDo'>
        <TaskList tasks={toDoTasks} title='To Do' onSelectedTask={onSelectedTask} globalTaskUpdated={globalTaskUpdated} />
      </div>
    </div>
  )
}
