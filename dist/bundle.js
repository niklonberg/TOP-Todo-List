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
/* harmony import */ var _createTodoForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTodoForm.js */ "./src/modules/createTodoForm.js");
/* harmony import */ var _TodoFactory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoFactory.js */ "./src/modules/TodoFactory.js");
/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */



const FormManager = (() => {
  const createNewTodo = document.querySelector("#create-new-todo"); /* temp */
  const content = document.querySelector("#content");
  let addTodoForm;

  const initializeCreateTodo = () => {
    addTodoForm = document.querySelector("#add-todo-form");
    addTodoForm.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
      console.log((0,_TodoFactory_js__WEBPACK_IMPORTED_MODULE_1__["default"])(getInputElements()));
    });
  };

  const getInputElements = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  createNewTodo.addEventListener("click", () => {
    content.innerHTML = (0,_createTodoForm_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    initializeCreateTodo();
  });
  /* 
  return {
    getInputElements, necessary?
  }; */
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormManager);


/***/ }),

/***/ "./src/modules/ProjectFactory.js":
/*!***************************************!*\
  !*** ./src/modules/ProjectFactory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ProjectFactory() {
  const todos = [];

  const getTodos = () => todos;

  //use object.assign to assign methods to protoype, to avoid duplication

  return {
    todos, //keep private
    getTodos,
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectFactory);


/***/ }),

/***/ "./src/modules/TodoFactory.js":
/*!************************************!*\
  !*** ./src/modules/TodoFactory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function TodoFactory(inputElements) {
  /* loops through each key in argumentobj */
  /* returns {} with key:value pairs*/
  /* title */
  /* description */
  /* dueDate */
  /* priority */
  /* notes */
  /* checklist (sub steps) */
  /* maybe add methods to the objects as well? */
  return inputElements.reduce(
    (resultObj, item) =>
      item.value ? { ...resultObj, [item.id]: item.value } : resultObj,
    {}
  );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoFactory);


/***/ }),

/***/ "./src/modules/TodoManager.js":
/*!************************************!*\
  !*** ./src/modules/TodoManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProjectFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectFactory.js */ "./src/modules/ProjectFactory.js");


const TodoManager = (() => {
  const projects = {
    //user can add keys that will be new projects
    default: [
      //each key is an array of objects, that are each a todo
      {
        title: "Wash dishes",
        description: "Remember to use soap",
      },
    ],
  };

  const addProject = (projectTitle) => {
    projects[projectTitle] = (0,_ProjectFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  };

  const deleteProject = (projectTitle) => {
    delete projects[projectTitle];
  };

  const sendProjects = () => {}; //send projects to be rendered in side-bar

  const methods = {
    addProject,
    deleteProject,
  };

  return {
    projects, //should be private, create methods for getting it instead
    methods,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoManager);


/***/ }),

/***/ "./src/modules/createTodoForm.js":
/*!***************************************!*\
  !*** ./src/modules/createTodoForm.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* function to create and return the todoform, which FormManager can use */
const createTodoForm = () => {
  return `
  <form action="#" id="add-todo-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" />
    <label for="description">Description: </label>
    <input type="text" name="description" id="description" />
    <button type="submit">Add todo</button>
  </form>
  `;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTodoForm);


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
/* harmony import */ var _modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/TodoManager.js */ "./src/modules/TodoManager.js");
const log = console.log;


