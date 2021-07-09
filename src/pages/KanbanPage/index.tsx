import React, {useState} from 'react'
import { TaskList } from '../../components/TaskList'
import { TaskType } from '../TasksPage/types'
import './style.scss'
import { Task } from '../../components/Task'
import { motion } from "framer-motion";

interface KanbanPageProps {
  globalTaskUpdated: (task: TaskType) => void
  backlogTasks: TaskType[]
  toDoTasks: TaskType[]
}

export const KanbanPage = ({toDoTasks, backlogTasks, globalTaskUpdated}:KanbanPageProps) => {
  const [openedTask, setOpenedTask] = useState<TaskType | undefined>(undefined)
  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }
  const onTaskClose = ():void => {
    setOpenedTask(undefined)
  }
  const onTaskUpdated = (task:TaskType):void => {
    globalTaskUpdated(task)
  }
  return (
    <div className='Kanban'>
      <motion.div
        drag
        dragConstraints={{
          top: -10,
          left: -10,
          right: 600,
          bottom: 10,
        }}
        className='Kanban__backlog'
      >
        <TaskList tasks={backlogTasks} title='Backlog' onSelectedTask={onSelectedTask} globalTaskUpdated={globalTaskUpdated} />
      </motion.div>
      <motion.div
        drag
        dragConstraints={{
          top: -10,
          left: -500,
          right: 200,
          bottom: 10,
        }}
        className='Kanban__toDo'
      >
        <TaskList tasks={toDoTasks} title='To Do' onSelectedTask={onSelectedTask} globalTaskUpdated={globalTaskUpdated} />
      </motion.div>
      { openedTask? <Task task={openedTask} onTaskUpdated={onTaskUpdated} onTaskClose={onTaskClose} isClose={true} /> : null}
    </div>
  )
}
