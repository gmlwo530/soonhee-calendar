'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./CalendarForm.css');

require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarForm = function (_Component) {
  _inherits(CalendarForm, _Component);

  function CalendarForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CalendarForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CalendarForm.__proto__ || Object.getPrototypeOf(CalendarForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      text: ""
    }, _this._handleChange = function (e) {
      _this.setState(_defineProperty({}, e.target.name, e.target.value));
    }, _this._handleSubmit = function (e) {
      e.preventDefault();
      _this.props.onCreate(_this.state);
      _this.setState({
        text: ""
      });
    }, _this._closeForm = function (e) {
      e.preventDefault();
      document.querySelector(".form-container").style.display = "none";
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CalendarForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('button', { onClick: this._closeForm }),
        _react2.default.createElement(
          'form',
          { onSubmit: this._handleSubmit },
          _react2.default.createElement(
            'label',
            null,
            'Text :',
            _react2.default.createElement('input', { type: 'text', value: this.state.text, onChange: this._handleChange, name: 'text' })
          ),
          _react2.default.createElement('input', { type: 'submit' })
        )
      );
    }
  }]);

  return CalendarForm;
}(_react.Component);

exports.default = CalendarForm;