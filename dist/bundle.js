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
/* harmony import */ var _createProjectForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createProjectForm.js */ "./src/modules/createProjectForm.js");
/* harmony import */ var _ProjectFactory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProjectFactory.js */ "./src/modules/ProjectFactory.js");
/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */





const FormManager = (() => {
  const createNewTodoBtn =
    document.querySelector("#create-new-todo"); /* temp */
  const createNewProjectBtn = document.querySelector(
    "#create-new-project"
  ); /* temp */
  const content = document.querySelector("#content"); /* temp */
  let addTodoForm;
  let addProjectForm;

  const initializeForm = (formID) => {
    const form = document.querySelector(`#${formID}`);
    form.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
    });
  };

  createNewTodoBtn.addEventListener("click", () => {
    //atm adds multiple identical eventlisteners if clicked multiple times
    //make into single function
    content.innerHTML = (0,_createTodoForm_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    console.log(content);
    initializeForm(content.id);
  });

  createNewProjectBtn.addEventListener("click", () => {
    //atm adds multiple identical eventlisteners if clicked multiple times
    //make into single function
    content.innerHTML = (0,_createProjectForm_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    console.log(content);
    initializeForm(content.id);
  });

  const getInputElements = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  return {
    getInputElements,
  };
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

/***/ "./src/modules/createProjectForm.js":
/*!******************************************!*\
  !*** ./src/modules/createProjectForm.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createProjectForm = () => {
  return `
  <form action="#" id="add-project-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" />
    <button type="submit">Add todo</button>
  </form>
  `;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createProjectForm);


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


log(_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
_modules_TodoManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addProject("Paint Bedroom");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDaUQ7QUFDTjtBQUNZO0FBQ047O0FBRWpEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLEtBQUs7QUFDTCxzREFBc0Q7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxPQUFPO0FBQ25EO0FBQ0EsOEJBQThCO0FBQzlCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsOERBQWM7QUFDdEM7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlFQUFpQjtBQUN6QztBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2pEM0I7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGNBQWMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDYjlCO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNDQUFzQztBQUMzRDtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDakJzQjs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLDhEQUFjO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ25DM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGlCQUFpQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNWakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGNBQWMsRUFBQzs7Ozs7OztVQ2I5QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ21EO0FBQ0E7QUFDbkQsSUFBSSwrREFBVztBQUNmLCtEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVQcm9qZWN0Rm9ybS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlVG9kb0Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogSGFuZGxlcyBhbGwgZm9ybSBkYXRhLCBzdWJtaXR0aW5nIGFuZCBzZW5kaW5nIHRoYXQgZGF0YSB0byBvdGhlciBtb2R1bGVzKi9cbi8qIGdldHMgaG9sZCBvZiBzdWJtaXR0ZWQgZm9ybSBkYXRhICovXG5pbXBvcnQgY3JlYXRlVG9kb0Zvcm0gZnJvbSBcIi4vY3JlYXRlVG9kb0Zvcm0uanNcIjtcbmltcG9ydCBUb2RvRmFjdG9yeSBmcm9tIFwiLi9Ub2RvRmFjdG9yeS5qc1wiO1xuaW1wb3J0IGNyZWF0ZVByb2plY3RGb3JtIGZyb20gXCIuL2NyZWF0ZVByb2plY3RGb3JtLmpzXCI7XG5pbXBvcnQgUHJvamVjdEZhY3RvcnkgZnJvbSBcIi4vUHJvamVjdEZhY3RvcnkuanNcIjtcblxuY29uc3QgRm9ybU1hbmFnZXIgPSAoKCkgPT4ge1xuICBjb25zdCBjcmVhdGVOZXdUb2RvQnRuID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctdG9kb1wiKTsgLyogdGVtcCAqL1xuICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIiNjcmVhdGUtbmV3LXByb2plY3RcIlxuICApOyAvKiB0ZW1wICovXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7IC8qIHRlbXAgKi9cbiAgbGV0IGFkZFRvZG9Gb3JtO1xuICBsZXQgYWRkUHJvamVjdEZvcm07XG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZvcm0gPSAoZm9ybUlEKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2Zvcm1JRH1gKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvKiBtYWtlIGFsbCB0aGlzIGludG8gc2VwLiBmdW5jdGlvbiAqL1xuICAgIH0pO1xuICB9O1xuXG4gIGNyZWF0ZU5ld1RvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvL2F0bSBhZGRzIG11bHRpcGxlIGlkZW50aWNhbCBldmVudGxpc3RlbmVycyBpZiBjbGlja2VkIG11bHRpcGxlIHRpbWVzXG4gICAgLy9tYWtlIGludG8gc2luZ2xlIGZ1bmN0aW9uXG4gICAgY29udGVudC5pbm5lckhUTUwgPSBjcmVhdGVUb2RvRm9ybSgpO1xuICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xuICAgIGluaXRpYWxpemVGb3JtKGNvbnRlbnQuaWQpO1xuICB9KTtcblxuICBjcmVhdGVOZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy9hdG0gYWRkcyBtdWx0aXBsZSBpZGVudGljYWwgZXZlbnRsaXN0ZW5lcnMgaWYgY2xpY2tlZCBtdWx0aXBsZSB0aW1lc1xuICAgIC8vbWFrZSBpbnRvIHNpbmdsZSBmdW5jdGlvblxuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gY3JlYXRlUHJvamVjdEZvcm0oKTtcbiAgICBjb25zb2xlLmxvZyhjb250ZW50KTtcbiAgICBpbml0aWFsaXplRm9ybShjb250ZW50LmlkKTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9ICgpID0+IHtcbiAgICByZXR1cm4gWy4uLmFkZFRvZG9Gb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldElucHV0RWxlbWVudHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcbiIsImZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KCkge1xuICBjb25zdCB0b2RvcyA9IFtdO1xuXG4gIGNvbnN0IGdldFRvZG9zID0gKCkgPT4gdG9kb3M7XG5cbiAgLy91c2Ugb2JqZWN0LmFzc2lnbiB0byBhc3NpZ24gbWV0aG9kcyB0byBwcm90b3lwZSwgdG8gYXZvaWQgZHVwbGljYXRpb25cblxuICByZXR1cm4ge1xuICAgIHRvZG9zLCAvL2tlZXAgcHJpdmF0ZVxuICAgIGdldFRvZG9zLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcbiIsImZ1bmN0aW9uIFRvZG9GYWN0b3J5KGlucHV0RWxlbWVudHMpIHtcbiAgLyogbG9vcHMgdGhyb3VnaCBlYWNoIGtleSBpbiBhcmd1bWVudG9iaiAqL1xuICAvKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbiAgLyogdGl0bGUgKi9cbiAgLyogZGVzY3JpcHRpb24gKi9cbiAgLyogZHVlRGF0ZSAqL1xuICAvKiBwcmlvcml0eSAqL1xuICAvKiBub3RlcyAqL1xuICAvKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbiAgLyogbWF5YmUgYWRkIG1ldGhvZHMgdG8gdGhlIG9iamVjdHMgYXMgd2VsbD8gKi9cbiAgcmV0dXJuIGlucHV0RWxlbWVudHMucmVkdWNlKFxuICAgIChyZXN1bHRPYmosIGl0ZW0pID0+XG4gICAgICBpdGVtLnZhbHVlID8geyAuLi5yZXN1bHRPYmosIFtpdGVtLmlkXTogaXRlbS52YWx1ZSB9IDogcmVzdWx0T2JqLFxuICAgIHt9XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuIiwiaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFRvZG9NYW5hZ2VyID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSB7XG4gICAgLy91c2VyIGNhbiBhZGQga2V5cyB0aGF0IHdpbGwgYmUgbmV3IHByb2plY3RzXG4gICAgZGVmYXVsdDogW1xuICAgICAgLy9lYWNoIGtleSBpcyBhbiBhcnJheSBvZiBvYmplY3RzLCB0aGF0IGFyZSBlYWNoIGEgdG9kb1xuICAgICAge1xuICAgICAgICB0aXRsZTogXCJXYXNoIGRpc2hlc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJSZW1lbWJlciB0byB1c2Ugc29hcFwiLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICAgcHJvamVjdHNbcHJvamVjdFRpdGxlXSA9IFByb2plY3RGYWN0b3J5KCk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0VGl0bGUpID0+IHtcbiAgICBkZWxldGUgcHJvamVjdHNbcHJvamVjdFRpdGxlXTtcbiAgfTtcblxuICBjb25zdCBzZW5kUHJvamVjdHMgPSAoKSA9PiB7fTsgLy9zZW5kIHByb2plY3RzIHRvIGJlIHJlbmRlcmVkIGluIHNpZGUtYmFyXG5cbiAgY29uc3QgbWV0aG9kcyA9IHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0cywgLy9zaG91bGQgYmUgcHJpdmF0ZSwgY3JlYXRlIG1ldGhvZHMgZm9yIGdldHRpbmcgaXQgaW5zdGVhZFxuICAgIG1ldGhvZHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvTWFuYWdlcjtcbiIsImNvbnN0IGNyZWF0ZVByb2plY3RGb3JtID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtcHJvamVjdC1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUHJvamVjdEZvcm07XG4iLCIvKiBmdW5jdGlvbiB0byBjcmVhdGUgYW5kIHJldHVybiB0aGUgdG9kb2Zvcm0sIHdoaWNoIEZvcm1NYW5hZ2VyIGNhbiB1c2UgKi9cbmNvbnN0IGNyZWF0ZVRvZG9Gb3JtID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb246IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVG9kb0Zvcm07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IGxvZyA9IGNvbnNvbGUubG9nO1xuaW1wb3J0IEZvcm1NYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvRm9ybU1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL1RvZG9NYW5hZ2VyLmpzXCI7XG5sb2coVG9kb01hbmFnZXIpO1xuVG9kb01hbmFnZXIubWV0aG9kcy5hZGRQcm9qZWN0KFwiUGFpbnQgQmVkcm9vbVwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==