import React, {useState, useContext} from 'react'
import { TaskType } from '../../pages/TasksPage/types'
import './style.scss'
import { TaskManagerContext, ACTION } from '../../store/store'
import {useDrag, useDrop} from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'
import {useParams} from "react-router-dom";

interface TaskCardProps {
  task: TaskType
  activeTask?: TaskType
  index: number
  taskID: string
  currentColumnName: string
  onSelectTask: (task: TaskType) => void
  onToggleComplete: (task: TaskType) => void
  category: string
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

interface DropResult {
  category: string
}

export const ItemTypes = {
  CARD: 'card',
}

const TaskCard = ({task, activeTask, index, category, taskID, onSelectTask, currentColumnName, moveCard, onToggleComplete}: TaskCardProps) => {
  const [taskIsDone, setTaskIsDone] = React.useState(task.isDone)
  const state = React.useContext(TaskManagerContext)
  const ref = React.useRef<HTMLDivElement>(null)

  let { id } = useParams<{id: string}>();
  const [{ isDragging }, drag] = useDrag({
    type: 'OurFirstType',
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (!!dropResult?.category)
        if(dropResult.category !== draggedItem.category) {
          const projects = state.store.projects.map(project => project.id === id ? {...project, tasks: project.tasks.map(task => task.id === taskID ? {...task, category: dropResult.category} : task)} : project)
            state.dispatch({action: ACTION.UPDATE_TASKS_DND, data: projects})
          }
    },
  });
  const opacity = isDragging ? 0 : 1

  const [, drop] = useDrop(() => ({
    accept: 'OurFirstType',
    drop: () => ({ category: category }),
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.position;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
        return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
        return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  }))

  const handleComplete = () => {
    const newTask = {...task, isDone: !task.isDone}
    onToggleComplete(newTask)
    setTaskIsDone(!taskIsDone)
    state.dispatch({action: ACTION.TOGGLE_DONE_TASK, data: task.id})
  }
  drag(drop(ref))
  return (
    <div
      style={{ opacity }}
      className={`TasksPage__item ${activeTask?.id === task.id ? 'TasksPage__item-active': ''}`}
      ref={ref}
      onClick={() => onSelectTask(task)}>
      <div
        style={{
          background: taskIsDone ? '#9DDD91' : '#fff',
        }}
        onClick={handleComplete}
        className='TasksPage__itemStatus'>
        <svg
          width='12'
          height='9'
          viewBox='0 0 12 9'
          fill={taskIsDone ? '#FFF' : 'gray'}
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11.5612 0.440289C10.9761 -0.144759 10.025 -0.147759 9.43693 0.437289L4.49831 5.3787L2.56007 3.44054C1.975 2.85549 1.02388 2.85549 0.438805 3.44054C-0.146268 4.02559 -0.146268 4.97667 0.438805 5.56171L3.43918 8.56196C3.73022 8.85299 4.11426 9 4.49831 9C4.88236 9 5.26641 8.85299 5.56044 8.56196L11.5612 2.56147C12.1463 1.97642 12.1463 1.02534 11.5612 0.440289Z'/>
        </svg>
      </div>
      <div className='TasksPage__itemContent'>
        <span className='TasksPage__itemTitle'>{task.title}</span>
        <div className='TasksPage__itemTag'>{task.tag}</div>
      </div>
    </div>
  )
}
export {TaskCard}
