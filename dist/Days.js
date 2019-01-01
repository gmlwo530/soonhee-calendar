'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./Days.css');

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//type => 1: 날짜 여러개 선택, 2: 날짜 범위 선택, 3: 날짜에 텍스트 쓰기

var Days = function (_Component) {
  _inherits(Days, _Component);

  _createClass(Days, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      if (props.month != state.month || props.type != state.type) {
        return {
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

  }]);

  function Days(props) {
    _classCallCheck(this, Days);

    var _this = _possibleConstructorReturn(this, (Days.__proto__ || Object.getPrototypeOf(Days)).call(this, props));

    _this._onDayToggle = function () {
      _this.setState({});
    };

    _this._changeToMilliseconds = function (day) {
      return new Date(_this.state.year, _this.state.month, day).getTime();
    };

    _this._checkWeekArray = function (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== "") return true;
      }
      return false;
    };

    console.log(props);
    _this.state = {
      month: props.month,
      year: props.year,
      type: props.type,
      daysArray: Days._getDaysArray(Days._getFirstDay(props.year, props.month), Days._daysInMonth(props.year, props.month))
    };

    _this._changeToMilliseconds = _this._changeToMilliseconds.bind(_this);
    return _this;
  }

  _createClass(Days, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'tbody',
        { className: 'tBody' },
        this.state.daysArray.map(function (ele, index) {
          if (_this2._checkWeekArray(ele)) {
            return _react2.default.createElement(
              'tr',
              { key: index },
              ele.map(function (day, index) {
                return _react2.default.createElement(_Day2.default, { key: index,
                  day: day,
                  milliseconds: _this2._changeToMilliseconds(day),
                  type: _this2.state.type,
                  dayToggle: _this2._onDayToggle
                });
              })
            );
          } else {
            return false;
          }
        })
      );
    }
  }]);

  return Days;
}(_react.Component);

Days._daysInMonth = function (year, month) {
  return new Date(year, month + 1, 0).getDate();
};

Days._getFirstDay = function (year, month) {
  return new Date(year, month, 1).getDay();
};

Days._getDaysArray = function (blankCount, daysCount) {
  var arr = [];
  var share = Math.floor((daysCount + blankCount) / 7);
  var rowCount = share + (share > 0 ? 1 : 0);

  var currentIndex = 1;

  for (var i = 1; i < rowCount + 1; i++) {
    var weekArr = [];

    var index = 0;

    while (index < 7) {
      if (i === 1) {
        if (index >= blankCount) {
          weekArr[index] = currentIndex;
          currentIndex += 1;
        } else {
          weekArr[index] = "";
        }
      } else if (i === rowCount) {
        if (currentIndex > daysCount) {
          weekArr[index] = "";
          currentIndex += 1;
        } else {
          weekArr[index] = currentIndex;
          currentIndex += 1;
        }
      } else {
        weekArr[index] = currentIndex;
        currentIndex += 1;
      }

      ++index;
    }
    arr.push(weekArr);
  }

  return arr;
};

exports.default = Days;


Days.propTypes = {
  type: _propTypes2.default.number.isRequired
};