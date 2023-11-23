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
let projectIDCounter = 0;

const sharedMethods = {
  getTodos: function () {
    return this.todos;
  },

  addTodo: function (todo) {
    this.todos.push(todo);
  },

  deleteTodo: function (todoID) {
    this.todos.forEach((todo, index) => {
      if (todo.todoID === todoID) {
        this.todos.splice(index, 1);
      }
    });
  },

  toggleSelected: function () {
    this.isSelected = !this.isSelected;
  },
};

function ProjectFactory(projectTitle) {
  const project = {
    title: projectTitle,
    projectID: projectIDCounter,
    isSelected: false,
    todos: [],
  };

  //use object.setPrototypeOf to assign methods to protoype, to avoid duplication
  Object.setPrototypeOf(project, sharedMethods);

  projectIDCounter++;
  return project;
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
  const projects = [];
  let currSelectedProj;

  const addProject = (projectTitle) => {
    const project = (0,_ProjectFactory_js__WEBPACK_IMPORTED_MODULE_1__["default"])(projectTitle);
    projects.push(project);
  };

  const deleteProject = (projectID) => {
    projects.forEach((project, index) => {
      if (project.projectID === projectID) {
        projects.splice(index, 1);
      }
    });
    /* alt version could use filter and reassign to projects var. */
  };

  const getProjects = () => projects;

  const getCurrSelectedProjectTodos = () => {
    return currSelectedProj.getTodos();
  };

  const setSelectedProject = (projectID) => {
    console.log(currSelectedProj);
    deselectCurrProject();
    console.log(currSelectedProj);
    projects.forEach((project) => {
      if (project.projectID === projectID) {
        currSelectedProj = project;
        currSelectedProj.toggleSelected();
        console.log(currSelectedProj);
        return;
      }
    });
  };

  const deselectCurrProject = () => currSelectedProj?.toggleSelected();

  const addTodoToSelectedProject = (inputElements) => {
    console.log("selected project is: ", currSelectedProj);
    const todo = (0,_TodoFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(inputElements);
    currSelectedProj.addTodo(todo);
    console.log(projects);
  };

  const deleteTodoFromSelectedProject = (todoID) => {
    currSelectedProj.deleteTodo(todoID);
  };

  return {
    addProject,
    deleteProject,
    getProjects,
    getCurrSelectedProjectTodos,
    setSelectedProject,
    addTodoToSelectedProject,
    deleteTodoFromSelectedProject,
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
let todoIDCounter = 0;

function TodoFactory(inputElements) {
  const todo = {};
  todo.todoID = todoIDCounter;

  let val = 0;
  inputElements.forEach((element) => {
    todo[val] = element;
    val++;
  });

  todoIDCounter++;
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

/***/ "./src/modules/TodoUIManager.js":
/*!**************************************!*\
  !*** ./src/modules/TodoUIManager.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectManager.js */ "./src/modules/ProjectManager.js");

/* responsible for adding and inserting projects & todos into the dom etc. */

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  const populateList = (whatContent, whichList) => {
    let content;
    if (whatContent === "projects") {
      content = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects();
    } else if (whatContent === "todos") {
      content = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrSelectedProjectTodos();
    }
    console.log(content); /* 
    projects.forEach((val) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = val;
      li.appendChild(button);

      projectsList.appendChild(li);
    }); */
  };

  return {
    populateList,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoUIManager);


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
/* harmony import */ var _modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/TodoUIManager.js */ "./src/modules/TodoUIManager.js");
const log = console.log;



log(_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("skate");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("bike");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("glasses");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(1);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject(["buy skateboard", "at darbys skates"]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(0);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject(["sell bike", "at darbys skates"]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject([
  "use bike money",
  "to purchase cookies",
]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(2);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTodoFromSelectedProject(1);
log(_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateList("todos");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ21EO0FBQ007QUFDRjtBQUN2RCxJQUFJLGtFQUFjO0FBQ2xCLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxrRUFBYztBQUNkLGtFQUFjO0FBQ2QsSUFBSSxrRUFBYztBQUNsQixpRUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Gb3JtTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlUHJvamVjdEZvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvZG9Gb3JtLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIEhhbmRsZXMgYWxsIGZvcm0gZGF0YSwgc3VibWl0dGluZyBhbmQgc2VuZGluZyB0aGF0IGRhdGEgdG8gb3RoZXIgbW9kdWxlcyovXG4vKiBnZXRzIGhvbGQgb2Ygc3VibWl0dGVkIGZvcm0gZGF0YSAqL1xuaW1wb3J0IGNyZWF0ZVRvZG9Gb3JtIGZyb20gXCIuL2NyZWF0ZVRvZG9Gb3JtLmpzXCI7XG5pbXBvcnQgY3JlYXRlUHJvamVjdEZvcm0gZnJvbSBcIi4vY3JlYXRlUHJvamVjdEZvcm0uanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuXG5jb25zdCBGb3JtTWFuYWdlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZU5ld1RvZG9CdG4gPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy10b2RvXCIpOyAvKiB0ZW1wICovXG4gIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiI2NyZWF0ZS1uZXctcHJvamVjdFwiXG4gICk7IC8qIHRlbXAgKi9cbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTsgLyogdGVtcCAqL1xuICBsZXQgYWRkVG9kb0Zvcm07IC8qIG5lZWRlZD8gKi9cbiAgbGV0IGFkZFByb2plY3RGb3JtOyAvKiBuZWVkZWQ/ICovXG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8qIG1ha2UgYWxsIHRoaXMgaW50byBzZXAuIGZ1bmN0aW9uICovXG4gICAgICBQcm9qZWN0TWFuYWdlci5tZXRob2RzLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdChnZXRJbnB1dEVsZW1lbnRzKGZvcm0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy9hdG0gYWRkcyBtdWx0aXBsZSBpZGVudGljYWwgZXZlbnRsaXN0ZW5lcnMgaWYgY2xpY2tlZCBtdWx0aXBsZSB0aW1lc1xuICAgIC8vbWFrZSBpbnRvIHNpbmdsZSBmdW5jdGlvblxuICAgIC8vYWRkIGd1YXJkIGNsYXVzZSBpbmNhc2UgZm9ybSBpcyBhbHJlYWR5IHByZXNlbnRcbiAgICBjb250ZW50LmlubmVySFRNTCA9IGNyZWF0ZVRvZG9Gb3JtKCk7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRvZG8tZm9ybVwiKTsgLy90ZW1wIGhhcmRjb2RlZCB2YWxcbiAgICBjb25zb2xlLmxvZyhmb3JtKTtcbiAgICBpbml0aWFsaXplRm9ybShmb3JtKTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICByZXR1cm4ge1xuICAgIGdldElucHV0RWxlbWVudHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcblxuLyogY3JlYXRlTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vYXRtIGFkZHMgbXVsdGlwbGUgaWRlbnRpY2FsIGV2ZW50bGlzdGVuZXJzIGlmIGNsaWNrZWQgbXVsdGlwbGUgdGltZXNcbiAgICAvL21ha2UgaW50byBzaW5nbGUgZnVuY3Rpb25cbiAgICBjb250ZW50LmlubmVySFRNTCA9IGNyZWF0ZVByb2plY3RGb3JtKCk7XG4gICAgY29uc29sZS5sb2coY29udGVudCk7XG4gICAgaW5pdGlhbGl6ZUZvcm0oY29udGVudC5pZCk7XG4gIH0pOyAqL1xuIiwibGV0IHByb2plY3RJRENvdW50ZXIgPSAwO1xuXG5jb25zdCBzaGFyZWRNZXRob2RzID0ge1xuICBnZXRUb2RvczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9LFxuXG4gIGFkZFRvZG86IGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9LFxuXG4gIGRlbGV0ZVRvZG86IGZ1bmN0aW9uICh0b2RvSUQpIHtcbiAgICB0aGlzLnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICBpZiAodG9kby50b2RvSUQgPT09IHRvZG9JRCkge1xuICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgdG9nZ2xlU2VsZWN0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlzU2VsZWN0ZWQgPSAhdGhpcy5pc1NlbGVjdGVkO1xuICB9LFxufTtcblxuZnVuY3Rpb24gUHJvamVjdEZhY3RvcnkocHJvamVjdFRpdGxlKSB7XG4gIGNvbnN0IHByb2plY3QgPSB7XG4gICAgdGl0bGU6IHByb2plY3RUaXRsZSxcbiAgICBwcm9qZWN0SUQ6IHByb2plY3RJRENvdW50ZXIsXG4gICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgdG9kb3M6IFtdLFxuICB9O1xuXG4gIC8vdXNlIG9iamVjdC5zZXRQcm90b3R5cGVPZiB0byBhc3NpZ24gbWV0aG9kcyB0byBwcm90b3lwZSwgdG8gYXZvaWQgZHVwbGljYXRpb25cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb2plY3QsIHNoYXJlZE1ldGhvZHMpO1xuXG4gIHByb2plY3RJRENvdW50ZXIrKztcbiAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RGYWN0b3J5O1xuIiwiaW1wb3J0IFRvZG9GYWN0b3J5IGZyb20gXCIuL1RvZG9GYWN0b3J5LmpzXCI7XG5pbXBvcnQgUHJvamVjdEZhY3RvcnkgZnJvbSBcIi4vUHJvamVjdEZhY3RvcnkuanNcIjtcblxuY29uc3QgUHJvamVjdE1hbmFnZXIgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuICBsZXQgY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0RmFjdG9yeShwcm9qZWN0VGl0bGUpO1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QucHJvamVjdElEID09PSBwcm9qZWN0SUQpIHtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKiBhbHQgdmVyc2lvbiBjb3VsZCB1c2UgZmlsdGVyIGFuZCByZWFzc2lnbiB0byBwcm9qZWN0cyB2YXIuICovXG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICBjb25zdCBnZXRDdXJyU2VsZWN0ZWRQcm9qZWN0VG9kb3MgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGN1cnJTZWxlY3RlZFByb2ouZ2V0VG9kb3MoKTtcbiAgfTtcblxuICBjb25zdCBzZXRTZWxlY3RlZFByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgY29uc29sZS5sb2coY3VyclNlbGVjdGVkUHJvaik7XG4gICAgZGVzZWxlY3RDdXJyUHJvamVjdCgpO1xuICAgIGNvbnNvbGUubG9nKGN1cnJTZWxlY3RlZFByb2opO1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LnByb2plY3RJRCA9PT0gcHJvamVjdElEKSB7XG4gICAgICAgIGN1cnJTZWxlY3RlZFByb2ogPSBwcm9qZWN0O1xuICAgICAgICBjdXJyU2VsZWN0ZWRQcm9qLnRvZ2dsZVNlbGVjdGVkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJTZWxlY3RlZFByb2opO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZGVzZWxlY3RDdXJyUHJvamVjdCA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2o/LnRvZ2dsZVNlbGVjdGVkKCk7XG5cbiAgY29uc3QgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0ID0gKGlucHV0RWxlbWVudHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHByb2plY3QgaXM6IFwiLCBjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICBjb25zdCB0b2RvID0gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cyk7XG4gICAgY3VyclNlbGVjdGVkUHJvai5hZGRUb2RvKHRvZG8pO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVUb2RvRnJvbVNlbGVjdGVkUHJvamVjdCA9ICh0b2RvSUQpID0+IHtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLmRlbGV0ZVRvZG8odG9kb0lEKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBnZXRDdXJyU2VsZWN0ZWRQcm9qZWN0VG9kb3MsXG4gICAgc2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCxcbiAgICBkZWxldGVUb2RvRnJvbVNlbGVjdGVkUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RNYW5hZ2VyO1xuIiwibGV0IHRvZG9JRENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBUb2RvRmFjdG9yeShpbnB1dEVsZW1lbnRzKSB7XG4gIGNvbnN0IHRvZG8gPSB7fTtcbiAgdG9kby50b2RvSUQgPSB0b2RvSURDb3VudGVyO1xuXG4gIGxldCB2YWwgPSAwO1xuICBpbnB1dEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICB0b2RvW3ZhbF0gPSBlbGVtZW50O1xuICAgIHZhbCsrO1xuICB9KTtcblxuICB0b2RvSURDb3VudGVyKys7XG4gIHJldHVybiB0b2RvO1xuICAvKiByZXR1cm4gaW5wdXRFbGVtZW50cy5yZWR1Y2UoXG4gICAgKHRvZG9PYmosIGl0ZW0pID0+XG4gICAgICBpdGVtLnZhbHVlID8geyAuLi50b2RvT2JqLCBbaXRlbS5pZF06IGl0ZW0udmFsdWUgfSA6IHRvZG9PYmosXG4gICAge31cbiAgKTsgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0ZhY3Rvcnk7XG5cbi8qIGxvb3BzIHRocm91Z2ggZWFjaCBrZXkgaW4gYXJndW1lbnRvYmogKi9cbi8qIHJldHVybnMge30gd2l0aCBrZXk6dmFsdWUgcGFpcnMqL1xuLyogdGl0bGUgKi9cbi8qIGRlc2NyaXB0aW9uICovXG4vKiBkdWVEYXRlICovXG4vKiBwcmlvcml0eSAqL1xuLyogbm90ZXMgKi9cbi8qIGNoZWNrbGlzdCAoc3ViIHN0ZXBzKSAqL1xuLyogbWF5YmUgYWRkIG1ldGhvZHMgdG8gdGhlIG9iamVjdHMgYXMgd2VsbD8gKi9cbiIsImltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuLyogcmVzcG9uc2libGUgZm9yIGFkZGluZyBhbmQgaW5zZXJ0aW5nIHByb2plY3RzICYgdG9kb3MgaW50byB0aGUgZG9tIGV0Yy4gKi9cblxuY29uc3QgVG9kb1VJTWFuYWdlciA9ICgoKSA9PiB7XG4gIC8qIHJlZmVyZW5jZXMgKi9cbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1saXN0XCIpO1xuICBjb25zdCBjdXJyUHJvamVjdFRvZG9zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3Vyci1wcm9qZWN0LXRvZG9zXCIpO1xuXG4gIGNvbnN0IHBvcHVsYXRlTGlzdCA9ICh3aGF0Q29udGVudCwgd2hpY2hMaXN0KSA9PiB7XG4gICAgbGV0IGNvbnRlbnQ7XG4gICAgaWYgKHdoYXRDb250ZW50ID09PSBcInByb2plY3RzXCIpIHtcbiAgICAgIGNvbnRlbnQgPSBQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpO1xuICAgIH0gZWxzZSBpZiAod2hhdENvbnRlbnQgPT09IFwidG9kb3NcIikge1xuICAgICAgY29udGVudCA9IFByb2plY3RNYW5hZ2VyLmdldEN1cnJTZWxlY3RlZFByb2plY3RUb2RvcygpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhjb250ZW50KTsgLyogXG4gICAgcHJvamVjdHMuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSB2YWw7XG4gICAgICBsaS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pOyAqL1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcG9wdWxhdGVMaXN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb1VJTWFuYWdlcjtcbiIsImNvbnN0IGNyZWF0ZVByb2plY3RGb3JtID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtcHJvamVjdC1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUHJvamVjdEZvcm07XG4iLCJjb25zdCBjcmVhdGVUb2RvRm9ybSA9ICgpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXRvZG8tZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiAvPlxuICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVRvZG9Gb3JtO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBsb2cgPSBjb25zb2xlLmxvZztcbmltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5sb2coUHJvamVjdE1hbmFnZXIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdChcInNrYXRlXCIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdChcImJpa2VcIik7XG5Qcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KFwiZ2xhc3Nlc1wiKTtcblByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgxKTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdChbXCJidXkgc2thdGVib2FyZFwiLCBcImF0IGRhcmJ5cyBza2F0ZXNcIl0pO1xuUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KDApO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KFtcInNlbGwgYmlrZVwiLCBcImF0IGRhcmJ5cyBza2F0ZXNcIl0pO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KFtcbiAgXCJ1c2UgYmlrZSBtb25leVwiLFxuICBcInRvIHB1cmNoYXNlIGNvb2tpZXNcIixcbl0pO1xuUHJvamVjdE1hbmFnZXIuZGVsZXRlUHJvamVjdCgyKTtcblByb2plY3RNYW5hZ2VyLmRlbGV0ZVRvZG9Gcm9tU2VsZWN0ZWRQcm9qZWN0KDEpO1xubG9nKFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCkpO1xuVG9kb1VJTWFuYWdlci5wb3B1bGF0ZUxpc3QoXCJ0b2Rvc1wiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==