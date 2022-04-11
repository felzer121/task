import React, {useState} from 'react'
import { TaskList } from '../../components/TaskList'
import { TaskType } from '../TasksPage/types'
import './style.scss'
import { Task } from '../../components/Task'
import { ProjectType } from '../../components/SideBarList'
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useOutletContext} from "react-router-dom";


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

        <div className='Kanban__backlog'>

          <TaskList tasks={backlogTasks} project={project} title='Backlog' onSelectedTask={onSelectedTask}/>

        </div>
        <div className='Kanban__toDo'>

          <TaskList tasks={toDoTasks} project={project} title='To Do' onSelectedTask={onSelectedTask}/>
        </div>
        {openedTask ? <Task task={openedTask} onTaskClose={onTaskClose} isClose={true}/> : null}
    </div>
  );
}
