import React from "react";
import './style.scss'
import _map from "lodash/map";
import _upperFirst from "lodash/upperFirst";

interface HeaderCalendarProps {
  today: Date
}

export const HeaderCalendar = ({today}:HeaderCalendarProps) => {
  const arrWeekDay = ["mo", "tu", "we", "th", "fr", "sa", "su"];
  const arrMonth=['Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь',
  ];

  return (
    <div className='HeaderCalendar'>
      <h4 className='HeaderCalendar__title'>{arrMonth[today.getMonth()]} {today.getFullYear()}</h4>
      <div className="days-of-week">
        {_map(arrWeekDay, (day) => (
          <div key={day} className="day-of-week">
            {_upperFirst(day)}
          </div>
        ))}
      </div>
    </div>
  );
};