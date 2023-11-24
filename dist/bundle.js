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

  const getCurrSelectedProjectTodos = () => currSelectedProj.getTodos();

  const setSelectedProject = (projectID) => {
    deselectCurrProject();
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

function TodoFactory(obj) {
  const todo = {};
  todo.todoID = todoIDCounter;

  for (const [key, value] of Object.entries(obj)) {
    todo[key] = value;
  }

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
/* harmony import */ var _populateListFromObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./populateListFromObject.js */ "./src/modules/populateListFromObject.js");


/* responsible for adding and inserting projects & todos into the dom etc. */

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  projectsList.addEventListener("click", (event) => {
    const target = event.target;
    const isListItem = target.tagName === "li" || target.closest("li");

    if (isListItem) {
      console.log(target);
      /* set h1 to title of project */
      /* get data- attr of listItem */
      /* call setSelectedProject pass data attr value */
      /* call populateTodos */
    }
  });

  const populateProjects = () => {
    const projects = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects();
    const list = projectsList;

    projects.forEach((project) => {
      console.log("id is: ", project.projectID);
      console.log({ project });
      list.appendChild((0,_populateListFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project));
    });
  };

  const populateTodos = (projectID) => {
    const selectedProjectTodos = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrSelectedProjectTodos();
    const list = currProjectTodosList;

    console.log(selectedProjectTodos, list);
    selectedProjectTodos.forEach((project) => {
      list.appendChild((0,_populateListFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project));
    });
  };

  return {
    populateProjects,
    populateTodos,
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


/***/ }),

