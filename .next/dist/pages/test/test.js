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

var _factory = require('../../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _Layout = require('../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'F:\\TL\\UET\\BLOCKCHAIN\\Skillcode\\pages\\test\\test.js?entry';


var CampaignIndex = function (_Component) {
    (0, _inherits3.default)(CampaignIndex, _Component);

    function CampaignIndex() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CampaignIndex);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CampaignIndex.__proto__ || (0, _getPrototypeOf2.default)(CampaignIndex)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            userRole: '',
            loading: false, errorMessage: '', confirmOpen: false, selectedAddress: '', isLoggingIn: false
        }, _this.handleLogoutUI = function () {
            _this.setState({ userRole: '' });
        }, _this.handleLoginClick = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this.setState({ isLoggingIn: true });
                            // Đánh dấu session
                            sessionStorage.setItem('SKILLCODE_LC_LOGIN', 'true');
                            // Phát sự kiện để Header cập nhật
                            window.dispatchEvent(new Event('LOGIN_SUCCESS'));
                            _context.next = 5;
                            return _this.fetchUserRole();

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _this.fetchUserRole = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var accounts, role;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _web2.default.eth.getAccounts();

                        case 3:
                            accounts = _context2.sent;

                            if (!accounts[0]) {
                                _context2.next = 9;
                                break;
                            }

                            _context2.next = 7;
                            return _factory2.default.methods.getRole(accounts[0]).call();

                        case 7:
                            role = _context2.sent;

                            if (!role) {
                                // Nếu ví chưa đăng ký, xóa session và báo lỗi
                                sessionStorage.removeItem('SKILLCODE_LC_LOGIN');
                                alert("Ví này chưa đăng ký tài khoản. Vui lòng đăng ký trước.");
                                _routes.Router.pushRoute('/campaign/new');
                                _this.setState({ userRole: '' });
                            } else {
                                _this.setState({ userRole: role });
                            }

                        case 9:
                            _context2.next = 14;
                            break;

                        case 11:
                            _context2.prev = 11;
                            _context2.t0 = _context2['catch'](0);
                            console.error(_context2.t0);

                        case 14:
                            _context2.prev = 14;
                            _this.setState({ isLoggingIn: false });return _context2.finish(14);

                        case 17:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 11, 14, 17]]);
        })), _this.openConfirm = function (address) {
            return _this.setState({ confirmOpen: true, selectedAddress: address });
        }, _this.closeConfirm = function () {
            return _this.setState({ confirmOpen: false, selectedAddress: '' });
        }, _this.handleDelete = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var accounts;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _this.setState({ loading: true, errorMessage: '', confirmOpen: false });
                            _context3.prev = 1;
                            _context3.next = 4;
                            return _web2.default.eth.getAccounts();

                        case 4:
                            accounts = _context3.sent;
                            _context3.next = 7;
                            return _factory2.default.methods.removeTest(_this.state.selectedAddress).send({ from: accounts[0] });

                        case 7:
                            _routes.Router.replaceRoute('/test/test');
                            _context3.next = 13;
                            break;

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3['catch'](1);
                            _this.setState({ errorMessage: _context3.t0.message });

                        case 13:
                            _this.setState({ loading: false, selectedAddress: '' });

                        case 14:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[1, 10]]);
        })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CampaignIndex, [{
        key: 'componentDidMount',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var isLoggedIn;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                // 1. Kiểm tra sessionStorage. Nếu 'true' => Tự động lấy Role (Trường hợp F5 hoặc đổi ví)
                                isLoggedIn = sessionStorage.getItem('SKILLCODE_LC_LOGIN');

                                if (!(isLoggedIn === 'true')) {
                                    _context4.next = 4;
                                    break;
                                }

                                _context4.next = 4;
                                return this.fetchUserRole();

                            case 4:

                                // 2. Lắng nghe sự kiện Logout để về giao diện khách ngay lập tức
                                window.addEventListener('LOGOUT_UI', this.handleLogoutUI);
                                window.addEventListener('LOGIN_SUCCESS', this.fetchUserRole);

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function componentDidMount() {
                return _ref5.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('LOGOUT_UI', this.handleLogoutUI);
            window.removeEventListener('LOGIN_SUCCESS', this.fetchUserRole);
        }

        // --- LOGIC XÓA ---

    }, {
        key: 'renderGuestView',

        // --- GIAO DIỆN KHÁCH ---
        value: function renderGuestView() {
            return _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 96
                }
            }, _react2.default.createElement('div', { style: {
                    // Ảnh nền Hero
                    backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                    backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 0', position: 'relative', marginBottom: '50px'
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 97
                }
            }, _react2.default.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 102
                }
            }), _react2.default.createElement(_semanticUiReact.Container, { style: { position: 'relative', zIndex: 1, textAlign: 'center' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 103
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h1', style: { fontSize: '4em', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)', marginBottom: '20px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 104
                }
            }, 'H\u1ECDc Kh\xF4ng Gi\u1EDBi H\u1EA1n'), _react2.default.createElement('p', { style: { fontSize: '1.4em', color: '#f0f0f0', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.6' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 107
                }
            }, 'N\u1EC1n t\u1EA3ng gi\xE1o d\u1EE5c phi t\u1EADp trung. ', _react2.default.createElement('br', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 108
                }
            }), ' \u0110\u0103ng nh\u1EADp \u0111\u1EC3 ti\u1EBFp t\u1EE5c vi\u1EC7c h\u1ECDc ho\u1EB7c qu\u1EA3n l\xFD l\u1EDBp h\u1ECDc.'), _react2.default.createElement(_semanticUiReact.Button, { color: 'blue', size: 'huge', onClick: this.handleLoginClick, loading: this.state.isLoggingIn, style: { padding: '15px 50px', fontSize: '1.2em', marginRight: '15px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 111
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'sign-in', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 112
                }
            }), ' Truy c\u1EADp H\u1EC7 th\u1ED1ng'), _react2.default.createElement(_routes.Link, { route: '/campaign/new', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 114
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 115
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { inverted: true, size: 'huge', style: { padding: '15px 40px', fontSize: '1.2em' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 115
                }
            }, '\u0110\u0103ng k\xFD m\u1EDBi'))))), _react2.default.createElement(_semanticUiReact.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 120
                }
            }, _react2.default.createElement(_semanticUiReact.Grid, { stackable: true, columns: 3, style: { marginTop: '20px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 121
                }
            }, _react2.default.createElement(_semanticUiReact.Grid.Column, { textAlign: 'center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                }
            }, _react2.default.createElement(_semanticUiReact.Segment, { padded: 'very', style: { borderTop: '4px solid #2185d0', borderRadius: '10px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 123
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'lock', size: 'huge', color: 'blue', style: { marginBottom: '20px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 124
                }
            }), _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 125
                }
            }, 'B\u1EA3o m\u1EADt Blockchain'))), _react2.default.createElement(_semanticUiReact.Grid.Column, { textAlign: 'center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 128
                }
            }, _react2.default.createElement(_semanticUiReact.Segment, { padded: 'very', style: { borderTop: '4px solid #00b5ad', borderRadius: '10px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 129
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'student', size: 'huge', color: 'teal', style: { marginBottom: '20px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 130
                }
            }), _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 131
                }
            }, 'Sinh vi\xEAn'))), _react2.default.createElement(_semanticUiReact.Grid.Column, { textAlign: 'center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 134
                }
            }, _react2.default.createElement(_semanticUiReact.Segment, { padded: 'very', style: { borderTop: '4px solid #f2711c', borderRadius: '10px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 135
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'university', size: 'huge', color: 'orange', style: { marginBottom: '20px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 136
                }
            }), _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 137
                }
            }, 'Gi\u1EA3ng vi\xEAn'))))));
        }

        // --- CÁC GIAO DIỆN ROLE ---

    }, {
        key: 'renderLecturerView',
        value: function renderLecturerView() {
            return _react2.default.createElement(_semanticUiReact.Container, { style: { marginTop: '40px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 149
                }
            }, _react2.default.createElement('div', { style: { background: 'linear-gradient(to right, #ff9966, #ff5e62)', borderRadius: '15px', padding: '40px', color: 'white', marginBottom: '40px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 150
                }
            }, _react2.default.createElement(_semanticUiReact.Grid, { verticalAlign: 'middle', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 151
                }
            }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 10, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 152
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h2', inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 152
                }
            }, 'B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n Gi\u1EA3ng vi\xEAn')), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 6, textAlign: 'right', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 153
                }
            }, _react2.default.createElement(_routes.Link, { route: '/test/newtest', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 154
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 154
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'white', inverted: true, size: 'large', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 154
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'add', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 154
                }
            }), ' T\u1EA1o \u0110\u1EC1 Thi M\u1EDBi')))))), _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', dividing: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 158
                }
            }, 'Danh s\xE1ch b\xE0i thi \u0111ang qu\u1EA3n l\xFD'), this.renderExamsCards(true));
        }
    }, {
        key: 'renderStudentView',
        value: function renderStudentView() {
            return _react2.default.createElement(_semanticUiReact.Container, { style: { marginTop: '40px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 166
                }
            }, _react2.default.createElement('div', { style: { background: 'linear-gradient(to right, #00c6ff, #0072ff)', borderRadius: '15px', padding: '40px', color: 'white', marginBottom: '40px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 167
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h2', inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 168
                }
            }, 'G\xF3c H\u1ECDc T\u1EADp')), _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', dividing: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 170
                }
            }, 'B\xE0i t\u1EADp d\xE0nh cho b\u1EA1n'), this.renderExamsCards(false));
        }
    }, {
        key: 'renderExamsCards',
        value: function renderExamsCards(isLecturer) {
            var _this3 = this;

            if (this.props.Instruction.length === 0) {
                return _react2.default.createElement(_semanticUiReact.Message, { info: true, header: 'Tr\u1ED1ng', content: 'Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u b\xE0i thi.', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 178
                    }
                });
            }
            return _react2.default.createElement(_semanticUiReact.Card.Group, { itemsPerRow: 3, stackable: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 181
                }
            }, this.props.Instruction.map(function (details, index) {
                return _react2.default.createElement(_semanticUiReact.Card, { key: index, href: '/test/at/' + details.address, fluid: true, raised: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 183
                    }
                }, _react2.default.createElement(_semanticUiReact.Image, { src: 'https://picsum.photos/seed/' + (index + 5) + '/400/250', style: { height: '160px', objectFit: 'cover' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 185
                    }
                }), _react2.default.createElement(_semanticUiReact.Card.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 186
                    }
                }, _react2.default.createElement(_semanticUiReact.Card.Header, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 187
                    }
                }, details.instruction), _react2.default.createElement(_semanticUiReact.Card.Meta, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 188
                    }
                }, details.address.substring(0, 10), '...'), _react2.default.createElement(_semanticUiReact.Label, { color: isLecturer ? 'orange' : 'blue', size: 'tiny', style: { marginTop: '5px' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 189
                    }
                }, isLecturer ? 'Quản lý' : 'Đang mở')), isLecturer && _react2.default.createElement(_semanticUiReact.Card.Content, { extra: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 192
                    }
                }, _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'red', icon: 'trash', fluid: true, onClick: function onClick(e) {
                        e.preventDefault();_this3.openConfirm(details.address);
                    }, content: 'X\xF3a', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 193
                    }
                })));
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 204
                }
            }, this.state.errorMessage && _react2.default.createElement(_semanticUiReact.Message, { negative: true, header: 'L\u1ED7i', content: this.state.errorMessage, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 205
                }
            }), !this.state.userRole && this.renderGuestView(), this.state.userRole === 'lecturer' && this.renderLecturerView(), this.state.userRole === 'student' && this.renderStudentView(), _react2.default.createElement(_semanticUiReact.Confirm, { open: this.state.confirmOpen, onCancel: this.closeConfirm, onConfirm: this.handleDelete, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 212
                }
            }));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                var campaigns, Instruction, i, inst;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                campaigns = [];
                                _context5.prev = 1;
                                _context5.next = 4;
                                return _factory2.default.methods.getDeployedCampaigns().call();

                            case 4:
                                campaigns = _context5.sent;
                                _context5.next = 9;
                                break;

                            case 7:
                                _context5.prev = 7;
                                _context5.t0 = _context5['catch'](1);

                            case 9:
                                Instruction = [];
                                i = 0;

                            case 11:
                                if (!(i < campaigns.length)) {
                                    _context5.next = 24;
                                    break;
                                }

                                _context5.prev = 12;
                                _context5.next = 15;
                                return _factory2.default.methods.totalinstruction(campaigns[i]).call();

                            case 15:
                                inst = _context5.sent;

                                if (campaigns[i] !== '0x0000000000000000000000000000000000000000') {
                                    Instruction.push({ address: campaigns[i], instruction: inst });
                                }
                                _context5.next = 21;
                                break;

                            case 19:
                                _context5.prev = 19;
                                _context5.t1 = _context5['catch'](12);

                            case 21:
                                i++;
                                _context5.next = 11;
                                break;

                            case 24:
                                return _context5.abrupt('return', { campaigns: campaigns, Instruction: Instruction });

                            case 25:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[1, 7], [12, 19]]);
            }));

            function getInitialProps() {
                return _ref6.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return CampaignIndex;
}(_react.Component);

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFx0ZXN0XFx0ZXN0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkJ1dHRvbiIsIkhlYWRlciIsIkljb24iLCJTZWdtZW50IiwiTGFiZWwiLCJDb25maXJtIiwiTWVzc2FnZSIsIkdyaWQiLCJDb250YWluZXIiLCJJbWFnZSIsImZhY3RvcnkiLCJ3ZWIzIiwiTGF5b3V0IiwiTGluayIsIlJvdXRlciIsIkNhbXBhaWduSW5kZXgiLCJzdGF0ZSIsInVzZXJSb2xlIiwibG9hZGluZyIsImVycm9yTWVzc2FnZSIsImNvbmZpcm1PcGVuIiwic2VsZWN0ZWRBZGRyZXNzIiwiaXNMb2dnaW5nSW4iLCJoYW5kbGVMb2dvdXRVSSIsInNldFN0YXRlIiwiaGFuZGxlTG9naW5DbGljayIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsIndpbmRvdyIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImZldGNoVXNlclJvbGUiLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnRzIiwibWV0aG9kcyIsImdldFJvbGUiLCJjYWxsIiwicm9sZSIsInJlbW92ZUl0ZW0iLCJhbGVydCIsInB1c2hSb3V0ZSIsImNvbnNvbGUiLCJlcnJvciIsIm9wZW5Db25maXJtIiwiYWRkcmVzcyIsImNsb3NlQ29uZmlybSIsImhhbmRsZURlbGV0ZSIsInJlbW92ZVRlc3QiLCJzZW5kIiwiZnJvbSIsInJlcGxhY2VSb3V0ZSIsIm1lc3NhZ2UiLCJpc0xvZ2dlZEluIiwiZ2V0SXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFNpemUiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJwYWRkaW5nIiwicG9zaXRpb24iLCJtYXJnaW5Cb3R0b20iLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJiYWNrZ3JvdW5kQ29sb3IiLCJ6SW5kZXgiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImNvbG9yIiwidGV4dFNoYWRvdyIsIm1heFdpZHRoIiwibWFyZ2luIiwibGluZUhlaWdodCIsIm1hcmdpblJpZ2h0IiwibWFyZ2luVG9wIiwiYm9yZGVyVG9wIiwiYm9yZGVyUmFkaXVzIiwiYmFja2dyb3VuZCIsInJlbmRlckV4YW1zQ2FyZHMiLCJpc0xlY3R1cmVyIiwicHJvcHMiLCJJbnN0cnVjdGlvbiIsImxlbmd0aCIsIm1hcCIsImRldGFpbHMiLCJpbmRleCIsImhlaWdodCIsIm9iamVjdEZpdCIsImluc3RydWN0aW9uIiwic3Vic3RyaW5nIiwiZSIsInByZXZlbnREZWZhdWx0IiwicmVuZGVyR3Vlc3RWaWV3IiwicmVuZGVyTGVjdHVyZXJWaWV3IiwicmVuZGVyU3R1ZGVudFZpZXciLCJjYW1wYWlnbnMiLCJnZXREZXBsb3llZENhbXBhaWducyIsImkiLCJ0b3RhbGluc3RydWN0aW9uIiwiaW5zdCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFNLEFBQVEsQUFBUSxBQUFNLEFBQVMsQUFBTyxBQUFTLEFBQVMsQUFBTSxBQUFXOztBQUN4RixBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFTLEFBQU0sQUFBYzs7Ozs7OztJLEFBRXZCOzs7Ozs7Ozs7Ozs7Ozs7OE4sQUFDSjtzQkFBUSxBQUNJLEFBQ1Y7cUJBRk0sQUFFRyxPQUFPLGNBRlYsQUFFd0IsSUFBSSxhQUY1QixBQUV5QyxPQUFPLGlCQUZoRCxBQUVpRSxJQUFJLGEsQUFGckUsQUFFa0Y7QUFGbEYsQUFDTixpQixBQXFDRixpQkFBaUIsWUFBTSxBQUNuQjtrQkFBQSxBQUFLLFNBQVMsRUFBRSxVQUFoQixBQUFjLEFBQVksQUFDN0I7QSxpQixBQUVELDRGQUFtQixtQkFBQTswRUFBQTswQkFBQTtxREFBQTs2QkFDZjtrQ0FBQSxBQUFLLFNBQVMsRUFBRSxhQUFoQixBQUFjLEFBQWUsQUFDN0I7QUFDQTsyQ0FBQSxBQUFlLFFBQWYsQUFBdUIsc0JBQXZCLEFBQTZDLEFBQzdDO0FBQ0E7bUNBQUEsQUFBTyxjQUFjLElBQUEsQUFBSSxNQUxWLEFBS2YsQUFBcUIsQUFBVTs0Q0FMaEI7bUNBTVQsTUFOUyxBQU1ULEFBQUs7OzZCQU5JOzZCQUFBOzRDQUFBOztBQUFBO3dCQUFBO0EsbUIsQUFTbkIseUZBQWdCLG9CQUFBOzBCQUFBOzRFQUFBOzBCQUFBO3VEQUFBOzZCQUFBOzZDQUFBOzZDQUFBO21DQUVlLGNBQUEsQUFBSyxJQUZwQixBQUVlLEFBQVM7OzZCQUExQjtBQUZFLGlEQUFBOztpQ0FHTCxTQUhLLEFBR0wsQUFBUyxJQUhKO2lEQUFBO0FBQUE7QUFBQTs7NkNBQUE7bUNBSWUsa0JBQUEsQUFBUSxRQUFSLEFBQWdCLFFBQVEsU0FBeEIsQUFBd0IsQUFBUyxJQUpoRCxBQUllLEFBQXFDOzs2QkFBbEQ7QUFKRiw2Q0FNSjs7Z0NBQUksQ0FBSixBQUFLLE1BQU0sQUFDUDtBQUNBOytDQUFBLEFBQWUsV0FBZixBQUEwQixBQUMxQjtzQ0FBQSxBQUFNLEFBQ047K0NBQUEsQUFBTyxVQUFQLEFBQWlCLEFBQ2pCO3NDQUFBLEFBQUssU0FBUyxFQUFFLFVBQWhCLEFBQWMsQUFBWSxBQUM3QjtBQU5ELG1DQU1PLEFBQ0g7c0NBQUEsQUFBSyxTQUFTLEVBQUUsVUFBaEIsQUFBYyxBQUFZLEFBQzdCO0FBZEc7OzZCQUFBOzZDQUFBO0FBQUE7OzZCQUFBOzZDQUFBOzhEQWdCQztvQ0FBQSxBQUFRLGdCQWhCVDs7NkJBQUE7NkNBaUJGO2tDQUFBLEFBQUssU0FBUyxFQUFFLGFBQWhCLEFBQWMsQUFBZSxTQWpCM0Isd0JBQUE7OzZCQUFBOzZCQUFBOzZDQUFBOztBQUFBOzhDQUFBO0EsbUIsQUFxQmhCLGNBQWMsVUFBQSxBQUFDLFNBQUQ7bUJBQWEsTUFBQSxBQUFLLFNBQVMsRUFBRSxhQUFGLEFBQWUsTUFBTSxpQkFBaEQsQUFBYSxBQUFjLEFBQXNDO0EsaUIsQUFDL0UsZUFBZSxZQUFBO21CQUFNLE1BQUEsQUFBSyxTQUFTLEVBQUUsYUFBRixBQUFlLE9BQU8saUJBQTFDLEFBQU0sQUFBYyxBQUF1QztBLGlCLEFBQzFFLHdGQUFlLG9CQUFBO2dCQUFBOzRFQUFBOzBCQUFBO3VEQUFBOzZCQUNiO2tDQUFBLEFBQUssU0FBUyxFQUFFLFNBQUYsQUFBVyxNQUFNLGNBQWpCLEFBQStCLElBQUksYUFEcEMsQUFDYixBQUFjLEFBQWdEOzZDQURqRDs2Q0FBQTttQ0FHYyxjQUFBLEFBQUssSUFIbkIsQUFHYyxBQUFTOzs2QkFBMUI7QUFIRyxpREFBQTs2Q0FBQTttQ0FJSCxrQkFBQSxBQUFRLFFBQVIsQUFBZ0IsV0FBVyxNQUFBLEFBQUssTUFBaEMsQUFBc0MsaUJBQXRDLEFBQXVELEtBQUssRUFBRSxNQUFNLFNBSmpFLEFBSUgsQUFBNEQsQUFBUSxBQUFTOzs2QkFDbkY7MkNBQUEsQUFBTyxhQUxFLEFBS1QsQUFBb0I7NkNBTFg7QUFBQTs7NkJBQUE7NkNBQUE7OERBTUc7a0NBQUEsQUFBSyxTQUFTLEVBQUUsY0FBYyxhQU5qQyxBQU1HLEFBQWMsQUFBb0I7OzZCQUNsRDtrQ0FBQSxBQUFLLFNBQVMsRUFBRSxTQUFGLEFBQVcsT0FBTyxpQkFQbkIsQUFPYixBQUFjLEFBQW1DOzs2QkFQcEM7NkJBQUE7NkNBQUE7O0FBQUE7c0NBQUE7QTs7Ozs7Ozs7Ozs7aUNBcERYO0FBQ007QSw2Q0FBYSxlQUFBLEFBQWUsUSxBQUFmLEFBQXVCOztzQ0FDdEMsZSxBQUFlOzs7Ozs7dUNBQ1QsSyxBQUFBLEFBQUs7O2lDQUdmOztBQUNBO3VDQUFBLEFBQU8saUJBQVAsQUFBd0IsYUFBYSxLQUFyQyxBQUEwQyxBQUMxQzt1Q0FBQSxBQUFPLGlCQUFQLEFBQXdCLGlCQUFpQixLQUF6QyxBQUE4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OytDQUczQixBQUNuQjttQkFBQSxBQUFPLG9CQUFQLEFBQTJCLGFBQWEsS0FBeEMsQUFBNkMsQUFDN0M7bUJBQUEsQUFBTyxvQkFBUCxBQUEyQixpQkFBaUIsS0FBNUMsQUFBaUQsQUFDcEQ7QUFtQ0Q7Ozs7O2FBYUE7OzswQ0FDa0IsQUFDZDttQ0FDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUNLO0FBREw7QUFBQSxhQUFBLGtCQUNLLGNBQUEsU0FBSztBQUVGO3FDQUZTLEFBRVEsQUFDakI7b0NBSFMsQUFHTyxTQUFTLG9CQUhoQixBQUdvQyxVQUFVLFNBSDlDLEFBR3VELFdBQVcsVUFIbEUsQUFHNEUsWUFBWSxjQUhwRyxBQUFZLEFBR3NHO0FBSHRHLEFBQ1Q7OEJBREg7Z0NBQUEsQUFLRztBQUxIO3NEQUtRLE9BQU8sRUFBRSxVQUFGLEFBQVksWUFBWSxLQUF4QixBQUE2QixHQUFHLE1BQWhDLEFBQXNDLEdBQUcsT0FBekMsQUFBZ0QsR0FBRyxRQUFuRCxBQUEyRCxHQUFHLGlCQUExRSxBQUFZLEFBQStFOzhCQUEzRjtnQ0FMSCxBQUtHLEFBQ0E7QUFEQTtnQ0FDQSxBQUFDLDRDQUFVLE9BQU8sRUFBRSxVQUFGLEFBQVksWUFBWSxRQUF4QixBQUFnQyxHQUFHLFdBQXJELEFBQWtCLEFBQThDOzhCQUFoRTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxPQUFPLEVBQUUsVUFBRixBQUFZLE9BQU8sT0FBbkIsQUFBMEIsV0FBVyxZQUFyQyxBQUFpRCw4QkFBOEIsY0FBdEcsQUFBdUIsQUFBNkY7OEJBQXBIO2dDQUFBO0FBQUE7ZUFESixBQUNJLEFBR0EseURBQUEsY0FBQSxPQUFHLE9BQU8sRUFBRSxVQUFGLEFBQVksU0FBUyxPQUFyQixBQUE0QixXQUFXLFVBQXZDLEFBQWlELFNBQVMsUUFBMUQsQUFBa0Usb0JBQW9CLFlBQWhHLEFBQVUsQUFBa0c7OEJBQTVHO2dDQUFBO0FBQUE7ZUFDcUM7OzhCQUFBO2dDQURyQyxBQUNxQztBQUFBO0FBQUEsZ0JBTHpDLEFBSUksQUFJQSw4SUFBQSxBQUFDLHlDQUFPLE9BQVIsQUFBYyxRQUFPLE1BQXJCLEFBQTBCLFFBQU8sU0FBUyxLQUExQyxBQUErQyxrQkFBa0IsU0FBUyxLQUFBLEFBQUssTUFBL0UsQUFBcUYsYUFBYSxPQUFPLEVBQUUsU0FBRixBQUFXLGFBQWEsVUFBeEIsQUFBa0MsU0FBUyxhQUFwSixBQUF5RyxBQUF3RDs4QkFBaks7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXOzhCQUFYO2dDQURKLEFBQ0k7QUFBQTtnQkFUUixBQVFJLEFBR0Esc0RBQUEsQUFBQyw4QkFBSyxPQUFOLEFBQVk7OEJBQVo7Z0NBQUEsQUFDSTtBQURKOytCQUNJLGNBQUE7OzhCQUFBO2dDQUFBLEFBQUc7QUFBSDtBQUFBLCtCQUFHLEFBQUMseUNBQU8sVUFBUixNQUFpQixNQUFqQixBQUFzQixRQUFPLE9BQU8sRUFBRSxTQUFGLEFBQVcsYUFBYSxVQUE1RCxBQUFvQyxBQUFrQzs4QkFBdEU7Z0NBQUE7QUFBQTtlQW5CbkIsQUFDSyxBQU1HLEFBV0ksQUFDSSxBQUFHLEFBS2Ysc0RBQUEsQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQyx1Q0FBSyxXQUFOLE1BQWdCLFNBQWhCLEFBQXlCLEdBQUcsT0FBTyxFQUFFLFdBQXJDLEFBQW1DLEFBQWE7OEJBQWhEO2dDQUFBLEFBQ0k7QUFESjsrQkFDSyxjQUFELHNCQUFBLEFBQU0sVUFBTyxXQUFiLEFBQXVCOzhCQUF2QjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQywwQ0FBUSxRQUFULEFBQWdCLFFBQU8sT0FBTyxFQUFDLFdBQUQsQUFBWSxxQkFBcUIsY0FBL0QsQUFBOEIsQUFBK0M7OEJBQTdFO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLHVDQUFLLE1BQU4sQUFBVyxRQUFPLE1BQWxCLEFBQXVCLFFBQU8sT0FBOUIsQUFBb0MsUUFBTyxPQUFPLEVBQUMsY0FBbkQsQUFBa0QsQUFBZTs4QkFBakU7Z0NBREosQUFDSSxBQUNBO0FBREE7Z0NBQ0EsQUFBQyx5Q0FBTyxJQUFSLEFBQVc7OEJBQVg7Z0NBQUE7QUFBQTtlQUpaLEFBQ0ksQUFDSSxBQUVJLEFBR1IsbURBQUMsY0FBRCxzQkFBQSxBQUFNLFVBQU8sV0FBYixBQUF1Qjs4QkFBdkI7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsMENBQVEsUUFBVCxBQUFnQixRQUFPLE9BQU8sRUFBQyxXQUFELEFBQVkscUJBQXFCLGNBQS9ELEFBQThCLEFBQStDOzhCQUE3RTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVcsV0FBVSxNQUFyQixBQUEwQixRQUFPLE9BQWpDLEFBQXVDLFFBQU8sT0FBTyxFQUFDLGNBQXRELEFBQXFELEFBQWU7OEJBQXBFO2dDQURKLEFBQ0ksQUFDQTtBQURBO2dDQUNBLEFBQUMseUNBQU8sSUFBUixBQUFXOzhCQUFYO2dDQUFBO0FBQUE7ZUFWWixBQU9JLEFBQ0ksQUFFSSxBQUdSLG1DQUFDLGNBQUQsc0JBQUEsQUFBTSxVQUFPLFdBQWIsQUFBdUI7OEJBQXZCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLDBDQUFRLFFBQVQsQUFBZ0IsUUFBTyxPQUFPLEVBQUMsV0FBRCxBQUFZLHFCQUFxQixjQUEvRCxBQUE4QixBQUErQzs4QkFBN0U7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXLGNBQWEsTUFBeEIsQUFBNkIsUUFBTyxPQUFwQyxBQUEwQyxVQUFTLE9BQU8sRUFBQyxjQUEzRCxBQUEwRCxBQUFlOzhCQUF6RTtnQ0FESixBQUNJLEFBQ0E7QUFEQTtnQ0FDQSxBQUFDLHlDQUFPLElBQVIsQUFBVzs4QkFBWDtnQ0FBQTtBQUFBO2VBMUN4QixBQUNJLEFBd0JJLEFBQ0ksQUFhSSxBQUNJLEFBRUksQUFPM0I7QUFFRDs7Ozs7OzZDQUNxQixBQUNqQjttQ0FDRSxBQUFDLDRDQUFVLE9BQU8sRUFBRSxXQUFwQixBQUFrQixBQUFhOzhCQUEvQjtnQ0FBQSxBQUNJO0FBREo7YUFBQSxrQkFDSSxjQUFBLFNBQUssT0FBTyxFQUFDLFlBQUQsQUFBYSwrQ0FBK0MsY0FBNUQsQUFBMEUsUUFBUSxTQUFsRixBQUEyRixRQUFRLE9BQW5HLEFBQTBHLFNBQVMsY0FBL0gsQUFBWSxBQUFpSTs4QkFBN0k7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsdUNBQUssZUFBTixBQUFvQjs4QkFBcEI7Z0NBQUEsQUFDSTtBQURKOytCQUNLLGNBQUQsc0JBQUEsQUFBTSxVQUFPLE9BQWIsQUFBb0I7OEJBQXBCO2dDQUFBLEFBQXdCO0FBQXhCOytCQUF3QixBQUFDLHlDQUFPLElBQVIsQUFBVyxNQUFLLFVBQWhCOzhCQUFBO2dDQUFBO0FBQUE7ZUFENUIsQUFDSSxBQUF3QixBQUN4Qiw0RUFBQyxjQUFELHNCQUFBLEFBQU0sVUFBTyxPQUFiLEFBQW9CLEdBQUcsV0FBdkIsQUFBaUM7OEJBQWpDO2dDQUFBLEFBQ0s7QUFETDsrQkFDSyxBQUFDLDhCQUFLLE9BQU4sQUFBWTs4QkFBWjtnQ0FBQSxBQUE0QjtBQUE1QjsrQkFBNEIsY0FBQTs7OEJBQUE7Z0NBQUEsQUFBRztBQUFIO0FBQUEsK0JBQUcsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsU0FBUSxVQUF0QixNQUErQixNQUEvQixBQUFvQzs4QkFBcEM7Z0NBQUEsQUFBNEM7QUFBNUM7K0JBQTRDLEFBQUMsdUNBQUssTUFBTixBQUFXOzhCQUFYO2dDQUE1QyxBQUE0QztBQUFBO2dCQUw1RixBQUNJLEFBQ0ksQUFFSSxBQUNLLEFBQTRCLEFBQUcsQUFJNUMsNkRBQUEsQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxVQUFoQjs4QkFBQTtnQ0FBQTtBQUFBO2VBVEosQUFTSSxBQUNDLDJEQUFBLEFBQUssaUJBWFosQUFDRSxBQVVLLEFBQXNCLEFBR2hDOzs7OzRDQUVtQixBQUNoQjttQ0FDRSxBQUFDLDRDQUFVLE9BQU8sRUFBRSxXQUFwQixBQUFrQixBQUFhOzhCQUEvQjtnQ0FBQSxBQUNJO0FBREo7YUFBQSxrQkFDSSxjQUFBLFNBQUssT0FBTyxFQUFDLFlBQUQsQUFBYSwrQ0FBK0MsY0FBNUQsQUFBMEUsUUFBUSxTQUFsRixBQUEyRixRQUFRLE9BQW5HLEFBQTBHLFNBQVMsY0FBL0gsQUFBWSxBQUFpSTs4QkFBN0k7Z0NBQUEsQUFDSztBQURMOytCQUNLLEFBQUMseUNBQU8sSUFBUixBQUFXLE1BQUssVUFBaEI7OEJBQUE7Z0NBQUE7QUFBQTtlQUZULEFBQ0ksQUFDSyxBQUVMLDhDQUFBLEFBQUMseUNBQU8sSUFBUixBQUFXLE1BQUssVUFBaEI7OEJBQUE7Z0NBQUE7QUFBQTtlQUpKLEFBSUksQUFDQyw4Q0FBQSxBQUFLLGlCQU5aLEFBQ0UsQUFLSyxBQUFzQixBQUdoQzs7Ozt5QyxBQUVnQixZQUFZO3lCQUN6Qjs7Z0JBQUksS0FBQSxBQUFLLE1BQUwsQUFBVyxZQUFYLEFBQXVCLFdBQTNCLEFBQXNDLEdBQUcsQUFDckM7dUNBQU8sQUFBQywwQ0FBUSxNQUFULE1BQWMsUUFBZCxBQUFxQixjQUFRLFNBQTdCLEFBQXFDO2tDQUFyQztvQ0FBUCxBQUFPLEFBQ1Y7QUFEVTtpQkFBQTtBQUVYO21DQUNHLGNBQUQsc0JBQUEsQUFBTSxTQUFNLGFBQVosQUFBeUIsR0FBRyxXQUE1Qjs4QkFBQTtnQ0FBQSxBQUNLO0FBREw7YUFBQSxPQUNLLEFBQUssTUFBTCxBQUFXLFlBQVgsQUFBdUIsSUFBSSxVQUFBLEFBQUMsU0FBRCxBQUFVLE9BQVY7dUNBQ3hCLEFBQUMsdUNBQUssS0FBTixBQUFXLE9BQU8sb0JBQWtCLFFBQXBDLEFBQTRDLFNBQVcsT0FBdkQsTUFBNkQsUUFBN0Q7a0NBQUE7b0NBQUEsQUFFSTtBQUZKO2lCQUFBLGtCQUVJLEFBQUMsd0NBQU0sc0NBQW1DLFFBQW5DLEFBQTJDLEtBQWxELFlBQStELE9BQU8sRUFBQyxRQUFELEFBQVMsU0FBUyxXQUF4RixBQUFzRSxBQUE2QjtrQ0FBbkc7b0NBRkosQUFFSSxBQUNBO0FBREE7b0NBQ0MsY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQSxBQUNJO0FBREo7QUFBQSxtQ0FDSyxjQUFELHNCQUFBLEFBQU07O2tDQUFOO29DQUFBLEFBQWM7QUFBZDtBQUFBLDJCQURKLEFBQ0ksQUFBc0IsQUFDdEIsOEJBQUMsY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQSxBQUFZO0FBQVo7QUFBQSwyQkFBWSxBQUFRLFFBQVIsQUFBZ0IsVUFBaEIsQUFBMEIsR0FBdEMsQUFBWSxBQUE2QixLQUY3QyxBQUVJLEFBQ0Esd0JBQUEsQUFBQyx3Q0FBTSxPQUFPLGFBQUEsQUFBYSxXQUEzQixBQUFzQyxRQUFRLE1BQTlDLEFBQW1ELFFBQU8sT0FBTyxFQUFDLFdBQWxFLEFBQWlFLEFBQVc7a0NBQTVFO29DQUFBLEFBQXFGO0FBQXJGO2dDQUFxRixBQUFhLFlBTjFHLEFBR0ksQUFHSSxBQUE4RyxBQUVqSCwyQ0FDSSxjQUFELHNCQUFBLEFBQU0sV0FBUSxPQUFkO2tDQUFBO29DQUFBLEFBQ0k7QUFESjtpQkFBQSxrQkFDSSxBQUFDLHlDQUFPLE9BQVIsTUFBYyxPQUFkLEFBQW9CLE9BQU0sTUFBMUIsQUFBK0IsU0FBUSxPQUF2QyxNQUE2QyxTQUFTLGlCQUFBLEFBQUMsR0FBTSxBQUFDOzBCQUFBLEFBQUUsaUJBQWtCLE9BQUEsQUFBSyxZQUFZLFFBQWpCLEFBQXlCLEFBQVM7QUFBcEgsdUJBQXNILFNBQXRILEFBQThIO2tDQUE5SDtvQ0FYWSxBQUN4QixBQVNRLEFBQ0k7QUFBQTs7QUFidEIsQUFDRSxBQUNLLEFBa0JWOzs7O2lDQUVRLEFBQ1A7bUNBQ0UsQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDRztBQURIO0FBQUEsYUFBQSxPQUNHLEFBQUssTUFBTCxBQUFXLGdDQUFnQixBQUFDLDBDQUFRLFVBQVQsTUFBa0IsUUFBbEIsQUFBeUIsWUFBTSxTQUFTLEtBQUEsQUFBSyxNQUE3QyxBQUFtRDs4QkFBbkQ7Z0NBRDlCLEFBQzhCLEFBRzNCO0FBSDJCO2FBQUEsSUFHMUIsS0FBQSxBQUFLLE1BQU4sQUFBWSxZQUFZLEtBSjNCLEFBSTJCLEFBQUssQUFDN0Isd0JBQUEsQUFBSyxNQUFMLEFBQVcsYUFBWCxBQUF3QixjQUFjLEtBTHpDLEFBS3lDLEFBQUssQUFDM0MsMkJBQUEsQUFBSyxNQUFMLEFBQVcsYUFBWCxBQUF3QixhQUFhLEtBTnhDLEFBTXdDLEFBQUssQUFFM0MscUNBQUEsQUFBQywwQ0FBUSxNQUFNLEtBQUEsQUFBSyxNQUFwQixBQUEwQixhQUFhLFVBQVUsS0FBakQsQUFBc0QsY0FBYyxXQUFXLEtBQS9FLEFBQW9GOzhCQUFwRjtnQ0FUSixBQUNFLEFBUUUsQUFHTDtBQUhLOzs7Ozs7Ozs7OztpQ0FyTUE7QSw0QyxBQUFZOzs7dUNBQ1Esa0JBQUEsQUFBUSxRQUFSLEFBQWdCLHVCLEFBQWhCLEFBQXVDOztpQ0FBekQ7QTs7Ozs7Ozs7aUNBRUE7QSw4Q0FDRSxBLEFBRFk7QSxvQyxBQUNSOzs7c0NBQUcsSUFBSSxVLEFBQVU7Ozs7Ozs7dUNBRUosa0JBQUEsQUFBUSxRQUFSLEFBQWdCLGlCQUFpQixVQUFqQyxBQUFpQyxBQUFVLEksQUFBM0MsQUFBK0M7O2lDQUE1RDtBLGlEQUNOOztvQ0FBRyxVQUFBLEFBQVUsT0FBYixBQUFvQiw4Q0FBOEMsQUFDaEU7Z0RBQUEsQUFBWSxLQUFLLEVBQUUsU0FBUyxVQUFYLEFBQVcsQUFBVSxJQUFJLGFBQTFDLEFBQWlCLEFBQXNDLEFBQ3hEOzs7Ozs7Ozs7aUNBTDhCO0E7Ozs7O2tFQVE5QixFQUFFLFdBQUYsV0FBYSxhLEFBQWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4TFgsQSxBQWpONEI7O2tCQWlONUIsQUFBZSIsImZpbGUiOiJ0ZXN0LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6IkY6L1RML1VFVC9CTE9DS0NIQUlOL1NraWxsY29kZSJ9