"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["react_src_desktop_pages_phEditor_phEditor_jsx"],{

/***/ "./react_src/desktop/components/hiperWord.jsx":
/*!****************************************************!*\
  !*** ./react_src/desktop/components/hiperWord.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/** @format */\n\n\nvar PhoneticAid = function PhoneticAid(_ref) {\n  var aid = _ref.aid;\n  return aid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"sub\", {\n    className: \"flex mb-1\"\n  }, aid.map(function (e, i) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n      key: i,\n      className: e === \"'\" | e === 'x' ? 'font-bold text-red-900' : 'whitespace-pre text-green-900'\n    }, e);\n  }));\n};\nvar HiperWord = function HiperWord(_ref2) {\n  var _ref2$id = _ref2.id,\n    id = _ref2$id === void 0 ? '' : _ref2$id,\n    _ref2$word = _ref2.word,\n    word = _ref2$word === void 0 ? '' : _ref2$word,\n    _ref2$lemmaId = _ref2.lemmaId,\n    lemmaId = _ref2$lemmaId === void 0 ? '' : _ref2$lemmaId,\n    _ref2$phAid = _ref2.phAid,\n    phAid = _ref2$phAid === void 0 ? '' : _ref2$phAid,\n    _ref2$searchTerm = _ref2.searchTerm,\n    searchTerm = _ref2$searchTerm === void 0 ? {} : _ref2$searchTerm,\n    _ref2$handle_click = _ref2.handle_click,\n    handle_click = _ref2$handle_click === void 0 ? function () {} : _ref2$handle_click;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: id,\n    className: \"inline-block mt-2 \".concat(word == \"n't\" ? '' : 'ml-0.5')\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PhoneticAid, {\n    aid: phAid\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: searchTerm.clickedEl === id ? ' text-teal-800 font-bold' : lemmaId && searchTerm.wordId === lemmaId ? 'text-cyan-600' : 'font-light',\n    onClick: function onClick() {\n      return handle_click(id, lemmaId);\n    }\n  }, word));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HiperWord);\n\n//# sourceURL=webpack://frontend/./react_src/desktop/components/hiperWord.jsx?");

/***/ }),

/***/ "./react_src/desktop/pages/phEditor/editor.jsx":
/*!*****************************************************!*\
  !*** ./react_src/desktop/pages/phEditor/editor.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_hiperWord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/hiperWord */ \"./react_src/desktop/components/hiperWord.jsx\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\nvar Editor = function Editor(_ref) {\n  var word = _ref.word,\n    aid = _ref.aid,\n    aidsDict = _ref.aidsDict,\n    setAidsDict = _ref.setAidsDict;\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(word in aidsDict ? aidsDict[word] : _toConsumableArray(aid)),\n    _useState2 = _slicedToArray(_useState, 2),\n    cAid = _useState2[0],\n    setCaid = _useState2[1];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    return setCaid(word in aidsDict ? aidsDict[word] : _toConsumableArray(aid));\n  }, [aid]);\n  var getAid = function getAid(str) {\n    var curr_str = '';\n    var charts = _toConsumableArray(str);\n    var aid = charts.reduce(function (acc, c) {\n      if (c === \"'\" | c === 'x') {\n        curr_str && acc.push(curr_str);\n        acc.push(c);\n        curr_str = '';\n      } else {\n        curr_str = curr_str + c;\n      }\n      return acc;\n    }, []);\n    curr_str != '' && aid.push(curr_str);\n    setCaid(aid);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"flex gap-8\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_hiperWord__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    word: word,\n    phAid: cAid\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"text\",\n    className: \"w-full mt-2 \"\n    // defaultValue={cAid.join('')}\n    ,\n    value: cAid.join(''),\n    onChange: function onChange(e) {\n      return getAid(e.target.value);\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"h-10 px-3 py-1 border active:text-green-800 active:border-green-800\",\n    onClick: function onClick() {\n      return setAidsDict(_objectSpread(_objectSpread({}, aidsDict), {}, _defineProperty({}, word, cAid)));\n    }\n  }, \"Save\"));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);\n\n//# sourceURL=webpack://frontend/./react_src/desktop/pages/phEditor/editor.jsx?");

