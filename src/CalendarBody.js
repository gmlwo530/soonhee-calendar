import React from "react";
import './CalendarBody.css'
import Days from './Days'

function CalendarBody({year, month, type}) {
    return(
      <table className="calendar-body">
        <DayLabels labels={["일", "월", "화", "수", "목", "금", "토"]}/>
        <Days year={year} month={month} type={type}/>
      </table>
    )
}

function DayLabels({labels}){
  return(
    <thead className="tName">
      <tr>
        {labels.map((label, index) => <th key={index}>{label}</th>)}
      </tr>
    </thead>
  )
}

export default CalendarBody;
