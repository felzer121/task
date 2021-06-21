import React, { useState } from 'react'
import './style.scss'
import { TaskType } from './types'
import { Task } from '../../components/Task'
import { TaskCard } from '../../components/TaskCard'
import Modal from '../../components/Modal'

interface TasksPageProps {
  tasks: TaskType[]
  globalTaskUpdated: (task: TaskType) => void
  globalTaskCreate: (task: TaskType) => void
}

const TasksPage = ({ tasks, globalTaskUpdated }: TasksPageProps) => {
  const [openedTask, setOpenedTask] = useState(tasks[0])
  const [isOpen, setIsOpen] = useState(false)
  const [valName, setValName] = useState('')
  const [valDescription, setValDescription] = useState('')


  const toDoTasks: TaskType[] = tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = tasks.filter(item => item.category === 'backlog')
  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }

  const openedModal = () => {
    setIsOpen(true)
  }

  const createTask = () => {
    const newTask = {
      id: 11,
      title: { valName },
      author: 'Added by Kristin A.',
      createdAt: 1620837011,
      assignTo: 'Linzell Bowman',
      dueOn: 'Tue, Dec 25',
      tag: 'Marketing',
      category: 'backlog',
      followers: [],
      description: { valDescription },
      files: [
        {
          id: 1,
          icon: 'image/pdf.svg',
          name: 'Redesign Brief 2019.pdf',
          size: 159,
          author: 'Mattie Blooman',
          tag: 'Marketing',
          date: 1620837011
        },
        {
          id: 6,
          icon: 'image/pdf.svg',
          name: 'Client Meeting.pdf',
          size: 159,
          author: 'Mattie Blooman',
          tag: 'Marketing',
          date: 1620837011
        }
      ],
      comments: [
        {
          id: 1,
          icon: 'image/base1.png',
          name: 'Helena Brauer',
          position: 'Designer',
          time: 'Yesterday at 12:37pm',
          comment:
            'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
        },
        {
          id: 2,
          icon: 'image/base2.png',
          name: 'Prescott MacCaffery',
          position: 'Developer',
          time: 'Yesterday at 12:37pm',
          comment:
            '@Helena Software quality assurance activity in which one or several humans check a program mainly '
        }
      ]
    }
  }


  const onTaskUpdated = (task: TaskType) => {
    setOpenedTask(task)
    globalTaskUpdated(task)
  }
  return (
    <div className='TasksPage'>
      <Modal open={isOpen} onCloseClick={() => setIsOpen(false)} >
        <div className='ModalTask__input-box'>
          <label htmlFor='name' className='ModalTask__label'>
            Name
          </label>
          <input
            type='text'
            name='name'
            className='ModalTask__input'
            value={valName}
            onChange={e => setValName(e.target.value)}
            placeholder='e.g Designer, Developers or Finance'
          />
        </div>
        <div className='ModalTask__input-box'>
          <label htmlFor='description' className='ModalTask__label'>
            Description
          </label>
          <input
            type='text'
            name='description'
            value={valDescription}
            onChange={e => setValDescription(e.target.value)}
            className='ModalTask__input'
            placeholder='e.g Designer, Developers or Finance'
          />
        </div>
        <button className='ModalTask__button' onClick={createTask}>
          Create Task
        </button>
      </Modal>
      <div className='TasksPage__container'>
        <div className='TasksPage__left'>
          <div className='TasksPage__backlog'>
            <div className='TasksPage__top'>
              <h4 className='TasksPage__title'>Backlog</h4>
              <button className='TasksPage__button' onClick={() => openedModal()}>
                + Add Task
              </button>
            </div>
            <div className='TasksPage__content'>
              {backlogTasks.map(task => {
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isActive={openedTask.id === task.id}
                    onSelectTask={onSelectedTask}
                  />
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
                  <div className='TasksPage__item' key={task.id}>
                    <div className='TasksPage__itemStatus'>
                      <svg
                        width='12'
                        height='9'
                        viewBox='0 0 12 9'
                        fill='#B8B8B8'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M11.5612 0.440289C10.9761 -0.144759 10.025 -0.147759 9.43693 0.437289L4.49831 5.3787L2.56007 3.44054C1.975 2.85549 1.02388 2.85549 0.438805 3.44054C-0.146268 4.02559 -0.146268 4.97667 0.438805 5.56171L3.43918 8.56196C3.73022 8.85299 4.11426 9 4.49831 9C4.88236 9 5.26641 8.85299 5.56044 8.56196L11.5612 2.56147C12.1463 1.97642 12.1463 1.02534 11.5612 0.440289Z' />
                      </svg>
                    </div>
                    <div className='TasksPage__itemContent'>
                      <span className='TasksPage__itemTitle'>{task.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Task task={openedTask} onTaskUpdated={onTaskUpdated} />
      </div>
    </div>
  )
}

export { TasksPage }