/***/ }),

/***/ "./react_src/desktop/pages/phEditor/phEditor.jsx":
/*!*******************************************************!*\
  !*** ./react_src/desktop/pages/phEditor/phEditor.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ \"./react_src/desktop/pages/phEditor/editor.jsx\");\n/* harmony import */ var _hooks_use_page_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hooks/use_page_context */ \"./react_src/hooks/use_page_context.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\nvar DownloadButton = function DownloadButton(_ref) {\n  var children = _ref.children,\n    file = _ref.file,\n    _ref$file_name = _ref.file_name,\n    file_name = _ref$file_name === void 0 ? 'new_file.js' : _ref$file_name,\n    _ref$content_type = _ref.content_type,\n    content_type = _ref$content_type === void 0 ? 'text/plain' : _ref$content_type;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"px-4 py-1 text-xl rounded-md shadow-lg w-fit active:text-green-700 hover:bg-slate-400 bg-slate-200\",\n    onClick: function onClick() {\n      return download(file, file_name, content_type);\n    }\n  }, children);\n  function download(content, file_name, content_type) {\n    var a = document.createElement(\"a\");\n    var file = new Blob([JSON.stringify(content)], {\n      type: content_type\n    });\n    a.href = URL.createObjectURL(file);\n    a.download = file_name;\n    a.click();\n  }\n};\nvar PhEditor = function PhEditor() {\n  var wordsData = (0,_hooks_use_page_context__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('phData');\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(wordsData[0]),\n    _useState2 = _slicedToArray(_useState, 2),\n    currWord = _useState2[0],\n    setCurrWord = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),\n    _useState4 = _slicedToArray(_useState3, 2),\n    index = _useState4[0],\n    setIndex = _useState4[1];\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),\n    _useState6 = _slicedToArray(_useState5, 2),\n    aidsDict = _useState6[0],\n    setAidsDict = _useState6[1];\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState8 = _slicedToArray(_useState7, 2),\n    end = _useState8[0],\n    setEnd = _useState8[1];\n  var change = function change(next) {\n    var to = index + next;\n    if (to < 0) {\n      return;\n    }\n    if (to == wordsData.length) {\n      setEnd(true);\n      return;\n    }\n    end && setEnd(false);\n    setCurrWord(wordsData[to]);\n    setIndex(to);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"flex flex-col items-center gap-5 pt-32\"\n  }, end && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, \"fin\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"flex flex-col items-center gap-6 text-lg border rounded shadow p-14 w-96\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_editor__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    word: currWord[0],\n    aid: currWord[1],\n    aidsDict: aidsDict,\n    setAidsDict: setAidsDict\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"flex justify-between w-full px-5\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"px-3 py-1 border active:text-green-800 active:border-green-800\",\n    onClick: function onClick() {\n      return change(-1);\n    }\n  }, \"Prev\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"px-3 py-1 border active:text-green-800 active:border-green-800\",\n    onClick: function onClick() {\n      return change(1);\n    }\n  }, \"Next\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DownloadButton, {\n    file: aidsDict,\n    file_name: \"ph_aids.json\"\n  }, \"Download\"));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhEditor);\n\n//# sourceURL=webpack://frontend/./react_src/desktop/pages/phEditor/phEditor.jsx?");

/***/ }),

/***/ "./react_src/hooks/use_page_context.js":
/*!*********************************************!*\
  !*** ./react_src/hooks/use_page_context.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/** @format */\n\nvar use_page_context = function use_page_context() {\n  var page_context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'page-context';\n  return JSON.parse(document.getElementById(page_context).textContent);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (use_page_context);\n\n//# sourceURL=webpack://frontend/./react_src/hooks/use_page_context.js?");

/***/ })

}]);