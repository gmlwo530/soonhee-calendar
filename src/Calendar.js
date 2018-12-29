import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Calendar.css'
import CalendarBody from './CalendarBody';
import CalendarForm from './CalendarForm';
import './global';

class Calendar extends Component{
  componentWillReceiveProps(props){
    this.setState({
      type: props.type,
    })
  }

  constructor(props){
    super(props);
    this.date = this._currentDate('Seoul', '+9');
    this.state = {
      date: this.date,
      year: this.date.getFullYear(),
      month: this.date.getMonth(),
      type: props.type,
      styles: props.styles
    };
    this._prevMonth = this._prevMonth.bind(this);
    this._nextMonth = this._nextMonth.bind(this);
    global.dayTextObject = this._rawDateObjToMillisecondsObj(props.rawDayTextObject);
    console.log(global);
  }

  componentDidMount(){
    document.querySelector(".calendarYearMonth").style.color = this.state.styles.headerTextColor;
    global.formContainer = document.querySelector(".form-container");
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
    if (global.textSelectedDay !== undefined){
        global.dayTextObject[global.textSelectedDay] = e.text;
    }
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
        <Header prevMonth={this._prevMonth} nextMonth={this._nextMonth} year={this.state.year} month={this.state.month}/>
        <div className="body-container">
          <CalendarBody year={this.state.year} month={this.state.month} type={parseInt(this.state.type)} />
          <div className="form-container">
            <CalendarForm onCreate={this._getFormData}/>
          </div>
        </div>
      </div>
    )
  }
}

function Header({prevMonth, nextMonth, year, month}){
  return(
    <div className="header-container">
      <button className="calendar-prev-button" onClick={prevMonth}>prev</button>
      <div className="calendarYearMonth">{year}/{month + 1}</div>
      <button className="calendar-next-button" onClick={nextMonth}>next</button>
    </div>
  )
}


export default Calendar;

Calendar.propTypes = {
  rawDayTextObject: PropTypes.object,

}
