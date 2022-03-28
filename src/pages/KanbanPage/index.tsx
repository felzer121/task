import React, {useState} from 'react'
import { TaskList } from '../../components/TaskList'
import { TaskType } from '../TasksPage/types'
import './style.scss'
import { Task } from '../../components/Task'
import { ProjectType } from '../../components/SideBarList'

interface KanbanPageProps {
  project: ProjectType
  backlogTasks: TaskType[]
  toDoTasks: TaskType[]
}

export const KanbanPage = ({project, toDoTasks, backlogTasks }:KanbanPageProps) => {
  const [openedTask, setOpenedTask] = useState<TaskType | undefined>(undefined)
  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }
  const onTaskClose = ():void => {
    setOpenedTask(undefined)
  }
  return (
    <div className='Kanban'>
      <div
        className='Kanban__backlog'
      >
        <TaskList tasks={backlogTasks} project={project} title='Backlog' onSelectedTask={onSelectedTask} />
      </div>
      <div
        className='Kanban__toDo'
      >
        <TaskList tasks={toDoTasks} project={project} title='To Do' onSelectedTask={onSelectedTask} />
      </div>
      { openedTask? <Task task={openedTask} onTaskClose={onTaskClose} isClose={true} /> : null}
    </div>
  )
}
