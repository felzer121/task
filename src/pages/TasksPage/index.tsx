import React from 'react'
import './style.scss'
import { TaskType, ToDoType } from './types'
interface TasksPageProps {
  tasks: TaskType[]
  toDo: ToDoType[]
}

const TasksPage = ({ tasks, toDo }: TasksPageProps) => {
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
              {tasks.map(task => {
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
          <div className='TasksPage__toDo'>
            <div className='TasksPage__top'>
              <h4 className='TasksPage__title'>To Do</h4>
              <button className='TasksPage__button'>+ Add Task</button>
            </div>
            <div className='TasksPage__content'>
              {toDo.map(toDo => {
                return (
                  <div className='TasksPage__item'>
                    <div className='TasksPage__itemStatus'></div>
                    <div className='TasksPage__itemContent'>
                      <span className='TasksPage__itemTitle'>{toDo.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='TasksPage__right'></div>
      </div>
    </div>
  )
}

export { TasksPage }
