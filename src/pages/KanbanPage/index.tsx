import React, {useState} from 'react'
import { TaskList } from '../../components/TaskList'
import { TaskType } from '../TasksPage/types'
import './style.scss'
import { Task } from '../../components/Task'
import { ProjectType } from '../../components/SideBarList'
import {useOutletContext} from "react-router-dom";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";


export const KanbanPage = () => {
  const [openedTask, setOpenedTask] = useState<TaskType | undefined>(undefined)
  const project = useOutletContext<ProjectType>()
  const toDoTasks: TaskType[] = project.tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = project.tasks.filter(item => item.category === 'backlog')

  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }
  const onTaskClose = ():void => {
    setOpenedTask(undefined)
  }
  return (
    <div className='Kanban'>
      <DndProvider backend={HTML5Backend}>
        <div className='Kanban__backlog'>

          <TaskList tasks={backlogTasks} project={project} title='Backlog' isDrag={true} category={'backlog'} onSelectedTask={onSelectedTask}/>

        </div>
        <div className='Kanban__toDo'>

          <TaskList tasks={toDoTasks} project={project} title='To Do' isDrag={true} category={'todo'} onSelectedTask={onSelectedTask}/>
        </div>
      </DndProvider>
      {openedTask ? <Task task={openedTask} onTaskClose={onTaskClose} isClose={true}/> : null}
    </div>
  );
}
