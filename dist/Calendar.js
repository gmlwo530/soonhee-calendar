'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./Calendar.css');

var _CalendarBody = require('./CalendarBody');

var _CalendarBody2 = _interopRequireDefault(_CalendarBody);

var _CalendarForm = require('./CalendarForm');

var _CalendarForm2 = _interopRequireDefault(_CalendarForm);

require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        type: props.type
      });
    }
  }]);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this._currentDate = function (city, offset) {
      var d = new Date();
      var utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var nd = new Date(utc + 3600000 * offset);
      return nd;
    };

    _this._prevMonth = function () {
      var targetMonth;
      var targetYear = _this.state.year;

      if (_this.state.month === 0) {
        targetMonth = 11;
        targetYear = _this.state.year - 1;
      } else {
        targetMonth = _this.state.month - 1;
      }

      _this.date = _this._currentDate('Seoul', '+9');
      _this.setState({
        date: _this.date,
        year: targetYear,
        month: targetMonth
      });
    };

    _this._nextMonth = function () {
      var targetMonth;
      var targetYear = _this.state.year;

      if (_this.state.month === 11) {
        targetMonth = 0;
        targetYear = _this.state.year + 1;
      } else {
        targetMonth = _this.state.month + 1;
      }

      _this.date = _this._currentDate('Seoul', '+9');
      _this.setState({
        date: _this.date,
        year: targetYear,
        month: targetMonth
      });
    };

    _this._getFormData = function (e) {
      _this.formContainer.style.display = "none";
      if (global.textSelectedDay !== undefined) {
        global.dayTextObject[global.textSelectedDay] = e.text;
      }
      _this.setState({});
    };

    _this._changeToMilliseconds = function (date) {
      var year = parseInt(date.slice(0, 4));
      var month = parseInt(date.slice(4, 6)) - 1;
      var day = parseInt(date.slice(6, 8));
      return new Date(year, month, day).getTime();
    };

    _this._rawDateObjToMillisecondsObj = function (date) {
      var millisecondsObj = Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.keys(date).map(function (key) {
        return _defineProperty({}, _this._changeToMilliseconds(key), date[key]);
      }))));

      return millisecondsObj;
    };

    _this.date = _this._currentDate('Seoul', '+9');
    _this.state = {
      date: _this.date,
      year: _this.date.getFullYear(),
      month: _this.date.getMonth(),
      type: props.type || 1
      // styles: props.styles ||
    };
    _this._prevMonth = _this._prevMonth.bind(_this);
    _this._nextMonth = _this._nextMonth.bind(_this);
    if (props.rawDayTextObject != undefined) {
      global.dayTextObject = _this._rawDateObjToMillisecondsObj(props.rawDayTextObject);
    }
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // document.querySelector(".calendarYearMonth").style.color = this.state.styles.headerTextColor;
      global.formContainer = document.querySelector(".form-container");
      this.formContainer = document.querySelector(".form-container");
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'calendar-container' },
        _react2.default.createElement(Header, { prevMonth: this._prevMonth, nextMonth: this._nextMonth, year: this.state.year, month: this.state.month }),
        _react2.default.createElement(
          'div',
          { className: 'body-container' },
          _react2.default.createElement(_CalendarBody2.default, { year: this.state.year, month: this.state.month, type: parseInt(this.state.type) }),
          _react2.default.createElement(
            'div',
            { className: 'form-container' },
            _react2.default.createElement(_CalendarForm2.default, { onCreate: this._getFormData })
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

function Header(_ref2) {
  var prevMonth = _ref2.prevMonth,
      nextMonth = _ref2.nextMonth,
      year = _ref2.year,
      month = _ref2.month;

  return _react2.default.createElement(
    'div',
    { className: 'header-container' },
    _react2.default.createElement(
      'button',
      { className: 'calendar-prev-button', onClick: prevMonth },
      'prev'
    ),
    _react2.default.createElement(
      'div',
      { className: 'calendarYearMonth' },
      year,
      '/',
      month + 1
    ),
    _react2.default.createElement(
      'button',
      { className: 'calendar-next-button', onClick: nextMonth },
      'next'
    )
  );
}

exports.default = Calendar;


Calendar.propTypes = {
  rawDayTextObject: _propTypes2.default.object

};