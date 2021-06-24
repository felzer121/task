import React, { useState } from 'react'
import './style.scss'
import { CATEGORY_TYPE, TaskType } from './types'
import { Task } from '../../components/Task'
import { TaskCard } from '../../components/TaskCard'
import Modal from '../../components/Modal'
import { createTask } from '../../services/firebase'

interface TasksPageProps {
  tasks: TaskType[]
  globalTaskUpdated: (task: TaskType) => void
}

const TasksPage = ({ tasks, globalTaskUpdated }: TasksPageProps) => {
  const [openedTask, setOpenedTask] = useState(tasks[0])
  const [taskCategoryForCreation, setTaskCategoryForCreation] = useState<CATEGORY_TYPE>(CATEGORY_TYPE.BACKLOG)
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

  const onCreateTaskClick = (category: CATEGORY_TYPE) => {
    const newTask: TaskType = {
      id: 11,
      title: valName,
      author: 'Added by Kristin A.',
      createdAt: 1620837011,
      assignTo: 'Linzell Bowman',
      dueOn: 'Tue, Dec 25',
      tag: 'Marketing',
      category: category,
      followers: [],
      description: valDescription,
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
    createTask(newTask)
    globalTaskUpdated(newTask)
    setIsOpen(false)
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
        <button className='ModalTask__button' onClick={()=>onCreateTaskClick(taskCategoryForCreation)}>
          Create Task
        </button>
      </Modal>
      <div className='TasksPage__container'>
        <div className='TasksPage__left'>
          <div className='TasksPage__backlog'>
            <div className='TasksPage__top'>
              <h4 className='TasksPage__title'>Backlog</h4>
              <button className='TasksPage__button' onClick={() => {
                openedModal()
                setTaskCategoryForCreation(CATEGORY_TYPE.BACKLOG)
              }}>
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
              <button className='TasksPage__button' onClick={() => {
                openedModal()
                setTaskCategoryForCreation(CATEGORY_TYPE.TODO)
              }}>+ Add Task</button>
            </div>
            <div className='TasksPage__content'>
              {toDoTasks.map(task => {
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
        </div>
        <Task task={openedTask} onTaskUpdated={onTaskUpdated} />
      </div>
    </div>
  )
}

export { TasksPage }
