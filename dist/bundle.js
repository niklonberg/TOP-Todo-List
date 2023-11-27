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
/* harmony import */ var _createObjectFromForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createObjectFromForm.js */ "./src/modules/createObjectFromForm.js");
/* harmony import */ var _ProjectManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProjectManager.js */ "./src/modules/ProjectManager.js");
/* harmony import */ var _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TodoUIManager.js */ "./src/modules/TodoUIManager.js");






const FormManager = (() => {
  /* references */
  const createNewTodoBtn = document.querySelector("#create-new-todo");
  const createNewProjectBtn = document.querySelector("#create-new-project");

  const handleBtnCreateFormClick = (event) => {
    const elementToAppendFormTo = event.target.previousElementSibling;
    if (elementToAppendFormTo.querySelector("form")) return;
    const isNewProject = event.target.id.includes("project");
    let formTypeTemplate;
    isNewProject
      ? (formTypeTemplate = (0,_createProjectForm_js__WEBPACK_IMPORTED_MODULE_1__["default"])())
      : (formTypeTemplate = (0,_createTodoForm_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
    elementToAppendFormTo.insertAdjacentHTML("beforeend", formTypeTemplate);
    const form = elementToAppendFormTo.querySelector("form");
    initializeForm(form, isNewProject);
  };

  const initializeForm = (form, isNewProject) => {
    const submitHandler = (event) => {
      handleFormSubmit(event, form, isNewProject);
      form.removeEventListener("submit", submitHandler);
      form.remove();
    };

    form.addEventListener("submit", submitHandler);
  };

  const handleFormSubmit = (event, form, isNewProject) => {
    event.preventDefault();
    const object = (0,_createObjectFromForm_js__WEBPACK_IMPORTED_MODULE_2__["default"])(getInputElements(form));
    if (isNewProject) {
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(object);
      _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_4__["default"].populateProjects();
    } else {
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_3__["default"].addTodoToSelectedProject(object);
      _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_4__["default"].populateSelectGroupTodos();
    }
  };

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  createNewProjectBtn.addEventListener("click", handleBtnCreateFormClick);

  createNewTodoBtn.addEventListener("click", handleBtnCreateFormClick);
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

function ProjectFactory(object) {
  const project = {
    title: object.title,
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

  const getSelectedProject = () => currSelectedProj;

  const getSelectedProjectTodos = () => currSelectedProj.getTodos();

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
    getSelectedProject,
    getSelectedProjectTodos,
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
/* harmony import */ var _renderSelectProjTodos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderSelectProjTodos.js */ "./src/modules/renderSelectProjTodos.js");




const TodoUIManager = (() => {
  /* references */
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  let previousListGroup;

  const showSelectedGroup = (event) => {
    const listGroup = event.target.closest("li");
    if (listGroup !== previousListGroup) {
      const projectID = +listGroup.dataset.project;
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].setSelectedProject(projectID); //rename when you add the other groups
      populateSelectGroupTodos(); //'today', 'important' etc.
      previousListGroup = listGroup;
    }
  };

  const addLatest = () => {};

  const removeSelected = () => {};

  const editSelected = () => {};

  const populateProjects = () => {
    projectsList.innerHTML = ""; /* bad? */
    const projects = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects();

    projects.forEach((project) =>
      projectsList.appendChild((0,_populateListFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project))
    );
  };

  const populateSelectGroupTodos = () => {
    mainContent.innerHTML = ""; /* bad? */
    (0,_renderSelectProjTodos_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainContent, _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedProject());
    const selectedProjectTodos = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedProjectTodos();
    const currProjectTodosList = document.querySelector("#curr-project-todos");

    selectedProjectTodos.forEach((project) =>
      currProjectTodosList.appendChild((0,_populateListFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project))
    );
  };

  projectsList.addEventListener("click", showSelectedGroup);

  return {
    populateProjects,
    populateSelectGroupTodos,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoUIManager);


/***/ }),

/***/ "./src/modules/createElement.js":
/*!**************************************!*\
  !*** ./src/modules/createElement.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createElement(type = "div", classname = "", id = "") {
  const ele = document.createElement(type);
  if (classname) ele.classList.add(classname);
  if (id) ele.id = id;
  return ele;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createElement);


/***/ }),

/***/ "./src/modules/createObjectFromForm.js":
/*!*********************************************!*\
  !*** ./src/modules/createObjectFromForm.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createObjectFromForm(formInputs) {
  return formInputs.reduce(
    (object, item) =>
      item.value ? { ...object, [item.id]: item.value } : object,
    {}
  );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createObjectFromForm);


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
/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ "./src/modules/createElement.js");


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

  const li = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("li");
  li.dataset[idTag] = objID;

  for (const [key, value] of Object.entries(object)) {
    /* console.log(key + ": " + value); */
    if (key === "title") {
      const heading = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("h3");
      heading.textContent = value;
      li.appendChild(heading);
    }

    if (key === "description") {
      const p = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("p");
      p.textContent = value;
      li.appendChild(p);
    }
  }

  /* use order to place this all the way to left in li */
  if (object.hasOwnProperty("todoID")) {
    const checkCompleteBtn = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("button", "not-complete");
    checkCompleteBtn.textContent = "Mark complete";
    li.appendChild(checkCompleteBtn);
  }

  return li;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (populateListFromObject);


/***/ }),

