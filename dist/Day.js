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

require('./global');

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
          if (global.selectedDays.length > 0) {
            return global.selectedDays.includes(milliseconds);
          }
          break;
        case 2:
          var result = false;
          var startDate = global.startEndDateArr[0]["startDate"];
          var endDate = global.startEndDateArr[0]["endDate"];

          if (global.daysInRange.length > 0) {
            return global.daysInRange.includes(milliseconds);
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
        global.selectedDays.push(_this.state.milliseconds);
      } else {
        global.selectedDays = global.selectedDays.filter(function (val) {
          return val !== _this.state.milliseconds;
        });
      }
      _this.setState({
        isActivate: changedActivate
      });
    };

    _this._rangingDays = function (e, state) {
      var startDate = global.startEndDateArr[0]["startDate"],
          endDate = global.startEndDateArr[0]["endDate"];

      if (startDate === undefined) {
        var changedActivate = !state.isActivate;
        if (changedActivate) {
          global.startEndDateArr[0]["startDate"] = state.milliseconds;
        } else {
          delete global.startEndDateArr[0]["startDate"];
        }

        _this.setState({
          isActivate: changedActivate
        });
      } else if (endDate === undefined) {
        var _changedActivate = !state.isActivate;
        var dayToMilliSeconds = 86400000;

        if (_changedActivate) {
          if (startDate < state.milliseconds) {
            endDate = global.startEndDateArr[0]["endDate"] = state.milliseconds;
          } else {
            endDate = global.startEndDateArr[0]["endDate"] = startDate;
            startDate = global.startEndDateArr[0]["startDate"] = state.milliseconds;
          }
        } else {
          delete global.startEndDateArr[0]["endDate"];
        }

        for (var dayInRange = startDate; dayInRange <= endDate; dayInRange += dayToMilliSeconds) {
          global.daysInRange.push(dayInRange);
        }

        _this.setState({
          isActivate: _changedActivate
        });

        _this.props.dayToggle();
      } else if (global.daysInRange.length > 0) {
        delete global.startEndDateArr[0]["endDate"];
        global.startEndDateArr[0]["startDate"] = state.milliseconds;
        global.daysInRange = [];
        _this.setState({
          isActivate: !state.isActivate
        });
        _this.props.dayToggle();
      }
    };

    _this._setTextDay = function () {
      var changedActivate = !_this.state.isActivate;
      if (changedActivate) {
        global.textSelectedDay = _this.state.milliseconds;
        global.selectedDay = _this.state.milliseconds;
        _this.setState({
          isActivate: changedActivate
        });
      } else {
        if (global.selectedDay !== 0) {
          global.selectedDay = 0;
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

    _this.state = {
      day: props.day,
      milliseconds: props.milliseconds,
      type: props.type,
      isActivate: _this._checkActivate(props.milliseconds, props.type),
      text: global.dayTextObject[props.milliseconds]
    };

    _this._selectDay = _this._selectDay.bind(_this);
    _this._checkActivate = _this._checkActivate.bind(_this);
    _this._rangingDays = _this._rangingDays.bind(_this, props);
    return _this;
  }

  _createClass(Day, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        day: props.day,
        milliseconds: props.milliseconds,
        type: props.type,
        isActivate: this._checkActivate(props.milliseconds, props.type),
        text: global.dayTextObject[props.milliseconds]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'td',
        { className: this.state.isActivate ? "dayCell active" : "dayCell", key: this.state.day, onClick: this._clickMethodByType.bind(this, this.state.type) },
        this.state.day,
        this.state.day !== "" ? _react2.default.createElement(
          'ul',
          { className: 'day-text-box' },
          _react2.default.createElement(
            'li',
            { className: 'day-text', style: { overflow: 'hidden', textOverflow: 'ellipsis' } },
            this._truncate(this.state.text)
          )
        ) : ""
      );
    }
  }]);

  return Day;
}(_react.Component);

exports.default = Day;


Day.propTypes = {
  type: _propTypes2.default.number.isRequired
};