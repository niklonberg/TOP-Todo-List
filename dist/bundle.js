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
/* harmony import */ var _createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createListItemFromObject.js */ "./src/modules/createListItemFromObject.js");
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

  const addLatestItem = () => {
    //get list to add to
    //
  };

  const removeSelectedItem = () => {};

  const editSelectedItem = () => {};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFDTTtBQUNNO0FBQ1o7QUFDRjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGlFQUFpQjtBQUM3Qyw0QkFBNEIsOERBQWM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixvRUFBb0I7QUFDdkM7QUFDQSxNQUFNLDBEQUFjO0FBQ3BCLE1BQU0seURBQWE7QUFDbkIsTUFBTTtBQUNOLE1BQU0sMERBQWM7QUFDcEIsTUFBTSx5REFBYTtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVELGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdEQzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGNBQWMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7QUFDTTs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDhEQUFjO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLDJEQUFXO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLGNBQWMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDaEU5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7O0FBRTNCO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmlEO0FBQ29CO0FBQ0Y7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDBEQUFjLGdDQUFnQztBQUNwRCxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDLHFCQUFxQiwwREFBYzs7QUFFbkM7QUFDQSwrQkFBK0Isd0VBQXdCO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0M7QUFDaEMsSUFBSSxxRUFBeUIsY0FBYywwREFBYztBQUN6RCxpQ0FBaUMsMERBQWM7QUFDL0M7O0FBRUE7QUFDQSx1Q0FBdUMsd0VBQXdCO0FBQy9EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxRDdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQa0I7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSw2REFBYTtBQUMxQjs7QUFFQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBLHNCQUFzQiw2REFBYTtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsNkRBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2Qiw2REFBYTtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSx3QkFBd0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbkR4QztBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUNBQW1DO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxvQkFBb0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDUnBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxpQkFBaUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDVmpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDWmlCOztBQUUvQztBQUNBLGFBQWEsNkRBQWE7QUFDMUI7O0FBRUEsZUFBZSw2REFBYTs7QUFFNUI7QUFDQTs7QUFFQSxpRUFBZSx5QkFBeUIsRUFBQzs7Ozs7OztVQ1h6QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNtRDtBQUNNO0FBQ0Y7QUFDdkQsSUFBSSxrRUFBYztBQUNsQixrRUFBYyxjQUFjLHlCQUF5QjtBQUNyRCxrRUFBYyxjQUFjLHNCQUFzQjtBQUNsRCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Q7QUFDQTtBQUNBLENBQUM7QUFDRCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBLENBQUM7QUFDRCxJQUFJLGtFQUFjO0FBQ2xCLGlFQUFhO0FBQ2IsaUVBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvRm9ybU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9VSU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlT2JqZWN0RnJvbUZvcm0uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVByb2plY3RGb3JtLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVUb2RvRm9ybS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcmVuZGVyU2VsZWN0UHJvalRvZG9zLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVUb2RvRm9ybSBmcm9tIFwiLi9jcmVhdGVUb2RvRm9ybS5qc1wiO1xuaW1wb3J0IGNyZWF0ZVByb2plY3RGb3JtIGZyb20gXCIuL2NyZWF0ZVByb2plY3RGb3JtLmpzXCI7XG5pbXBvcnQgY3JlYXRlT2JqZWN0RnJvbUZvcm0gZnJvbSBcIi4vY3JlYXRlT2JqZWN0RnJvbUZvcm0uanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vVG9kb1VJTWFuYWdlci5qc1wiO1xuXG5jb25zdCBGb3JtTWFuYWdlciA9ICgoKSA9PiB7XG4gIC8qIHJlZmVyZW5jZXMgKi9cbiAgY29uc3QgY3JlYXRlTmV3VG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy10b2RvXCIpO1xuICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXByb2plY3RcIik7XG5cbiAgY29uc3QgaGFuZGxlQnRuQ3JlYXRlRm9ybUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFRvQXBwZW5kRm9ybVRvID0gZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSkgcmV0dXJuO1xuICAgIGNvbnN0IGlzTmV3UHJvamVjdCA9IGV2ZW50LnRhcmdldC5pZC5pbmNsdWRlcyhcInByb2plY3RcIik7XG4gICAgbGV0IGZvcm1UeXBlVGVtcGxhdGU7XG4gICAgaXNOZXdQcm9qZWN0XG4gICAgICA/IChmb3JtVHlwZVRlbXBsYXRlID0gY3JlYXRlUHJvamVjdEZvcm0oKSlcbiAgICAgIDogKGZvcm1UeXBlVGVtcGxhdGUgPSBjcmVhdGVUb2RvRm9ybSgpKTtcbiAgICBlbGVtZW50VG9BcHBlbmRGb3JtVG8uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGZvcm1UeXBlVGVtcGxhdGUpO1xuICAgIGNvbnN0IGZvcm0gPSBlbGVtZW50VG9BcHBlbmRGb3JtVG8ucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG4gICAgaW5pdGlhbGl6ZUZvcm0oZm9ybSwgaXNOZXdQcm9qZWN0KTtcbiAgfTtcblxuICBjb25zdCBpbml0aWFsaXplRm9ybSA9IChmb3JtLCBpc05ld1Byb2plY3QpID0+IHtcbiAgICBjb25zdCBzdWJtaXRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICBoYW5kbGVGb3JtU3VibWl0KGV2ZW50LCBmb3JtLCBpc05ld1Byb2plY3QpO1xuICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHN1Ym1pdEhhbmRsZXIpO1xuICAgICAgZm9ybS5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHN1Ym1pdEhhbmRsZXIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoZXZlbnQsIGZvcm0sIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgb2JqZWN0ID0gY3JlYXRlT2JqZWN0RnJvbUZvcm0oZ2V0SW5wdXRFbGVtZW50cyhmb3JtKSk7XG4gICAgaWYgKGlzTmV3UHJvamVjdCkge1xuICAgICAgUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdChvYmplY3QpO1xuICAgICAgVG9kb1VJTWFuYWdlci5wb3B1bGF0ZVByb2plY3RzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdChvYmplY3QpO1xuICAgICAgVG9kb1VJTWFuYWdlci5wb3B1bGF0ZVNlbGVjdEdyb3VwVG9kb3MoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICBjcmVhdGVOZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdG5DcmVhdGVGb3JtQ2xpY2spO1xuXG4gIGNyZWF0ZU5ld1RvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUJ0bkNyZWF0ZUZvcm1DbGljayk7XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcbiIsImxldCBwcm9qZWN0SURDb3VudGVyID0gMDtcblxuY29uc3Qgc2hhcmVkTWV0aG9kcyA9IHtcbiAgZ2V0VG9kb3M6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfSxcblxuICBhZGRUb2RvOiBmdW5jdGlvbiAodG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfSxcblxuICBkZWxldGVUb2RvOiBmdW5jdGlvbiAodG9kb0lEKSB7XG4gICAgdGhpcy50b2Rvcy5mb3JFYWNoKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRvZG8udG9kb0lEID09PSB0b2RvSUQpIHtcbiAgICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIHRvZ2dsZVNlbGVjdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pc1NlbGVjdGVkID0gIXRoaXMuaXNTZWxlY3RlZDtcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KG9iamVjdCkge1xuICBjb25zdCBwcm9qZWN0ID0ge1xuICAgIHRpdGxlOiBvYmplY3QudGl0bGUsXG4gICAgcHJvamVjdElEOiBwcm9qZWN0SURDb3VudGVyLFxuICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgIHRvZG9zOiBbXSxcbiAgfTtcblxuICAvL3VzZSBvYmplY3Quc2V0UHJvdG90eXBlT2YgdG8gYXNzaWduIG1ldGhvZHMgdG8gcHJvdG95cGUsIHRvIGF2b2lkIGR1cGxpY2F0aW9uXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihwcm9qZWN0LCBzaGFyZWRNZXRob2RzKTtcblxuICBwcm9qZWN0SURDb3VudGVyKys7XG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcbiIsImltcG9ydCBUb2RvRmFjdG9yeSBmcm9tIFwiLi9Ub2RvRmFjdG9yeS5qc1wiO1xuaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFByb2plY3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgbGV0IGN1cnJTZWxlY3RlZFByb2o7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0VGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdEZhY3RvcnkocHJvamVjdFRpdGxlKTtcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LnByb2plY3RJRCA9PT0gcHJvamVjdElEKSB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyogYWx0IHZlcnNpb24gY291bGQgdXNlIGZpbHRlciBhbmQgcmVhc3NpZ24gdG8gcHJvamVjdHMgdmFyLiAqL1xuICB9O1xuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgY29uc3QgZ2V0U2VsZWN0ZWRQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBnZXRTZWxlY3RlZFByb2plY3RUb2RvcyA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2ouZ2V0VG9kb3MoKTtcblxuICBjb25zdCBzZXRTZWxlY3RlZFByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgZGVzZWxlY3RDdXJyUHJvamVjdCgpO1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LnByb2plY3RJRCA9PT0gcHJvamVjdElEKSB7XG4gICAgICAgIGN1cnJTZWxlY3RlZFByb2ogPSBwcm9qZWN0O1xuICAgICAgICBjdXJyU2VsZWN0ZWRQcm9qLnRvZ2dsZVNlbGVjdGVkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJTZWxlY3RlZFByb2opO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZGVzZWxlY3RDdXJyUHJvamVjdCA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2o/LnRvZ2dsZVNlbGVjdGVkKCk7XG5cbiAgY29uc3QgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0ID0gKGlucHV0RWxlbWVudHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHByb2plY3QgaXM6IFwiLCBjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICBjb25zdCB0b2RvID0gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cyk7XG4gICAgY3VyclNlbGVjdGVkUHJvai5hZGRUb2RvKHRvZG8pO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVUb2RvRnJvbVNlbGVjdGVkUHJvamVjdCA9ICh0b2RvSUQpID0+IHtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLmRlbGV0ZVRvZG8odG9kb0lEKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBnZXRTZWxlY3RlZFByb2plY3QsXG4gICAgZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MsXG4gICAgc2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCxcbiAgICBkZWxldGVUb2RvRnJvbVNlbGVjdGVkUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RNYW5hZ2VyO1xuIiwibGV0IHRvZG9JRENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBUb2RvRmFjdG9yeShvYmopIHtcbiAgY29uc3QgdG9kbyA9IHt9O1xuICB0b2RvLnRvZG9JRCA9IHRvZG9JRENvdW50ZXI7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIHRvZG9ba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgdG9kb0lEQ291bnRlcisrO1xuICByZXR1cm4gdG9kbztcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0ZhY3Rvcnk7XG5cbi8qIGxvb3BzIHRocm91Z2ggZWFjaCBrZXkgaW4gYXJndW1lbnRvYmogKi9cbi8qIHJldHVybnMge30gd2l0aCBrZXk6dmFsdWUgcGFpcnMqL1xuLyogdGl0bGUgKi9cbi8qIGRlc2NyaXB0aW9uICovXG4vKiBkdWVEYXRlICovXG4vKiBwcmlvcml0eSAqL1xuLyogbm90ZXMgKi9cbi8qIGNoZWNrbGlzdCAoc3ViIHN0ZXBzKSAqL1xuLyogbWF5YmUgYWRkIG1ldGhvZHMgdG8gdGhlIG9iamVjdHMgYXMgd2VsbD8gKi9cbiIsImltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdCBmcm9tIFwiLi9jcmVhdGVMaXN0SXRlbUZyb21PYmplY3QuanNcIjtcbmltcG9ydCByZW5kZXJTZWxlY3RQcm9qVG9kb3NIVE1MIGZyb20gXCIuL3JlbmRlclNlbGVjdFByb2pUb2Rvcy5qc1wiO1xuXG5jb25zdCBUb2RvVUlNYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1saXN0XCIpO1xuICBsZXQgcHJldmlvdXNMaXN0R3JvdXA7XG5cbiAgY29uc3Qgc2hvd1NlbGVjdGVkR3JvdXAgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBsaXN0R3JvdXAgPSBldmVudC50YXJnZXQuY2xvc2VzdChcImxpXCIpO1xuICAgIGlmIChsaXN0R3JvdXAgIT09IHByZXZpb3VzTGlzdEdyb3VwKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SUQgPSArbGlzdEdyb3VwLmRhdGFzZXQucHJvamVjdDtcbiAgICAgIFByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdChwcm9qZWN0SUQpOyAvL3JlbmFtZSB3aGVuIHlvdSBhZGQgdGhlIG90aGVyIGdyb3Vwc1xuICAgICAgcG9wdWxhdGVTZWxlY3RHcm91cFRvZG9zKCk7IC8vJ3RvZGF5JywgJ2ltcG9ydGFudCcgZXRjLlxuICAgICAgcHJldmlvdXNMaXN0R3JvdXAgPSBsaXN0R3JvdXA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFkZExhdGVzdEl0ZW0gPSAoKSA9PiB7XG4gICAgLy9nZXQgbGlzdCB0byBhZGQgdG9cbiAgICAvL1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkSXRlbSA9ICgpID0+IHt9O1xuXG4gIGNvbnN0IGVkaXRTZWxlY3RlZEl0ZW0gPSAoKSA9PiB7fTtcblxuICBjb25zdCBwb3B1bGF0ZVByb2plY3RzID0gKCkgPT4ge1xuICAgIHByb2plY3RzTGlzdC5pbm5lckhUTUwgPSBcIlwiOyAvKiBiYWQ/ICovXG4gICAgY29uc3QgcHJvamVjdHMgPSBQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT5cbiAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QocHJvamVjdCkpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZVNlbGVjdEdyb3VwVG9kb3MgPSAoKSA9PiB7XG4gICAgbWFpbkNvbnRlbnQuaW5uZXJIVE1MID0gXCJcIjsgLyogYmFkPyAqL1xuICAgIHJlbmRlclNlbGVjdFByb2pUb2Rvc0hUTUwobWFpbkNvbnRlbnQsIFByb2plY3RNYW5hZ2VyLmdldFNlbGVjdGVkUHJvamVjdCgpKTtcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3RUb2RvcyA9IFByb2plY3RNYW5hZ2VyLmdldFNlbGVjdGVkUHJvamVjdFRvZG9zKCk7XG4gICAgY29uc3QgY3VyclByb2plY3RUb2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnItcHJvamVjdC10b2Rvc1wiKTtcblxuICAgIHNlbGVjdGVkUHJvamVjdFRvZG9zLmZvckVhY2goKHByb2plY3QpID0+XG4gICAgICBjdXJyUHJvamVjdFRvZG9zTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QocHJvamVjdCkpXG4gICAgKTtcbiAgfTtcblxuICBwcm9qZWN0c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dTZWxlY3RlZEdyb3VwKTtcblxuICByZXR1cm4ge1xuICAgIHBvcHVsYXRlUHJvamVjdHMsXG4gICAgcG9wdWxhdGVTZWxlY3RHcm91cFRvZG9zLFxuICAgIGFkZExhdGVzdEl0ZW0sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvVUlNYW5hZ2VyO1xuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlID0gXCJkaXZcIiwgY2xhc3NuYW1lID0gXCJcIiwgaWQgPSBcIlwiKSB7XG4gIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGlmIChjbGFzc25hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSk7XG4gIGlmIChpZCkgZWxlLmlkID0gaWQ7XG4gIHJldHVybiBlbGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVsZW1lbnQ7XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmNvbnN0IGdldE9iamVjdElEQW5kVGFnID0gKG9iamVjdCkgPT4ge1xuICBjb25zdCBrZXkxID0gXCJwcm9qZWN0SURcIjtcbiAgY29uc3Qga2V5MiA9IFwidG9kb0lEXCI7XG4gIGNvbnN0IG9iaklEID0gb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTEpXG4gICAgPyBvYmplY3QucHJvamVjdElEXG4gICAgOiBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MilcbiAgICA/IG9iamVjdC50b2RvSURcbiAgICA6IG51bGw7XG5cbiAgY29uc3QgaWRUYWcgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IFwicHJvamVjdFwiXG4gICAgOiBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MilcbiAgICA/IFwidG9kb1wiXG4gICAgOiBudWxsO1xuXG4gIHJldHVybiBbb2JqSUQsIGlkVGFnXTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChvYmplY3QpIHtcbiAgY29uc3QgW29iaklELCBpZFRhZ10gPSBnZXRPYmplY3RJREFuZFRhZyhvYmplY3QpO1xuXG4gIGNvbnN0IGxpID0gY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5kYXRhc2V0W2lkVGFnXSA9IG9iaklEO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcbiAgICAvKiBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB2YWx1ZSk7ICovXG4gICAgaWYgKGtleSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICBjb25zdCBoZWFkaW5nID0gY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XG4gICAgICBjb25zdCBwID0gY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICB9XG4gIH1cblxuICAvKiB1c2Ugb3JkZXIgdG8gcGxhY2UgdGhpcyBhbGwgdGhlIHdheSB0byBsZWZ0IGluIGxpICovXG4gIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoXCJ0b2RvSURcIikpIHtcbiAgICBjb25zdCBjaGVja0NvbXBsZXRlQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIm5vdC1jb21wbGV0ZVwiKTtcbiAgICBjaGVja0NvbXBsZXRlQnRuLnRleHRDb250ZW50ID0gXCJNYXJrIGNvbXBsZXRlXCI7XG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tDb21wbGV0ZUJ0bik7XG4gIH1cblxuICByZXR1cm4gbGk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdDtcbiIsImZ1bmN0aW9uIGNyZWF0ZU9iamVjdEZyb21Gb3JtKGZvcm1JbnB1dHMpIHtcbiAgcmV0dXJuIGZvcm1JbnB1dHMucmVkdWNlKFxuICAgIChvYmplY3QsIGl0ZW0pID0+XG4gICAgICBpdGVtLnZhbHVlID8geyAuLi5vYmplY3QsIFtpdGVtLmlkXTogaXRlbS52YWx1ZSB9IDogb2JqZWN0LFxuICAgIHt9XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU9iamVjdEZyb21Gb3JtO1xuIiwiY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC1wcm9qZWN0LWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcm9qZWN0Rm9ybTtcbiIsImNvbnN0IGNyZWF0ZVRvZG9Gb3JtID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb246IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVG9kb0Zvcm07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIHJlbmRlclNlbGVjdFByb2pUb2Rvc0hUTUwoZWxlbWVudFRvQXBwZW5kVG8sIHByb2plY3RPYmopIHtcbiAgY29uc3QgaDEgPSBjcmVhdGVFbGVtZW50KFwiaDFcIiwgXCJ0ZXN0XCIsIFwicHJvamVjdC10aXRsZVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqPy50aXRsZSA/PyBcIkRlZmF1bHQgVGl0bGVcIjtcblxuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbWVudChcInVsXCIsIFwidGVzdDJcIiwgXCJjdXJyLXByb2plY3QtdG9kb3NcIik7XG5cbiAgZWxlbWVudFRvQXBwZW5kVG8uYXBwZW5kKGgxLCBsaXN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyU2VsZWN0UHJvalRvZG9zSFRNTDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qc1wiO1xubG9nKFByb2plY3RNYW5hZ2VyKTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoeyB0aXRsZTogXCJSZWZ1cm5pc2ggSG9tZVwiIH0pO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlBhaW50IFdhbGxzXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMCk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHNvZmFcIixcbiAgZGVzY3JpcHRpb246IFwibGlmdCBkb250IGRyYWdcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwibW92ZSB0YWJsZVwiLFxuICBkZXNjcmlwdGlvbjogXCJkcmFnIGl0IHJvdWdobHlcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KDEpO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwiYnV5IHBhaW50XCIsXG4gIGRlc2NyaXB0aW9uOiBcIm1peCBpdCB3ZWxsIGJlZm9yZSBhcHBseWluZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJidXkgYnJ1c2hcIixcbn0pO1xubG9nKFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCkpO1xuVG9kb1VJTWFuYWdlci5wb3B1bGF0ZVByb2plY3RzKFwicHJvamVjdHNcIik7XG5Ub2RvVUlNYW5hZ2VyLnBvcHVsYXRlU2VsZWN0R3JvdXBUb2RvcyhcInRvZG9zXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9