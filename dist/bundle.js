/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/FormManager.js":
/*!************************************!*\
  !*** ./src/modules/FormManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */
const FormManager = (() => {
  let addTodoForm;

  const initializeAddTodoForm = (addTodoFormID) => {
    addTodoForm = document.querySelector(`#${addTodoFormID}`);

    addTodoForm.addEventListener("submit", (event) => {
      event.preventDefault(); /* all of this logic put in seperate function */
      console.log("i worked");
    });
  };

  const getFormInputs = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  const logForm = () => {
    console.log(addTodoForm);
    console.log(addTodoForm.elements);
  };

  return {
    initializeAddTodoForm,
    getFormInputs,
    logForm,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormManager);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_FormManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/FormManager.js */ "./src/modules/FormManager.js");
const log = console.log;

_modules_FormManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].initializeAddTodoForm("add-todo-form");
_modules_FormManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].logForm();
log(_modules_FormManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getFormInputs());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxjQUFjOztBQUUzRDtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7O1VDL0IzQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDbUQ7QUFDbkQsK0RBQVc7QUFDWCwrREFBVztBQUNYLElBQUksK0RBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvRm9ybU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogSGFuZGxlcyBhbGwgZm9ybSBkYXRhLCBzdWJtaXR0aW5nIGFuZCBzZW5kaW5nIHRoYXQgZGF0YSB0byBvdGhlciBtb2R1bGVzKi9cbi8qIGdldHMgaG9sZCBvZiBzdWJtaXR0ZWQgZm9ybSBkYXRhICovXG4vKiBjYW4gY29uc3RydWN0IGFuIG9iamVjdCBmcm9tIGZvcm0gZGF0YSwgd2hpY2ggaXQgY2FuIHNlbmQgKi9cbmNvbnN0IEZvcm1NYW5hZ2VyID0gKCgpID0+IHtcbiAgbGV0IGFkZFRvZG9Gb3JtO1xuXG4gIGNvbnN0IGluaXRpYWxpemVBZGRUb2RvRm9ybSA9IChhZGRUb2RvRm9ybUlEKSA9PiB7XG4gICAgYWRkVG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHthZGRUb2RvRm9ybUlEfWApO1xuXG4gICAgYWRkVG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8qIGFsbCBvZiB0aGlzIGxvZ2ljIHB1dCBpbiBzZXBlcmF0ZSBmdW5jdGlvbiAqL1xuICAgICAgY29uc29sZS5sb2coXCJpIHdvcmtlZFwiKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBnZXRGb3JtSW5wdXRzID0gKCkgPT4ge1xuICAgIHJldHVybiBbLi4uYWRkVG9kb0Zvcm0uZWxlbWVudHNdLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50YWdOYW1lID09PSBcIklOUFVUXCIpO1xuICB9O1xuXG4gIGNvbnN0IGxvZ0Zvcm0gPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYWRkVG9kb0Zvcm0pO1xuICAgIGNvbnNvbGUubG9nKGFkZFRvZG9Gb3JtLmVsZW1lbnRzKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemVBZGRUb2RvRm9ybSxcbiAgICBnZXRGb3JtSW5wdXRzLFxuICAgIGxvZ0Zvcm0sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuRm9ybU1hbmFnZXIuaW5pdGlhbGl6ZUFkZFRvZG9Gb3JtKFwiYWRkLXRvZG8tZm9ybVwiKTtcbkZvcm1NYW5hZ2VyLmxvZ0Zvcm0oKTtcbmxvZyhGb3JtTWFuYWdlci5nZXRGb3JtSW5wdXRzKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9