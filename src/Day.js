import React, {Component} from "react";
import PropTypes from 'prop-types';
import './Day.css';
import {soonHeeCalendar} from './global';



class Day extends Component{

 

  constructor(props){
    super(props);

    this.state = {
      day: props.day,
      milliseconds: props.milliseconds,
      type: props.type,
      backgroundColor: props.backgroundColor,
      isActivate: this._checkActivate(props.milliseconds, props.type),
      text: soonHeeCalendar.dayTextObject[props.milliseconds]
    };

    this._selectDay = this._selectDay.bind(this);
    this._checkActivate = this._checkActivate.bind(this);
    this._rangingDays = this._rangingDays.bind(this, props);
  }

  // static getDerivedStateFromProps(props, state){
  //   if (props != state){
  //     return{
  //       day: props.day,
  //       milliseconds: props.milliseconds,
  //       type: props.type,
  //       isActivate: this._checkActivate(props.milliseconds, props.type),
  //       text: soonHeeCalendar.dayTextObject[props.milliseconds]
  //     };
  //   }
  //   return null;
  // }

  componentWillReceiveProps(props){
    this.setState({
      day: props.day,
      milliseconds: props.milliseconds,
      type: props.type,
      backgroundColor: props.backgroundColor,
      isActivate: this._checkActivate(props.milliseconds, props.type),
      text: soonHeeCalendar.dayTextObject[props.milliseconds]
    });
  }

  _checkActivate = (milliseconds, type) => {
      switch(type){
        case 1:
          if (soonHeeCalendar.selectedDays.length > 0){
            return soonHeeCalendar.selectedDays.includes(milliseconds);
          }
          break;
        case 2:
          let result = false;
          let startDate = soonHeeCalendar.startEndDateArr[0]["startDate"];
          let endDate = soonHeeCalendar.startEndDateArr[0]["endDate"]

          if (soonHeeCalendar.daysInRange.length > 0){
              return soonHeeCalendar.daysInRange.includes(milliseconds);
          }else{
            if (startDate !== undefined){
              if (startDate === milliseconds) {result = true;}
            }

            if (endDate !== undefined){
              if (endDate === milliseconds) {result = true;}
            }
          }

          return result;
        case 3:
          break;
        default:
          break;
      }

    return false;
  }

  _selectDay = () => {
    var changedActivate = !this.state.isActivate;
    if (changedActivate){
        soonHeeCalendar.selectedDays.push(this.state.milliseconds);
    }else{
        soonHeeCalendar.selectedDays = soonHeeCalendar.selectedDays.filter(val => val !== this.state.milliseconds);
    }
    console.log(soonHeeCalendar.selectedDays)
    this.setState({
      isActivate: changedActivate
    })
  }

  _rangingDays = (e, state) => {
    let startDate = soonHeeCalendar.startEndDateArr[0]["startDate"],
      endDate = soonHeeCalendar.startEndDateArr[0]["endDate"];

    if (startDate === undefined){
      let changedActivate = !state.isActivate;
      if (changedActivate){
        soonHeeCalendar.startEndDateArr[0]["startDate"] = state.milliseconds;
      }

      this.setState({
        isActivate: changedActivate
      })
    }else if (endDate === undefined){
      if (startDate === state.milliseconds){
        delete soonHeeCalendar.startEndDateArr[0]["startDate"];
        this.setState({
          isActivate: !state.isActivate,
        });
        return false;
      }

      let changedActivate = !state.isActivate;
      let dayToMilliSeconds = 86400000

      if (changedActivate){
        if (startDate < state.milliseconds){
          endDate = soonHeeCalendar.startEndDateArr[0]["endDate"] = state.milliseconds;
        }else{
          endDate = soonHeeCalendar.startEndDateArr[0]["endDate"] = startDate;
          startDate = soonHeeCalendar.startEndDateArr[0]["startDate"] = state.milliseconds;
        }
      }else{
        delete soonHeeCalendar.startEndDateArr[0]["endDate"];
      }

      for (var dayInRange = startDate; dayInRange <= endDate; dayInRange+=dayToMilliSeconds){
          soonHeeCalendar.daysInRange.push(dayInRange);
      }

      this.setState({
        isActivate: changedActivate
      });

      this.props.dayToggle()
    }else if (soonHeeCalendar.daysInRange.length > 0){
      delete soonHeeCalendar.startEndDateArr[0]["endDate"];
      soonHeeCalendar.startEndDateArr[0]["startDate"] = state.milliseconds;
      soonHeeCalendar.daysInRange = []
      this.setState({
        isActivate: !state.isActivate,
      });
      this.props.dayToggle()
    }
  }

  _setTextDay = () => {
    var changedActivate = !this.state.isActivate;
    if (changedActivate){
      soonHeeCalendar.textSelectedDay = this.state.milliseconds;

      this.setState({
        isActivate: changedActivate
      })
    }else{
      if (soonHeeCalendar.textSelectedDay !== 0){
        document.querySelector(".form-container").style.display = "block";
      }else{
        this.setState({
          isActivate: changedActivate
        })
      }
    }
  }

  _clickMethodByType = (type) => {
    switch (type) {
      case 1:
        this._selectDay();
        break;
      case 2:
        this._rangingDays(this.state);
        break;
      case 3:
        this._setTextDay(this.state.milliseconds);
        break;
      default:
    }
  }

  _truncate = (s) => {
    if (s !== undefined){
      if (s.length > 5){
        return s.substr(0,5) + "..."
       }else{
        return s
      }
    }
  }

  _isStartEndPoint = (milliseconds) => {
    let startEndDate = soonHeeCalendar.startEndDateArr[0];
    return (startEndDate.startDate == milliseconds) || (startEndDate.endDate == milliseconds);
  }
 

  render(){
    var style = {
      'background-color': this.state.backgroundColor
    }
    var none ={
      'background-color': 'initial'
    }
    var less = {
      'background-color' : this.state.backgroundColor.concat('31')
    }

    return(
      <td style={this.state.isActivate ? less : none} className={this.state.day !== "" ? (this.state.isActivate ? "dayCell active" : "dayCell") : "no-day"} key={this.state.day} onClick={this._clickMethodByType.bind(this, this.state.type)}>
        <div>
          <p style={this._isStartEndPoint(this.state.milliseconds) ? style : none} className={this._isStartEndPoint(this.state.milliseconds) ? "start-end-point" : ""}>{this.state.day}</p>
          {this.state.day !== "" ? (
            <ul className="day-text-box">
              <li className="day-text" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{this._truncate(this.state.text)}</li>
            </ul>
          )
          : ""
          }
        </div>
      </td>
    )
  }
}

export default Day;

Day.propTypes = {
  type: PropTypes.number.isRequired
}
