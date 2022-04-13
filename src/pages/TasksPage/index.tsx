import React, {useContext, useEffect, useState} from 'react'
import './style.scss'
import { TaskType } from './types'
import { Task } from '../../components/Task'
import { TaskList } from '../../components/TaskList'
import { ProjectType } from '../../components/SideBarList'
import { ACTION, TaskManagerContext } from "../../store/store";
import { BoxScroll } from '../../element/BoxScroll'
import { useOutletContext } from "react-router-dom";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider, useDrop} from "react-dnd";

interface TasksPageProps {
  project: ProjectType
}


// const reorder = (list: TaskType[], result: DropResult) => {
//   if(result.source.droppableId !== result.destination?.droppableId) {
//     return list.map(task => parseInt(task.id) === parseInt(result.draggableId) ? {...task, category: 'todo' } : task)
//   }
//
//   const startIndex = list.findIndex(task => parseInt(task.id) === parseInt(result.draggableId))
//   const arr = Array.from(list)
//   const [removed] = arr.splice(startIndex, 1)
//   arr.splice(result.destination.index, 0, removed)
//   return arr
// }
export const COLUMN_NAMES = {
  TO_DO: 'To Do',
  BACKLOG: 'Backlog',
}




const TasksPage = () => {
  const project = useOutletContext<ProjectType>()
  const isClose = false
  const state = useContext(TaskManagerContext)
  const [openedTask, setOpenedTask] = useState<TaskType>(project.tasks[0])
  useEffect(() => {
    setOpenedTask(project.tasks[0])
  }, [project])

  let toDoTasks: TaskType[] = project.tasks.filter(item => item.category === 'todo')
    .sort((a, b) => a.position > b.position ? 1 : -1);
  const backlogTasks: TaskType[] = project.tasks.filter(item => item.category === 'backlog')
    .sort((a, b) => a.position > b.position ? 1 : -1);

  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }

  // const onTaskUpdated = (task: TaskType) => {
  //   setOpenedTask(task)
  // }
  return (
    <div className='TasksPage'>
      <div className='TasksPage__container'>
        <BoxScroll style={{maxWidth: '385px'}}>
          <DndProvider backend={HTML5Backend}>

              <TaskList tasks={backlogTasks} project={project} activeTask={openedTask} title='backlog'
                        onSelectedTask={onSelectedTask}/>

              <TaskList tasks={toDoTasks} project={project} activeTask={openedTask} title='to Do'
                        onSelectedTask={onSelectedTask}/>

          </DndProvider>
        </BoxScroll>
        {Boolean(openedTask) &&
            <Task task={openedTask} onTaskClose={() => {
            }} isClose={isClose}/>}
      </div>
    </div>
  );
}

export { TasksPage }
