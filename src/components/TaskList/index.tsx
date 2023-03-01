import React, {useState, useContext, useCallback} from 'react'
import { ACTION, TaskManagerContext } from "../../store/store";
import { CATEGORY_TYPE, TaskType } from '../../pages/TasksPage/types'
import { TaskCard } from '../TaskCard'
import { createTask, updateTask } from '../../services/firebase'
import Modal from '../Modal'
import './style.scss'
import { useParams } from 'react-router-dom'
import { ProjectType } from '../SideBarList';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {useDrop} from "react-dnd";
import Card from "../../element/Card";
import {Checkbox} from "@mui/material";
import {Tag} from "../../element/Tag";

interface TaskListProps {
  tasks: TaskType[]
  title: string
  project: ProjectType
  isDrag: boolean
  activeTask?: TaskType
  category: string
  onSelectedTask: (task: TaskType) => void
}

export const TaskList = ({tasks, project, activeTask, isDrag, title, category, onSelectedTask }:TaskListProps) => {
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

  if(!id)
    return <div />

  const openedModal = () => {
    setIsOpen(true)
  }
  const updateFirebase = (task: TaskType) => {
    updateTask(task).then()
  }
  const onCreateTaskClick = (category: CATEGORY_TYPE) =>  {
    const newTask: TaskType = {
      id: String(project.tasks.length + 1),
      idProject: String(project.id),
      isDone: false,
      userID: 'admin@mail.ru',
      title: value.name,
      position: project.tasks.length + 1,
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

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    let tasks = project.tasks;

    // dragCard is card we are dragging
    let dragCard = tasks[dragIndex];

    // removing this dragCard from array
    tasks.splice(dragIndex, 1);

    // insert dragCard at hover position
    tasks.splice(hoverIndex, 0, {...dragCard, position: hoverIndex});

    const uploadProjects = state.store.projects.map(stateProject => stateProject.id === id ? {...project, tasks: tasks} : project)
    state.dispatch({action: ACTION.UPDATE_TASKS_DND, data: uploadProjects})
  }, [])

  const renderNotDndCard = useCallback((task) => {
    return (
      <div key={task.id} className='tasksElement'>
        <div className='tasksElement__checkbox'>
          <Checkbox
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          />
        </div>
        <Card type={'task'} onSelectedTask={onSelectedTask} task={task}>
          <div className='tasksElement__card'>
            <p>{task.title}</p>
            <Tag tag={task.tag} />
          </div>
        </Card>
      </div>
    )
  }, [])

  const renderCard = useCallback((task, index) => {
    return (
      <TaskCard
        key={task.id}
        task={task}
        category={category}
        currentColumnName={title}
        index={index}
        taskID={task.id}
        activeTask={activeTask}
        onToggleComplete={updateFirebase}
        onSelectTask={onSelectedTask}
        moveCard={moveCard}
      />
    )
  }, [])

  return (
    <div className='TasksPage__backlog' role={'Dustbin'}>
      <Modal open={isOpen} onCloseClick={() => setIsOpen(false)}>
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
            {/* @ts-ignore*/}
            <DayPicker value={value.date} onDayChange={date => setValue({...value, date: date})}/>
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
        { isDrag ? tasks.map((task, index) => renderCard(task, index)) :
          tasks.map((task) => renderNotDndCard(task))}
      </div>
    </div>
  );
}