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
/* harmony import */ var _createProjectForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createProjectForm.js */ "./src/modules/createProjectForm.js");
/* harmony import */ var _ProjectManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProjectManager.js */ "./src/modules/ProjectManager.js");
/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */




const FormManager = (() => {
  const createNewTodoBtn =
    document.querySelector("#create-new-todo"); /* temp */
  const createNewProjectBtn = document.querySelector(
    "#create-new-project"
  ); /* temp */
  const content = document.querySelector("#content"); /* temp */
  let addTodoForm; /* needed? */
  let addProjectForm; /* needed? */

  const initializeForm = (form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].methods.addTodoToSelectedProject(getInputElements(form));
    });
  };

  createNewTodoBtn.addEventListener("click", () => {
    //atm adds multiple identical eventlisteners if clicked multiple times
    //make into single function
    //add guard clause incase form is already present
    content.innerHTML = (0,_createTodoForm_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const form = document.querySelector("#add-todo-form"); //temp hardcoded val
    console.log(form);
    initializeForm(form);
  });

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  return {
    getInputElements,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormManager);

/* createNewProjectBtn.addEventListener("click", () => {
    //atm adds multiple identical eventlisteners if clicked multiple times
    //make into single function
    content.innerHTML = createProjectForm();
    console.log(content);
    initializeForm(content.id);
  }); */


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
/* const sharedMethods = {

} */

function ProjectFactory(id) {
  const projectID = id;
  let isSelected = false;
  const todos = [];

  const getTodos = () => todos;

  const addTodo = (todo) => todos.push(todo);

  const toggleSelected = () => (isSelected = !isSelected);

  //use object.assign to assign methods to protoype, to avoid duplication

  return {
    projectID,
    isSelected,
    todos, //keep private
    toggleSelected,
    getTodos,
    addTodo,
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectFactory);


/***/ }),

/***/ "./src/modules/ProjectManager.js":
/*!***************************************!*\
  !*** ./src/modules/ProjectManager.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TodoFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoFactory.js */ "./src/modules/TodoFactory.js");
/* harmony import */ var _ProjectFactory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectFactory.js */ "./src/modules/ProjectFactory.js");



const ProjectManager = (() => {
  //projects is an object
  //each key is an object, a project
  //each project has a key of todos, which is an array
  //and a key with its methods (for now, will hopefully be set on its protoype)
  let projectID = 0;
  const projects = {};

  const addProject = (projectTitle) => {
    projects[projectTitle] = (0,_ProjectFactory_js__WEBPACK_IMPORTED_MODULE_1__["default"])(projectID);
    projectID++;
  };

  /* edit this to use projectID instead */
  const deleteProject = (projectTitle) => delete projects[projectTitle];

  const getSelectedProject = () => {
    for (const project of Object.values(projects)) {
      if (project.isSelected) return project;
    }
    return null; //needed? i think one project will always be selected
  };

  const setSelectedProject = (projectTitle, projectID) => {
    /* will be using projectID later, for now its just by title */
    /* temporary looping and setting all isSelected to false*/
    for (const key in projects) {
      projects[key].isSelected = false;
    }
    projects[projectTitle].isSelected = true;
  };

  const addTodoToSelectedProject = (inputElements) => {
    const selectedProject = getSelectedProject();
    console.log(selectedProject);
    const todo = (0,_TodoFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(inputElements);
    selectedProject.addTodo(todo);
    console.log(projects);
  };

  const sendProjects = () => {}; //send projects to be rendered in side-bar

  const methods = {
    addProject,
    deleteProject,
    addTodoToSelectedProject,
    getSelectedProject,
    setSelectedProject,
  };

  return {
    projects, //should be private, create methods for getting it instead
    methods,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectManager);


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
  const todo = {};
  let val = 0;

  inputElements.forEach((element) => {
    todo[val] = element;
    val++;
  });

  return todo;
  /* return inputElements.reduce(
    (todoObj, item) =>
      item.value ? { ...todoObj, [item.id]: item.value } : todoObj,
    {}
  ); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoFactory);

/* loops through each key in argumentobj */
/* returns {} with key:value pairs*/
/* title */
/* description */
/* dueDate */
/* priority */
/* notes */
/* checklist (sub steps) */
/* maybe add methods to the objects as well? */


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
/* harmony import */ var _modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ProjectManager.js */ "./src/modules/ProjectManager.js");
/* harmony import */ var _modules_ProjectFactory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/ProjectFactory.js */ "./src/modules/ProjectFactory.js");
/* harmony import */ var _modules_TodoFactory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/TodoFactory.js */ "./src/modules/TodoFactory.js");
const log = console.log;




