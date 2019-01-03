'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./CalendarBody.css');

var _Days = require('./Days');

var _Days2 = _interopRequireDefault(_Days);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CalendarBody(_ref) {
  var backgroundColor = _ref.backgroundColor,
      year = _ref.year,
      month = _ref.month,
      type = _ref.type;

  return _react2.default.createElement(
    'table',
    { className: 'calendar-body' },
    _react2.default.createElement(DayLabels, { backgroundColor: backgroundColor, labels: ["일", "월", "화", "수", "목", "금", "토"] }),
    _react2.default.createElement(_Days2.default, { backgroundColor: backgroundColor, year: year, month: month, type: type })
  );
}

function DayLabels(_ref2) {
  var backgroundColor = _ref2.backgroundColor,
      labels = _ref2.labels;

  var style = {
    'background-color': backgroundColor
  };

  return _react2.default.createElement(
    'thead',
    { className: 'tName' },
    _react2.default.createElement(
      'tr',
      null,
      labels.map(function (label, index) {
        return _react2.default.createElement(
          'th',
          { style: style, key: index },
          label
        );
      })
    )
  );
}

exports.default = CalendarBody;