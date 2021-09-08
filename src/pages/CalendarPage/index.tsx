import React from "react";
import { Calendar } from "../../components/Calendar";
import { HeaderCalendar } from "../../components/HeaderCalendar";
import './style.scss'

export const CalendarPage = () => {
  const date = new Date();
  return (
    <div className='CalendarPage'>
      <div className='CalendarPage__calendar'>
        <HeaderCalendar today={date} />
        <Calendar today={date} />
      </div>
      <div className='CalendarPage__task'>


      </div>
    </div>
  );
};