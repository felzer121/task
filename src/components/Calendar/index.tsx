import React from "react";
import _map from "lodash/map";
import _range from 'lodash/range'
import './style.scss'

interface CalendarProps {
  today: Date
}
interface MonthArray {
  month: number
  year: number
}

export const Calendar = ({today}:CalendarProps) => {
  const month = today.getMonth();
  const year = today.getFullYear();

  // Массив дней в месяце и месяцов начиная с текущего
  const totalDaysOfMonth:number[] = []
  const monthArray:MonthArray[] = []
  for (let i = month; i < month + 11; i++) {
    if(i < 12) {
      monthArray.push({month: i, year: year})
      totalDaysOfMonth.push(new Date(year, i+1, 0).getDate())
    } else {
      monthArray.push({month: i - 12, year: year + 1})
      totalDaysOfMonth.push(new Date(year + 1, i - 11, 0).getDate())
    }
  }

  const totalWeeksOfMonth = totalDaysOfMonth.map(days =>  Math.ceil(days / 7))

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
        let firstIndex = new Date(monthArray[index].year, monthArray[index].month).getDay();
        if(new Date(monthArray[index].year, monthArray[index].month + 1).getDay() >= 6 && totalDaysOfMonth[index+1] > 30) {
          totalWeeksOfMonth[index+1] = 6
        }
        let from = 1;
        return(
          <div className='month'>
          {_map(_range(0, weeks * 7), (indexDoM) => {
            const isPass = indexDoM + 1 < firstIndex;
            return (
              <React.Fragment key={indexDoM}>
                {indexDoM % 7 === 0 && <div className="break"></div>}
                <div className={buildClassName(isPass, from, indexDoM, monthArray[index].year, monthArray[index].month)}>
                  {isPass ? "" : new Date(monthArray[index].year, monthArray[index].month, from++).getDate()}
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