import React from "react";
import './CalendarBody.css'
import Days from './Days'

function CalendarBody({backgroundColor, year, month, type}) {
    return(
      <table className="calendar-body">
        <DayLabels backgroundColor={backgroundColor} labels={["일", "월", "화", "수", "목", "금", "토"]}/>
        <Days backgroundColor={backgroundColor} year={year} month={month} type={type}/>
      </table>
    )
}

function DayLabels({backgroundColor, labels}){
  var style = {
    'background-color' : backgroundColor
  }

  return(
    <thead className="tName">
      <tr>
        {labels.map((label, index) => <th style={style} key={index}>{label}</th>)}
      </tr>
    </thead>
  )
}


export default CalendarBody;
