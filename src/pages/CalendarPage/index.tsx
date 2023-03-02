import React, { useEffect, useState } from "react";
import { Calendar } from "../../components/Calendar";
import { HeaderCalendar } from "../../components/HeaderCalendar";
import { ProjectType } from "../../components/SideBarList";
import { Task } from "../../components/Task";
import { TaskList } from "../../components/TaskList";
import { TaskType } from "../TasksPage/types";
import './style.scss'
import {useOutletContext} from "react-router-dom";


export const CalendarPage = () => {
  const date = new Date();
  const project = useOutletContext<ProjectType>()
  const dateCurrentMonth = project.tasks.reduce((prevTask, currentTask) => {
    if(prevTask.dueOn.toDate().getFullYear() < currentTask.dueOn.toDate().getFullYear())
      return prevTask
    return currentTask
  }, project.tasks[0])

  const [onOpenTask, setOpenTask] = useState<TaskType[]>([dateCurrentMonth])
  const [openedTask, setOpenedTask] = useState<TaskType | null>()

  useEffect(() => {
    setOpenTask([dateCurrentMonth])
  }, [dateCurrentMonth])

  const onSelectedCalendarTask = (selectedTasks: TaskType[]): void => {
    if(selectedTasks.length) {
      setOpenTask(selectedTasks)
      setOpenedTask(null)
    }
  }
  const isClose = false
  const onSelectedTask = (openTask: TaskType): void => {
    setOpenedTask(openTask)
  }

  return (
    <div className='CalendarPage'>
      <div className='CalendarPage__calendar'>
        <HeaderCalendar today={date} />
        <Calendar today={date} project={project} openedTask={onOpenTask} onSelectedCalendarTask={onSelectedCalendarTask} />
      </div>
      {Boolean(!openedTask) &&
        <div className='CalendarPage__task'>
          <TaskList tasks={onOpenTask} project={project} title='Backlog' category='backlog' isDrag={false} onSelectedTask={onSelectedTask} />
        </div>}
      {Boolean(openedTask) &&
        <Task task={openedTask!} onTaskClose={() => {}} isClose={isClose} />}
    </div>
  );
};