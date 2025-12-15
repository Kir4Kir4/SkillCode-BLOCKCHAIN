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

var _Layout = require('../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Test = require('../../ethereum/Test');

var _Test2 = _interopRequireDefault(_Test);

var _factory = require('../../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'F:\\TL\\UET\\BLOCKCHAIN\\Skillcode\\pages\\test\\show.js?entry';


var CampaignShow = function (_Component) {
    (0, _inherits3.default)(CampaignShow, _Component);

    function CampaignShow() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CampaignShow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CampaignShow.__proto__ || (0, _getPrototypeOf2.default)(CampaignShow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            loading: false,
            errorMessage: '',
            isEnrolled: false,
            walletAddress: null,
            studentName: '',
            userRole: ''
        }, _this.onEnroll = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var accounts, campaign;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this.setState({ loading: true, errorMessage: '' });
                            _context.prev = 1;
                            _context.next = 4;
                            return _web2.default.eth.getAccounts();

                        case 4:
                            accounts = _context.sent;
                            campaign = (0, _Test2.default)(_this.props.address);

                            if (!(!_this.state.walletAddress || _this.state.walletAddress === '0x0000000000000000000000000000000000000000')) {
                                _context.next = 8;
                                break;
                            }

                            throw new Error("Bạn chưa tạo Ví Sinh viên. Hãy quay lại trang chủ để tạo.");

                        case 8:
                            _context.next = 10;
                            return campaign.methods.enrollintest(_this.state.walletAddress).send({ from: accounts[0] });

                        case 10:

                            // Reload để cập nhật trạng thái nút bấm
                            window.location.reload();
                            _context.next = 16;
                            break;

                        case 13:
                            _context.prev = 13;
                            _context.t0 = _context['catch'](1);
                            _this.setState({ errorMessage: _context.t0.message });

                        case 16:
                            _this.setState({ loading: false });

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[1, 13]]);
        })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CampaignShow, [{
        key: 'componentDidMount',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var accounts, role, myWalletAddr, enrolled, campaign;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return _web2.default.eth.getAccounts();

                            case 3:
                                accounts = _context2.sent;

                                if (accounts[0]) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt('return');

                            case 6:
                                _context2.next = 8;
                                return _factory2.default.methods.getRole(accounts[0]).call();

                            case 8:
                                role = _context2.sent;
                                _context2.next = 11;
                                return _factory2.default.methods.mywallet().call({ from: accounts[0] });

                            case 11:
                                myWalletAddr = _context2.sent;
                                enrolled = false;
                                // Chỉ kiểm tra enroll nếu là sinh viên và đã có ví

                                if (!(role === 'student' && myWalletAddr && myWalletAddr !== '0x0000000000000000000000000000000000000000')) {
                                    _context2.next = 18;
                                    break;
                                }

                                campaign = (0, _Test2.default)(this.props.address);
                                _context2.next = 17;
                                return campaign.methods.attende(myWalletAddr).call();

                            case 17:
                                enrolled = _context2.sent;

                            case 18:

                                this.setState({ walletAddress: myWalletAddr, isEnrolled: enrolled, userRole: role });
                                _context2.next = 24;
                                break;

                            case 21:
                                _context2.prev = 21;
                                _context2.t0 = _context2['catch'](0);
                                console.error(_context2.t0);
                            case 24:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 21]]);
            }));

            function componentDidMount() {
                return _ref3.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'renderSidebar',
        value: function renderSidebar() {
            var _state = this.state,
                userRole = _state.userRole,
                isEnrolled = _state.isEnrolled,
                loading = _state.loading;

            // --- GIAO DIỆN GIẢNG VIÊN ---

            if (userRole === 'lecturer') {
                return _react2.default.createElement(_semanticUiReact.Segment, { style: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none', padding: '20px' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 82
                    }
                }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h4', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 83
                    }
                }, 'C\xF4ng c\u1EE5 Gi\u1EA3ng vi\xEAn'), _react2.default.createElement(_routes.Link, { route: '/test/at/' + this.props.address + '/response', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 84
                    }
                }, _react2.default.createElement('a', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 85
                    }
                }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', fluid: true, style: { marginBottom: '10px' }, icon: true, labelPosition: 'left', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 85
                    }
                }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'check square', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 86
                    }
                }), ' Ch\u1EA5m b\xE0i Sinh vi\xEAn'))), _react2.default.createElement(_routes.Link, { route: '/test/at/' + this.props.address + '/addnew', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 89
                    }
                }, _react2.default.createElement('a', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 90
                    }
                }, _react2.default.createElement(_semanticUiReact.Button, { basic: true, fluid: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 90
                    }
                }, 'Ch\u1EC9nh s\u1EEDa \u0111\u1EC1'))));
            }

            // --- GIAO DIỆN SINH VIÊN ---
            if (userRole === 'student') {
                return _react2.default.createElement(_semanticUiReact.Segment, { style: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none', padding: '20px', textAlign: 'center' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 99
                    }
                }, isEnrolled ?
                // 1. ĐÃ THAM GIA -> HIỆN NÚT VÀO NỘP BÀI
                _react2.default.createElement('div', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 102
                    }
                }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', style: { color: '#21ba45' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 103
                    }
                }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'check circle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 104
                    }
                }), ' \u0110\xE3 tham gia'), _react2.default.createElement('p', { style: { color: '#666' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 106
                    }
                }, 'B\u1EA1n c\xF3 th\u1EC3 b\u1EAFt \u0111\u1EA7u l\xE0m b\xE0i.'), _react2.default.createElement(_routes.Link, { route: '/test/at/' + this.props.address + '/attempt', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 107
                    }
                }, _react2.default.createElement('a', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 108
                    }
                }, _react2.default.createElement(_semanticUiReact.Button, { primary: true, fluid: true, size: 'huge', icon: true, labelPosition: 'left', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 109
                    }
                }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'cloud upload', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 110
                    }
                }), ' V\xC0O N\u1ED8P B\xC0I')))) :
                // 2. CHƯA THAM GIA -> HIỆN NÚT ĐĂNG KÝ
                _react2.default.createElement('div', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 117
                    }
                }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', style: { color: '#0056D2' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 118
                    }
                }, 'Tham gia kh\xF3a h\u1ECDc'), _react2.default.createElement('p', { style: { color: '#666' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 119
                    }
                }, '\u0110\u0103ng k\xFD \u0111\u1EC3 m\u1EDF kh\xF3a b\xE0i n\u1ED9p.'), _react2.default.createElement(_semanticUiReact.Button, {
                    color: 'teal', fluid: true, size: 'large',
                    onClick: this.onEnroll, loading: loading,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 120
                    }
                }, '\u0110\u0103ng K\xFD Tham Gia')));
            }
            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 136
                }
            }, _react2.default.createElement('div', { style: { marginBottom: '20px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 137
                }
            }, _react2.default.createElement(_routes.Link, { route: '/test/test', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 138
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 138
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { basic: true, icon: 'arrow left', content: 'Quay l\u1EA1i Dashboard', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 138
                }
            })))), this.state.errorMessage && _react2.default.createElement(_semanticUiReact.Message, { negative: true, header: 'L\u1ED7i', content: this.state.errorMessage, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 140
                }
            }), _react2.default.createElement(_semanticUiReact.Grid, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 142
                }
            }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 11, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 143
                }
            }, _react2.default.createElement(_semanticUiReact.Segment, { raised: true, style: { padding: '40px', background: 'white', borderTop: '4px solid #6366f1' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 145
                }
            }, _react2.default.createElement(_semanticUiReact.Label, { color: 'violet', ribbon: true, style: { marginBottom: '15px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 146
                }
            }, '\u0110\u1EC1 b\xE0i'), _react2.default.createElement(_semanticUiReact.Header, { as: 'h1', style: { fontSize: '2.5em', marginTop: '0' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 147
                }
            }, this.props.instruction), _react2.default.createElement('div', { style: { marginTop: '20px', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #eee' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 149
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h4', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 150
                }
            }, 'Link t\xE0i li\u1EC7u / \u0110\u1EC1 thi:'), this.props.testLink ? _react2.default.createElement('a', { href: this.props.testLink, target: '_blank', style: { fontSize: '1.2em', fontWeight: 'bold', color: '#0056D2' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 152
                }
            }, this.props.testLink, ' ', _react2.default.createElement(_semanticUiReact.Icon, { name: 'external alternate', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 153
                }
            })) : _react2.default.createElement('span', { style: { color: 'red' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 155
                }
            }, 'Gi\u1EA3ng vi\xEAn ch\u01B0a c\u1EADp nh\u1EADt link \u0111\u1EC1 b\xE0i.')))), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 5, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 160
                }
            }, this.renderSidebar())));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(props) {
                var campaign, instruction, examiner, link;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                campaign = (0, _Test2.default)(props.query.address);
                                // Lấy thông tin cơ bản để hiển thị

                                _context3.next = 3;
                                return _factory2.default.methods.totalinstruction(props.query.address).call();

                            case 3:
                                instruction = _context3.sent;
                                _context3.next = 6;
                                return campaign.methods.examineradd().call();

                            case 6:
                                examiner = _context3.sent;

                                // Lấy link đề bài (nếu có)
                                link = '';
                                _context3.prev = 8;
                                _context3.next = 11;
                                return campaign.methods.getTestLink().call();

                            case 11:
                                link = _context3.sent;
                                _context3.next = 16;
                                break;

                            case 14:
                                _context3.prev = 14;
                                _context3.t0 = _context3['catch'](8);

                            case 16:
                                return _context3.abrupt('return', {
                                    address: props.query.address,
                                    instruction: instruction,
                                    examiner: examiner,
                                    testLink: link
                                });

                            case 17:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[8, 14]]);
            }));

            function getInitialProps(_x) {
                return _ref4.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return CampaignShow;
}(_react.Component);

