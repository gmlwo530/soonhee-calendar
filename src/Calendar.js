import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Calendar.css'
import Days from './Days'
import CalendarForm from './CalendarForm';
import {soonHeeCalendar} from './global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'


class Calendar extends Component{
  static getDerivedStateFromProps(props, state){
    let type = 1;
    let backgroundColor = "#fff";
    if (props.type != undefined) type = props.type;
    if (props.backgroundColor != undefined) backgroundColor = props.backgroundColor;
    if (backgroundColor != state.backgroundColor){
      return{
        backgroundColor: backgroundColor,
      }
    }

    if (type != state.type){
      return{
        type: type,
      };
    }

    return null;
  }
  // componentWillReceiveProps(props){
  //   this.setState({
  //     type: props.type,
  //   })
  // }

  constructor(props){
    super(props);

    this.date = this._currentDate('Seoul', '+9');
    this.state = {
      date: this.date,
      year: this.date.getFullYear(),
      month: this.date.getMonth(),
      type: props.type || 1, // 1 : 다중 선택, 2 : 범위 선택, 3 : 클릭한 날짜를 다시 클릭 했을 시 메모
      backgroundColor: props.backgroundColor
    };

    this._prevMonth = this._prevMonth.bind(this);
    this._nextMonth = this._nextMonth.bind(this);

    if (props.rawDayTextObject != undefined){
        soonHeeCalendar.dayTextObject = this._rawDateObjToMillisecondsObj(props.rawDayTextObject);
    }
  }

  componentDidMount(){
    soonHeeCalendar.formContainer = document.querySelector(".form-container");
    this.formContainer = document.querySelector(".form-container");
  }

  _currentDate = (city, offset) => {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    return nd;
  }

  _prevMonth = () => {
    var targetMonth;
    var targetYear = this.state.year;

    if(this.state.month===0){
      targetMonth = 11;
      targetYear = this.state.year - 1;
    }else{
      targetMonth = this.state.month - 1;
    }

    this.date = this._currentDate('Seoul', '+9');
    this.setState({
      date: this.date,
      year: targetYear,
      month: targetMonth
    })
  }

  _nextMonth = () => {
    var targetMonth;
    var targetYear = this.state.year;

    if(this.state.month===11){
      targetMonth = 0;
      targetYear = this.state.year + 1;
    }else{
      targetMonth = this.state.month + 1;
    }

    this.date = this._currentDate('Seoul', '+9');
    this.setState({
      date: this.date,
      year: targetYear,
      month: targetMonth
    })
  }

  _getFormData = (e) => {
    this.formContainer.style.display = "none";
    if (soonHeeCalendar.textSelectedDay !== undefined){
        soonHeeCalendar.dayTextObject[soonHeeCalendar.textSelectedDay] = e.text;
    }
    console.log(soonHeeCalendar.dayTextObject);
    this.setState({

    });
  }

  _changeToMilliseconds = (date) => {
    let year = parseInt(date.slice(0,4));
    let month = parseInt(date.slice(4,6)) - 1;
    let day = parseInt(date.slice(6,8));
    return new Date(year, month, day).getTime();
  }

  _rawDateObjToMillisecondsObj = (date) => {
    const millisecondsObj = Object.assign(
      {},
      ...Object.keys(date).map(key => ({[this._changeToMilliseconds(key)]: date[key]}))
    )

    return millisecondsObj;
  }

  render(){
    return(
      <div className="calendar-container">
        <Header backgroundColor = {this.state.backgroundColor} prevMonth={this._prevMonth} nextMonth={this._nextMonth} year={this.state.year} month={this.state.month}/>
        <div className="body-container">
          <table className="calendar-body">
            <DayLabels backgroundColor={this.state.backgroundColor} labels={["일", "월", "화", "수", "목", "금", "토"]}/>
            <Days backgroundColor={this.state.backgroundColor} year={this.state.year} month={this.state.month} type={this.state.type}/>
          </table>
          <div className="form-container">
            <CalendarForm onCreate={this._getFormData}/>
          </div>
        </div>
      </div>
    )
  }
}

function Header({backgroundColor, prevMonth, nextMonth, year, month}){
  var style= {
    'color': backgroundColor
  }
  return(
    <div className="header-container">
      <button className="calendar-button" onClick={prevMonth}><FontAwesomeIcon style={style} icon={faAngleLeft}/></button>
      <div className="calendarYearMonth">{year}.{month + 1}.</div>
      <button className="calendar-button" onClick={nextMonth}><FontAwesomeIcon style={style} icon={faAngleRight}/></button>
    </div>
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


export default Calendar;

Calendar.propTypes = {
  rawDayTextObject: PropTypes.object,

}
