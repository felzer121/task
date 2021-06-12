import React from 'react'
import './style.scss'
import projectIcon1 from '../../pages/TasksPage/Pic1.png'
import { TaskType } from '../../pages/TasksPage/types'

interface TaskProps {
  task: TaskType
  onTaskUpdated: (task: TaskType) => void
}

const Task = ({ task, onTaskUpdated }: TaskProps) => {
  const onDeleteFile = (fileId: number): void => {
    const newTask: TaskType = {
      ...task,
      files: task.files.filter(item => item.id !== fileId)
    }
    onTaskUpdated(newTask)
  }
  return (
    <div className='TasksPage__right'>
      <div className='TasksPage__box'>
        <div className='TasksPage__boxInfo'>
          <h3 className='TasksPage__boxTile'>{task.title}</h3>
          <span className='TasksPage__boxSubTitle'>
            Added by {task.author} yesterday at {task.createdAt}
          </span>
        </div>
        <div className='TasksPage__boxController'>
          <button className='TasksPage__boxButton'>
            <svg
              width='16'
              height='13'
              viewBox='0 0 16 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.4149 1.25372C14.6348 0.473652 13.3667 0.469652 12.5826 1.24972L5.99775 7.83826L3.41343 5.25405C2.63333 4.47398 1.36517 4.47398 0.585073 5.25405C-0.195024 6.03411 -0.195024 7.30222 0.585073 8.08228L4.58557 12.0826C4.97362 12.4706 5.48569 12.6667 5.99775 12.6667C6.50981 12.6667 7.02188 12.4706 7.41393 12.0826L15.4149 4.08195C16.195 3.30189 16.195 2.03378 15.4149 1.25372Z'
                fill='#9B9B9B'
              />
            </svg>
          </button>
          <button className='TasksPage__boxButton'>
            <svg
              width='18'
              height='6'
              viewBox='0 0 18 6'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.5 3.15186C4.5 4.3945 3.49264 5.40186 2.25 5.40186C1.00736 5.40186 0 4.3945 0 3.15186C0 1.90921 1.00736 0.901855 2.25 0.901855C3.49264 0.901855 4.5 1.90921 4.5 3.15186ZM11.25 3.15186C11.25 4.3945 10.2426 5.40186 9 5.40186C7.75736 5.40186 6.75 4.3945 6.75 3.15186C6.75 1.90921 7.75736 0.901855 9 0.901855C10.2426 0.901855 11.25 1.90921 11.25 3.15186ZM15.75 5.40186C16.9926 5.40186 18 4.3945 18 3.15186C18 1.90921 16.9926 0.901855 15.75 0.901855C14.5074 0.901855 13.5 1.90921 13.5 3.15186C13.5 4.3945 14.5074 5.40186 15.75 5.40186Z'
                fill='#9B9B9B'
              />
            </svg>
          </button>
        </div>
      </div>
      <div className='TasksPage__about'>
        <div className='TasksPage__aboutItem'>
          <h4 className='TasksPage__aboutItemTitle'>Asign To</h4>
          <div className='TasksPage__aboutItem TasksPage__asign'>
            <img src={projectIcon1} alt='' />
            <span className='TasksPage__aboutItemSpan'>{task.assignTo}</span>
          </div>
        </div>
        <div className='TasksPage__aboutItem'>
          <h4 className='TasksPage__aboutItemTitle'>Due On</h4>
          <span className='TasksPage__aboutItemSpan'>{task.dueOn}</span>
        </div>
        <div className='TasksPage__aboutItem'>
          <h4 className='TasksPage__aboutItemTitle'>Tag</h4>
          <div className='TasksPage__aboutItem'>
            <div className='TasksPage__aboutItemTag'>
              <span className='TasksPage__aboutItemTagSpan'>{task.tag}</span>
            </div>
          </div>
        </div>
        <div className='TasksPage__aboutItem'>
          <h4 className='TasksPage__aboutItemTitle'>Followers</h4>
          <button className='TasksPage__aboutMore'>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9.93481 6.08679H6.73341V9.5H4.16327V6.08679H0.934814V3.77736H4.16327V0.5H6.73341V3.77736H9.93481V6.08679Z'
                fill='#9B9B9B'
              />
            </svg>
          </button>
        </div>
      </div>
      <div className='TasksPage__description'>
        <h3 className='TasksPage__descriptionTitle'>Description</h3>
        <p className='TasksPage__descriptionSpan'>{task.description}</p>
      </div>
      <div className='TasksPage__files'>
        {task.files.map(item => {
          return (
            <div className='TasksPage__file' key={item.id}>
              <img src={item.icon} alt='' />
              <div className='TasksPage__fileDescription'>
                <p className='TasksPage__fileTxt'>{item.name}</p>
                <div className='TasksPage__fileInfo'>
                  <p className='TasksPage__fileTxt'>{item.size}</p>
                  <button className='TasksPage__fileDelete' onClick={() => onDeleteFile(item.id)}>
                    delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Task }
