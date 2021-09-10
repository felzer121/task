import React from "react";
import { Calendar } from "../../components/Calendar";
import { HeaderCalendar } from "../../components/HeaderCalendar";
import { ProjectType } from "../../components/SideBarList";
import './style.scss'

interface CalendarProps {
  project: ProjectType
}

export const CalendarPage = ({project}:CalendarProps) => {
  const date = new Date();
  return (
    <div className='CalendarPage'>
      <div className='CalendarPage__calendar'>
        <HeaderCalendar today={date} />
        <Calendar today={date} project={project} />
      </div>
      <div className='CalendarPage__task'>


      </div>
    </div>
  );
};