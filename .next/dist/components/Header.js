'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../routes');

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'F:\\TL\\UET\\BLOCKCHAIN\\Skillcode\\components\\Header.js';


var Header = function (_Component) {
    (0, _inherits3.default)(Header, _Component);

    function Header() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Header);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            role: '',
            account: ''
        }, _this.handleLoginEvent = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var accounts;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _web2.default.eth.getAccounts();

                        case 2:
                            accounts = _context.sent;
                            _context.next = 5;
                            return _this.fetchRole(accounts[0]);

                        case 5:
                            // Lưu đánh dấu đã đăng nhập vào Session
                            sessionStorage.setItem('SKILLCODE_LC_LOGIN', 'true');

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _this.fetchRole = function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(account) {
                var role;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                if (!account) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.next = 4;
                                return _factory2.default.methods.getRole(account).call();

                            case 4:
                                role = _context2.sent;

                                _this.setState({ role: role, account: account });

                            case 6:
                                _context2.next = 10;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](0);

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2, [[0, 8]]);
            }));

            return function (_x) {
                return _ref3.apply(this, arguments);
            };
        }(), _this.handleSwitchAccount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return window.ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });

                        case 3:
                            _context3.next = 8;
                            break;

                        case 5:
                            _context3.prev = 5;
                            _context3.t0 = _context3['catch'](0);
                            console.error(_context3.t0);
                        case 8:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[0, 5]]);
        })), _this.handleLogout = function () {
            // 1. Xóa phiên đăng nhập
            sessionStorage.removeItem('SKILLCODE_LC_LOGIN');

            // 2. Xóa state local
            _this.setState({ role: '', account: '' });

            // 3. Bắn sự kiện để trang test.js cũng logout theo (về giao diện khách)
            window.dispatchEvent(new Event('LOGOUT_UI'));

            // 4. Chuyển về trang chủ (nếu đang ở trang khác)
            _routes.Router.pushRoute('/test/test');
        }, _this.triggerLogin = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var accounts;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            // Đánh dấu session và reload để trang chủ tự xử lý hiển thị
                            sessionStorage.setItem('SKILLCODE_LC_LOGIN', 'true');
                            _context4.next = 3;
                            return _web2.default.eth.getAccounts();

                        case 3:
                            accounts = _context4.sent;
                            _context4.next = 6;
                            return _this.fetchRole(accounts[0]);

                        case 6:
                            _routes.Router.pushRoute('/test/test');
                            // Phát sự kiện để test.js cập nhật nếu đang ở đó
                            window.dispatchEvent(new Event('LOGIN_SUCCESS'));

                        case 8:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2);
        })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Header, [{
        key: 'componentDidMount',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                var accounts, isLoggedIn;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return _web2.default.eth.getAccounts();

                            case 3:
                                accounts = _context5.sent;

                                this.setState({ account: accounts[0] });

                                // 2. LOGIC QUAN TRỌNG: Kiểm tra xem có đang trong phiên đăng nhập không
                                // Nếu vừa chuyển ví (reload trang), sessionStorage vẫn còn giữ giá trị 'true'
                                isLoggedIn = sessionStorage.getItem('SKILLCODE_LC_LOGIN');

                                if (!(isLoggedIn === 'true')) {
                                    _context5.next = 9;
                                    break;
                                }

                                _context5.next = 9;
                                return this.fetchRole(accounts[0]);

                            case 9:
                                _context5.next = 13;
                                break;

                            case 11:
                                _context5.prev = 11;
                                _context5.t0 = _context5['catch'](0);

                            case 13:

                                // Lắng nghe sự kiện đăng nhập từ trang chủ (nút Truy cập)
                                window.addEventListener('LOGIN_SUCCESS', this.handleLoginEvent);
                                // Lắng nghe sự kiện đăng xuất
                                window.addEventListener('LOGOUT', this.handleLogout);

                            case 15:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 11]]);
            }));

            function componentDidMount() {
                return _ref6.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('LOGIN_SUCCESS', this.handleLoginEvent);
            window.removeEventListener('LOGOUT', this.handleLogout);
        }

        // --- SỬA NÚT ĐĂNG XUẤT ---


        // Nút đăng nhập trên Header (Dành cho trường hợp đang ở trang khác trang chủ)

    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                role = _state.role,
                account = _state.account;

            var shortAccount = account ? account.substring(0, 6) + '...' + account.substring(account.length - 4) : '';

            return _react2.default.createElement(_semanticUiReact.Menu, { secondary: true, style: { margin: 0, padding: '10px 0' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 93
                }
            }, _react2.default.createElement(_routes.Link, { route: '/test/test', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 94
                }
            }, _react2.default.createElement('a', { className: 'item', style: { paddingLeft: 0 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 95
                }
            }, _react2.default.createElement('div', { style: { display: 'flex', alignItems: 'center' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 96
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'cubes', size: 'large', color: 'blue', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 97
                }
            }), _react2.default.createElement('span', { style: { fontSize: '1.5em', fontWeight: '800', color: '#1a1a1a', marginLeft: '10px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 98
                }
            }, 'SkillCode')))), _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', style: { alignItems: 'center' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                }
            }, role && _react2.default.createElement('div', { style: { marginRight: '15px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 107
                }
            }, _react2.default.createElement(_semanticUiReact.Label, { color: role === 'lecturer' ? 'orange' : 'teal', size: 'large', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 108
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: role === 'lecturer' ? 'university' : 'student', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 109
                }
            }), role === 'lecturer' ? 'Giảng viên' : 'Sinh viên')), role === 'lecturer' && _react2.default.createElement(_routes.Link, { route: '/test/newtest', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 116
                }
            }, _react2.default.createElement('a', { className: 'item', style: { color: '#1f1f1f', fontWeight: 600 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 117
                }
            }, 'T\u1EA1o Kh\xF3a H\u1ECDc')), role === 'student' && _react2.default.createElement(_routes.Link, { route: '/test/test', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                }
            }, _react2.default.createElement('a', { className: 'item', style: { color: '#1f1f1f', fontWeight: 600 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 123
                }
            }, 'Kh\xF3a h\u1ECDc c\u1EE7a t\xF4i')), account && role ? _react2.default.createElement(_semanticUiReact.Dropdown, {
                trigger: _react2.default.createElement(_semanticUiReact.Button, { basic: true, icon: true, labelPosition: 'left', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 129
                    }
                }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'user circle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 129
                    }
                }), shortAccount),
                pointing: true, className: 'link item',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 128
                }
            }, _react2.default.createElement(_semanticUiReact.Dropdown.Menu, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 132
                }
            }, _react2.default.createElement(_semanticUiReact.Dropdown.Item, { onClick: this.handleSwitchAccount, icon: 'exchange', text: '\u0110\u1ED5i v\xED', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 133
                }
            }), _react2.default.createElement(_semanticUiReact.Dropdown.Divider, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 134
                }
            }), _react2.default.createElement(_semanticUiReact.Dropdown.Item, { onClick: this.handleLogout, icon: 'sign-out', text: '\u0110\u0103ng xu\u1EA5t', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 135
                }
            }))) : _react2.default.createElement('div', { style: { display: 'flex' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 139
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { basic: true, onClick: this.triggerLogin, style: { marginRight: '10px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 141
                }
            }, '\u0110\u0103ng nh\u1EADp'), _react2.default.createElement(_routes.Link, { route: '/campaign/new', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 142
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { primary: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 143
                }
            }, '\u0110\u0103ng k\xFD')))));
        }
    }]);

    return Header;
}(_react.Component);

