'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./Day.css');

var _global = require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_Component) {
  _inherits(Day, _Component);

  function Day(props) {
    _classCallCheck(this, Day);

    var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

    _this._checkActivate = function (milliseconds, type) {
      switch (type) {
        case 1:
          if (_global.soonHeeCalendar.selectedDays.length > 0) {
            return _global.soonHeeCalendar.selectedDays.includes(milliseconds);
          }
          break;
        case 2:
          var result = false;
          var startDate = _global.soonHeeCalendar.startEndDateArr[0]["startDate"];
          var endDate = _global.soonHeeCalendar.startEndDateArr[0]["endDate"];

          if (_global.soonHeeCalendar.daysInRange.length > 0) {
            return _global.soonHeeCalendar.daysInRange.includes(milliseconds);
          } else {
            if (startDate !== undefined) {
              if (startDate === milliseconds) {
                result = true;
              }
            }

            if (endDate !== undefined) {
              if (endDate === milliseconds) {
                result = true;
              }
            }
          }

          return result;
        case 3:
          break;
        default:
          break;
      }

      return false;
    };

    _this._selectDay = function () {

      var changedActivate = !_this.state.isActivate;
      if (changedActivate) {
        _global.soonHeeCalendar.selectedDays.push(_this.state.milliseconds);
      } else {
        _global.soonHeeCalendar.selectedDays = _global.soonHeeCalendar.selectedDays.filter(function (val) {
          return val !== _this.state.milliseconds;
        });
      }
      console.log(_global.soonHeeCalendar.selectedDays);
      _this.setState({
        isActivate: changedActivate
      });
    };

    _this._rangingDays = function (e, state) {
      var startDate = _global.soonHeeCalendar.startEndDateArr[0]["startDate"],
          endDate = _global.soonHeeCalendar.startEndDateArr[0]["endDate"];

      if (startDate === undefined) {
        var changedActivate = !state.isActivate;
        if (changedActivate) {
          _global.soonHeeCalendar.startEndDateArr[0]["startDate"] = state.milliseconds;
        }

        _this.setState({
          isActivate: changedActivate
        });
      } else if (endDate === undefined) {
        if (startDate === state.milliseconds) {
          delete _global.soonHeeCalendar.startEndDateArr[0]["startDate"];
          _this.setState({
            isActivate: !state.isActivate
          });
          return false;
        }

        var _changedActivate = !state.isActivate;
        var dayToMilliSeconds = 86400000;

        if (_changedActivate) {
          if (startDate < state.milliseconds) {
            endDate = _global.soonHeeCalendar.startEndDateArr[0]["endDate"] = state.milliseconds;
          } else {
            endDate = _global.soonHeeCalendar.startEndDateArr[0]["endDate"] = startDate;
            startDate = _global.soonHeeCalendar.startEndDateArr[0]["startDate"] = state.milliseconds;
          }
        } else {
          delete _global.soonHeeCalendar.startEndDateArr[0]["endDate"];
        }

        for (var dayInRange = startDate; dayInRange <= endDate; dayInRange += dayToMilliSeconds) {
          _global.soonHeeCalendar.daysInRange.push(dayInRange);
        }

        _this.setState({
          isActivate: _changedActivate
        });

        _this.props.dayToggle();
      } else if (_global.soonHeeCalendar.daysInRange.length > 0) {
        delete _global.soonHeeCalendar.startEndDateArr[0]["endDate"];
        _global.soonHeeCalendar.startEndDateArr[0]["startDate"] = state.milliseconds;
        _global.soonHeeCalendar.daysInRange = [];
        _this.setState({
          isActivate: !state.isActivate
        });
        _this.props.dayToggle();
      }
    };

    _this._setTextDay = function () {
      var changedActivate = !_this.state.isActivate;
      if (changedActivate) {
        _global.soonHeeCalendar.textSelectedDay = _this.state.milliseconds;

        _this.setState({
          isActivate: changedActivate
        });
      } else {
        if (_global.soonHeeCalendar.textSelectedDay !== 0) {
          document.querySelector(".form-container").style.display = "block";
        } else {
          _this.setState({
            isActivate: changedActivate
          });
        }
      }
    };

    _this._clickMethodByType = function (type) {
      switch (type) {
        case 1:
          _this._selectDay();
          break;
        case 2:
          _this._rangingDays(_this.state);
          break;
        case 3:
          _this._setTextDay(_this.state.milliseconds);
          break;
        default:
      }
    };

    _this._truncate = function (s) {
      if (s !== undefined) {
        if (s.length > 5) {
          return s.substr(0, 5) + "...";
        } else {
          return s;
        }
      }
    };

    _this._isStartEndPoint = function (milliseconds) {
      var startEndDate = _global.soonHeeCalendar.startEndDateArr[0];
      return startEndDate.startDate == milliseconds || startEndDate.endDate == milliseconds;
    };

    _this.state = {
      day: props.day,
      milliseconds: props.milliseconds,
      type: props.type,
      isActivate: _this._checkActivate(props.milliseconds, props.type),
      text: _global.soonHeeCalendar.dayTextObject[props.milliseconds]
    };

    _this._selectDay = _this._selectDay.bind(_this);
    _this._checkActivate = _this._checkActivate.bind(_this);
    _this._rangingDays = _this._rangingDays.bind(_this, props);
    return _this;
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

  _createClass(Day, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        day: props.day,
        milliseconds: props.milliseconds,
        type: props.type,
        isActivate: this._checkActivate(props.milliseconds, props.type),
        text: _global.soonHeeCalendar.dayTextObject[props.milliseconds]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'td',
        { className: this.state.day !== "" ? this.state.isActivate ? "dayCell active" : "dayCell" : "no-day", key: this.state.day, onClick: this._clickMethodByType.bind(this, this.state.type) },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: this._isStartEndPoint(this.state.milliseconds) ? "start-end-point" : "" },
            this.state.day
          ),
          this.state.day !== "" ? _react2.default.createElement(
            'ul',
            { className: 'day-text-box' },
            _react2.default.createElement(
              'li',
              { className: 'day-text', style: { overflow: 'hidden', textOverflow: 'ellipsis' } },
              this._truncate(this.state.text)
            )
          ) : ""
        )
      );
    }
  }]);

  return Day;
}(_react.Component);

exports.default = Day;


Day.propTypes = {
  type: _propTypes2.default.number.isRequired
};