/***/ "./src/modules/renderSelectProjTodos.js":
/*!**********************************************!*\
  !*** ./src/modules/renderSelectProjTodos.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ "./src/modules/createElement.js");


function renderSelectProjTodosHTML(elementToAppendTo, projectObj) {
  const h1 = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("h1", "test", "project-title");
  h1.textContent = projectObj?.title ?? "Default Title";

  const list = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("ul", "test2", "curr-project-todos");

  elementToAppendTo.append(h1, list);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderSelectProjTodosHTML);


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
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject({ title: "Refurnish Home" });
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addProject({ title: "Paint Walls" });
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
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateSelectGroupTodos("todos");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBLENBQUM7QUFDRCxJQUFJLGtFQUFjO0FBQ2xCLGlFQUFhO0FBQ2IsaUVBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvRm9ybU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9VSU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZU9iamVjdEZyb21Gb3JtLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVQcm9qZWN0Rm9ybS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlVG9kb0Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3BvcHVsYXRlTGlzdEZyb21PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3JlbmRlclNlbGVjdFByb2pUb2Rvcy5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlVG9kb0Zvcm0gZnJvbSBcIi4vY3JlYXRlVG9kb0Zvcm0uanNcIjtcbmltcG9ydCBjcmVhdGVQcm9qZWN0Rm9ybSBmcm9tIFwiLi9jcmVhdGVQcm9qZWN0Rm9ybS5qc1wiO1xuaW1wb3J0IGNyZWF0ZU9iamVjdEZyb21Gb3JtIGZyb20gXCIuL2NyZWF0ZU9iamVjdEZyb21Gb3JtLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL1RvZG9VSU1hbmFnZXIuanNcIjtcblxuY29uc3QgRm9ybU1hbmFnZXIgPSAoKCkgPT4ge1xuICAvKiByZWZlcmVuY2VzICovXG4gIGNvbnN0IGNyZWF0ZU5ld1RvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctdG9kb1wiKTtcbiAgY29uc3QgY3JlYXRlTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy1wcm9qZWN0XCIpO1xuXG4gIGNvbnN0IGhhbmRsZUJ0bkNyZWF0ZUZvcm1DbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUb0FwcGVuZEZvcm1UbyA9IGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIGlmIChlbGVtZW50VG9BcHBlbmRGb3JtVG8ucXVlcnlTZWxlY3RvcihcImZvcm1cIikpIHJldHVybjtcbiAgICBjb25zdCBpc05ld1Byb2plY3QgPSBldmVudC50YXJnZXQuaWQuaW5jbHVkZXMoXCJwcm9qZWN0XCIpO1xuICAgIGxldCBmb3JtVHlwZVRlbXBsYXRlO1xuICAgIGlzTmV3UHJvamVjdFxuICAgICAgPyAoZm9ybVR5cGVUZW1wbGF0ZSA9IGNyZWF0ZVByb2plY3RGb3JtKCkpXG4gICAgICA6IChmb3JtVHlwZVRlbXBsYXRlID0gY3JlYXRlVG9kb0Zvcm0oKSk7XG4gICAgZWxlbWVudFRvQXBwZW5kRm9ybVRvLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBmb3JtVHlwZVRlbXBsYXRlKTtcbiAgICBjb25zdCBmb3JtID0gZWxlbWVudFRvQXBwZW5kRm9ybVRvLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGluaXRpYWxpemVGb3JtKGZvcm0sIGlzTmV3UHJvamVjdCk7XG4gIH07XG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZvcm0gPSAoZm9ybSwgaXNOZXdQcm9qZWN0KSA9PiB7XG4gICAgY29uc3Qgc3VibWl0SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgICAgaGFuZGxlRm9ybVN1Ym1pdChldmVudCwgZm9ybSwgaXNOZXdQcm9qZWN0KTtcbiAgICAgIGZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5kbGVyKTtcbiAgICAgIGZvcm0ucmVtb3ZlKCk7XG4gICAgfTtcblxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5kbGVyKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gKGV2ZW50LCBmb3JtLCBpc05ld1Byb2plY3QpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG9iamVjdCA9IGNyZWF0ZU9iamVjdEZyb21Gb3JtKGdldElucHV0RWxlbWVudHMoZm9ybSkpO1xuICAgIGlmIChpc05ld1Byb2plY3QpIHtcbiAgICAgIFByb2plY3RNYW5hZ2VyLmFkZFByb2plY3Qob2JqZWN0KTtcbiAgICAgIFRvZG9VSU1hbmFnZXIucG9wdWxhdGVQcm9qZWN0cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBQcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qob2JqZWN0KTtcbiAgICAgIFRvZG9VSU1hbmFnZXIucG9wdWxhdGVTZWxlY3RHcm91cFRvZG9zKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldElucHV0RWxlbWVudHMgPSAoZm9ybSkgPT5cbiAgICBbLi4uZm9ybS5lbGVtZW50c10uZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRhZ05hbWUgPT09IFwiSU5QVVRcIik7XG5cbiAgY3JlYXRlTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQnRuQ3JlYXRlRm9ybUNsaWNrKTtcblxuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdG5DcmVhdGVGb3JtQ2xpY2spO1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRm9ybU1hbmFnZXI7XG4iLCJsZXQgcHJvamVjdElEQ291bnRlciA9IDA7XG5cbmNvbnN0IHNoYXJlZE1ldGhvZHMgPSB7XG4gIGdldFRvZG9zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH0sXG5cbiAgYWRkVG9kbzogZnVuY3Rpb24gKHRvZG8pIHtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gIH0sXG5cbiAgZGVsZXRlVG9kbzogZnVuY3Rpb24gKHRvZG9JRCkge1xuICAgIHRoaXMudG9kb3MuZm9yRWFjaCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0b2RvLnRvZG9JRCA9PT0gdG9kb0lEKSB7XG4gICAgICAgIHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICB0b2dnbGVTZWxlY3RlZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNTZWxlY3RlZCA9ICF0aGlzLmlzU2VsZWN0ZWQ7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBQcm9qZWN0RmFjdG9yeShvYmplY3QpIHtcbiAgY29uc3QgcHJvamVjdCA9IHtcbiAgICB0aXRsZTogb2JqZWN0LnRpdGxlLFxuICAgIHByb2plY3RJRDogcHJvamVjdElEQ291bnRlcixcbiAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICB0b2RvczogW10sXG4gIH07XG5cbiAgLy91c2Ugb2JqZWN0LnNldFByb3RvdHlwZU9mIHRvIGFzc2lnbiBtZXRob2RzIHRvIHByb3RveXBlLCB0byBhdm9pZCBkdXBsaWNhdGlvblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvamVjdCwgc2hhcmVkTWV0aG9kcyk7XG5cbiAgcHJvamVjdElEQ291bnRlcisrO1xuICByZXR1cm4gcHJvamVjdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdEZhY3Rvcnk7XG4iLCJpbXBvcnQgVG9kb0ZhY3RvcnkgZnJvbSBcIi4vVG9kb0ZhY3RvcnkuanNcIjtcbmltcG9ydCBQcm9qZWN0RmFjdG9yeSBmcm9tIFwiLi9Qcm9qZWN0RmFjdG9yeS5qc1wiO1xuXG5jb25zdCBQcm9qZWN0TWFuYWdlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzID0gW107XG4gIGxldCBjdXJyU2VsZWN0ZWRQcm9qO1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3RGYWN0b3J5KHByb2plY3RUaXRsZSk7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5wcm9qZWN0SUQgPT09IHByb2plY3RJRCkge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8qIGFsdCB2ZXJzaW9uIGNvdWxkIHVzZSBmaWx0ZXIgYW5kIHJlYXNzaWduIHRvIHByb2plY3RzIHZhci4gKi9cbiAgfTtcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzO1xuXG4gIGNvbnN0IGdldFNlbGVjdGVkUHJvamVjdCA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2o7XG5cbiAgY29uc3QgZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qLmdldFRvZG9zKCk7XG5cbiAgY29uc3Qgc2V0U2VsZWN0ZWRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgIGRlc2VsZWN0Q3VyclByb2plY3QoKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5wcm9qZWN0SUQgPT09IHByb2plY3RJRCkge1xuICAgICAgICBjdXJyU2VsZWN0ZWRQcm9qID0gcHJvamVjdDtcbiAgICAgICAgY3VyclNlbGVjdGVkUHJvai50b2dnbGVTZWxlY3RlZCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRlc2VsZWN0Q3VyclByb2plY3QgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qPy50b2dnbGVTZWxlY3RlZCgpO1xuXG4gIGNvbnN0IGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCA9IChpbnB1dEVsZW1lbnRzKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBwcm9qZWN0IGlzOiBcIiwgY3VyclNlbGVjdGVkUHJvaik7XG4gICAgY29uc3QgdG9kbyA9IFRvZG9GYWN0b3J5KGlucHV0RWxlbWVudHMpO1xuICAgIGN1cnJTZWxlY3RlZFByb2ouYWRkVG9kbyh0b2RvKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlVG9kb0Zyb21TZWxlY3RlZFByb2plY3QgPSAodG9kb0lEKSA9PiB7XG4gICAgY3VyclNlbGVjdGVkUHJvai5kZWxldGVUb2RvKHRvZG9JRCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZ2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGdldFNlbGVjdGVkUHJvamVjdFRvZG9zLFxuICAgIHNldFNlbGVjdGVkUHJvamVjdCxcbiAgICBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QsXG4gICAgZGVsZXRlVG9kb0Zyb21TZWxlY3RlZFByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TWFuYWdlcjtcbiIsImxldCB0b2RvSURDb3VudGVyID0gMDtcblxuZnVuY3Rpb24gVG9kb0ZhY3Rvcnkob2JqKSB7XG4gIGNvbnN0IHRvZG8gPSB7fTtcbiAgdG9kby50b2RvSUQgPSB0b2RvSURDb3VudGVyO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICB0b2RvW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHRvZG9JRENvdW50ZXIrKztcbiAgcmV0dXJuIHRvZG87XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuXG4vKiBsb29wcyB0aHJvdWdoIGVhY2gga2V5IGluIGFyZ3VtZW50b2JqICovXG4vKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbi8qIHRpdGxlICovXG4vKiBkZXNjcmlwdGlvbiAqL1xuLyogZHVlRGF0ZSAqL1xuLyogcHJpb3JpdHkgKi9cbi8qIG5vdGVzICovXG4vKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbi8qIG1heWJlIGFkZCBtZXRob2RzIHRvIHRoZSBvYmplY3RzIGFzIHdlbGw/ICovXG4iLCJpbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBwb3B1bGF0ZUxpc3RGcm9tT2JqZWN0IGZyb20gXCIuL3BvcHVsYXRlTGlzdEZyb21PYmplY3QuanNcIjtcbmltcG9ydCByZW5kZXJTZWxlY3RQcm9qVG9kb3NIVE1MIGZyb20gXCIuL3JlbmRlclNlbGVjdFByb2pUb2Rvcy5qc1wiO1xuXG5jb25zdCBUb2RvVUlNYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1saXN0XCIpO1xuICBsZXQgcHJldmlvdXNMaXN0R3JvdXA7XG5cbiAgY29uc3Qgc2hvd1NlbGVjdGVkR3JvdXAgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBsaXN0R3JvdXAgPSBldmVudC50YXJnZXQuY2xvc2VzdChcImxpXCIpO1xuICAgIGlmIChsaXN0R3JvdXAgIT09IHByZXZpb3VzTGlzdEdyb3VwKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SUQgPSArbGlzdEdyb3VwLmRhdGFzZXQucHJvamVjdDtcbiAgICAgIFByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdChwcm9qZWN0SUQpOyAvL3JlbmFtZSB3aGVuIHlvdSBhZGQgdGhlIG90aGVyIGdyb3Vwc1xuICAgICAgcG9wdWxhdGVTZWxlY3RHcm91cFRvZG9zKCk7IC8vJ3RvZGF5JywgJ2ltcG9ydGFudCcgZXRjLlxuICAgICAgcHJldmlvdXNMaXN0R3JvdXAgPSBsaXN0R3JvdXA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFkZExhdGVzdCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkID0gKCkgPT4ge307XG5cbiAgY29uc3QgZWRpdFNlbGVjdGVkID0gKCkgPT4ge307XG5cbiAgY29uc3QgcG9wdWxhdGVQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBwcm9qZWN0c0xpc3QuaW5uZXJIVE1MID0gXCJcIjsgLyogYmFkPyAqL1xuICAgIGNvbnN0IHByb2plY3RzID0gUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKTtcblxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+XG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocG9wdWxhdGVMaXN0RnJvbU9iamVjdChwcm9qZWN0KSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHBvcHVsYXRlU2VsZWN0R3JvdXBUb2RvcyA9ICgpID0+IHtcbiAgICBtYWluQ29udGVudC5pbm5lckhUTUwgPSBcIlwiOyAvKiBiYWQ/ICovXG4gICAgcmVuZGVyU2VsZWN0UHJvalRvZG9zSFRNTChtYWluQ29udGVudCwgUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRQcm9qZWN0KCkpO1xuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdFRvZG9zID0gUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MoKTtcbiAgICBjb25zdCBjdXJyUHJvamVjdFRvZG9zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3Vyci1wcm9qZWN0LXRvZG9zXCIpO1xuXG4gICAgc2VsZWN0ZWRQcm9qZWN0VG9kb3MuZm9yRWFjaCgocHJvamVjdCkgPT5cbiAgICAgIGN1cnJQcm9qZWN0VG9kb3NMaXN0LmFwcGVuZENoaWxkKHBvcHVsYXRlTGlzdEZyb21PYmplY3QocHJvamVjdCkpXG4gICAgKTtcbiAgfTtcblxuICBwcm9qZWN0c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dTZWxlY3RlZEdyb3VwKTtcblxuICByZXR1cm4ge1xuICAgIHBvcHVsYXRlUHJvamVjdHMsXG4gICAgcG9wdWxhdGVTZWxlY3RHcm91cFRvZG9zLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb1VJTWFuYWdlcjtcbiIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSA9IFwiZGl2XCIsIGNsYXNzbmFtZSA9IFwiXCIsIGlkID0gXCJcIikge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBpZiAoY2xhc3NuYW1lKSBlbGUuY2xhc3NMaXN0LmFkZChjbGFzc25hbWUpO1xuICBpZiAoaWQpIGVsZS5pZCA9IGlkO1xuICByZXR1cm4gZWxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbGVtZW50O1xuIiwiZnVuY3Rpb24gY3JlYXRlT2JqZWN0RnJvbUZvcm0oZm9ybUlucHV0cykge1xuICByZXR1cm4gZm9ybUlucHV0cy5yZWR1Y2UoXG4gICAgKG9iamVjdCwgaXRlbSkgPT5cbiAgICAgIGl0ZW0udmFsdWUgPyB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiBvYmplY3QsXG4gICAge31cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlT2JqZWN0RnJvbUZvcm07XG4iLCJjb25zdCBjcmVhdGVQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXByb2plY3QtZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb2plY3RGb3JtO1xuIiwiY29uc3QgY3JlYXRlVG9kb0Zvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC10b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUb2RvRm9ybTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gXCIuL2NyZWF0ZUVsZW1lbnQuanNcIjtcblxuY29uc3QgZ2V0T2JqZWN0SURBbmRUYWcgPSAob2JqZWN0KSA9PiB7XG4gIGNvbnN0IGtleTEgPSBcInByb2plY3RJRFwiO1xuICBjb25zdCBrZXkyID0gXCJ0b2RvSURcIjtcbiAgY29uc3Qgb2JqSUQgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IG9iamVjdC5wcm9qZWN0SURcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gb2JqZWN0LnRvZG9JRFxuICAgIDogbnVsbDtcblxuICBjb25zdCBpZFRhZyA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkxKVxuICAgID8gXCJwcm9qZWN0XCJcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gXCJ0b2RvXCJcbiAgICA6IG51bGw7XG5cbiAgcmV0dXJuIFtvYmpJRCwgaWRUYWddO1xufTtcblxuZnVuY3Rpb24gcG9wdWxhdGVMaXN0RnJvbU9iamVjdChvYmplY3QpIHtcbiAgY29uc3QgW29iaklELCBpZFRhZ10gPSBnZXRPYmplY3RJREFuZFRhZyhvYmplY3QpO1xuXG4gIGNvbnN0IGxpID0gY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5kYXRhc2V0W2lkVGFnXSA9IG9iaklEO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcbiAgICAvKiBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB2YWx1ZSk7ICovXG4gICAgaWYgKGtleSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICBjb25zdCBoZWFkaW5nID0gY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XG4gICAgICBjb25zdCBwID0gY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICB9XG4gIH1cblxuICAvKiB1c2Ugb3JkZXIgdG8gcGxhY2UgdGhpcyBhbGwgdGhlIHdheSB0byBsZWZ0IGluIGxpICovXG4gIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoXCJ0b2RvSURcIikpIHtcbiAgICBjb25zdCBjaGVja0NvbXBsZXRlQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIm5vdC1jb21wbGV0ZVwiKTtcbiAgICBjaGVja0NvbXBsZXRlQnRuLnRleHRDb250ZW50ID0gXCJNYXJrIGNvbXBsZXRlXCI7XG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tDb21wbGV0ZUJ0bik7XG4gIH1cblxuICByZXR1cm4gbGk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvcHVsYXRlTGlzdEZyb21PYmplY3Q7XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIHJlbmRlclNlbGVjdFByb2pUb2Rvc0hUTUwoZWxlbWVudFRvQXBwZW5kVG8sIHByb2plY3RPYmopIHtcbiAgY29uc3QgaDEgPSBjcmVhdGVFbGVtZW50KFwiaDFcIiwgXCJ0ZXN0XCIsIFwicHJvamVjdC10aXRsZVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqPy50aXRsZSA/PyBcIkRlZmF1bHQgVGl0bGVcIjtcblxuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbWVudChcInVsXCIsIFwidGVzdDJcIiwgXCJjdXJyLXByb2plY3QtdG9kb3NcIik7XG5cbiAgZWxlbWVudFRvQXBwZW5kVG8uYXBwZW5kKGgxLCBsaXN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyU2VsZWN0UHJvalRvZG9zSFRNTDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qc1wiO1xubG9nKFByb2plY3RNYW5hZ2VyKTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoeyB0aXRsZTogXCJSZWZ1cm5pc2ggSG9tZVwiIH0pO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlBhaW50IFdhbGxzXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMCk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHNvZmFcIixcbiAgZGVzY3JpcHRpb246IFwibGlmdCBkb250IGRyYWdcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwibW92ZSB0YWJsZVwiLFxuICBkZXNjcmlwdGlvbjogXCJkcmFnIGl0IHJvdWdobHlcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KDEpO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwiYnV5IHBhaW50XCIsXG4gIGRlc2NyaXB0aW9uOiBcIm1peCBpdCB3ZWxsIGJlZm9yZSBhcHBseWluZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJidXkgYnJ1c2hcIixcbn0pO1xubG9nKFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCkpO1xuVG9kb1VJTWFuYWdlci5wb3B1bGF0ZVByb2plY3RzKFwicHJvamVjdHNcIik7XG5Ub2RvVUlNYW5hZ2VyLnBvcHVsYXRlU2VsZWN0R3JvdXBUb2RvcyhcInRvZG9zXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9