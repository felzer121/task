import React, { useState } from 'react'
import './style.scss'
import { TaskType } from './types'
import { Task } from '../../components/Task'
import { TaskList } from '../../components/TaskList'

interface TasksPageProps {
  tasks: TaskType[]
  globalTaskUpdated: (task: TaskType) => void
}

const TasksPage = ({ tasks, globalTaskUpdated }: TasksPageProps) => {
  const [openedTask, setOpenedTask] = useState(tasks[0])
  const toDoTasks: TaskType[] = tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = tasks.filter(item => item.category === 'backlog')
  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }
  const onTaskUpdated = (task: TaskType) => {
    setOpenedTask(task)
    globalTaskUpdated(task)
  }
  return (
    <div className='TasksPage'>
      <div className='TasksPage__container'>
        <div className='TasksPage__left'>
          <TaskList tasks={backlogTasks} title='Backlog' onSelectedTask={onSelectedTask} globalTaskUpdated={globalTaskUpdated} />
          <TaskList tasks={toDoTasks} title='To Do' onSelectedTask={onSelectedTask} globalTaskUpdated={globalTaskUpdated} />
        </div>
        <Task task={openedTask} onTaskUpdated={onTaskUpdated} />
      </div>
    </div>
  )
}

export { TasksPage }
