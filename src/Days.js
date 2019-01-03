import React, {Component} from "react";
import PropTypes from 'prop-types';
import './Days.css';
import Day from './Day';

//type => 1: 날짜 여러개 선택, 2: 날짜 범위 선택, 3: 날짜에 텍스트 쓰기

class Days extends Component{
  static getDerivedStateFromProps(props, state){
    if (props.month != state.month || props.type != state.type){
      return{
        month: props.month,
        year: props.year,
        type: props.type,
        daysArray: Days._getDaysArray(Days._getFirstDay(props.year, props.month), Days._daysInMonth(props.year, props.month))
      };
    }
    return null;
  }
  // componentWillReceiveProps(props){
  //   this.setState({
  //     month: props.month,
  //     year: props.year,
  //     type: props.type,
  //     daysArray: this._getDaysArray(this._getFirstDay(props.year, props.month), this._daysInMonth(props.year, props.month))
  //   })
  // }

  constructor(props){
    super(props);

    console.log(props);
    this.state = {
      month: props.month,
      year: props.year,
      type: props.type,
      backgroundColor: props.backgroundColor,
      daysArray: Days._getDaysArray(Days._getFirstDay(props.year, props.month), Days._daysInMonth(props.year, props.month))
    };

    this._changeToMilliseconds = this._changeToMilliseconds.bind(this);
  }

  _onDayToggle = () => {
    this.setState({})
  }

  static _daysInMonth = (year, month) => {
    return new Date(year, month+1, 0).getDate();
  }

  static _getFirstDay = (year, month) => {
    return new Date(year, month, 1).getDay();
  }

  static _getDaysArray = (blankCount, daysCount) => {
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
                  backgroundColor = {this.state.backgroundColor}
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
