import React, {Component} from "react";
import PropTypes from 'prop-types';
import './Days.css';
import './global';
import Day from './Day';

//type => 1: 날짜 여러개 선택, 2: 날짜 범위 선택, 3: 날짜에 텍스트 쓰기

class Days extends Component{
  componentWillReceiveProps(props){
    this.setState({
      month: props.month,
      year: props.year,
      type: props.type,
      daysArray: this._getDaysArray(this._getFirstDay(props.year, props.month), this._daysInMonth(props.year, props.month))
    })
  }

  constructor(props){
    super(props);

    this.state = {
      month: props.month,
      year: props.year,
      type: props.type,
      daysArray: this._getDaysArray(this._getFirstDay(props.year, props.month), this._daysInMonth(props.year, props.month))
    };

    this._changeToMilliseconds = this._changeToMilliseconds.bind(this);
  }

  _onDayToggle = () => {
    this.setState({})
  }

  _daysInMonth = (year, month) => {
    return new Date(year, month+1, 0).getDate();
  }

  _getFirstDay = (year, month) => {
    return new Date(year, month, 1).getDay();
  }

  _getDaysArray = (blankCount, daysCount) => {
    var arr = [];
    let share = Math.floor((daysCount + blankCount) / 7);
    let rowCount = share + (share > 0 ? 1 : 0);

    var currentIndex = 1;

    for(var i = 1; i < rowCount + 1; i++){
      var weekArr = [];

      var index = 0;

      while( index < 7 ){
        if (i===1){
          if (index >= blankCount){
              weekArr[index] = currentIndex;
              currentIndex += 1;
          }else{
            weekArr[index] = "";
          }
        }else if(i===rowCount){
          if (currentIndex > daysCount){
            weekArr[index] = "";
            currentIndex += 1;
          }else{
            weekArr[index] = currentIndex;
            currentIndex += 1;
          }
        }else{
          weekArr[index] = currentIndex;
          currentIndex += 1;
        }

        ++index
      }
      arr.push(weekArr)
    }

    return arr
  }

  _changeToMilliseconds = (day) => {
    return new Date(this.state.year, this.state.month, day).getTime();
  }

  _checkWeekArray = (arr) => {
    for(var i=0;i<arr.length;i++){
       if(arr[i] !== "")
          return true;
    }
    return false;
  }

  _getSelectedDay = (selectedDay) => {
    // this.props._getSelectedDay
  }

  render(){
    return(
      <tbody className="tBody">
        {this.state.daysArray.map((ele, index) => {
          if (this._checkWeekArray(ele)){
            return(
              <tr key={index}>
                {ele.map((day, index) => <Day key={index}
                  day={day}
                  milliseconds={this._changeToMilliseconds(day)}
                  type={this.state.type}
                  dayToggle={this._onDayToggle}
                   />)}
              </tr>
            )
          }else{
            return false
          }
        })}
      </tbody>
    )
  }
}



export default Days

Days.propTypes = {
  type: PropTypes.number.isRequired
}
