"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["react_src_desktop_pages_analyze_analyze_jsx"],{

/***/ "./react_src/desktop/pages/analyze/analyze.jsx":
/*!*****************************************************!*\
  !*** ./react_src/desktop/pages/analyze/analyze.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _hooks_use_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hooks/use_page_context */ \"./react_src/hooks/use_page_context.js\");\n/* harmony import */ var _components_reader_reader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/reader/reader */ \"./react_src/desktop/components/reader/reader.jsx\");\n/* harmony import */ var _add_paragraph_and_sentence_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add_paragraph_and_sentence_index */ \"./react_src/desktop/pages/analyze/add_paragraph_and_sentence_index.js\");\n\n\n\n\nvar Analyze = function Analyze() {\n  var response = (0,_hooks_use_page_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('response');\n  var phonetics = (0,_hooks_use_page_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('phonetics');\n  var textData = (0,_add_paragraph_and_sentence_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(response);\n  var book = {\n    chapters: [{\n      chapter: 0,\n      title: response.title,\n      textData: textData\n    }],\n    info: {\n      id: 0,\n      level: undefined,\n      phonetics: phonetics,\n      notes: null\n    },\n    title: response.title\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_reader_reader__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    book: book\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Analyze);\n\n//# sourceURL=webpack://frontend/./react_src/desktop/pages/analyze/analyze.jsx?");

/***/ })

}]);