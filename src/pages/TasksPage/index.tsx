import React, { useEffect, useState } from 'react'
import './style.scss'
import { TaskType } from './types'
import { Task } from '../../components/Task'
import { TaskList } from '../../components/TaskList'
import { ProjectType } from '../../components/SideBarList'

interface TasksPageProps {
  project: ProjectType
}

const TasksPage = ({ project }: TasksPageProps) => {
  const isClose = false
  const [openedTask, setOpenedTask] = useState<TaskType>(project.tasks[0])
  useEffect(() => {
    setOpenedTask(project.tasks[0])
  }, [project])
  const toDoTasks: TaskType[] = project.tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = project.tasks.filter(item => item.category === 'backlog')

  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }
  // const onTaskUpdated = (task: TaskType) => {
  //   setOpenedTask(task)
  // }
  return (
    <div className='TasksPage'>
      <div className='TasksPage__container'>
        <div className='TasksPage__left'>
          <TaskList tasks={backlogTasks} project={project} activeTask={openedTask} title='Backlog' onSelectedTask={onSelectedTask} />
          <TaskList tasks={toDoTasks} project={project} activeTask={openedTask} title='To Do' onSelectedTask={onSelectedTask} />
        </div>
        {Boolean(openedTask) &&
        <Task task={openedTask} onTaskClose={() => {}} isClose={isClose} />}
      </div>
    </div>
  )
}

export { TasksPage }