/***/ "./src/modules/populateListFromObject.js":
/*!***********************************************!*\
  !*** ./src/modules/populateListFromObject.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createElement = (type = "div", classname = "") => {
  const ele = document.createElement(type);
  if (classname) ele.classList.add(classname);
  return ele;
};

const getObjectIDAndTag = (object) => {
  const key1 = "projectID";
  const key2 = "todoID";
  const objID = object.hasOwnProperty(key1)
    ? object.projectID
    : object.hasOwnProperty(key2)
    ? object.todoID
    : null;

  const idTag = object.hasOwnProperty(key1)
    ? "project"
    : object.hasOwnProperty(key2)
    ? "todo"
    : null;

  return [objID, idTag];
};

function populateListFromObject(object) {
  const [objID, idTag] = getObjectIDAndTag(object);

  const li = createElement("li");
  li.dataset[idTag] = objID;

  for (const [key, value] of Object.entries(object)) {
    /* console.log(key + ": " + value); */

    /* const button = document.createElement("button"); */
    if (key === "title") {
      const heading = createElement("h3");
      heading.textContent = value;
      li.appendChild(heading);
    }

    if (key === "description") {
      const p = createElement("p");
      p.textContent = value;
      li.appendChild(p);
    }
  }
  return li;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (populateListFromObject);


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
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(0);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject({
  title: "move sofa",
  description: "lift dont drag",
});
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject({
  title: "move table",
  description: "drag it roughly",
});
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(1);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject({
  title: "buy paint",
  description: "mix it well before applying",
});
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToSelectedProject({
  title: "buy brush",
});
log(_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateProjects("projects");
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateTodos("todos");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDOztBQUV4Qyx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLHNCQUFzQixFQUFDOzs7Ozs7O1VDakR0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNtRDtBQUNNO0FBQ0Y7QUFDdkQsSUFBSSxrRUFBYztBQUNsQixrRUFBYztBQUNkLGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Q7QUFDQSxDQUFDO0FBQ0QsSUFBSSxrRUFBYztBQUNsQixpRUFBYTtBQUNiLGlFQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9GYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVQcm9qZWN0Rm9ybS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlVG9kb0Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3BvcHVsYXRlTGlzdEZyb21PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogSGFuZGxlcyBhbGwgZm9ybSBkYXRhLCBzdWJtaXR0aW5nIGFuZCBzZW5kaW5nIHRoYXQgZGF0YSB0byBvdGhlciBtb2R1bGVzKi9cbi8qIGdldHMgaG9sZCBvZiBzdWJtaXR0ZWQgZm9ybSBkYXRhICovXG5pbXBvcnQgY3JlYXRlVG9kb0Zvcm0gZnJvbSBcIi4vY3JlYXRlVG9kb0Zvcm0uanNcIjtcbmltcG9ydCBjcmVhdGVQcm9qZWN0Rm9ybSBmcm9tIFwiLi9jcmVhdGVQcm9qZWN0Rm9ybS5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5cbmNvbnN0IEZvcm1NYW5hZ2VyID0gKCgpID0+IHtcbiAgY29uc3QgY3JlYXRlTmV3VG9kb0J0biA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXRvZG9cIik7IC8qIHRlbXAgKi9cbiAgY29uc3QgY3JlYXRlTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIjY3JlYXRlLW5ldy1wcm9qZWN0XCJcbiAgKTsgLyogdGVtcCAqL1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpOyAvKiB0ZW1wICovXG4gIGxldCBhZGRUb2RvRm9ybTsgLyogbmVlZGVkPyAqL1xuICBsZXQgYWRkUHJvamVjdEZvcm07IC8qIG5lZWRlZD8gKi9cblxuICBjb25zdCBpbml0aWFsaXplRm9ybSA9IChmb3JtKSA9PiB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLyogbWFrZSBhbGwgdGhpcyBpbnRvIHNlcC4gZnVuY3Rpb24gKi9cbiAgICAgIFByb2plY3RNYW5hZ2VyLm1ldGhvZHMuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KGdldElucHV0RWxlbWVudHMoZm9ybSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNyZWF0ZU5ld1RvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvL2F0bSBhZGRzIG11bHRpcGxlIGlkZW50aWNhbCBldmVudGxpc3RlbmVycyBpZiBjbGlja2VkIG11bHRpcGxlIHRpbWVzXG4gICAgLy9tYWtlIGludG8gc2luZ2xlIGZ1bmN0aW9uXG4gICAgLy9hZGQgZ3VhcmQgY2xhdXNlIGluY2FzZSBmb3JtIGlzIGFscmVhZHkgcHJlc2VudFxuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gY3JlYXRlVG9kb0Zvcm0oKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdG9kby1mb3JtXCIpOyAvL3RlbXAgaGFyZGNvZGVkIHZhbFxuICAgIGNvbnNvbGUubG9nKGZvcm0pO1xuICAgIGluaXRpYWxpemVGb3JtKGZvcm0pO1xuICB9KTtcblxuICBjb25zdCBnZXRJbnB1dEVsZW1lbnRzID0gKGZvcm0pID0+XG4gICAgWy4uLmZvcm0uZWxlbWVudHNdLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50YWdOYW1lID09PSBcIklOUFVUXCIpO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0SW5wdXRFbGVtZW50cyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1NYW5hZ2VyO1xuXG4vKiBjcmVhdGVOZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy9hdG0gYWRkcyBtdWx0aXBsZSBpZGVudGljYWwgZXZlbnRsaXN0ZW5lcnMgaWYgY2xpY2tlZCBtdWx0aXBsZSB0aW1lc1xuICAgIC8vbWFrZSBpbnRvIHNpbmdsZSBmdW5jdGlvblxuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gY3JlYXRlUHJvamVjdEZvcm0oKTtcbiAgICBjb25zb2xlLmxvZyhjb250ZW50KTtcbiAgICBpbml0aWFsaXplRm9ybShjb250ZW50LmlkKTtcbiAgfSk7ICovXG4iLCJsZXQgcHJvamVjdElEQ291bnRlciA9IDA7XG5cbmNvbnN0IHNoYXJlZE1ldGhvZHMgPSB7XG4gIGdldFRvZG9zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH0sXG5cbiAgYWRkVG9kbzogZnVuY3Rpb24gKHRvZG8pIHtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gIH0sXG5cbiAgZGVsZXRlVG9kbzogZnVuY3Rpb24gKHRvZG9JRCkge1xuICAgIHRoaXMudG9kb3MuZm9yRWFjaCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0b2RvLnRvZG9JRCA9PT0gdG9kb0lEKSB7XG4gICAgICAgIHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICB0b2dnbGVTZWxlY3RlZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNTZWxlY3RlZCA9ICF0aGlzLmlzU2VsZWN0ZWQ7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBQcm9qZWN0RmFjdG9yeShwcm9qZWN0VGl0bGUpIHtcbiAgY29uc3QgcHJvamVjdCA9IHtcbiAgICB0aXRsZTogcHJvamVjdFRpdGxlLFxuICAgIHByb2plY3RJRDogcHJvamVjdElEQ291bnRlcixcbiAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICB0b2RvczogW10sXG4gIH07XG5cbiAgLy91c2Ugb2JqZWN0LnNldFByb3RvdHlwZU9mIHRvIGFzc2lnbiBtZXRob2RzIHRvIHByb3RveXBlLCB0byBhdm9pZCBkdXBsaWNhdGlvblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvamVjdCwgc2hhcmVkTWV0aG9kcyk7XG5cbiAgcHJvamVjdElEQ291bnRlcisrO1xuICByZXR1cm4gcHJvamVjdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdEZhY3Rvcnk7XG4iLCJpbXBvcnQgVG9kb0ZhY3RvcnkgZnJvbSBcIi4vVG9kb0ZhY3RvcnkuanNcIjtcbmltcG9ydCBQcm9qZWN0RmFjdG9yeSBmcm9tIFwiLi9Qcm9qZWN0RmFjdG9yeS5qc1wiO1xuXG5jb25zdCBQcm9qZWN0TWFuYWdlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzID0gW107XG4gIGxldCBjdXJyU2VsZWN0ZWRQcm9qO1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3RGYWN0b3J5KHByb2plY3RUaXRsZSk7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5wcm9qZWN0SUQgPT09IHByb2plY3RJRCkge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8qIGFsdCB2ZXJzaW9uIGNvdWxkIHVzZSBmaWx0ZXIgYW5kIHJlYXNzaWduIHRvIHByb2plY3RzIHZhci4gKi9cbiAgfTtcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzO1xuXG4gIGNvbnN0IGdldEN1cnJTZWxlY3RlZFByb2plY3RUb2RvcyA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2ouZ2V0VG9kb3MoKTtcblxuICBjb25zdCBzZXRTZWxlY3RlZFByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgZGVzZWxlY3RDdXJyUHJvamVjdCgpO1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LnByb2plY3RJRCA9PT0gcHJvamVjdElEKSB7XG4gICAgICAgIGN1cnJTZWxlY3RlZFByb2ogPSBwcm9qZWN0O1xuICAgICAgICBjdXJyU2VsZWN0ZWRQcm9qLnRvZ2dsZVNlbGVjdGVkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJTZWxlY3RlZFByb2opO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZGVzZWxlY3RDdXJyUHJvamVjdCA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2o/LnRvZ2dsZVNlbGVjdGVkKCk7XG5cbiAgY29uc3QgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0ID0gKGlucHV0RWxlbWVudHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHByb2plY3QgaXM6IFwiLCBjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICBjb25zdCB0b2RvID0gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cyk7XG4gICAgY3VyclNlbGVjdGVkUHJvai5hZGRUb2RvKHRvZG8pO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVUb2RvRnJvbVNlbGVjdGVkUHJvamVjdCA9ICh0b2RvSUQpID0+IHtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLmRlbGV0ZVRvZG8odG9kb0lEKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBnZXRDdXJyU2VsZWN0ZWRQcm9qZWN0VG9kb3MsXG4gICAgc2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCxcbiAgICBkZWxldGVUb2RvRnJvbVNlbGVjdGVkUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RNYW5hZ2VyO1xuIiwibGV0IHRvZG9JRENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBUb2RvRmFjdG9yeShvYmopIHtcbiAgY29uc3QgdG9kbyA9IHt9O1xuICB0b2RvLnRvZG9JRCA9IHRvZG9JRENvdW50ZXI7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIHRvZG9ba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgdG9kb0lEQ291bnRlcisrO1xuICByZXR1cm4gdG9kbztcbiAgLyogcmV0dXJuIGlucHV0RWxlbWVudHMucmVkdWNlKFxuICAgICh0b2RvT2JqLCBpdGVtKSA9PlxuICAgICAgaXRlbS52YWx1ZSA/IHsgLi4udG9kb09iaiwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiB0b2RvT2JqLFxuICAgIHt9XG4gICk7ICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuXG4vKiBsb29wcyB0aHJvdWdoIGVhY2gga2V5IGluIGFyZ3VtZW50b2JqICovXG4vKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbi8qIHRpdGxlICovXG4vKiBkZXNjcmlwdGlvbiAqL1xuLyogZHVlRGF0ZSAqL1xuLyogcHJpb3JpdHkgKi9cbi8qIG5vdGVzICovXG4vKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbi8qIG1heWJlIGFkZCBtZXRob2RzIHRvIHRoZSBvYmplY3RzIGFzIHdlbGw/ICovXG4iLCJpbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBwb3B1bGF0ZUxpc3RGcm9tT2JqZWN0IGZyb20gXCIuL3BvcHVsYXRlTGlzdEZyb21PYmplY3QuanNcIjtcbi8qIHJlc3BvbnNpYmxlIGZvciBhZGRpbmcgYW5kIGluc2VydGluZyBwcm9qZWN0cyAmIHRvZG9zIGludG8gdGhlIGRvbSBldGMuICovXG5cbmNvbnN0IFRvZG9VSU1hbmFnZXIgPSAoKCkgPT4ge1xuICAvKiByZWZlcmVuY2VzICovXG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtbGlzdFwiKTtcbiAgY29uc3QgY3VyclByb2plY3RUb2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnItcHJvamVjdC10b2Rvc1wiKTtcblxuICBwcm9qZWN0c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBpc0xpc3RJdGVtID0gdGFyZ2V0LnRhZ05hbWUgPT09IFwibGlcIiB8fCB0YXJnZXQuY2xvc2VzdChcImxpXCIpO1xuXG4gICAgaWYgKGlzTGlzdEl0ZW0pIHtcbiAgICAgIGNvbnNvbGUubG9nKHRhcmdldCk7XG4gICAgICAvKiBzZXQgaDEgdG8gdGl0bGUgb2YgcHJvamVjdCAqL1xuICAgICAgLyogZ2V0IGRhdGEtIGF0dHIgb2YgbGlzdEl0ZW0gKi9cbiAgICAgIC8qIGNhbGwgc2V0U2VsZWN0ZWRQcm9qZWN0IHBhc3MgZGF0YSBhdHRyIHZhbHVlICovXG4gICAgICAvKiBjYWxsIHBvcHVsYXRlVG9kb3MgKi9cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHBvcHVsYXRlUHJvamVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpO1xuICAgIGNvbnN0IGxpc3QgPSBwcm9qZWN0c0xpc3Q7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImlkIGlzOiBcIiwgcHJvamVjdC5wcm9qZWN0SUQpO1xuICAgICAgY29uc29sZS5sb2coeyBwcm9qZWN0IH0pO1xuICAgICAgbGlzdC5hcHBlbmRDaGlsZChwb3B1bGF0ZUxpc3RGcm9tT2JqZWN0KHByb2plY3QpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZVRvZG9zID0gKHByb2plY3RJRCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdFRvZG9zID0gUHJvamVjdE1hbmFnZXIuZ2V0Q3VyclNlbGVjdGVkUHJvamVjdFRvZG9zKCk7XG4gICAgY29uc3QgbGlzdCA9IGN1cnJQcm9qZWN0VG9kb3NMaXN0O1xuXG4gICAgY29uc29sZS5sb2coc2VsZWN0ZWRQcm9qZWN0VG9kb3MsIGxpc3QpO1xuICAgIHNlbGVjdGVkUHJvamVjdFRvZG9zLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGxpc3QuYXBwZW5kQ2hpbGQocG9wdWxhdGVMaXN0RnJvbU9iamVjdChwcm9qZWN0KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwb3B1bGF0ZVByb2plY3RzLFxuICAgIHBvcHVsYXRlVG9kb3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvVUlNYW5hZ2VyO1xuIiwiY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC1wcm9qZWN0LWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcm9qZWN0Rm9ybTtcbiIsImNvbnN0IGNyZWF0ZVRvZG9Gb3JtID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb246IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVG9kb0Zvcm07XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUgPSBcImRpdlwiLCBjbGFzc25hbWUgPSBcIlwiKSA9PiB7XG4gIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGlmIChjbGFzc25hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSk7XG4gIHJldHVybiBlbGU7XG59O1xuXG5jb25zdCBnZXRPYmplY3RJREFuZFRhZyA9IChvYmplY3QpID0+IHtcbiAgY29uc3Qga2V5MSA9IFwicHJvamVjdElEXCI7XG4gIGNvbnN0IGtleTIgPSBcInRvZG9JRFwiO1xuICBjb25zdCBvYmpJRCA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkxKVxuICAgID8gb2JqZWN0LnByb2plY3RJRFxuICAgIDogb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTIpXG4gICAgPyBvYmplY3QudG9kb0lEXG4gICAgOiBudWxsO1xuXG4gIGNvbnN0IGlkVGFnID0gb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTEpXG4gICAgPyBcInByb2plY3RcIlxuICAgIDogb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTIpXG4gICAgPyBcInRvZG9cIlxuICAgIDogbnVsbDtcblxuICByZXR1cm4gW29iaklELCBpZFRhZ107XG59O1xuXG5mdW5jdGlvbiBwb3B1bGF0ZUxpc3RGcm9tT2JqZWN0KG9iamVjdCkge1xuICBjb25zdCBbb2JqSUQsIGlkVGFnXSA9IGdldE9iamVjdElEQW5kVGFnKG9iamVjdCk7XG5cbiAgY29uc3QgbGkgPSBjcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGxpLmRhdGFzZXRbaWRUYWddID0gb2JqSUQ7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqZWN0KSkge1xuICAgIC8qIGNvbnNvbGUubG9nKGtleSArIFwiOiBcIiArIHZhbHVlKTsgKi9cblxuICAgIC8qIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7ICovXG4gICAgaWYgKGtleSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICBjb25zdCBoZWFkaW5nID0gY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XG4gICAgICBjb25zdCBwID0gY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZUxpc3RGcm9tT2JqZWN0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBsb2cgPSBjb25zb2xlLmxvZztcbmltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5sb2coUHJvamVjdE1hbmFnZXIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdChcIlJlZnVybmlzaCBIb21lXCIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdChcIlBhaW50IFdhbGxzXCIpO1xuUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KDApO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwibW92ZSBzb2ZhXCIsXG4gIGRlc2NyaXB0aW9uOiBcImxpZnQgZG9udCBkcmFnXCIsXG59KTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcIm1vdmUgdGFibGVcIixcbiAgZGVzY3JpcHRpb246IFwiZHJhZyBpdCByb3VnaGx5XCIsXG59KTtcblByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgxKTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcImJ1eSBwYWludFwiLFxuICBkZXNjcmlwdGlvbjogXCJtaXggaXQgd2VsbCBiZWZvcmUgYXBwbHlpbmdcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwiYnV5IGJydXNoXCIsXG59KTtcbmxvZyhQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpKTtcblRvZG9VSU1hbmFnZXIucG9wdWxhdGVQcm9qZWN0cyhcInByb2plY3RzXCIpO1xuVG9kb1VJTWFuYWdlci5wb3B1bGF0ZVRvZG9zKFwidG9kb3NcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=