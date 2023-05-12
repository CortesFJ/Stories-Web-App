"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["react_src_desktop_pages_stories_stories_jsx"],{

/***/ "./react_src/desktop/pages/stories/stories.jsx":
/*!*****************************************************!*\
  !*** ./react_src/desktop/pages/stories/stories.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _hooks_use_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hooks/use_page_context */ \"./react_src/hooks/use_page_context.js\");\n/* harmony import */ var _analyze_add_paragraph_and_sentence_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../analyze/add_paragraph_and_sentence_index */ \"./react_src/desktop/pages/analyze/add_paragraph_and_sentence_index.js\");\n/* harmony import */ var _components_reader_reader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/reader/reader */ \"./react_src/desktop/components/reader/reader.jsx\");\n\n\n\n\nvar StoriesPage = function StoriesPage() {\n  var info = (0,_hooks_use_page_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('bookInfo');\n  var phonetics = (0,_hooks_use_page_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('phonetics');\n  var chapters = (0,_hooks_use_page_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('chapters').map(function (chapter) {\n    var textData = (0,_analyze_add_paragraph_and_sentence_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(chapter.textData);\n    return {\n      chapter: chapter.chapter,\n      title: textData.title,\n      textData: textData\n    };\n  });\n  var book = {\n    chapters: chapters,\n    info: {\n      id: info.id,\n      level: info.level,\n      phonetics: phonetics,\n      notes: Object.keys(info.notes).length ? info.note : null\n    },\n    title: info.title\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_reader_reader__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    book: book && book\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StoriesPage);\n\n//# sourceURL=webpack://frontend/./react_src/desktop/pages/stories/stories.jsx?");

/***/ })

}]);