log(JSON.stringify(_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"], null, 2));
_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addProject("Vacuum ALan Moore");
log(JSON.stringify(_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"], null, 2));
_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.deleteProject("Vacuum ALan Moore");
log(JSON.stringify(_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"], null, 2));
log(_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDaUQ7QUFDTjs7QUFFM0M7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIsa0JBQWtCLDJEQUFXO0FBQzdCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsOERBQWM7QUFDdEM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqQzNCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2I5QjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQ0FBc0M7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCc0I7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLDZCQUE2Qiw4REFBYztBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7VUNiOUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNtRDtBQUNBO0FBQ25ELG1CQUFtQiwrREFBVztBQUM5QiwrREFBVztBQUNYLG1CQUFtQiwrREFBVztBQUM5QiwrREFBVztBQUNYLG1CQUFtQiwrREFBVztBQUM5QixJQUFJLCtEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVUb2RvRm9ybS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBIYW5kbGVzIGFsbCBmb3JtIGRhdGEsIHN1Ym1pdHRpbmcgYW5kIHNlbmRpbmcgdGhhdCBkYXRhIHRvIG90aGVyIG1vZHVsZXMqL1xuLyogZ2V0cyBob2xkIG9mIHN1Ym1pdHRlZCBmb3JtIGRhdGEgKi9cbi8qIGNhbiBjb25zdHJ1Y3QgYW4gb2JqZWN0IGZyb20gZm9ybSBkYXRhLCB3aGljaCBpdCBjYW4gc2VuZCAqL1xuaW1wb3J0IGNyZWF0ZVRvZG9Gb3JtIGZyb20gXCIuL2NyZWF0ZVRvZG9Gb3JtLmpzXCI7XG5pbXBvcnQgVG9kb0ZhY3RvcnkgZnJvbSBcIi4vVG9kb0ZhY3RvcnkuanNcIjtcblxuY29uc3QgRm9ybU1hbmFnZXIgPSAoKCkgPT4ge1xuICBjb25zdCBjcmVhdGVOZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXRvZG9cIik7IC8qIHRlbXAgKi9cbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbiAgbGV0IGFkZFRvZG9Gb3JtO1xuXG4gIGNvbnN0IGluaXRpYWxpemVDcmVhdGVUb2RvID0gKCkgPT4ge1xuICAgIGFkZFRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdG9kby1mb3JtXCIpO1xuICAgIGFkZFRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvKiBtYWtlIGFsbCB0aGlzIGludG8gc2VwLiBmdW5jdGlvbiAqL1xuICAgICAgY29uc29sZS5sb2coVG9kb0ZhY3RvcnkoZ2V0SW5wdXRFbGVtZW50cygpKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9ICgpID0+IHtcbiAgICByZXR1cm4gWy4uLmFkZFRvZG9Gb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcbiAgfTtcblxuICBjcmVhdGVOZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29udGVudC5pbm5lckhUTUwgPSBjcmVhdGVUb2RvRm9ybSgpO1xuICAgIGluaXRpYWxpemVDcmVhdGVUb2RvKCk7XG4gIH0pO1xuICAvKiBcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnB1dEVsZW1lbnRzLCBuZWNlc3Nhcnk/XG4gIH07ICovXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcbiIsImZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KCkge1xuICBjb25zdCB0b2RvcyA9IFtdO1xuXG4gIGNvbnN0IGdldFRvZG9zID0gKCkgPT4gdG9kb3M7XG5cbiAgLy91c2Ugb2JqZWN0LmFzc2lnbiB0byBhc3NpZ24gbWV0aG9kcyB0byBwcm90b3lwZSwgdG8gYXZvaWQgZHVwbGljYXRpb25cblxuICByZXR1cm4ge1xuICAgIHRvZG9zLCAvL2tlZXAgcHJpdmF0ZVxuICAgIGdldFRvZG9zLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcbiIsImZ1bmN0aW9uIFRvZG9GYWN0b3J5KGlucHV0RWxlbWVudHMpIHtcbiAgLyogbG9vcHMgdGhyb3VnaCBlYWNoIGtleSBpbiBhcmd1bWVudG9iaiAqL1xuICAvKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbiAgLyogdGl0bGUgKi9cbiAgLyogZGVzY3JpcHRpb24gKi9cbiAgLyogZHVlRGF0ZSAqL1xuICAvKiBwcmlvcml0eSAqL1xuICAvKiBub3RlcyAqL1xuICAvKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbiAgLyogbWF5YmUgYWRkIG1ldGhvZHMgdG8gdGhlIG9iamVjdHMgYXMgd2VsbD8gKi9cbiAgcmV0dXJuIGlucHV0RWxlbWVudHMucmVkdWNlKFxuICAgIChyZXN1bHRPYmosIGl0ZW0pID0+XG4gICAgICBpdGVtLnZhbHVlID8geyAuLi5yZXN1bHRPYmosIFtpdGVtLmlkXTogaXRlbS52YWx1ZSB9IDogcmVzdWx0T2JqLFxuICAgIHt9XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuIiwiaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFRvZG9NYW5hZ2VyID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSB7XG4gICAgLy91c2VyIGNhbiBhZGQga2V5cyB0aGF0IHdpbGwgYmUgbmV3IHByb2plY3RzXG4gICAgZGVmYXVsdDogW1xuICAgICAgLy9lYWNoIGtleSBpcyBhbiBhcnJheSBvZiBvYmplY3RzLCB0aGF0IGFyZSBlYWNoIGEgdG9kb1xuICAgICAge1xuICAgICAgICB0aXRsZTogXCJXYXNoIGRpc2hlc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJSZW1lbWJlciB0byB1c2Ugc29hcFwiLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICAgcHJvamVjdHNbcHJvamVjdFRpdGxlXSA9IFByb2plY3RGYWN0b3J5KCk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0VGl0bGUpID0+IHtcbiAgICBkZWxldGUgcHJvamVjdHNbcHJvamVjdFRpdGxlXTtcbiAgfTtcblxuICBjb25zdCBzZW5kUHJvamVjdHMgPSAoKSA9PiB7fTsgLy9zZW5kIHByb2plY3RzIHRvIGJlIHJlbmRlcmVkIGluIHNpZGUtYmFyXG5cbiAgY29uc3QgbWV0aG9kcyA9IHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0cywgLy9zaG91bGQgYmUgcHJpdmF0ZSwgY3JlYXRlIG1ldGhvZHMgZm9yIGdldHRpbmcgaXQgaW5zdGVhZFxuICAgIG1ldGhvZHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvTWFuYWdlcjtcbiIsIi8qIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhbmQgcmV0dXJuIHRoZSB0b2RvZm9ybSwgd2hpY2ggRm9ybU1hbmFnZXIgY2FuIHVzZSAqL1xuY29uc3QgY3JlYXRlVG9kb0Zvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC10b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUb2RvRm9ybTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9NYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvVG9kb01hbmFnZXIuanNcIjtcbmxvZyhKU09OLnN0cmluZ2lmeShUb2RvTWFuYWdlciwgbnVsbCwgMikpO1xuVG9kb01hbmFnZXIubWV0aG9kcy5hZGRQcm9qZWN0KFwiVmFjdXVtIEFMYW4gTW9vcmVcIik7XG5sb2coSlNPTi5zdHJpbmdpZnkoVG9kb01hbmFnZXIsIG51bGwsIDIpKTtcblRvZG9NYW5hZ2VyLm1ldGhvZHMuZGVsZXRlUHJvamVjdChcIlZhY3V1bSBBTGFuIE1vb3JlXCIpO1xubG9nKEpTT04uc3RyaW5naWZ5KFRvZG9NYW5hZ2VyLCBudWxsLCAyKSk7XG5sb2coVG9kb01hbmFnZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9