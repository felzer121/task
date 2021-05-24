import React, { useState } from 'react'
import './style.scss'
import projectIcon1 from './Pic1.png'
import { TaskType } from './types'
import { Task } from '../../components/Task'

interface TasksPageProps {
  tasks: TaskType[]
}

const TasksPage = ({ tasks }: TasksPageProps) => {
  const [task, setTask] = useState(tasks[0])
  const toDoTasks: TaskType[] = tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = tasks.filter(item => item.category === 'backlog')
  const onSelectedTask = (task: TaskType): void => {
    setTask(task)
  }
  return (
    <div className='TasksPage'>
      <div className='TasksPage__container'>
        <div className='TasksPage__left'>
          <div className='TasksPage__backlog'>
            <div className='TasksPage__top'>
              <h4 className='TasksPage__title'>Backlog</h4>
              <button className='TasksPage__button'>+ Add Task</button>
            </div>
            <div className='TasksPage__content'>
              {backlogTasks.map(task => {
                return (
                  <div className='TasksPage__item' onClick={() => onSelectedTask(task)}>
                    <div className='TasksPage__itemStatus'></div>
                    <div className='TasksPage__itemContent'>
                      <span className='TasksPage__itemTitle'>{task.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='TasksPage__toDo'>
            <div className='TasksPage__top'>
              <h4 className='TasksPage__title'>To Do</h4>
              <button className='TasksPage__button'>+ Add Task</button>
            </div>
            <div className='TasksPage__content'>
              {toDoTasks.map(task => {
                return (
                  <div className='TasksPage__item'>
                    <div className='TasksPage__itemStatus'></div>
                    <div className='TasksPage__itemContent'>
                      <span className='TasksPage__itemTitle'>{task.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Task task={task} />
      </div>
    </div>
  )
}

export { TasksPage }
