import React, { useState, useContext } from 'react'
import { ACTION, TaskManagerContext } from "../../store/store";
import { CATEGORY_TYPE, TaskType } from '../../pages/TasksPage/types'
import { TaskCard } from '../TaskCard'
import { createTask, updateTask } from '../../services/firebase'
import Modal from '../Modal'
import './style.scss'
import { useParams } from 'react-router-dom'
import { ProjectType } from '../SideBarList';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {Draggable} from "react-beautiful-dnd";

interface TaskListProps {
  tasks: TaskType[]
  title: string
  project: ProjectType
  activeTask?: TaskType
  onSelectedTask: (task: TaskType) => void
}

export const TaskList = ({tasks, project, activeTask, title, onSelectedTask }:TaskListProps) => {
  const [taskCategoryForCreation, setTaskCategoryForCreation] = useState<CATEGORY_TYPE>(CATEGORY_TYPE.BACKLOG)
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState({
    name: '',
    description: '',
    date: new Date(),
    tag: ''
  })
  const state = useContext(TaskManagerContext)
  let { id } = useParams<{id: string}>();

  const openedModal = () => {
    setIsOpen(true)
  }
  const updateFirebase = (task: TaskType) => {
    updateTask(task).then()
  }
  const onCreateTaskClick = (category: CATEGORY_TYPE) =>  {
    const newTask: TaskType = {
      id: String(project.tasks.length + 1),
      isDone: false,
      userID: 'admin@mail.ru',
      title: value.name,
      author: 'Added by Kristin A.',
      createdAt: new Date(),
      assignTo: 'Linzell Bowman',
      dueOn: value.date,
      tag: value.tag,
      category: category,
      followers: [],
      description: value.description,
      files: [
        {
          id: 1,
          icon: '/image/pdf.svg',
          name: 'Redesign Brief 2019.pdf',
          size: 159,
          author: 'Mattie Blooman',
          tag: 'Marketing',
          date: 1620837011
        },
        {
          id: 6,
          icon: '/image/pdf.svg',
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
          icon: '/image/base1.png',
          name: 'Helena Brauer',
          position: 'Designer',
          time: 'Yesterday at 12:37pm',
          comment:
            'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
        },
        {
          id: 2,
          icon: '/image/base2.png',
          name: 'Prescott MacCaffery',
          position: 'Developer',
          time: 'Yesterday at 12:37pm',
          comment:
            '@Helena Software quality assurance activity in which one or several humans check a program mainly '
        }
      ]
    }
    createTask(newTask, id).then()
    state.dispatch({ action: ACTION.CREATE_TASK, data: {task: newTask, id: id} })
    setIsOpen(false)
  }
  return (
    <div className='TasksPage__backlog'>
      <Modal open={isOpen} onCloseClick={() => setIsOpen(false)} >
        <div className='ModalTask__input-box'>
          <label htmlFor='name' className='ModalTask__label'>
            Name
          </label>
          <input
            type='text'
            name='name'
            className='ModalTask__input'
            value={value.name}
            onChange={e => setValue({...value, name: e.target.value})}
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
            value={value.description}
            onChange={e => setValue({...value, description: e.target.value})}
            className='ModalTask__input'
            placeholder='description'
          />
        </div>
        <div className="ModalTask__box">
          <div className='ModalTask__inputTwo'>
            <label htmlFor='description' className='ModalTask__label'>
              Date
            </label>
            <DayPickerInput value={value.date} onDayChange={date => setValue({...value, date: date})} />
          </div>
          <div className='ModalTask__input-box'>
            <label htmlFor='tag' className='ModalTask__label'>
              TAG
            </label>
            <input
              type='text'
              name='tag'
              value={value.tag}
              onChange={e => setValue({...value, tag: e.target.value})}
              className='ModalTask__input'
              placeholder='tag'
            />
          </div>
        </div>
        <button className='ModalTask__button' onClick={() => onCreateTaskClick(taskCategoryForCreation)}>
          Create Task
        </button>
      </Modal>
      <div className='TasksPage__top'>
        <h4 className='TasksPage__title'>{title}</h4>
        <button className='TasksPage__button' onClick={() => {
          openedModal()
          setTaskCategoryForCreation(title === 'Backlog' ? CATEGORY_TYPE.BACKLOG : CATEGORY_TYPE.TODO)
        }}>
          + Add Task
        </button>
      </div>
      <div className='TasksPage__content'>
        {tasks.map((task,index) => {
          return (
            <Draggable draggableId={task.id} key={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard
                    activeTask={activeTask}
                    task={task}
                    onToggleComplete={updateFirebase}
                    onSelectTask={onSelectedTask}
                  />
                </div>
              )}
            </Draggable>
          );
        })}
      </div>
    </div>
  )
}