exports.default = Header;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXEhlYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIk1lbnUiLCJCdXR0b24iLCJJY29uIiwiTGFiZWwiLCJEcm9wZG93biIsIkxpbmsiLCJSb3V0ZXIiLCJ3ZWIzIiwiZmFjdG9yeSIsIkhlYWRlciIsInN0YXRlIiwicm9sZSIsImFjY291bnQiLCJoYW5kbGVMb2dpbkV2ZW50IiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJhY2NvdW50cyIsImZldGNoUm9sZSIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsIm1ldGhvZHMiLCJnZXRSb2xlIiwiY2FsbCIsInNldFN0YXRlIiwiaGFuZGxlU3dpdGNoQWNjb3VudCIsIndpbmRvdyIsImV0aGVyZXVtIiwicmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImV0aF9hY2NvdW50cyIsImNvbnNvbGUiLCJlcnJvciIsImhhbmRsZUxvZ291dCIsInJlbW92ZUl0ZW0iLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJwdXNoUm91dGUiLCJ0cmlnZ2VyTG9naW4iLCJpc0xvZ2dlZEluIiwiZ2V0SXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2hvcnRBY2NvdW50Iiwic3Vic3RyaW5nIiwibGVuZ3RoIiwibWFyZ2luIiwicGFkZGluZyIsInBhZGRpbmdMZWZ0IiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJjb2xvciIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU0sQUFBUSxBQUFNLEFBQU87O0FBQ3BDLEFBQVMsQUFBTSxBQUFjOztBQUM3QixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBTyxBQUFhOzs7Ozs7Ozs7SSxBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Z04sQUFDSjtrQkFBUSxBQUNBLEFBQ047cUIsQUFGTSxBQUVHO0FBRkgsQUFDTixpQixBQTZCRiw0RkFBbUIsbUJBQUE7Z0JBQUE7MEVBQUE7MEJBQUE7cURBQUE7NkJBQUE7NENBQUE7bUNBRVEsY0FBQSxBQUFLLElBRmIsQUFFUSxBQUFTOzs2QkFBMUI7QUFGUyxnREFBQTs0Q0FBQTttQ0FHVCxNQUFBLEFBQUssVUFBVSxTQUhOLEFBR1QsQUFBZSxBQUFTOzs2QkFDOUI7QUFDQTsyQ0FBQSxBQUFlLFFBQWYsQUFBdUIsc0JBTFIsQUFLZixBQUE2Qzs7NkJBTDlCOzZCQUFBOzRDQUFBOztBQUFBO3dCQUFBO0EsbUIsQUFRbkI7aUdBQVksa0JBQUEsQUFBTyxTQUFQO29CQUFBO2dGQUFBOzhCQUFBOzJEQUFBO2lDQUFBO2lEQUFBOztxQ0FBQSxBQUVGLFNBRkU7cURBQUE7QUFBQTtBQUFBOztpREFBQTt1Q0FHaUIsa0JBQUEsQUFBUSxRQUFSLEFBQWdCLFFBQWhCLEFBQXdCLFNBSHpDLEFBR2lCLEFBQWlDOztpQ0FBOUM7QUFISixpREFJRjs7c0NBQUEsQUFBSyxTQUFTLEVBQUUsTUFBRixNQUFRLFNBSnBCLEFBSUYsQUFBYzs7aUNBSlo7aURBQUE7QUFBQTs7aUNBQUE7aURBQUE7a0VBQUE7O2lDQUFBO2lDQUFBO2lEQUFBOztBQUFBOzBDQUFBO0E7Ozs7O21CLEFBU1osK0ZBQXNCLG9CQUFBOzRFQUFBOzBCQUFBO3VEQUFBOzZCQUFBOzZDQUFBOzZDQUFBO21DQUVSLE9BQUEsQUFBTyxTQUFQLEFBQWdCLFFBQVEsRUFBRSxRQUFGLEFBQVUsNkJBQTZCLFFBQVEsQ0FBQyxFQUFFLGNBRmxFLEFBRVIsQUFBd0IsQUFBK0MsQUFBQyxBQUFnQjs7NkJBRmhGOzZDQUFBO0FBQUE7OzZCQUFBOzZDQUFBOzhEQUlBO29DQUFBLEFBQVEsZ0JBSlI7NkJBQUE7NkJBQUE7NkNBQUE7O0FBQUE7c0NBQUE7QSxtQixBQVF0QixlQUFlLFlBQU0sQUFDakI7QUFDQTsyQkFBQSxBQUFlLFdBQWYsQUFBMEIsQUFFMUI7O0FBQ0E7a0JBQUEsQUFBSyxTQUFTLEVBQUUsTUFBRixBQUFRLElBQUksU0FBMUIsQUFBYyxBQUFxQixBQUVuQzs7QUFDQTttQkFBQSxBQUFPLGNBQWMsSUFBQSxBQUFJLE1BQXpCLEFBQXFCLEFBQVUsQUFFL0I7O0FBQ0E7MkJBQUEsQUFBTyxVQUFQLEFBQWlCLEFBQ3BCO0EsaUIsQUFHRCx3RkFBZSxvQkFBQTtnQkFBQTs0RUFBQTswQkFBQTt1REFBQTs2QkFDWDtBQUNBOzJDQUFBLEFBQWUsUUFBZixBQUF1QixzQkFGWixBQUVYLEFBQTZDOzZDQUZsQzttQ0FHWSxjQUFBLEFBQUssSUFIakIsQUFHWSxBQUFTOzs2QkFBMUI7QUFISyxpREFBQTs2Q0FBQTttQ0FJTCxNQUFBLEFBQUssVUFBVSxTQUpWLEFBSUwsQUFBZSxBQUFTOzs2QkFDOUI7MkNBQUEsQUFBTyxVQUFQLEFBQWlCLEFBQ2pCO0FBQ0E7bUNBQUEsQUFBTyxjQUFjLElBQUEsQUFBSSxNQVBkLEFBT1gsQUFBcUIsQUFBVTs7NkJBUHBCOzZCQUFBOzZDQUFBOztBQUFBO3lCQUFBO0E7Ozs7Ozs7Ozs7Ozs7O3VDQTlEYyxjQUFBLEFBQUssSSxBQUFMLEFBQVM7O2lDQUExQjtBLHFEQUNOOztxQ0FBQSxBQUFLLFNBQVMsRUFBRSxTQUFTLFNBQXpCLEFBQWMsQUFBVyxBQUFTLEFBRWxDOztBQUNBO0FBQ007QSw2Q0FBYSxlQUFBLEFBQWUsUSxBQUFmLEFBQXVCOztzQ0FDdEMsZSxBQUFlOzs7Ozs7dUNBQ1QsS0FBQSxBQUFLLFVBQVUsUyxBQUFmLEFBQWUsQUFBUzs7Ozs7Ozs7OztpQ0FJdEM7O0FBQ0E7dUNBQUEsQUFBTyxpQkFBUCxBQUF3QixpQkFBaUIsS0FBekMsQUFBOEMsQUFDOUM7QUFDQTt1Q0FBQSxBQUFPLGlCQUFQLEFBQXdCLFVBQVUsS0FBbEMsQUFBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQ0FHbEIsQUFDbkI7bUJBQUEsQUFBTyxvQkFBUCxBQUEyQixpQkFBaUIsS0FBNUMsQUFBaUQsQUFDakQ7bUJBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzdDO0FBMEJEOztBQWVBOzs7Ozs7O2lDQVdTO3lCQUNtQixLQURuQixBQUN3QjtnQkFEeEIsQUFDQyxjQURELEFBQ0M7Z0JBREQsQUFDTyxpQkFEUCxBQUNPLEFBQ2Q7O2dCQUFNLGVBQWUsVUFBYSxRQUFBLEFBQVEsVUFBUixBQUFrQixHQUEvQixBQUFhLEFBQXFCLGFBQVEsUUFBQSxBQUFRLFVBQVUsUUFBQSxBQUFRLFNBQXBFLEFBQTBDLEFBQW1DLEtBQWxHLEFBQXlHLEFBRXpHOzttQ0FDRSxBQUFDLHVDQUFLLFdBQU4sTUFBZ0IsT0FBTyxFQUFFLFFBQUYsQUFBVSxHQUFHLFNBQXBDLEFBQXVCLEFBQXNCOzhCQUE3QztnQ0FBQSxBQUNFO0FBREY7YUFBQSxrQkFDRSxBQUFDLDhCQUFLLE9BQU4sQUFBWTs4QkFBWjtnQ0FBQSxBQUNFO0FBREY7K0JBQ0UsY0FBQSxPQUFHLFdBQUgsQUFBYSxRQUFPLE9BQU8sRUFBQyxhQUE1QixBQUEyQixBQUFjOzhCQUF6QztnQ0FBQSxBQUNFO0FBREY7K0JBQ0UsY0FBQSxTQUFLLE9BQU8sRUFBRSxTQUFGLEFBQVcsUUFBUSxZQUEvQixBQUFZLEFBQStCOzhCQUEzQztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVcsU0FBUSxNQUFuQixBQUF3QixTQUFRLE9BQWhDLEFBQXNDOzhCQUF0QztnQ0FESixBQUNJLEFBQ0E7QUFEQTtnQ0FDQSxjQUFBLFVBQU0sT0FBTyxFQUFFLFVBQUYsQUFBWSxTQUFTLFlBQXJCLEFBQWlDLE9BQU8sT0FBeEMsQUFBK0MsV0FBVyxZQUF2RSxBQUFhLEFBQXNFOzhCQUFuRjtnQ0FBQTtBQUFBO2VBTFYsQUFDRSxBQUNFLEFBQ0UsQUFFSSxBQU9SLGlDQUFDLGNBQUQsc0JBQUEsQUFBTSxRQUFLLFVBQVgsQUFBb0IsU0FBUSxPQUFPLEVBQUMsWUFBcEMsQUFBbUMsQUFBYTs4QkFBaEQ7Z0NBQUEsQUFDSztBQURMO3VDQUVRLGNBQUEsU0FBSyxPQUFPLEVBQUMsYUFBYixBQUFZLEFBQWM7OEJBQTFCO2dDQUFBLEFBQ0s7QUFETDthQUFBLGtCQUNLLEFBQUMsd0NBQU0sT0FBTyxTQUFBLEFBQVMsYUFBVCxBQUFzQixXQUFwQyxBQUErQyxRQUFRLE1BQXZELEFBQTREOzhCQUE1RDtnQ0FBQSxBQUNHO0FBREg7K0JBQ0csQUFBQyx1Q0FBSyxNQUFNLFNBQUEsQUFBUyxhQUFULEFBQXNCLGVBQWxDLEFBQWlEOzhCQUFqRDtnQ0FESCxBQUNHLEFBQ0M7QUFERDt5QkFDQyxBQUFTLGFBQVQsQUFBc0IsZUFMdkMsQUFFUSxBQUNLLEFBRXlDLEFBS2pELHdCQUFBLEFBQVMsOEJBQ04sQUFBQyw4QkFBSyxPQUFOLEFBQVk7OEJBQVo7Z0NBQUEsQUFDSTtBQURKO2FBQUEsa0JBQ0ksY0FBQSxPQUFHLFdBQUgsQUFBYSxRQUFPLE9BQU8sRUFBQyxPQUFELEFBQVEsV0FBVyxZQUE5QyxBQUEyQixBQUErQjs4QkFBMUQ7Z0NBQUE7QUFBQTtlQVpaLEFBV1EsQUFDSSxBQUlQLHdDQUFBLEFBQVMsNkJBQ0wsQUFBQyw4QkFBSyxPQUFOLEFBQVk7OEJBQVo7Z0NBQUEsQUFDRztBQURIO2FBQUEsa0JBQ0csY0FBQSxPQUFHLFdBQUgsQUFBYSxRQUFPLE9BQU8sRUFBQyxPQUFELEFBQVEsV0FBVyxZQUE5QyxBQUEyQixBQUErQjs4QkFBMUQ7Z0NBQUE7QUFBQTtlQWxCWixBQWlCUyxBQUNHLEFBSVAsaURBQUEsQUFBVyx1QkFDUixBQUFDO3lDQUNZLEFBQUMseUNBQU8sT0FBUixNQUFjLE1BQWQsTUFBbUIsZUFBbkIsQUFBaUM7a0NBQWpDO29DQUFBLEFBQXdDO0FBQXhDO2lCQUFBLGtCQUF3QyxBQUFDLHVDQUFLLE1BQU4sQUFBVztrQ0FBWDtvQ0FBeEMsQUFBd0MsQUFBNEI7QUFBNUI7b0JBRHJELEFBQ2EsQUFDVDswQkFGSixNQUVhLFdBRmIsQUFFdUI7OzhCQUZ2QjtnQ0FBQSxBQUlJO0FBSko7QUFDSSxhQURKLGtCQUlLLGNBQUQsMEJBQUEsQUFBVTs7OEJBQVY7Z0NBQUEsQUFDSTtBQURKO0FBQUEsNkNBQ0ksQUFBQywwQkFBRCxBQUFVLFFBQUssU0FBUyxLQUF4QixBQUE2QixxQkFBcUIsTUFBbEQsQUFBdUQsWUFBVyxNQUFsRSxBQUF1RTs4QkFBdkU7Z0NBREosQUFDSSxBQUNBO0FBREE7OENBQ0EsQUFBQywwQkFBRCxBQUFVOzs4QkFBVjtnQ0FGSixBQUVJLEFBQ0E7QUFEQTtBQUFBLDhDQUNBLEFBQUMsMEJBQUQsQUFBVSxRQUFLLFNBQVMsS0FBeEIsQUFBNkIsY0FBYyxNQUEzQyxBQUFnRCxZQUFXLE1BQTNELEFBQWdFOzhCQUFoRTtnQ0FSWCxBQUNHLEFBSUksQUFHSTtBQUFBO21DQUlSLGNBQUEsU0FBSyxPQUFPLEVBQUMsU0FBYixBQUFZLEFBQVM7OEJBQXJCO2dDQUFBLEFBRUk7QUFGSjthQUFBLGtCQUVJLEFBQUMseUNBQU8sT0FBUixNQUFjLFNBQVMsS0FBdkIsQUFBNEIsY0FBYyxPQUFPLEVBQUMsYUFBbEQsQUFBaUQsQUFBYzs4QkFBL0Q7Z0NBQUE7QUFBQTtlQUZKLEFBRUksQUFDQSw2Q0FBQSxBQUFDLDhCQUFLLE9BQU4sQUFBWTs4QkFBWjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx5Q0FBTyxTQUFSOzhCQUFBO2dDQUFBO0FBQUE7ZUFuRHBCLEFBQ0UsQUFZRSxBQWtDUSxBQUdJLEFBQ0ksQUFPckI7Ozs7O0EsQUEvSWtCLEFBaUpyQjs7a0JBQUEsQUFBZSIsImZpbGUiOiJIZWFkZXIuanMiLCJzb3VyY2VSb290IjoiRjovVEwvVUVUL0JMT0NLQ0hBSU4vU2tpbGxjb2RlIn0=