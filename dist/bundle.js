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
  const isSelected = false;
  const todos = [];

  const getTodos = () => todos;

  const addTodo = (todo) => todos.push(todo);

  //use object.assign to assign methods to protoype, to avoid duplication

  return {
    projectID,
    isSelected,
    todos, //keep private
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
  let projectID = 2;
  const projects = {
    default: {
      projectID: 0,
      isSelected: false,
      todos: [
        {
          title: "Wash dishes",
          description: "Remember to use soap",
        },
      ],
      getTodos() {
        return this.todos;
      },
      addTodo(todo) {
        this.todos.push(todo);
      },
    },
    paint: {
      projectID: 1,
      isSelected: true,
      todos: [
        {
          title: "buy paint",
          description: "take i-95 highway",
        },
      ],
      getTodos() {
        return this.todos;
      },
      addTodo(todo) {
        this.todos.push(todo);
      },
    },
  };

  const addProject = (projectTitle) => {
    projects[projectTitle] = (0,_ProjectFactory_js__WEBPACK_IMPORTED_MODULE_1__["default"])(projectID);
    projectID++;
  };

  const deleteProject = (projectTitle) => delete projects[projectTitle];

  const getSelectedProject = () => {
    for (const project of Object.values(projects)) {
      if (project.isSelected) {
        return project;
      }
    }
    return null; //needed? i think one project will always be selected
  };

  const setSelectedProject = (projectID) => {};

  const addTodoToSelectedProject = (inputElements) => {
    const selectedProject = getSelectedProject();
    const todo = (0,_TodoFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(inputElements);
    selectedProject.addTodo(todo);
    console.log(projects);
  };

  const sendProjects = () => {}; //send projects to be rendered in side-bar

  const methods = {
    addProject,
    deleteProject,
    addTodoToSelectedProject,
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
  return inputElements.reduce(
    (todoObj, item) =>
      item.value ? { ...todoObj, [item.id]: item.value } : resultObj,
    {}
  );
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
const log = console.log;


log(_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].methods.addProject("Paint Bedroom");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNpRDtBQUNNO0FBQ047O0FBRWpEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLEtBQUs7QUFDTCxzREFBc0Q7QUFDdEQsbUJBQW1CO0FBQ25CLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixNQUFNLDBEQUFjO0FBQ3BCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw4REFBYztBQUN0QywyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFdBQVcsRUFBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUNqRE47O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGNBQWMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmE7QUFDTTs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0EsNkJBQTZCLDhEQUFjO0FBQzNDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsMkRBQVc7QUFDNUI7QUFDQTtBQUNBOztBQUVBLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuRjlCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQ0FBb0M7QUFDekQ7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7QUFFM0I7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsaUJBQWlCLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1ZqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGNBQWMsRUFBQzs7Ozs7OztVQ1o5QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ21EO0FBQ007QUFDekQsSUFBSSxrRUFBYztBQUNsQixrRUFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Gb3JtTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlUHJvamVjdEZvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvZG9Gb3JtLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIEhhbmRsZXMgYWxsIGZvcm0gZGF0YSwgc3VibWl0dGluZyBhbmQgc2VuZGluZyB0aGF0IGRhdGEgdG8gb3RoZXIgbW9kdWxlcyovXG4vKiBnZXRzIGhvbGQgb2Ygc3VibWl0dGVkIGZvcm0gZGF0YSAqL1xuaW1wb3J0IGNyZWF0ZVRvZG9Gb3JtIGZyb20gXCIuL2NyZWF0ZVRvZG9Gb3JtLmpzXCI7XG5pbXBvcnQgY3JlYXRlUHJvamVjdEZvcm0gZnJvbSBcIi4vY3JlYXRlUHJvamVjdEZvcm0uanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuXG5jb25zdCBGb3JtTWFuYWdlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZU5ld1RvZG9CdG4gPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy10b2RvXCIpOyAvKiB0ZW1wICovXG4gIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiI2NyZWF0ZS1uZXctcHJvamVjdFwiXG4gICk7IC8qIHRlbXAgKi9cbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTsgLyogdGVtcCAqL1xuICBsZXQgYWRkVG9kb0Zvcm07IC8qIG5lZWRlZD8gKi9cbiAgbGV0IGFkZFByb2plY3RGb3JtOyAvKiBuZWVkZWQ/ICovXG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8qIG1ha2UgYWxsIHRoaXMgaW50byBzZXAuIGZ1bmN0aW9uICovXG4gICAgICBQcm9qZWN0TWFuYWdlci5tZXRob2RzLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdChnZXRJbnB1dEVsZW1lbnRzKGZvcm0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy9hdG0gYWRkcyBtdWx0aXBsZSBpZGVudGljYWwgZXZlbnRsaXN0ZW5lcnMgaWYgY2xpY2tlZCBtdWx0aXBsZSB0aW1lc1xuICAgIC8vbWFrZSBpbnRvIHNpbmdsZSBmdW5jdGlvblxuICAgIC8vYWRkIGd1YXJkIGNsYXVzZSBpbmNhc2UgZm9ybSBpcyBhbHJlYWR5IHByZXNlbnRcbiAgICBjb250ZW50LmlubmVySFRNTCA9IGNyZWF0ZVRvZG9Gb3JtKCk7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRvZG8tZm9ybVwiKTsgLy90ZW1wIGhhcmRjb2RlZCB2YWxcbiAgICBjb25zb2xlLmxvZyhmb3JtKTtcbiAgICBpbml0aWFsaXplRm9ybShmb3JtKTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICByZXR1cm4ge1xuICAgIGdldElucHV0RWxlbWVudHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcblxuLyogY3JlYXRlTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vYXRtIGFkZHMgbXVsdGlwbGUgaWRlbnRpY2FsIGV2ZW50bGlzdGVuZXJzIGlmIGNsaWNrZWQgbXVsdGlwbGUgdGltZXNcbiAgICAvL21ha2UgaW50byBzaW5nbGUgZnVuY3Rpb25cbiAgICBjb250ZW50LmlubmVySFRNTCA9IGNyZWF0ZVByb2plY3RGb3JtKCk7XG4gICAgY29uc29sZS5sb2coY29udGVudCk7XG4gICAgaW5pdGlhbGl6ZUZvcm0oY29udGVudC5pZCk7XG4gIH0pOyAqL1xuIiwiLyogY29uc3Qgc2hhcmVkTWV0aG9kcyA9IHtcblxufSAqL1xuXG5mdW5jdGlvbiBQcm9qZWN0RmFjdG9yeShpZCkge1xuICBjb25zdCBwcm9qZWN0SUQgPSBpZDtcbiAgY29uc3QgaXNTZWxlY3RlZCA9IGZhbHNlO1xuICBjb25zdCB0b2RvcyA9IFtdO1xuXG4gIGNvbnN0IGdldFRvZG9zID0gKCkgPT4gdG9kb3M7XG5cbiAgY29uc3QgYWRkVG9kbyA9ICh0b2RvKSA9PiB0b2Rvcy5wdXNoKHRvZG8pO1xuXG4gIC8vdXNlIG9iamVjdC5hc3NpZ24gdG8gYXNzaWduIG1ldGhvZHMgdG8gcHJvdG95cGUsIHRvIGF2b2lkIGR1cGxpY2F0aW9uXG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0SUQsXG4gICAgaXNTZWxlY3RlZCxcbiAgICB0b2RvcywgLy9rZWVwIHByaXZhdGVcbiAgICBnZXRUb2RvcyxcbiAgICBhZGRUb2RvLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcbiIsImltcG9ydCBUb2RvRmFjdG9yeSBmcm9tIFwiLi9Ub2RvRmFjdG9yeS5qc1wiO1xuaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFByb2plY3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgLy9wcm9qZWN0cyBpcyBhbiBvYmplY3RcbiAgLy9lYWNoIGtleSBpcyBhbiBvYmplY3QsIGEgcHJvamVjdFxuICAvL2VhY2ggcHJvamVjdCBoYXMgYSBrZXkgb2YgdG9kb3MsIHdoaWNoIGlzIGFuIGFycmF5XG4gIC8vYW5kIGEga2V5IHdpdGggaXRzIG1ldGhvZHMgKGZvciBub3csIHdpbGwgaG9wZWZ1bGx5IGJlIHNldCBvbiBpdHMgcHJvdG95cGUpXG4gIGxldCBwcm9qZWN0SUQgPSAyO1xuICBjb25zdCBwcm9qZWN0cyA9IHtcbiAgICBkZWZhdWx0OiB7XG4gICAgICBwcm9qZWN0SUQ6IDAsXG4gICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgIHRvZG9zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCJXYXNoIGRpc2hlc1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJlbWVtYmVyIHRvIHVzZSBzb2FwXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZ2V0VG9kb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICAgICAgfSxcbiAgICAgIGFkZFRvZG8odG9kbykge1xuICAgICAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgIHByb2plY3RJRDogMSxcbiAgICAgIGlzU2VsZWN0ZWQ6IHRydWUsXG4gICAgICB0b2RvczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiYnV5IHBhaW50XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwidGFrZSBpLTk1IGhpZ2h3YXlcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBnZXRUb2RvcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gICAgICB9LFxuICAgICAgYWRkVG9kbyh0b2RvKSB7XG4gICAgICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RUaXRsZSkgPT4ge1xuICAgIHByb2plY3RzW3Byb2plY3RUaXRsZV0gPSBQcm9qZWN0RmFjdG9yeShwcm9qZWN0SUQpO1xuICAgIHByb2plY3RJRCsrO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdFRpdGxlKSA9PiBkZWxldGUgcHJvamVjdHNbcHJvamVjdFRpdGxlXTtcblxuICBjb25zdCBnZXRTZWxlY3RlZFByb2plY3QgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIE9iamVjdC52YWx1ZXMocHJvamVjdHMpKSB7XG4gICAgICBpZiAocHJvamVjdC5pc1NlbGVjdGVkKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDsgLy9uZWVkZWQ/IGkgdGhpbmsgb25lIHByb2plY3Qgd2lsbCBhbHdheXMgYmUgc2VsZWN0ZWRcbiAgfTtcblxuICBjb25zdCBzZXRTZWxlY3RlZFByb2plY3QgPSAocHJvamVjdElEKSA9PiB7fTtcblxuICBjb25zdCBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QgPSAoaW5wdXRFbGVtZW50cykgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGdldFNlbGVjdGVkUHJvamVjdCgpO1xuICAgIGNvbnN0IHRvZG8gPSBUb2RvRmFjdG9yeShpbnB1dEVsZW1lbnRzKTtcbiAgICBzZWxlY3RlZFByb2plY3QuYWRkVG9kbyh0b2RvKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gIH07XG5cbiAgY29uc3Qgc2VuZFByb2plY3RzID0gKCkgPT4ge307IC8vc2VuZCBwcm9qZWN0cyB0byBiZSByZW5kZXJlZCBpbiBzaWRlLWJhclxuXG4gIGNvbnN0IG1ldGhvZHMgPSB7XG4gICAgYWRkUHJvamVjdCxcbiAgICBkZWxldGVQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzLCAvL3Nob3VsZCBiZSBwcml2YXRlLCBjcmVhdGUgbWV0aG9kcyBmb3IgZ2V0dGluZyBpdCBpbnN0ZWFkXG4gICAgbWV0aG9kcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RNYW5hZ2VyO1xuIiwiZnVuY3Rpb24gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cykge1xuICByZXR1cm4gaW5wdXRFbGVtZW50cy5yZWR1Y2UoXG4gICAgKHRvZG9PYmosIGl0ZW0pID0+XG4gICAgICBpdGVtLnZhbHVlID8geyAuLi50b2RvT2JqLCBbaXRlbS5pZF06IGl0ZW0udmFsdWUgfSA6IHJlc3VsdE9iaixcbiAgICB7fVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvRmFjdG9yeTtcblxuLyogbG9vcHMgdGhyb3VnaCBlYWNoIGtleSBpbiBhcmd1bWVudG9iaiAqL1xuLyogcmV0dXJucyB7fSB3aXRoIGtleTp2YWx1ZSBwYWlycyovXG4vKiB0aXRsZSAqL1xuLyogZGVzY3JpcHRpb24gKi9cbi8qIGR1ZURhdGUgKi9cbi8qIHByaW9yaXR5ICovXG4vKiBub3RlcyAqL1xuLyogY2hlY2tsaXN0IChzdWIgc3RlcHMpICovXG4vKiBtYXliZSBhZGQgbWV0aG9kcyB0byB0aGUgb2JqZWN0cyBhcyB3ZWxsPyAqL1xuIiwiY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC1wcm9qZWN0LWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcm9qZWN0Rm9ybTtcbiIsImNvbnN0IGNyZWF0ZVRvZG9Gb3JtID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb246IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVG9kb0Zvcm07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IGxvZyA9IGNvbnNvbGUubG9nO1xuaW1wb3J0IEZvcm1NYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvRm9ybU1hbmFnZXIuanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5sb2coUHJvamVjdE1hbmFnZXIpO1xuUHJvamVjdE1hbmFnZXIubWV0aG9kcy5hZGRQcm9qZWN0KFwiUGFpbnQgQmVkcm9vbVwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==