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

  const populateList = (whatContent) => {
    let content;
    let list;
    if (whatContent === "projects") {
      content = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects();
      list = projectsList;
    } else if (whatContent === "todos") {
      content = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrSelectedProjectTodos();
      list = currProjectTodosList;
    }

    console.log(content, list);
    content.forEach((val) => {
      /* put this in sep util function */
      const li = document.createElement("li");
      /* const button = document.createElement("button"); */
      for (const [key, value] of Object.entries(val)) {
        console.log(key + ": " + value);
        if (key === "title") {
          const h1 = document.createElement("h1");
          h1.textContent = value;
          console.log(h1);
          li.appendChild(h1);
        }
      }

      list.appendChild(li);
    });
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
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("Refurnish Home");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("Paint Walls");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject("test");
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(1);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject(["buy skateboard", "at darbys skates"]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(0);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject(["sell bike", "at darbys skates"]);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject([
  "use bike money",
  "to purchase cookies",
]);
log(_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateList("projects");
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateList("todos");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ21EO0FBQ007QUFDRjtBQUN2RCxJQUFJLGtFQUFjO0FBQ2xCLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtFQUFjO0FBQ2xCLGlFQUFhO0FBQ2IsaUVBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvRm9ybU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9VSU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVByb2plY3RGb3JtLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVUb2RvRm9ybS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBIYW5kbGVzIGFsbCBmb3JtIGRhdGEsIHN1Ym1pdHRpbmcgYW5kIHNlbmRpbmcgdGhhdCBkYXRhIHRvIG90aGVyIG1vZHVsZXMqL1xuLyogZ2V0cyBob2xkIG9mIHN1Ym1pdHRlZCBmb3JtIGRhdGEgKi9cbmltcG9ydCBjcmVhdGVUb2RvRm9ybSBmcm9tIFwiLi9jcmVhdGVUb2RvRm9ybS5qc1wiO1xuaW1wb3J0IGNyZWF0ZVByb2plY3RGb3JtIGZyb20gXCIuL2NyZWF0ZVByb2plY3RGb3JtLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcblxuY29uc3QgRm9ybU1hbmFnZXIgPSAoKCkgPT4ge1xuICBjb25zdCBjcmVhdGVOZXdUb2RvQnRuID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctdG9kb1wiKTsgLyogdGVtcCAqL1xuICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIiNjcmVhdGUtbmV3LXByb2plY3RcIlxuICApOyAvKiB0ZW1wICovXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7IC8qIHRlbXAgKi9cbiAgbGV0IGFkZFRvZG9Gb3JtOyAvKiBuZWVkZWQ/ICovXG4gIGxldCBhZGRQcm9qZWN0Rm9ybTsgLyogbmVlZGVkPyAqL1xuXG4gIGNvbnN0IGluaXRpYWxpemVGb3JtID0gKGZvcm0pID0+IHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvKiBtYWtlIGFsbCB0aGlzIGludG8gc2VwLiBmdW5jdGlvbiAqL1xuICAgICAgUHJvamVjdE1hbmFnZXIubWV0aG9kcy5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3QoZ2V0SW5wdXRFbGVtZW50cyhmb3JtKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY3JlYXRlTmV3VG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vYXRtIGFkZHMgbXVsdGlwbGUgaWRlbnRpY2FsIGV2ZW50bGlzdGVuZXJzIGlmIGNsaWNrZWQgbXVsdGlwbGUgdGltZXNcbiAgICAvL21ha2UgaW50byBzaW5nbGUgZnVuY3Rpb25cbiAgICAvL2FkZCBndWFyZCBjbGF1c2UgaW5jYXNlIGZvcm0gaXMgYWxyZWFkeSBwcmVzZW50XG4gICAgY29udGVudC5pbm5lckhUTUwgPSBjcmVhdGVUb2RvRm9ybSgpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10b2RvLWZvcm1cIik7IC8vdGVtcCBoYXJkY29kZWQgdmFsXG4gICAgY29uc29sZS5sb2coZm9ybSk7XG4gICAgaW5pdGlhbGl6ZUZvcm0oZm9ybSk7XG4gIH0pO1xuXG4gIGNvbnN0IGdldElucHV0RWxlbWVudHMgPSAoZm9ybSkgPT5cbiAgICBbLi4uZm9ybS5lbGVtZW50c10uZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRhZ05hbWUgPT09IFwiSU5QVVRcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRJbnB1dEVsZW1lbnRzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRm9ybU1hbmFnZXI7XG5cbi8qIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvL2F0bSBhZGRzIG11bHRpcGxlIGlkZW50aWNhbCBldmVudGxpc3RlbmVycyBpZiBjbGlja2VkIG11bHRpcGxlIHRpbWVzXG4gICAgLy9tYWtlIGludG8gc2luZ2xlIGZ1bmN0aW9uXG4gICAgY29udGVudC5pbm5lckhUTUwgPSBjcmVhdGVQcm9qZWN0Rm9ybSgpO1xuICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xuICAgIGluaXRpYWxpemVGb3JtKGNvbnRlbnQuaWQpO1xuICB9KTsgKi9cbiIsImxldCBwcm9qZWN0SURDb3VudGVyID0gMDtcblxuY29uc3Qgc2hhcmVkTWV0aG9kcyA9IHtcbiAgZ2V0VG9kb3M6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfSxcblxuICBhZGRUb2RvOiBmdW5jdGlvbiAodG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfSxcblxuICBkZWxldGVUb2RvOiBmdW5jdGlvbiAodG9kb0lEKSB7XG4gICAgdGhpcy50b2Rvcy5mb3JFYWNoKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRvZG8udG9kb0lEID09PSB0b2RvSUQpIHtcbiAgICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIHRvZ2dsZVNlbGVjdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pc1NlbGVjdGVkID0gIXRoaXMuaXNTZWxlY3RlZDtcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KHByb2plY3RUaXRsZSkge1xuICBjb25zdCBwcm9qZWN0ID0ge1xuICAgIHRpdGxlOiBwcm9qZWN0VGl0bGUsXG4gICAgcHJvamVjdElEOiBwcm9qZWN0SURDb3VudGVyLFxuICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgIHRvZG9zOiBbXSxcbiAgfTtcblxuICAvL3VzZSBvYmplY3Quc2V0UHJvdG90eXBlT2YgdG8gYXNzaWduIG1ldGhvZHMgdG8gcHJvdG95cGUsIHRvIGF2b2lkIGR1cGxpY2F0aW9uXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihwcm9qZWN0LCBzaGFyZWRNZXRob2RzKTtcblxuICBwcm9qZWN0SURDb3VudGVyKys7XG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcbiIsImltcG9ydCBUb2RvRmFjdG9yeSBmcm9tIFwiLi9Ub2RvRmFjdG9yeS5qc1wiO1xuaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFByb2plY3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgbGV0IGN1cnJTZWxlY3RlZFByb2o7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0VGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdEZhY3RvcnkocHJvamVjdFRpdGxlKTtcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LnByb2plY3RJRCA9PT0gcHJvamVjdElEKSB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyogYWx0IHZlcnNpb24gY291bGQgdXNlIGZpbHRlciBhbmQgcmVhc3NpZ24gdG8gcHJvamVjdHMgdmFyLiAqL1xuICB9O1xuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgY29uc3QgZ2V0Q3VyclNlbGVjdGVkUHJvamVjdFRvZG9zID0gKCkgPT4ge1xuICAgIHJldHVybiBjdXJyU2VsZWN0ZWRQcm9qLmdldFRvZG9zKCk7XG4gIH07XG5cbiAgY29uc3Qgc2V0U2VsZWN0ZWRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGN1cnJTZWxlY3RlZFByb2opO1xuICAgIGRlc2VsZWN0Q3VyclByb2plY3QoKTtcbiAgICBjb25zb2xlLmxvZyhjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5wcm9qZWN0SUQgPT09IHByb2plY3RJRCkge1xuICAgICAgICBjdXJyU2VsZWN0ZWRQcm9qID0gcHJvamVjdDtcbiAgICAgICAgY3VyclNlbGVjdGVkUHJvai50b2dnbGVTZWxlY3RlZCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRlc2VsZWN0Q3VyclByb2plY3QgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qPy50b2dnbGVTZWxlY3RlZCgpO1xuXG4gIGNvbnN0IGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCA9IChpbnB1dEVsZW1lbnRzKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBwcm9qZWN0IGlzOiBcIiwgY3VyclNlbGVjdGVkUHJvaik7XG4gICAgY29uc3QgdG9kbyA9IFRvZG9GYWN0b3J5KGlucHV0RWxlbWVudHMpO1xuICAgIGN1cnJTZWxlY3RlZFByb2ouYWRkVG9kbyh0b2RvKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlVG9kb0Zyb21TZWxlY3RlZFByb2plY3QgPSAodG9kb0lEKSA9PiB7XG4gICAgY3VyclNlbGVjdGVkUHJvai5kZWxldGVUb2RvKHRvZG9JRCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZ2V0Q3VyclNlbGVjdGVkUHJvamVjdFRvZG9zLFxuICAgIHNldFNlbGVjdGVkUHJvamVjdCxcbiAgICBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QsXG4gICAgZGVsZXRlVG9kb0Zyb21TZWxlY3RlZFByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TWFuYWdlcjtcbiIsImxldCB0b2RvSURDb3VudGVyID0gMDtcblxuZnVuY3Rpb24gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cykge1xuICBjb25zdCB0b2RvID0ge307XG4gIHRvZG8udG9kb0lEID0gdG9kb0lEQ291bnRlcjtcblxuICBsZXQgdmFsID0gMDtcbiAgaW5wdXRFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgdG9kb1t2YWxdID0gZWxlbWVudDtcbiAgICB2YWwrKztcbiAgfSk7XG5cbiAgdG9kb0lEQ291bnRlcisrO1xuICByZXR1cm4gdG9kbztcbiAgLyogcmV0dXJuIGlucHV0RWxlbWVudHMucmVkdWNlKFxuICAgICh0b2RvT2JqLCBpdGVtKSA9PlxuICAgICAgaXRlbS52YWx1ZSA/IHsgLi4udG9kb09iaiwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiB0b2RvT2JqLFxuICAgIHt9XG4gICk7ICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuXG4vKiBsb29wcyB0aHJvdWdoIGVhY2gga2V5IGluIGFyZ3VtZW50b2JqICovXG4vKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbi8qIHRpdGxlICovXG4vKiBkZXNjcmlwdGlvbiAqL1xuLyogZHVlRGF0ZSAqL1xuLyogcHJpb3JpdHkgKi9cbi8qIG5vdGVzICovXG4vKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbi8qIG1heWJlIGFkZCBtZXRob2RzIHRvIHRoZSBvYmplY3RzIGFzIHdlbGw/ICovXG4iLCJpbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcbi8qIHJlc3BvbnNpYmxlIGZvciBhZGRpbmcgYW5kIGluc2VydGluZyBwcm9qZWN0cyAmIHRvZG9zIGludG8gdGhlIGRvbSBldGMuICovXG5cbmNvbnN0IFRvZG9VSU1hbmFnZXIgPSAoKCkgPT4ge1xuICAvKiByZWZlcmVuY2VzICovXG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtbGlzdFwiKTtcbiAgY29uc3QgY3VyclByb2plY3RUb2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnItcHJvamVjdC10b2Rvc1wiKTtcblxuICBjb25zdCBwb3B1bGF0ZUxpc3QgPSAod2hhdENvbnRlbnQpID0+IHtcbiAgICBsZXQgY29udGVudDtcbiAgICBsZXQgbGlzdDtcbiAgICBpZiAod2hhdENvbnRlbnQgPT09IFwicHJvamVjdHNcIikge1xuICAgICAgY29udGVudCA9IFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCk7XG4gICAgICBsaXN0ID0gcHJvamVjdHNMaXN0O1xuICAgIH0gZWxzZSBpZiAod2hhdENvbnRlbnQgPT09IFwidG9kb3NcIikge1xuICAgICAgY29udGVudCA9IFByb2plY3RNYW5hZ2VyLmdldEN1cnJTZWxlY3RlZFByb2plY3RUb2RvcygpO1xuICAgICAgbGlzdCA9IGN1cnJQcm9qZWN0VG9kb3NMaXN0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGNvbnRlbnQsIGxpc3QpO1xuICAgIGNvbnRlbnQuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAvKiBwdXQgdGhpcyBpbiBzZXAgdXRpbCBmdW5jdGlvbiAqL1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAvKiBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpOyAqL1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModmFsKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB2YWx1ZSk7XG4gICAgICAgIGlmIChrZXkgPT09IFwidGl0bGVcIikge1xuICAgICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgIGgxLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgY29uc29sZS5sb2coaDEpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBvcHVsYXRlTGlzdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9VSU1hbmFnZXI7XG4iLCJjb25zdCBjcmVhdGVQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXByb2plY3QtZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb2plY3RGb3JtO1xuIiwiY29uc3QgY3JlYXRlVG9kb0Zvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC10b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUb2RvRm9ybTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qc1wiO1xubG9nKFByb2plY3RNYW5hZ2VyKTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoXCJSZWZ1cm5pc2ggSG9tZVwiKTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoXCJQYWludCBXYWxsc1wiKTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoXCJ0ZXN0XCIpO1xuUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KDEpO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KFtcImJ1eSBza2F0ZWJvYXJkXCIsIFwiYXQgZGFyYnlzIHNrYXRlc1wiXSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMCk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3QoW1wic2VsbCBiaWtlXCIsIFwiYXQgZGFyYnlzIHNrYXRlc1wiXSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3QoW1xuICBcInVzZSBiaWtlIG1vbmV5XCIsXG4gIFwidG8gcHVyY2hhc2UgY29va2llc1wiLFxuXSk7XG5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG5Ub2RvVUlNYW5hZ2VyLnBvcHVsYXRlTGlzdChcInByb2plY3RzXCIpO1xuVG9kb1VJTWFuYWdlci5wb3B1bGF0ZUxpc3QoXCJ0b2Rvc1wiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==