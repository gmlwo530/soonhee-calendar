import React, {Component} from "react";
import PropTypes from 'prop-types';
import './Day.css';
import './global';


class Day extends Component{
  constructor(props){
    super(props);

    this.state = {
      day: props.day,
      milliseconds: props.milliseconds,
      type: props.type,
      isActivate: this._checkActivate(props.milliseconds, props.type),
      text: global.dayTextObject[props.milliseconds]
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
  //       text: global.dayTextObject[props.milliseconds]
  //     };
  //   }
  //   return null;
  // }

  componentWillReceiveProps(props){
    this.setState({
      day: props.day,
      milliseconds: props.milliseconds,
      type: props.type,
      isActivate: this._checkActivate(props.milliseconds, props.type),
      text: global.dayTextObject[props.milliseconds]
    });
  }

  _checkActivate = (milliseconds, type) => {
      switch(type){
        case 1:
          if (global.selectedDays.length > 0){
            return global.selectedDays.includes(milliseconds);
          }
          break;
        case 2:
          let result = false;
          let startDate = global.startEndDateArr[0]["startDate"];
          let endDate = global.startEndDateArr[0]["endDate"]

          if (global.daysInRange.length > 0){
              return global.daysInRange.includes(milliseconds);
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
        global.selectedDays.push(this.state.milliseconds);
    }else{
        global.selectedDays = global.selectedDays.filter(val => val !== this.state.milliseconds);
    }
    this.setState({
      isActivate: changedActivate
    })
  }

  _rangingDays = (e, state) => {
    let startDate = global.startEndDateArr[0]["startDate"],
      endDate = global.startEndDateArr[0]["endDate"];

    if (startDate === undefined){
      let changedActivate = !state.isActivate;
      if (changedActivate){
        global.startEndDateArr[0]["startDate"] = state.milliseconds;
      }else{
        delete global.startEndDateArr[0]["startDate"];
      }

      this.setState({
        isActivate: changedActivate
      })
    }else if (endDate === undefined){
      let changedActivate = !state.isActivate;
      let dayToMilliSeconds = 86400000

      if (changedActivate){
        if (startDate < state.milliseconds){
          endDate = global.startEndDateArr[0]["endDate"] = state.milliseconds;
        }else{
          endDate = global.startEndDateArr[0]["endDate"] = startDate;
          startDate = global.startEndDateArr[0]["startDate"] = state.milliseconds;
        }
      }else{
        delete global.startEndDateArr[0]["endDate"];
      }

      for (var dayInRange = startDate; dayInRange <= endDate; dayInRange+=dayToMilliSeconds){
          global.daysInRange.push(dayInRange);
      }

      this.setState({
        isActivate: changedActivate
      });

      this.props.dayToggle()
    }else if (global.daysInRange.length > 0){
      delete global.startEndDateArr[0]["endDate"];
      global.startEndDateArr[0]["startDate"] = state.milliseconds;
      global.daysInRange = []
      this.setState({
        isActivate: !state.isActivate,
      });
      this.props.dayToggle()
    }
  }

  _setTextDay = () => {
    var changedActivate = !this.state.isActivate;
    if (changedActivate){
      global.textSelectedDay = this.state.milliseconds;
      global.selectedDay = this.state.milliseconds;
      this.setState({
        isActivate: changedActivate
      })
    }else{
      if (global.selectedDay !== 0){
        global.selectedDay = 0
        document.querySelector(".form-container").style.display = "block";
      }else{
        this.setState({
          isActivate: changedActivate
        })
      }
    }
  }

  _clickMethodByType = (type) => {
    console.log(type);
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

  render(){
    return(
      <td className={this.state.isActivate ? "dayCell active" : "dayCell"} key={this.state.day} onClick={this._clickMethodByType.bind(this, this.state.type)}>
        {this.state.day}
        {this.state.day !== "" ? (
          <ul className="day-text-box">
            <li className="day-text" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{this._truncate(this.state.text)}</li>
          </ul>
        )
        : ""
        }
      </td>
    )
  }
}

export default Day;

Day.propTypes = {
  type: PropTypes.number.isRequired
}
