import React, { useState } from 'react'
import './style.scss'
import { TaskType } from '../../pages/TasksPage/types'

interface ModalProps{
  open: boolean
  onCloseClick: () => void
  children: React.ReactChild | React.ReactChild[]
}

const Modal = ({open, onCloseClick, children}: ModalProps) => {
  if (!open) return null
  return (
        <div className='ModalTask'>
          <div className='ModalTask__overflow'>
            <div className='ModalTask__modal'>
              <div className='ModalTask__title'>
                <h3 className='ModalTask__titleEl'>Add a New Task</h3>
                <svg
                  onClick={onCloseClick}
                  className='ModalTask__close'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    opacity='0.5'
                    d='M9.0842 7.99924L15.7743 1.30917C16.0739 1.0095 16.0739 0.523672 15.7743 0.223995C15.4746 -0.0756823 14.9888 -0.0756823 14.6891 0.223995L7.99902 6.91406L1.30896 0.225018C1.00928 -0.0746595 0.523458 -0.0746595 0.223781 0.225018C-0.0758959 0.524695 -0.0758959 1.01052 0.223781 1.3102L6.91384 8.00026L0.224804 14.6893C-0.0748731 14.989 -0.0748731 15.4748 0.224804 15.7745C0.375154 15.9238 0.570507 15.9995 0.766882 15.9995C0.963258 15.9995 1.15963 15.9248 1.30896 15.7745L7.99902 9.08442L14.6891 15.7745C14.8394 15.9238 15.0348 15.9995 15.2312 15.9995C15.4275 15.9995 15.6239 15.9248 15.7732 15.7745C16.0729 15.4748 16.0729 14.989 15.7732 14.6893L9.0842 7.99924Z'
                    fill='black'
                  />
                </svg>
              </div>
              <div className='ModalTask__body'>
                {children}
              </div>
            </div>
          </div>
        </div>
  )
}

export default Modal
