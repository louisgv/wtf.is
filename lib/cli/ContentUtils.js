"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContentUtils = function () {
  function ContentUtils() {
    (0, _classCallCheck3.default)(this, ContentUtils);
  }

  (0, _createClass3.default)(ContentUtils, null, [{
    key: "generateAppListString",
    value: function generateAppListString(applications) {
      return applications.reduce(function (p, c) {
        return p + ("\n    " + c.name + "\n    " + c.description + "\n      ");
      }, "");
    }
  }]);
  return ContentUtils;
}();

exports.default = ContentUtils;