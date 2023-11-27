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
    const templateObj = (0,_createObjectFromForm_js__WEBPACK_IMPORTED_MODULE_2__["default"])(getInputElements(form));
    let object;
    isNewProject
      ? (object = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(templateObj))
      : (object = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_3__["default"].addTodoToSelectedProject(templateObj));
    _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_4__["default"].addLatestItem(object, isNewProject);
  };

  const editSelectedItem = () => {};

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
    return project;
  };

  const deleteProject = (projectID) => {
    projects.forEach((project, index) => {
      if (project.projectID === projectID) {
        projects.splice(index, 1);
      }
    });
    /* alt version could use filter and reassign to projects var. */
  };

  const getProject = (projectID) => {};

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
    return todo;
  };

  const deleteTodoFromSelectedProject = (todoID) => {
    currSelectedProj.deleteTodo(todoID);
  };

  return {
    addProject,
    deleteProject,
    getProjects,
    getSelectedProject,
    getSelectedProjectTodos /* sure about export all of them?? */,
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
/* harmony import */ var _createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createListItemFromObject.js */ "./src/modules/createListItemFromObject.js");
/* harmony import */ var _renderSelectProjTodos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderSelectProjTodos.js */ "./src/modules/renderSelectProjTodos.js");




const TodoUIManager = (() => {
  /* references */
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  let previousListGroupSelection;

  const showSelectedGroup = (event) => {
    const listGroupSelection = event.target.closest("li");
    if (listGroupSelection !== previousListGroupSelection) {
      const projectID = +listGroupSelection.dataset.project;
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].setSelectedProject(projectID); //rename when you add the other groups
      populateSelectGroupTodos(); //'today', 'important' etc.
      previousListGroupSelection = listGroupSelection;
    }
  };

  const addLatestItem = (object, isNewProject) => {
    console.log(object);
    const currProjectTodosList = document.querySelector("#curr-project-todos");
    const item = (0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object);
    isNewProject
      ? projectsList.appendChild(item)
      : currProjectTodosList.appendChild(item);
  };

  const removeSelectedItem = () => {
    //query dom for selected item and remove it
    //all actual data changes handled by project manager
  };

  const editSelectedItem = () => {
    //update selected items textContent
    //all actual data changes handled by project manager
  };

  //change to renderProjects, as it is run once on startup / or is it?
  const populateProjects = () => {
    projectsList.innerHTML = ""; /* bad? */
    const projects = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects();

    projects.forEach((project) =>
      projectsList.appendChild((0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project))
    );
  };

  const populateSelectGroupTodos = () => {
    mainContent.innerHTML = ""; /* bad? */
    (0,_renderSelectProjTodos_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainContent, _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedProject());
    const selectedProjectTodos = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedProjectTodos();
    const currProjectTodosList = document.querySelector("#curr-project-todos");

    selectedProjectTodos.forEach((project) =>
      currProjectTodosList.appendChild((0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project))
    );
  };

  projectsList.addEventListener("click", showSelectedGroup);

  return {
    populateProjects,
    populateSelectGroupTodos,
    addLatestItem,
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

/***/ "./src/modules/createListItemFromObject.js":
/*!*************************************************!*\
  !*** ./src/modules/createListItemFromObject.js ***!
  \*************************************************/
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

function createListItemFromObject(object) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createListItemFromObject);


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
  h1.textContent =
    projectObj?.title ?? "Default Title"; /* projects must have title
  so get rid of this line */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGtFQUFjLGNBQWMseUJBQXlCO0FBQ3JELGtFQUFjLGNBQWMsc0JBQXNCO0FBQ2xELGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Q7QUFDQTtBQUNBLENBQUM7QUFDRCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Q7QUFDQTtBQUNBLENBQUM7QUFDRCxrRUFBYztBQUNkO0FBQ0EsQ0FBQztBQUNELElBQUksa0VBQWM7QUFDbEIsaUVBQWE7QUFDYixpRUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Gb3JtTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVPYmplY3RGcm9tRm9ybS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlUHJvamVjdEZvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvZG9Gb3JtLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9yZW5kZXJTZWxlY3RQcm9qVG9kb3MuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZVRvZG9Gb3JtIGZyb20gXCIuL2NyZWF0ZVRvZG9Gb3JtLmpzXCI7XG5pbXBvcnQgY3JlYXRlUHJvamVjdEZvcm0gZnJvbSBcIi4vY3JlYXRlUHJvamVjdEZvcm0uanNcIjtcbmltcG9ydCBjcmVhdGVPYmplY3RGcm9tRm9ybSBmcm9tIFwiLi9jcmVhdGVPYmplY3RGcm9tRm9ybS5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgVG9kb1VJTWFuYWdlciBmcm9tIFwiLi9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5cbmNvbnN0IEZvcm1NYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBjcmVhdGVOZXdUb2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXRvZG9cIik7XG4gIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctcHJvamVjdFwiKTtcblxuICBjb25zdCBoYW5kbGVCdG5DcmVhdGVGb3JtQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VG9BcHBlbmRGb3JtVG8gPSBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICBpZiAoZWxlbWVudFRvQXBwZW5kRm9ybVRvLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpKSByZXR1cm47XG4gICAgY29uc3QgaXNOZXdQcm9qZWN0ID0gZXZlbnQudGFyZ2V0LmlkLmluY2x1ZGVzKFwicHJvamVjdFwiKTtcbiAgICBsZXQgZm9ybVR5cGVUZW1wbGF0ZTtcbiAgICBpc05ld1Byb2plY3RcbiAgICAgID8gKGZvcm1UeXBlVGVtcGxhdGUgPSBjcmVhdGVQcm9qZWN0Rm9ybSgpKVxuICAgICAgOiAoZm9ybVR5cGVUZW1wbGF0ZSA9IGNyZWF0ZVRvZG9Gb3JtKCkpO1xuICAgIGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZm9ybVR5cGVUZW1wbGF0ZSk7XG4gICAgY29uc3QgZm9ybSA9IGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgICBpbml0aWFsaXplRm9ybShmb3JtLCBpc05ld1Byb2plY3QpO1xuICB9O1xuXG4gIGNvbnN0IGluaXRpYWxpemVGb3JtID0gKGZvcm0sIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHN1Ym1pdEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQsIGZvcm0sIGlzTmV3UHJvamVjdCk7XG4gICAgICBmb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgc3VibWl0SGFuZGxlcik7XG4gICAgICBmb3JtLnJlbW92ZSgpO1xuICAgIH07XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHN1Ym1pdEhhbmRsZXIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoZXZlbnQsIGZvcm0sIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGVtcGxhdGVPYmogPSBjcmVhdGVPYmplY3RGcm9tRm9ybShnZXRJbnB1dEVsZW1lbnRzKGZvcm0pKTtcbiAgICBsZXQgb2JqZWN0O1xuICAgIGlzTmV3UHJvamVjdFxuICAgICAgPyAob2JqZWN0ID0gUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh0ZW1wbGF0ZU9iaikpXG4gICAgICA6IChvYmplY3QgPSBQcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3QodGVtcGxhdGVPYmopKTtcbiAgICBUb2RvVUlNYW5hZ2VyLmFkZExhdGVzdEl0ZW0ob2JqZWN0LCBpc05ld1Byb2plY3QpO1xuICB9O1xuXG4gIGNvbnN0IGVkaXRTZWxlY3RlZEl0ZW0gPSAoKSA9PiB7fTtcblxuICBjb25zdCBnZXRJbnB1dEVsZW1lbnRzID0gKGZvcm0pID0+XG4gICAgWy4uLmZvcm0uZWxlbWVudHNdLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50YWdOYW1lID09PSBcIklOUFVUXCIpO1xuXG4gIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUJ0bkNyZWF0ZUZvcm1DbGljayk7XG5cbiAgY3JlYXRlTmV3VG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQnRuQ3JlYXRlRm9ybUNsaWNrKTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1NYW5hZ2VyO1xuIiwibGV0IHByb2plY3RJRENvdW50ZXIgPSAwO1xuXG5jb25zdCBzaGFyZWRNZXRob2RzID0ge1xuICBnZXRUb2RvczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9LFxuXG4gIGFkZFRvZG86IGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9LFxuXG4gIGRlbGV0ZVRvZG86IGZ1bmN0aW9uICh0b2RvSUQpIHtcbiAgICB0aGlzLnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICBpZiAodG9kby50b2RvSUQgPT09IHRvZG9JRCkge1xuICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgdG9nZ2xlU2VsZWN0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlzU2VsZWN0ZWQgPSAhdGhpcy5pc1NlbGVjdGVkO1xuICB9LFxufTtcblxuZnVuY3Rpb24gUHJvamVjdEZhY3Rvcnkob2JqZWN0KSB7XG4gIGNvbnN0IHByb2plY3QgPSB7XG4gICAgdGl0bGU6IG9iamVjdC50aXRsZSxcbiAgICBwcm9qZWN0SUQ6IHByb2plY3RJRENvdW50ZXIsXG4gICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgdG9kb3M6IFtdLFxuICB9O1xuXG4gIC8vdXNlIG9iamVjdC5zZXRQcm90b3R5cGVPZiB0byBhc3NpZ24gbWV0aG9kcyB0byBwcm90b3lwZSwgdG8gYXZvaWQgZHVwbGljYXRpb25cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb2plY3QsIHNoYXJlZE1ldGhvZHMpO1xuXG4gIHByb2plY3RJRENvdW50ZXIrKztcbiAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RGYWN0b3J5O1xuIiwiaW1wb3J0IFRvZG9GYWN0b3J5IGZyb20gXCIuL1RvZG9GYWN0b3J5LmpzXCI7XG5pbXBvcnQgUHJvamVjdEZhY3RvcnkgZnJvbSBcIi4vUHJvamVjdEZhY3RvcnkuanNcIjtcblxuY29uc3QgUHJvamVjdE1hbmFnZXIgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuICBsZXQgY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0RmFjdG9yeShwcm9qZWN0VGl0bGUpO1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgcmV0dXJuIHByb2plY3Q7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QucHJvamVjdElEID09PSBwcm9qZWN0SUQpIHtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKiBhbHQgdmVyc2lvbiBjb3VsZCB1c2UgZmlsdGVyIGFuZCByZWFzc2lnbiB0byBwcm9qZWN0cyB2YXIuICovXG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHt9O1xuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgY29uc3QgZ2V0U2VsZWN0ZWRQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBnZXRTZWxlY3RlZFByb2plY3RUb2RvcyA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2ouZ2V0VG9kb3MoKTtcblxuICBjb25zdCBzZXRTZWxlY3RlZFByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgZGVzZWxlY3RDdXJyUHJvamVjdCgpO1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LnByb2plY3RJRCA9PT0gcHJvamVjdElEKSB7XG4gICAgICAgIGN1cnJTZWxlY3RlZFByb2ogPSBwcm9qZWN0O1xuICAgICAgICBjdXJyU2VsZWN0ZWRQcm9qLnRvZ2dsZVNlbGVjdGVkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJTZWxlY3RlZFByb2opO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZGVzZWxlY3RDdXJyUHJvamVjdCA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2o/LnRvZ2dsZVNlbGVjdGVkKCk7XG5cbiAgY29uc3QgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0ID0gKGlucHV0RWxlbWVudHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHByb2plY3QgaXM6IFwiLCBjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICBjb25zdCB0b2RvID0gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cyk7XG4gICAgY3VyclNlbGVjdGVkUHJvai5hZGRUb2RvKHRvZG8pO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICByZXR1cm4gdG9kbztcbiAgfTtcblxuICBjb25zdCBkZWxldGVUb2RvRnJvbVNlbGVjdGVkUHJvamVjdCA9ICh0b2RvSUQpID0+IHtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLmRlbGV0ZVRvZG8odG9kb0lEKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBnZXRTZWxlY3RlZFByb2plY3QsXG4gICAgZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MgLyogc3VyZSBhYm91dCBleHBvcnQgYWxsIG9mIHRoZW0/PyAqLyxcbiAgICBzZXRTZWxlY3RlZFByb2plY3QsXG4gICAgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0LFxuICAgIGRlbGV0ZVRvZG9Gcm9tU2VsZWN0ZWRQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdE1hbmFnZXI7XG4iLCJsZXQgdG9kb0lEQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIFRvZG9GYWN0b3J5KG9iaikge1xuICBjb25zdCB0b2RvID0ge307XG4gIHRvZG8udG9kb0lEID0gdG9kb0lEQ291bnRlcjtcblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgdG9kb1trZXldID0gdmFsdWU7XG4gIH1cblxuICB0b2RvSURDb3VudGVyKys7XG4gIHJldHVybiB0b2RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvRmFjdG9yeTtcblxuLyogbG9vcHMgdGhyb3VnaCBlYWNoIGtleSBpbiBhcmd1bWVudG9iaiAqL1xuLyogcmV0dXJucyB7fSB3aXRoIGtleTp2YWx1ZSBwYWlycyovXG4vKiB0aXRsZSAqL1xuLyogZGVzY3JpcHRpb24gKi9cbi8qIGR1ZURhdGUgKi9cbi8qIHByaW9yaXR5ICovXG4vKiBub3RlcyAqL1xuLyogY2hlY2tsaXN0IChzdWIgc3RlcHMpICovXG4vKiBtYXliZSBhZGQgbWV0aG9kcyB0byB0aGUgb2JqZWN0cyBhcyB3ZWxsPyAqL1xuIiwiaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0IGZyb20gXCIuL2NyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdC5qc1wiO1xuaW1wb3J0IHJlbmRlclNlbGVjdFByb2pUb2Rvc0hUTUwgZnJvbSBcIi4vcmVuZGVyU2VsZWN0UHJvalRvZG9zLmpzXCI7XG5cbmNvbnN0IFRvZG9VSU1hbmFnZXIgPSAoKCkgPT4ge1xuICAvKiByZWZlcmVuY2VzICovXG4gIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWxpc3RcIik7XG4gIGxldCBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbjtcblxuICBjb25zdCBzaG93U2VsZWN0ZWRHcm91cCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGxpc3RHcm91cFNlbGVjdGlvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwibGlcIik7XG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbiAhPT0gcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHByb2plY3RJRCA9ICtsaXN0R3JvdXBTZWxlY3Rpb24uZGF0YXNldC5wcm9qZWN0O1xuICAgICAgUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KHByb2plY3RJRCk7IC8vcmVuYW1lIHdoZW4geW91IGFkZCB0aGUgb3RoZXIgZ3JvdXBzXG4gICAgICBwb3B1bGF0ZVNlbGVjdEdyb3VwVG9kb3MoKTsgLy8ndG9kYXknLCAnaW1wb3J0YW50JyBldGMuXG4gICAgICBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbiA9IGxpc3RHcm91cFNlbGVjdGlvbjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkTGF0ZXN0SXRlbSA9IChvYmplY3QsIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgY29uc3QgY3VyclByb2plY3RUb2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnItcHJvamVjdC10b2Rvc1wiKTtcbiAgICBjb25zdCBpdGVtID0gY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KG9iamVjdCk7XG4gICAgaXNOZXdQcm9qZWN0XG4gICAgICA/IHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChpdGVtKVxuICAgICAgOiBjdXJyUHJvamVjdFRvZG9zTGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVTZWxlY3RlZEl0ZW0gPSAoKSA9PiB7XG4gICAgLy9xdWVyeSBkb20gZm9yIHNlbGVjdGVkIGl0ZW0gYW5kIHJlbW92ZSBpdFxuICAgIC8vYWxsIGFjdHVhbCBkYXRhIGNoYW5nZXMgaGFuZGxlZCBieSBwcm9qZWN0IG1hbmFnZXJcbiAgfTtcblxuICBjb25zdCBlZGl0U2VsZWN0ZWRJdGVtID0gKCkgPT4ge1xuICAgIC8vdXBkYXRlIHNlbGVjdGVkIGl0ZW1zIHRleHRDb250ZW50XG4gICAgLy9hbGwgYWN0dWFsIGRhdGEgY2hhbmdlcyBoYW5kbGVkIGJ5IHByb2plY3QgbWFuYWdlclxuICB9O1xuXG4gIC8vY2hhbmdlIHRvIHJlbmRlclByb2plY3RzLCBhcyBpdCBpcyBydW4gb25jZSBvbiBzdGFydHVwIC8gb3IgaXMgaXQ/XG4gIGNvbnN0IHBvcHVsYXRlUHJvamVjdHMgPSAoKSA9PiB7XG4gICAgcHJvamVjdHNMaXN0LmlubmVySFRNTCA9IFwiXCI7IC8qIGJhZD8gKi9cbiAgICBjb25zdCBwcm9qZWN0cyA9IFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PlxuICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChwcm9qZWN0KSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHBvcHVsYXRlU2VsZWN0R3JvdXBUb2RvcyA9ICgpID0+IHtcbiAgICBtYWluQ29udGVudC5pbm5lckhUTUwgPSBcIlwiOyAvKiBiYWQ/ICovXG4gICAgcmVuZGVyU2VsZWN0UHJvalRvZG9zSFRNTChtYWluQ29udGVudCwgUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRQcm9qZWN0KCkpO1xuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdFRvZG9zID0gUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MoKTtcbiAgICBjb25zdCBjdXJyUHJvamVjdFRvZG9zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3Vyci1wcm9qZWN0LXRvZG9zXCIpO1xuXG4gICAgc2VsZWN0ZWRQcm9qZWN0VG9kb3MuZm9yRWFjaCgocHJvamVjdCkgPT5cbiAgICAgIGN1cnJQcm9qZWN0VG9kb3NMaXN0LmFwcGVuZENoaWxkKGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChwcm9qZWN0KSlcbiAgICApO1xuICB9O1xuXG4gIHByb2plY3RzTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd1NlbGVjdGVkR3JvdXApO1xuXG4gIHJldHVybiB7XG4gICAgcG9wdWxhdGVQcm9qZWN0cyxcbiAgICBwb3B1bGF0ZVNlbGVjdEdyb3VwVG9kb3MsXG4gICAgYWRkTGF0ZXN0SXRlbSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9VSU1hbmFnZXI7XG4iLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUgPSBcImRpdlwiLCBjbGFzc25hbWUgPSBcIlwiLCBpZCA9IFwiXCIpIHtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgaWYgKGNsYXNzbmFtZSkgZWxlLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKTtcbiAgaWYgKGlkKSBlbGUuaWQgPSBpZDtcbiAgcmV0dXJuIGVsZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRWxlbWVudDtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gXCIuL2NyZWF0ZUVsZW1lbnQuanNcIjtcblxuY29uc3QgZ2V0T2JqZWN0SURBbmRUYWcgPSAob2JqZWN0KSA9PiB7XG4gIGNvbnN0IGtleTEgPSBcInByb2plY3RJRFwiO1xuICBjb25zdCBrZXkyID0gXCJ0b2RvSURcIjtcbiAgY29uc3Qgb2JqSUQgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IG9iamVjdC5wcm9qZWN0SURcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gb2JqZWN0LnRvZG9JRFxuICAgIDogbnVsbDtcblxuICBjb25zdCBpZFRhZyA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkxKVxuICAgID8gXCJwcm9qZWN0XCJcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gXCJ0b2RvXCJcbiAgICA6IG51bGw7XG5cbiAgcmV0dXJuIFtvYmpJRCwgaWRUYWddO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KG9iamVjdCkge1xuICBjb25zdCBbb2JqSUQsIGlkVGFnXSA9IGdldE9iamVjdElEQW5kVGFnKG9iamVjdCk7XG5cbiAgY29uc3QgbGkgPSBjcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGxpLmRhdGFzZXRbaWRUYWddID0gb2JqSUQ7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqZWN0KSkge1xuICAgIC8qIGNvbnNvbGUubG9nKGtleSArIFwiOiBcIiArIHZhbHVlKTsgKi9cbiAgICBpZiAoa2V5ID09PSBcInRpdGxlXCIpIHtcbiAgICAgIGNvbnN0IGhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICBoZWFkaW5nLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSBcImRlc2NyaXB0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHAgPSBjcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIHAudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKHApO1xuICAgIH1cbiAgfVxuXG4gIC8qIHVzZSBvcmRlciB0byBwbGFjZSB0aGlzIGFsbCB0aGUgd2F5IHRvIGxlZnQgaW4gbGkgKi9cbiAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShcInRvZG9JRFwiKSkge1xuICAgIGNvbnN0IGNoZWNrQ29tcGxldGVCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwibm90LWNvbXBsZXRlXCIpO1xuICAgIGNoZWNrQ29tcGxldGVCdG4udGV4dENvbnRlbnQgPSBcIk1hcmsgY29tcGxldGVcIjtcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja0NvbXBsZXRlQnRuKTtcbiAgfVxuXG4gIHJldHVybiBsaTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0O1xuIiwiZnVuY3Rpb24gY3JlYXRlT2JqZWN0RnJvbUZvcm0oZm9ybUlucHV0cykge1xuICByZXR1cm4gZm9ybUlucHV0cy5yZWR1Y2UoXG4gICAgKG9iamVjdCwgaXRlbSkgPT5cbiAgICAgIGl0ZW0udmFsdWUgPyB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiBvYmplY3QsXG4gICAge31cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlT2JqZWN0RnJvbUZvcm07XG4iLCJjb25zdCBjcmVhdGVQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXByb2plY3QtZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb2plY3RGb3JtO1xuIiwiY29uc3QgY3JlYXRlVG9kb0Zvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC10b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUb2RvRm9ybTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gXCIuL2NyZWF0ZUVsZW1lbnQuanNcIjtcblxuZnVuY3Rpb24gcmVuZGVyU2VsZWN0UHJvalRvZG9zSFRNTChlbGVtZW50VG9BcHBlbmRUbywgcHJvamVjdE9iaikge1xuICBjb25zdCBoMSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcInRlc3RcIiwgXCJwcm9qZWN0LXRpdGxlXCIpO1xuICBoMS50ZXh0Q29udGVudCA9XG4gICAgcHJvamVjdE9iaj8udGl0bGUgPz8gXCJEZWZhdWx0IFRpdGxlXCI7IC8qIHByb2plY3RzIG11c3QgaGF2ZSB0aXRsZVxuICBzbyBnZXQgcmlkIG9mIHRoaXMgbGluZSAqL1xuXG4gIGNvbnN0IGxpc3QgPSBjcmVhdGVFbGVtZW50KFwidWxcIiwgXCJ0ZXN0MlwiLCBcImN1cnItcHJvamVjdC10b2Rvc1wiKTtcblxuICBlbGVtZW50VG9BcHBlbmRUby5hcHBlbmQoaDEsIGxpc3QpO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJTZWxlY3RQcm9qVG9kb3NIVE1MO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBsb2cgPSBjb25zb2xlLmxvZztcbmltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5sb2coUHJvamVjdE1hbmFnZXIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlJlZnVybmlzaCBIb21lXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHsgdGl0bGU6IFwiUGFpbnQgV2FsbHNcIiB9KTtcblByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgwKTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcIm1vdmUgc29mYVwiLFxuICBkZXNjcmlwdGlvbjogXCJsaWZ0IGRvbnQgZHJhZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHRhYmxlXCIsXG4gIGRlc2NyaXB0aW9uOiBcImRyYWcgaXQgcm91Z2hseVwiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJidXkgcGFpbnRcIixcbiAgZGVzY3JpcHRpb246IFwibWl4IGl0IHdlbGwgYmVmb3JlIGFwcGx5aW5nXCIsXG59KTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcImJ1eSBicnVzaFwiLFxufSk7XG5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG5Ub2RvVUlNYW5hZ2VyLnBvcHVsYXRlUHJvamVjdHMoXCJwcm9qZWN0c1wiKTtcblRvZG9VSU1hbmFnZXIucG9wdWxhdGVTZWxlY3RHcm91cFRvZG9zKFwidG9kb3NcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=