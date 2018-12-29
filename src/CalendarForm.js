import React, {Component} from 'react';
import './CalendarForm.css';
import './global'

class CalendarForm extends Component{
  state = {
    text: ""
  }

  _handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      text: ""
    })
  }

  _closeForm = (e) => {
    e.preventDefault();
    document.querySelector(".form-container").style.display = "none";
  }

  render(){
    return(
        <div>
          <button onClick={this._closeForm}></button>
          <form onSubmit={this._handleSubmit}>
            <label>
              Text :
              <input type="text" value={this.state.text} onChange={this._handleChange} name="text" />
            </label>
            <input type="submit"/>
          </form>
        </div>
    )
  }
}

export default CalendarForm;
