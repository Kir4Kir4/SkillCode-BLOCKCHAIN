'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Test = require('./build/Test.json');

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Đổi từ Campaign.json hoặc build2 thành Test.json trong build

exports.default = function (address) {
  return new _web2.default.eth.Contract(JSON.parse(_Test2.default.interface), address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFxUZXN0LmpzIl0sIm5hbWVzIjpbIndlYjMiLCJUZXN0IiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiLCJhZGRyZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPLEFBQVAsQUFBaUIsQUFBakI7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBaUIsQUFBakIsQTs7Ozs7O0FBQXNDLEFBRXRDOztrQkFBZSxtQkFBVyxBQUN4QjtTQUFPLElBQUksY0FBSyxBQUFMLElBQVMsQUFBYixTQUFzQixLQUFLLEFBQUwsTUFBVyxlQUFLLEFBQWhCLEFBQXRCLFlBQWtELEFBQWxELEFBQVAsQUFDRDtBQUZEIiwiZmlsZSI6IlRlc3QuanMiLCJzb3VyY2VSb290IjoiRjovVEwvVUVUL0JMT0NLQ0hBSU4vU2tpbGxjb2RlIn0=