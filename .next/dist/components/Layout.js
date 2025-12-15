'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _semanticUiReact = require('semantic-ui-react');

var _head = require('next\\dist\\lib\\head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'F:\\TL\\UET\\BLOCKCHAIN\\Skillcode\\components\\Layout.js';


var Layout = function (_Component) {
    (0, _inherits3.default)(Layout, _Component);

    function Layout() {
        (0, _classCallCheck3.default)(this, Layout);

        return (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).apply(this, arguments));
    }

    (0, _createClass3.default)(Layout, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Tự động tải lại trang khi người dùng đổi ví trên MetaMask
            if (window.ethereum) {
                window.ethereum.on('accountsChanged', function () {
                    return window.location.reload();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: 'app-wrapper', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                }
            }, _react2.default.createElement(_head2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                }
            }, _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                }
            }), _react2.default.createElement('link', { rel: 'preconnect', href: 'https://fonts.googleapis.com', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }), _react2.default.createElement('link', { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', rel: 'stylesheet', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                }
            }), _react2.default.createElement('title', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                }
            }, 'SkillCode | Blockchain Learning'), _react2.default.createElement('style', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 22
                }
            }, '\n                body {\n                    background-color: #F0F2F5;\n                    font-family: \'Poppins\', sans-serif !important;\n                    color: #1a1a1a;\n                }\n                .app-wrapper {\n                    min-height: 100vh;\n                    display: flex;\n                    flex-direction: column;\n                }\n                .navbar-container {\n                    background: #ffffff;\n                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);\n                    position: sticky;\n                    top: 0;\n                    z-index: 1000;\n                    padding: 12px 0;\n                }\n                .ui.card {\n                    box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;\n                    border: none !important;\n                    border-radius: 12px !important;\n                    transition: all 0.3s ease;\n                    background: #ffffff !important;\n                }\n                .ui.card:hover {\n                    transform: translateY(-5px);\n                    box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;\n                }\n            ')), _react2.default.createElement('div', { className: 'navbar-container', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }, _react2.default.createElement(_semanticUiReact.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }, _react2.default.createElement(_Header2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }))), _react2.default.createElement('div', { style: { flex: 1, paddingBottom: '50px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 61
                }
            }, this.props.children), _react2.default.createElement('div', { style: { background: '#1a1a1a', padding: '40px 0', marginTop: 'auto', color: 'white' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            }, _react2.default.createElement(_semanticUiReact.Container, { textAlign: 'center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 66
                }
            }, _react2.default.createElement('h4', { style: { color: 'white' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }, 'SkillCode Platform'), _react2.default.createElement('p', { style: { color: '#888' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }, '\xA9 2024 Decentralized Education System.'))));
        }
    }]);

    return Layout;
}(_react.Component);

exports.default = Layout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXExheW91dC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkhlYWRlciIsIkNvbnRhaW5lciIsIkhlYWQiLCJMYXlvdXQiLCJ3aW5kb3ciLCJldGhlcmV1bSIsIm9uIiwibG9jYXRpb24iLCJyZWxvYWQiLCJmbGV4IiwicGFkZGluZ0JvdHRvbSIsInByb3BzIiwiY2hpbGRyZW4iLCJiYWNrZ3JvdW5kIiwicGFkZGluZyIsIm1hcmdpblRvcCIsImNvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBUzs7QUFDVCxBQUFPOzs7Ozs7Ozs7SSxBQUVEOzs7Ozs7Ozs7Ozs0Q0FDZ0IsQUFDbEI7QUFDQTtnQkFBSSxPQUFKLEFBQVcsVUFBVSxBQUNqQjt1QkFBQSxBQUFPLFNBQVAsQUFBZ0IsR0FBaEIsQUFBbUIsbUJBQW1CLFlBQUE7MkJBQU0sT0FBQSxBQUFPLFNBQWIsQUFBTSxBQUFnQjtBQUE1RCxBQUNIO0FBQ0Y7Ozs7aUNBRVEsQUFDUDttQ0FDRSxjQUFBLFNBQUssV0FBTCxBQUFlOzhCQUFmO2dDQUFBLEFBQ0U7QUFERjthQUFBLGtCQUNFLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLHVEQUNVLEtBQU4sQUFBVSxjQUFhLE1BQXZCLEFBQTRCOzhCQUE1QjtnQ0FESixBQUNJLEFBQ0E7QUFEQTt3REFDTSxLQUFOLEFBQVUsY0FBYSxNQUF2QixBQUE0Qjs4QkFBNUI7Z0NBRkosQUFFSSxBQUNBO0FBREE7d0RBQ00sTUFBTixBQUFXLDBGQUF5RixLQUFwRyxBQUF3Rzs4QkFBeEc7Z0NBSEosQUFHSSxBQUNBO0FBREE7Z0NBQ0EsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBSkosQUFJSSxBQUNBLG9EQUFBLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQU5OLEFBQ0UsQUFLSSxBQWlDSixtckNBQUEsY0FBQSxTQUFLLFdBQUwsQUFBZTs4QkFBZjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQzs7OEJBQUQ7Z0NBekNWLEFBdUNFLEFBQ0ksQUFDSSxBQUlSO0FBSlE7QUFBQSxrQ0FJUixjQUFBLFNBQUssT0FBTyxFQUFFLE1BQUYsQUFBUSxHQUFHLGVBQXZCLEFBQVksQUFBMEI7OEJBQXRDO2dDQUFBLEFBQ0s7QUFETDtvQkFDSyxBQUFLLE1BOUNaLEFBNkNFLEFBQ2dCLEFBR2hCLDJCQUFBLGNBQUEsU0FBSyxPQUFPLEVBQUMsWUFBRCxBQUFhLFdBQVcsU0FBeEIsQUFBaUMsVUFBVSxXQUEzQyxBQUFzRCxRQUFRLE9BQTFFLEFBQVksQUFBcUU7OEJBQWpGO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLDRDQUFVLFdBQVgsQUFBcUI7OEJBQXJCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxjQUFBLFFBQUksT0FBTyxFQUFDLE9BQVosQUFBVyxBQUFROzhCQUFuQjtnQ0FBQTtBQUFBO2VBREosQUFDSSxBQUNBLHVDQUFBLGNBQUEsT0FBRyxPQUFPLEVBQUMsT0FBWCxBQUFVLEFBQVE7OEJBQWxCO2dDQUFBO0FBQUE7ZUFyRFosQUFDRSxBQWlERSxBQUNJLEFBRUksQUFLYjs7Ozs7QSxBQW5Fa0IsQUFxRXJCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkxheW91dC5qcyIsInNvdXJjZVJvb3QiOiJGOi9UTC9VRVQvQkxPQ0tDSEFJTi9Ta2lsbGNvZGUifQ==