log(_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addProject("skate");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.setSelectedProject("skate", 0);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addTodoToSelectedProject([
  "buy skateboard",
  "at darbys skates",
]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addProject("bike");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.setSelectedProject("bike", 0);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addTodoToSelectedProject([
  "sell bike",
  "at darbys skates",
]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addTodoToSelectedProject([
  "use bike money",
  "to purchase cookies",
]);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNpRDtBQUNNO0FBQ047O0FBRWpEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLEtBQUs7QUFDTCxzREFBc0Q7QUFDdEQsbUJBQW1CO0FBQ25CLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixNQUFNLDBEQUFjO0FBQ3BCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw4REFBYztBQUN0QywyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFdBQVcsRUFBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUNqRE47O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNCYTtBQUNNOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2Qiw4REFBYztBQUMzQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMkRBQVc7QUFDNUI7QUFDQTtBQUNBOztBQUVBLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLGNBQWMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDM0Q5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0NBQW9DO0FBQ3pEO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7QUFFM0I7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsaUJBQWlCLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1ZqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGNBQWMsRUFBQzs7Ozs7OztVQ1o5QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDbUQ7QUFDTTtBQUNBO0FBQ047QUFDbkQsSUFBSSxrRUFBYztBQUNsQixrRUFBYztBQUNkLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxrRUFBYztBQUNkLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxrRUFBYztBQUNkO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Gb3JtTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlUHJvamVjdEZvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvZG9Gb3JtLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIEhhbmRsZXMgYWxsIGZvcm0gZGF0YSwgc3VibWl0dGluZyBhbmQgc2VuZGluZyB0aGF0IGRhdGEgdG8gb3RoZXIgbW9kdWxlcyovXG4vKiBnZXRzIGhvbGQgb2Ygc3VibWl0dGVkIGZvcm0gZGF0YSAqL1xuaW1wb3J0IGNyZWF0ZVRvZG9Gb3JtIGZyb20gXCIuL2NyZWF0ZVRvZG9Gb3JtLmpzXCI7XG5pbXBvcnQgY3JlYXRlUHJvamVjdEZvcm0gZnJvbSBcIi4vY3JlYXRlUHJvamVjdEZvcm0uanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuXG5jb25zdCBGb3JtTWFuYWdlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZU5ld1RvZG9CdG4gPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy10b2RvXCIpOyAvKiB0ZW1wICovXG4gIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiI2NyZWF0ZS1uZXctcHJvamVjdFwiXG4gICk7IC8qIHRlbXAgKi9cbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTsgLyogdGVtcCAqL1xuICBsZXQgYWRkVG9kb0Zvcm07IC8qIG5lZWRlZD8gKi9cbiAgbGV0IGFkZFByb2plY3RGb3JtOyAvKiBuZWVkZWQ/ICovXG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8qIG1ha2UgYWxsIHRoaXMgaW50byBzZXAuIGZ1bmN0aW9uICovXG4gICAgICBQcm9qZWN0TWFuYWdlci5tZXRob2RzLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdChnZXRJbnB1dEVsZW1lbnRzKGZvcm0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy9hdG0gYWRkcyBtdWx0aXBsZSBpZGVudGljYWwgZXZlbnRsaXN0ZW5lcnMgaWYgY2xpY2tlZCBtdWx0aXBsZSB0aW1lc1xuICAgIC8vbWFrZSBpbnRvIHNpbmdsZSBmdW5jdGlvblxuICAgIC8vYWRkIGd1YXJkIGNsYXVzZSBpbmNhc2UgZm9ybSBpcyBhbHJlYWR5IHByZXNlbnRcbiAgICBjb250ZW50LmlubmVySFRNTCA9IGNyZWF0ZVRvZG9Gb3JtKCk7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRvZG8tZm9ybVwiKTsgLy90ZW1wIGhhcmRjb2RlZCB2YWxcbiAgICBjb25zb2xlLmxvZyhmb3JtKTtcbiAgICBpbml0aWFsaXplRm9ybShmb3JtKTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICByZXR1cm4ge1xuICAgIGdldElucHV0RWxlbWVudHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcblxuLyogY3JlYXRlTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vYXRtIGFkZHMgbXVsdGlwbGUgaWRlbnRpY2FsIGV2ZW50bGlzdGVuZXJzIGlmIGNsaWNrZWQgbXVsdGlwbGUgdGltZXNcbiAgICAvL21ha2UgaW50byBzaW5nbGUgZnVuY3Rpb25cbiAgICBjb250ZW50LmlubmVySFRNTCA9IGNyZWF0ZVByb2plY3RGb3JtKCk7XG4gICAgY29uc29sZS5sb2coY29udGVudCk7XG4gICAgaW5pdGlhbGl6ZUZvcm0oY29udGVudC5pZCk7XG4gIH0pOyAqL1xuIiwiLyogY29uc3Qgc2hhcmVkTWV0aG9kcyA9IHtcblxufSAqL1xuXG5mdW5jdGlvbiBQcm9qZWN0RmFjdG9yeShpZCkge1xuICBjb25zdCBwcm9qZWN0SUQgPSBpZDtcbiAgbGV0IGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgY29uc3QgdG9kb3MgPSBbXTtcblxuICBjb25zdCBnZXRUb2RvcyA9ICgpID0+IHRvZG9zO1xuXG4gIGNvbnN0IGFkZFRvZG8gPSAodG9kbykgPT4gdG9kb3MucHVzaCh0b2RvKTtcblxuICBjb25zdCB0b2dnbGVTZWxlY3RlZCA9ICgpID0+IChpc1NlbGVjdGVkID0gIWlzU2VsZWN0ZWQpO1xuXG4gIC8vdXNlIG9iamVjdC5hc3NpZ24gdG8gYXNzaWduIG1ldGhvZHMgdG8gcHJvdG95cGUsIHRvIGF2b2lkIGR1cGxpY2F0aW9uXG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0SUQsXG4gICAgaXNTZWxlY3RlZCxcbiAgICB0b2RvcywgLy9rZWVwIHByaXZhdGVcbiAgICB0b2dnbGVTZWxlY3RlZCxcbiAgICBnZXRUb2RvcyxcbiAgICBhZGRUb2RvLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcbiIsImltcG9ydCBUb2RvRmFjdG9yeSBmcm9tIFwiLi9Ub2RvRmFjdG9yeS5qc1wiO1xuaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFByb2plY3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgLy9wcm9qZWN0cyBpcyBhbiBvYmplY3RcbiAgLy9lYWNoIGtleSBpcyBhbiBvYmplY3QsIGEgcHJvamVjdFxuICAvL2VhY2ggcHJvamVjdCBoYXMgYSBrZXkgb2YgdG9kb3MsIHdoaWNoIGlzIGFuIGFycmF5XG4gIC8vYW5kIGEga2V5IHdpdGggaXRzIG1ldGhvZHMgKGZvciBub3csIHdpbGwgaG9wZWZ1bGx5IGJlIHNldCBvbiBpdHMgcHJvdG95cGUpXG4gIGxldCBwcm9qZWN0SUQgPSAwO1xuICBjb25zdCBwcm9qZWN0cyA9IHt9O1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICAgcHJvamVjdHNbcHJvamVjdFRpdGxlXSA9IFByb2plY3RGYWN0b3J5KHByb2plY3RJRCk7XG4gICAgcHJvamVjdElEKys7XG4gIH07XG5cbiAgLyogZWRpdCB0aGlzIHRvIHVzZSBwcm9qZWN0SUQgaW5zdGVhZCAqL1xuICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3RUaXRsZSkgPT4gZGVsZXRlIHByb2plY3RzW3Byb2plY3RUaXRsZV07XG5cbiAgY29uc3QgZ2V0U2VsZWN0ZWRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBPYmplY3QudmFsdWVzKHByb2plY3RzKSkge1xuICAgICAgaWYgKHByb2plY3QuaXNTZWxlY3RlZCkgcmV0dXJuIHByb2plY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsOyAvL25lZWRlZD8gaSB0aGluayBvbmUgcHJvamVjdCB3aWxsIGFsd2F5cyBiZSBzZWxlY3RlZFxuICB9O1xuXG4gIGNvbnN0IHNldFNlbGVjdGVkUHJvamVjdCA9IChwcm9qZWN0VGl0bGUsIHByb2plY3RJRCkgPT4ge1xuICAgIC8qIHdpbGwgYmUgdXNpbmcgcHJvamVjdElEIGxhdGVyLCBmb3Igbm93IGl0cyBqdXN0IGJ5IHRpdGxlICovXG4gICAgLyogdGVtcG9yYXJ5IGxvb3BpbmcgYW5kIHNldHRpbmcgYWxsIGlzU2VsZWN0ZWQgdG8gZmFsc2UqL1xuICAgIGZvciAoY29uc3Qga2V5IGluIHByb2plY3RzKSB7XG4gICAgICBwcm9qZWN0c1trZXldLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcHJvamVjdHNbcHJvamVjdFRpdGxlXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QgPSAoaW5wdXRFbGVtZW50cykgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGdldFNlbGVjdGVkUHJvamVjdCgpO1xuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkUHJvamVjdCk7XG4gICAgY29uc3QgdG9kbyA9IFRvZG9GYWN0b3J5KGlucHV0RWxlbWVudHMpO1xuICAgIHNlbGVjdGVkUHJvamVjdC5hZGRUb2RvKHRvZG8pO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgfTtcblxuICBjb25zdCBzZW5kUHJvamVjdHMgPSAoKSA9PiB7fTsgLy9zZW5kIHByb2plY3RzIHRvIGJlIHJlbmRlcmVkIGluIHNpZGUtYmFyXG5cbiAgY29uc3QgbWV0aG9kcyA9IHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gICAgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0LFxuICAgIGdldFNlbGVjdGVkUHJvamVjdCxcbiAgICBzZXRTZWxlY3RlZFByb2plY3QsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0cywgLy9zaG91bGQgYmUgcHJpdmF0ZSwgY3JlYXRlIG1ldGhvZHMgZm9yIGdldHRpbmcgaXQgaW5zdGVhZFxuICAgIG1ldGhvZHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TWFuYWdlcjtcbiIsImZ1bmN0aW9uIFRvZG9GYWN0b3J5KGlucHV0RWxlbWVudHMpIHtcbiAgY29uc3QgdG9kbyA9IHt9O1xuICBsZXQgdmFsID0gMDtcblxuICBpbnB1dEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICB0b2RvW3ZhbF0gPSBlbGVtZW50O1xuICAgIHZhbCsrO1xuICB9KTtcblxuICByZXR1cm4gdG9kbztcbiAgLyogcmV0dXJuIGlucHV0RWxlbWVudHMucmVkdWNlKFxuICAgICh0b2RvT2JqLCBpdGVtKSA9PlxuICAgICAgaXRlbS52YWx1ZSA/IHsgLi4udG9kb09iaiwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiB0b2RvT2JqLFxuICAgIHt9XG4gICk7ICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuXG4vKiBsb29wcyB0aHJvdWdoIGVhY2gga2V5IGluIGFyZ3VtZW50b2JqICovXG4vKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbi8qIHRpdGxlICovXG4vKiBkZXNjcmlwdGlvbiAqL1xuLyogZHVlRGF0ZSAqL1xuLyogcHJpb3JpdHkgKi9cbi8qIG5vdGVzICovXG4vKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbi8qIG1heWJlIGFkZCBtZXRob2RzIHRvIHRoZSBvYmplY3RzIGFzIHdlbGw/ICovXG4iLCJjb25zdCBjcmVhdGVQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXByb2plY3QtZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb2plY3RGb3JtO1xuIiwiY29uc3QgY3JlYXRlVG9kb0Zvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC10b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUb2RvRm9ybTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBQcm9qZWN0RmFjdG9yeSBmcm9tIFwiLi9tb2R1bGVzL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5pbXBvcnQgVG9kb0ZhY3RvcnkgZnJvbSBcIi4vbW9kdWxlcy9Ub2RvRmFjdG9yeS5qc1wiO1xubG9nKFByb2plY3RNYW5hZ2VyKTtcblByb2plY3RNYW5hZ2VyLm1ldGhvZHMuYWRkUHJvamVjdChcInNrYXRlXCIpO1xuUHJvamVjdE1hbmFnZXIubWV0aG9kcy5zZXRTZWxlY3RlZFByb2plY3QoXCJza2F0ZVwiLCAwKTtcblByb2plY3RNYW5hZ2VyLm1ldGhvZHMuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KFtcbiAgXCJidXkgc2thdGVib2FyZFwiLFxuICBcImF0IGRhcmJ5cyBza2F0ZXNcIixcbl0pO1xuUHJvamVjdE1hbmFnZXIubWV0aG9kcy5hZGRQcm9qZWN0KFwiYmlrZVwiKTtcblByb2plY3RNYW5hZ2VyLm1ldGhvZHMuc2V0U2VsZWN0ZWRQcm9qZWN0KFwiYmlrZVwiLCAwKTtcblByb2plY3RNYW5hZ2VyLm1ldGhvZHMuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KFtcbiAgXCJzZWxsIGJpa2VcIixcbiAgXCJhdCBkYXJieXMgc2thdGVzXCIsXG5dKTtcblByb2plY3RNYW5hZ2VyLm1ldGhvZHMuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KFtcbiAgXCJ1c2UgYmlrZSBtb25leVwiLFxuICBcInRvIHB1cmNoYXNlIGNvb2tpZXNcIixcbl0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9