exports.default = CampaignShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFx0ZXN0XFxzaG93LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiR3JpZCIsIkJ1dHRvbiIsIkljb24iLCJIZWFkZXIiLCJTZWdtZW50IiwiTWVzc2FnZSIsIkRpdmlkZXIiLCJMYWJlbCIsIkxheW91dCIsIkNhbXBhaWduIiwiZmFjdG9yeSIsIndlYjMiLCJMaW5rIiwiUm91dGVyIiwiQ2FtcGFpZ25TaG93Iiwic3RhdGUiLCJsb2FkaW5nIiwiZXJyb3JNZXNzYWdlIiwiaXNFbnJvbGxlZCIsIndhbGxldEFkZHJlc3MiLCJzdHVkZW50TmFtZSIsInVzZXJSb2xlIiwib25FbnJvbGwiLCJzZXRTdGF0ZSIsImV0aCIsImdldEFjY291bnRzIiwiYWNjb3VudHMiLCJjYW1wYWlnbiIsInByb3BzIiwiYWRkcmVzcyIsIkVycm9yIiwibWV0aG9kcyIsImVucm9sbGludGVzdCIsInNlbmQiLCJmcm9tIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJtZXNzYWdlIiwiZ2V0Um9sZSIsImNhbGwiLCJyb2xlIiwibXl3YWxsZXQiLCJteVdhbGxldEFkZHIiLCJlbnJvbGxlZCIsImF0dGVuZGUiLCJjb25zb2xlIiwiZXJyb3IiLCJib3hTaGFkb3ciLCJib3JkZXIiLCJwYWRkaW5nIiwibWFyZ2luQm90dG9tIiwidGV4dEFsaWduIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiYm9yZGVyVG9wIiwiZm9udFNpemUiLCJtYXJnaW5Ub3AiLCJpbnN0cnVjdGlvbiIsImJvcmRlclJhZGl1cyIsInRlc3RMaW5rIiwiZm9udFdlaWdodCIsInJlbmRlclNpZGViYXIiLCJxdWVyeSIsInRvdGFsaW5zdHJ1Y3Rpb24iLCJleGFtaW5lcmFkZCIsImV4YW1pbmVyIiwibGluayIsImdldFRlc3RMaW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTSxBQUFRLEFBQU0sQUFBUSxBQUFTLEFBQVMsQUFBUzs7QUFDaEUsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQVMsQUFBTSxBQUFjOzs7Ozs7O0ksQUFFdkI7Ozs7Ozs7Ozs7Ozs7Ozs0TixBQUNKO3FCQUFRLEFBQ0csQUFDVDswQkFGTSxBQUVRLEFBQ2Q7d0JBSE0sQUFHTSxBQUNaOzJCQUpNLEFBSVMsQUFDZjt5QkFMTSxBQUtPLEFBQ2I7c0IsQUFOTSxBQU1JO0FBTkosQUFDTixpQixBQThDRixvRkFBVyxtQkFBQTswQkFBQTswRUFBQTswQkFBQTtxREFBQTs2QkFDVDtrQ0FBQSxBQUFLLFNBQVMsRUFBRSxTQUFGLEFBQVcsTUFBTSxjQUR0QixBQUNULEFBQWMsQUFBK0I7NENBRHBDOzRDQUFBO21DQUdrQixjQUFBLEFBQUssSUFIdkIsQUFHa0IsQUFBUzs7NkJBQTFCO0FBSEQsZ0RBSUM7QUFKRCx1Q0FJWSxvQkFBUyxNQUFBLEFBQUssTUFKMUIsQUFJWSxBQUFvQjs7a0NBRWpDLENBQUMsTUFBQSxBQUFLLE1BQU4sQUFBWSxpQkFBaUIsTUFBQSxBQUFLLE1BQUwsQUFBVyxrQkFOdkMsQUFNeUQsK0NBTnpEO2dEQUFBO0FBQUE7QUFBQTs7a0NBT0ssSUFBQSxBQUFJLE1BUFQsQUFPSyxBQUFVOzs2QkFQZjs0Q0FBQTttQ0FXQyxTQUFBLEFBQVMsUUFBVCxBQUFpQixhQUFhLE1BQUEsQUFBSyxNQUFuQyxBQUF5QyxlQUF6QyxBQUF3RCxLQUFLLEVBQUUsTUFBTSxTQVh0RSxBQVdDLEFBQTZELEFBQVEsQUFBUzs7NkJBRXBGOztBQUNBO21DQUFBLEFBQU8sU0FkRixBQWNMLEFBQWdCOzRDQWRYO0FBQUE7OzZCQUFBOzRDQUFBOzREQWVPO2tDQUFBLEFBQUssU0FBUyxFQUFFLGNBQWMsWUFmckMsQUFlTyxBQUFjLEFBQW9COzs2QkFDbEQ7a0NBQUEsQUFBSyxTQUFTLEVBQUUsU0FoQlAsQUFnQlQsQUFBYyxBQUFXOzs2QkFoQmhCOzZCQUFBOzRDQUFBOztBQUFBO3FDQUFBO0E7Ozs7Ozs7Ozs7Ozs7O3VDQWxCa0IsY0FBQSxBQUFLLEksQUFBTCxBQUFTOztpQ0FBMUI7QTs7b0NBQ0QsUyxBQUFBLEFBQVM7Ozs7Ozs7Ozt1Q0FFSyxrQkFBQSxBQUFRLFFBQVIsQUFBZ0IsUUFBUSxTQUF4QixBQUF3QixBQUFTLEksQUFBakMsQUFBcUM7O2lDQUFsRDtBOzt1Q0FFcUIsa0JBQUEsQUFBUSxRQUFSLEFBQWdCLFdBQWhCLEFBQTJCLEtBQUssRUFBRSxNQUFNLFMsQUFBeEMsQUFBZ0MsQUFBUSxBQUFTOztpQ0FBdEU7QSx5REFFRjtBLDJDQUNKLEEsQUFEZTs7O3NDQUVYLFNBQUEsQUFBUyxhQUFULEFBQXNCLGdCQUFnQixpQixBQUFpQjs7O0FBQ2pEOztBLDJDQUFXLG9CQUFTLEtBQUEsQUFBSyxNLEFBQWQsQUFBb0I7O3VDQUNwQixTQUFBLEFBQVMsUUFBVCxBQUFpQixRQUFqQixBQUF5QixjLEFBQXpCLEFBQXVDOztpQ0FBeEQ7QTs7aUNBR0o7O3FDQUFBLEFBQUssU0FBUyxFQUFFLGVBQUYsQUFBaUIsY0FBYyxZQUEvQixBQUEyQyxVQUFVLFVBQW5FLEFBQWMsQUFBK0Q7Ozs7OztrRUFDbkU7d0NBQUEsQUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NBc0JSO3lCQUM4QixLQUQ5QixBQUNtQztnQkFEbkMsQUFDSixrQkFESSxBQUNKO2dCQURJLEFBQ00sb0JBRE4sQUFDTTtnQkFETixBQUNrQixpQkFEbEIsQUFDa0IsQUFFOUI7O0FBQ0E7O2dCQUFJLGFBQUosQUFBaUIsWUFBWSxBQUN6Qjt1Q0FDRSxBQUFDLDBDQUFRLE9BQU8sRUFBQyxXQUFELEFBQVksOEJBQThCLFFBQTFDLEFBQWtELFFBQVEsU0FBMUUsQUFBZ0IsQUFBbUU7a0NBQW5GO29DQUFBLEFBQ0k7QUFESjtpQkFBQSxrQkFDSSxBQUFDLHlDQUFPLElBQVIsQUFBVztrQ0FBWDtvQ0FBQTtBQUFBO21CQURKLEFBQ0ksQUFDQSx1REFBQSxBQUFDLDhCQUFLLHFCQUFtQixLQUFBLEFBQUssTUFBeEIsQUFBOEIsVUFBcEM7a0NBQUE7b0NBQUEsQUFDSTtBQURKO21DQUNJLGNBQUE7O2tDQUFBO29DQUFBLEFBQUc7QUFBSDtBQUFBLG1DQUFHLEFBQUMseUNBQU8sT0FBUixBQUFjLFVBQVMsT0FBdkIsTUFBNkIsT0FBTyxFQUFDLGNBQXJDLEFBQW9DLEFBQWUsVUFBUyxNQUE1RCxNQUFpRSxlQUFqRSxBQUErRTtrQ0FBL0U7b0NBQUEsQUFDQztBQUREO21DQUNDLEFBQUMsdUNBQUssTUFBTixBQUFXO2tDQUFYO29DQURELEFBQ0M7QUFBQTtvQkFKWixBQUVJLEFBQ0ksQUFBRyxBQUlQLHFEQUFBLEFBQUMsOEJBQUsscUJBQW1CLEtBQUEsQUFBSyxNQUF4QixBQUE4QixVQUFwQztrQ0FBQTtvQ0FBQSxBQUNJO0FBREo7bUNBQ0ksY0FBQTs7a0NBQUE7b0NBQUEsQUFBRztBQUFIO0FBQUEsbUNBQUcsQUFBQyx5Q0FBTyxPQUFSLE1BQWMsT0FBZDtrQ0FBQTtvQ0FBQTtBQUFBO21CQVRiLEFBQ0UsQUFPSSxBQUNJLEFBQUcsQUFJaEI7QUFFRDs7QUFDQTtnQkFBSSxhQUFKLEFBQWlCLFdBQVcsQUFDMUI7dUNBQ0ksQUFBQywwQ0FBUSxPQUFPLEVBQUMsV0FBRCxBQUFZLDhCQUE4QixRQUExQyxBQUFrRCxRQUFRLFNBQTFELEFBQW1FLFFBQVEsV0FBM0YsQUFBZ0IsQUFBc0Y7a0NBQXRHO29DQUFBLEFBQ0s7QUFETDtpQkFBQSxFQUVRO0FBQ0E7Z0NBQUEsY0FBQTs7a0NBQUE7b0NBQUEsQUFDSTtBQURKO0FBQUEsbUNBQ0ksQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxPQUFPLEVBQUMsT0FBeEIsQUFBdUIsQUFBUTtrQ0FBL0I7b0NBQUEsQUFDSTtBQURKO21DQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXO2tDQUFYO29DQURKLEFBQ0k7QUFBQTtvQkFGUixBQUNJLEFBR0EseUNBQUEsY0FBQSxPQUFHLE9BQU8sRUFBQyxPQUFYLEFBQVUsQUFBUTtrQ0FBbEI7b0NBQUE7QUFBQTttQkFKSixBQUlJLEFBQ0Esa0ZBQUEsQUFBQyw4QkFBSyxxQkFBbUIsS0FBQSxBQUFLLE1BQXhCLEFBQThCLFVBQXBDO2tDQUFBO29DQUFBLEFBQ0k7QUFESjttQ0FDSSxjQUFBOztrQ0FBQTtvQ0FBQSxBQUNJO0FBREo7QUFBQSxtQ0FDSSxBQUFDLHlDQUFPLFNBQVIsTUFBZ0IsT0FBaEIsTUFBc0IsTUFBdEIsQUFBMkIsUUFBTyxNQUFsQyxNQUF1QyxlQUF2QyxBQUFxRDtrQ0FBckQ7b0NBQUEsQUFDSTtBQURKO21DQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXO2tDQUFYO29DQURKLEFBQ0k7QUFBQTtvQkFWbkIsQUFFRyxBQUtJLEFBQ0ksQUFDSSxBQU9aO0FBQ0E7Z0NBQUEsY0FBQTs7a0NBQUE7b0NBQUEsQUFDSTtBQURKO0FBQUEsbUNBQ0ksQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxPQUFPLEVBQUMsT0FBeEIsQUFBdUIsQUFBUTtrQ0FBL0I7b0NBQUE7QUFBQTttQkFESixBQUNJLEFBQ0EsOENBQUEsY0FBQSxPQUFHLE9BQU8sRUFBQyxPQUFYLEFBQVUsQUFBUTtrQ0FBbEI7b0NBQUE7QUFBQTttQkFGSixBQUVJLEFBQ0EsdUZBQUEsQUFBQzsyQkFBRCxBQUNVLFFBQU8sT0FEakIsTUFDdUIsTUFEdkIsQUFDNEIsQUFDeEI7NkJBQVMsS0FGYixBQUVrQixVQUFVLFNBRjVCLEFBRXFDOztrQ0FGckM7b0NBQUE7QUFBQTtBQUNJLG1CQXZCcEIsQUFDSSxBQWtCUSxBQUdJLEFBVWpCO0FBQ0Q7bUJBQUEsQUFBTyxBQUNWOzs7O2lDQUVRLEFBQ1A7bUNBQ0UsQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDRTtBQURGO0FBQUEsYUFBQSxrQkFDRSxjQUFBLFNBQUssT0FBTyxFQUFFLGNBQWQsQUFBWSxBQUFnQjs4QkFBNUI7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsOEJBQUssT0FBTixBQUFZOzhCQUFaO2dDQUFBLEFBQXlCO0FBQXpCOytCQUF5QixjQUFBOzs4QkFBQTtnQ0FBQSxBQUFHO0FBQUg7QUFBQSwrQkFBRyxBQUFDLHlDQUFPLE9BQVIsTUFBYyxNQUFkLEFBQW1CLGNBQWEsU0FBaEMsQUFBd0M7OEJBQXhDO2dDQUZsQyxBQUNFLEFBQ0ksQUFBeUIsQUFBRyxBQUUvQjtBQUYrQjt3QkFFL0IsQUFBSyxNQUFMLEFBQVcsZ0NBQWdCLEFBQUMsMENBQVEsVUFBVCxNQUFrQixRQUFsQixBQUF5QixZQUFNLFNBQVMsS0FBQSxBQUFLLE1BQTdDLEFBQW1EOzhCQUFuRDtnQ0FKOUIsQUFJOEIsQUFFNUI7QUFGNEI7YUFBQSxtQkFFNUIsQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ssY0FBRCxzQkFBQSxBQUFNLFVBQU8sT0FBYixBQUFvQjs4QkFBcEI7Z0NBQUEsQUFFSTtBQUZKOytCQUVJLEFBQUMsMENBQVEsUUFBVCxNQUFnQixPQUFPLEVBQUUsU0FBRixBQUFXLFFBQVEsWUFBbkIsQUFBK0IsU0FBUyxXQUEvRCxBQUF1QixBQUFtRDs4QkFBMUU7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsd0NBQU0sT0FBUCxBQUFhLFVBQVMsUUFBdEIsTUFBNkIsT0FBTyxFQUFDLGNBQXJDLEFBQW9DLEFBQWU7OEJBQW5EO2dDQUFBO0FBQUE7ZUFESixBQUNJLEFBQ0Esd0NBQUEsQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxPQUFPLEVBQUUsVUFBRixBQUFZLFNBQVMsV0FBNUMsQUFBdUIsQUFBZ0M7OEJBQXZEO2dDQUFBLEFBQStEO0FBQS9EO29CQUErRCxBQUFLLE1BRnhFLEFBRUksQUFBMEUsQUFFMUUsOEJBQUEsY0FBQSxTQUFLLE9BQU8sRUFBQyxXQUFELEFBQVksUUFBUSxTQUFwQixBQUE2QixRQUFRLFlBQXJDLEFBQWlELFdBQVcsY0FBNUQsQUFBMEUsT0FBTyxRQUE3RixBQUFZLEFBQXlGOzhCQUFyRztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx5Q0FBTyxJQUFSLEFBQVc7OEJBQVg7Z0NBQUE7QUFBQTtlQURKLEFBQ0ksQUFDQyxtREFBQSxBQUFLLE1BQUwsQUFBVywyQkFDUixjQUFBLE9BQUcsTUFBTSxLQUFBLEFBQUssTUFBZCxBQUFvQixVQUFVLFFBQTlCLEFBQXFDLFVBQVMsT0FBTyxFQUFDLFVBQUQsQUFBVyxTQUFTLFlBQXBCLEFBQWdDLFFBQVEsT0FBN0YsQUFBcUQsQUFBK0M7OEJBQXBHO2dDQUFBLEFBQ0s7QUFETDthQUFBLE9BQ0ssQUFBSyxNQURWLEFBQ2dCLFVBQVUscUJBQUEsQUFBQyx1Q0FBSyxNQUFOLEFBQVc7OEJBQVg7Z0NBRjdCLEFBQ0csQUFDMEI7QUFBQTtrQ0FFMUIsY0FBQSxVQUFNLE9BQU8sRUFBQyxPQUFkLEFBQWEsQUFBTzs4QkFBcEI7Z0NBQUE7QUFBQTthQUFBLEVBYnBCLEFBQ0ksQUFFSSxBQUlJLEFBTVEsQUFLaEIsaUdBQUMsY0FBRCxzQkFBQSxBQUFNLFVBQU8sT0FBYixBQUFvQjs4QkFBcEI7Z0NBQUEsQUFFSztBQUZMO29CQXpCUixBQUNFLEFBTUUsQUFrQkksQUFFSyxBQUFLLEFBS25COzs7OzttSCxBQXBKNEI7Ozs7O2lDQUNyQjtBLDJDQUFXLG9CQUFTLE1BQUEsQUFBTSxNLEFBQWYsQUFBcUIsQUFDdEM7Ozs7dUNBQzBCLGtCQUFBLEFBQVEsUUFBUixBQUFnQixpQkFBaUIsTUFBQSxBQUFNLE1BQXZDLEFBQTZDLFMsQUFBN0MsQUFBc0Q7O2lDQUExRTtBOzt1Q0FDaUIsU0FBQSxBQUFTLFFBQVQsQUFBaUIsYyxBQUFqQixBQUErQjs7aUNBQWhEO0EscURBRU47O0FBQ0k7QSx1QyxBQUFPOzs7dUNBQ1EsU0FBQSxBQUFTLFFBQVQsQUFBaUIsYyxBQUFqQixBQUErQjs7aUNBQTVDO0E7Ozs7Ozs7Ozs7NkNBR0ssTUFBQSxBQUFNLE1BRFYsQUFDZ0IsQUFDckI7aURBRkssQUFFUSxBQUNiOzhDQUhLLEFBR0ssQUFDVjs4QyxBQUpLLEFBSUs7QUFKTCxBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMklOLEEsQUFoSzJCOztrQkFnSzNCLEFBQWUiLCJmaWxlIjoic2hvdy5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiJGOi9UTC9VRVQvQkxPQ0tDSEFJTi9Ta2lsbGNvZGUifQ==