import React, { useRef } from "react";
import _map from "lodash/map";
import _range from 'lodash/range'
import './style.scss'
import { ProjectType } from "../SideBarList";
import { TaskType } from "../../pages/TasksPage/types";

interface CalendarProps {
  today: Date
  project: ProjectType
  onSelectedCalendarTask: (task: TaskType[]) => void
  openedTask: TaskType[]
}
interface MonthArray {
  month: number
  year: number
}

export const Calendar = ({today, project, openedTask, onSelectedCalendarTask}:CalendarProps) => {
  const month = today.getMonth();
  const year = today.getFullYear();
  const refContainer = useRef(null);

  // Массив дней в месяце и месяцов начиная с текущего
  const totalDaysOfMonth:number[] = []
  const monthArray: MonthArray[] = []
  for (let i = month; i < month + 11; i++) {
    if(i < 12) {
      monthArray.push({month: i, year: year})
      totalDaysOfMonth.push(new Date(year, i + 1, 0).getDate())
    } else {
      monthArray.push({month: i - 12, year: year + 1})
      totalDaysOfMonth.push(new Date(year + 1, i - 11, 0).getDate())
    }
  }

  const totalWeeksOfMonth = totalDaysOfMonth.map(days => Math.ceil(days / 7))

  const buildClassName = (isPass:any, num:number, indexDoM:number,
                          currentYear:number, currentMonth:number) => {
    let className = "day-of-month";
    if (isPass) return (className += " pass");
    if (new Date(currentYear, currentMonth, num).getMonth() !== currentMonth) {
      return (className += " pass");
    }
    if (indexDoM % 7 - 6 === 0 || indexDoM % 7 - 5 === 0) return (className += " dayOff");
      return className;
  };

  return (
    <div className="days-of-month">
      {totalWeeksOfMonth.map((weeks,index) => {
        const currentMonth = monthArray[index].month
        const currentYear = monthArray[index].year
        let isActive = false

        const taskCurrenMonth = project.tasks.filter(task => task.dueOn.toDate().getMonth() === currentMonth)
        let firstIndex = new Date(currentYear, currentMonth).getDay() === 0 ?
          7 : new Date(currentYear, currentMonth).getDay()

        if(firstIndex > 5 && totalDaysOfMonth[index] > 30)
          weeks += 1

        if(firstIndex >= 2 && totalDaysOfMonth[index] === 28)
          weeks += 1

        if(openedTask[0].dueOn.toDate().getMonth() === currentMonth)
          isActive = true

        let from = 1;
        return(
          <div className='month'>
          {_map(_range(0, weeks * 7), (indexDoM) => {
            const isPass = indexDoM + 1 < firstIndex;
            let task:TaskType[] = []
            let isActiveClass = false
            if(taskCurrenMonth)
              task = taskCurrenMonth.filter(task => task.dueOn.toDate().getDate() === new Date(currentYear, currentMonth, from).getDate())

            if(isActive)
              if(openedTask[0].dueOn.toDate().getDate() === new Date(currentYear, currentMonth, from).getDate())
                isActiveClass = true
            return (
              <React.Fragment key={indexDoM}>
                {indexDoM % 7 === 0 && <div className="break"></div>}
                <div ref={refContainer} className={`${buildClassName(isPass, from, indexDoM, currentYear, currentMonth)} ${isActiveClass ? 'month__active' : ''}`} onClick={() => onSelectedCalendarTask(task)}>
                  <span className='month__day'>{isPass ? "" : new Date(currentYear, currentMonth, from++).getDate()}</span>
                  <span className='month__task'>{task ? task.length !== 0 ? `${ task.length } TASK` : '' : ''} </span>
                </div>
              </React.Fragment>
            );
          })}
          </div>
        )
      })}
    </div>
  );
};