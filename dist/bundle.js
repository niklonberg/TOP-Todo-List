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
/* harmony import */ var _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectManager.js */ "./src/modules/ProjectManager.js");
/* harmony import */ var _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoUIManager.js */ "./src/modules/TodoUIManager.js");



const FormManager = (() => {
  /* references */
  const createNewTodoBtn = document.querySelector("#create-new-todo");
  const createNewProjectBtn = document.querySelector("#create-new-project");

  const handleBtnCreateFormClick = (event) => {
    const elementToAppendFormTo = event.target.previousElementSibling;
    if (elementToAppendFormTo.querySelector("form")) return;

    const isNewProject = determineFormType(event);

    const formTypeTemplate = isNewProject
      ? createProjectForm()
      : createTodoForm();

    createAndAppendForm(elementToAppendFormTo, formTypeTemplate);

    const form = elementToAppendFormTo.querySelector("form");
    initializeForm(form, isNewProject);
  };
  createNewProjectBtn.addEventListener("click", handleBtnCreateFormClick);
  createNewTodoBtn.addEventListener("click", handleBtnCreateFormClick);

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
    const templateObj = createObjectFromForm(getInputElements(form));
    const object = isNewProject
      ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(templateObj)
      : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].addTodoToSelectedProject(templateObj);

    _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addLatestItem(object, isNewProject);
  };

  const createEditForm = (object, objectID, parentLi) => {
    console.log(object, objectID, parentLi);
  };

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  return {
    createEditForm,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormManager);

function determineFormType(event) {
  return event.target.id.includes("project");
}

function createProjectForm() {
  return `
  <form action="#" id="add-project-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" />
    <button type="submit">Add todo</button>
  </form>
  `;
}

function createTodoForm() {
  return `
  <form action="#" id="add-todo-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" />
    <label for="description">Description: </label>
    <input type="text" name="description" id="description" />
    <label for="isImportant">Extra important?</label>
    <input type="checkbox" name="isImportant" id="isImportant" />
    <button type="submit">Add todo</button>
  </form>
  `;
}

function createObjectFromForm(formInputs) {
  return formInputs.reduce((object, item) => {
    if (item.type === "checkbox") {
      return { ...object, [item.id]: item.checked };
    } else {
      return item.value ? { ...object, [item.id]: item.value } : object;
    }
  }, {});
}

function createAndAppendForm(elementToAppendFormTo, formTypeTemplate) {
  elementToAppendFormTo.insertAdjacentHTML("beforeend", formTypeTemplate);
}


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

const sharedMethods = {
  getTodos: function () {
    return this.todos;
  },

  getTodo: function (todoID) {
    return this.todos.find((todo) => todo.todoID === todoID);
  },

  addTodo: function (todo) {
    this.todos.push(todo);
  },

  removeTodo: function (todoID) {
    this.todos = this.todos.filter((todo) => todo.todoID !== todoID);
  },

  toggleTodoBoolProperty: function (todoID, todoProperty) {
    const targetTodo = this.getTodo(todoID);
    targetTodo[todoProperty] = !targetTodo[todoProperty];
  },

  toggleSelected: function () {
    this.isSelected = !this.isSelected;
  },
};


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
  let projects = [];
  let currSelectedProj;

  const addProject = (projectTitle) => {
    const project = (0,_ProjectFactory_js__WEBPACK_IMPORTED_MODULE_1__["default"])(projectTitle);
    projects.push(project);
    return project;
  };

  const removeSelectedProject = (projectID) =>
    (projects = projects.filter((project) => project.projectID !== projectID));

  /* const getProject = (projectID) => {}; */

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

  const removeSelectedTodo = (todoID) => {
    projects.forEach((project) => {
      project.removeTodo(todoID);
    });
  };

  const toggleSelectedTodoProperty = (todoID, todoProperty) => {
    console.log(todoID, todoProperty);
    projects
      .find((project) => project.getTodo(todoID))
      .toggleTodoBoolProperty(todoID, todoProperty);
  };

  const getFilteredTasks = (listGroupSelectionID = "all-tasks") => {
    if (listGroupSelectionID === "all-tasks") {
      return projects
        .map((project) => {
          return project.getTodos();
        })
        .flat();
    }
    if (listGroupSelectionID === "today-tasks") {
      // filter through all projects todos
      // return the ones with a date obj of today
    }
    if (someFlag === "week-tasks") {
      // filter through all projects todos
      // return the ones with a date within next 7 days
    }
    if (someFlag === "important-tasks") {
      // filter through all projects todos
      // return the ones with a isImportant === true
    }
  };

  return {
    addProject,
    removeSelectedProject,
    getProjects,
    getSelectedProject,
    getSelectedProjectTodos /* sure about export all of them?? */,
    setSelectedProject,
    addTodoToSelectedProject,
    removeSelectedTodo,
    toggleSelectedTodoProperty,
    getFilteredTasks,
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
  todo.isCompleted = false;
  todo.isImportant = false;

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
/* harmony import */ var _FormManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormManager.js */ "./src/modules/FormManager.js");
/* harmony import */ var _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectManager.js */ "./src/modules/ProjectManager.js");
/* harmony import */ var _createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createListItemFromObject.js */ "./src/modules/createListItemFromObject.js");
/* harmony import */ var _createBaseGroupHTML_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createBaseGroupHTML.js */ "./src/modules/createBaseGroupHTML.js");





const TodoUIManager = (() => {
  /* references */
  const appContent = document.querySelector("#app-content");
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  const sideBar = document.querySelector("#side-bar");
  let previousListGroupSelection;

  const renderProjectsList = () => {
    removeHTMLContent(projectsList);
    const projects = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects();

    projects.forEach((project) =>
      projectsList.appendChild((0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(project))
    );
  };

  const renderSelectedGroup = (listGroupSelection) => {
    console.log(listGroupSelection);
    removeHTMLContent(mainContent);
    const [h1, currGroupingTodos] = (0,_createBaseGroupHTML_js__WEBPACK_IMPORTED_MODULE_3__["default"])(listGroupSelection);
    mainContent.append(h1, currGroupingTodos);

    const selectedGroupTodos =
      listGroupSelection && listGroupSelection.dataset.project
        ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedProjectTodos()
        : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getFilteredTasks(listGroupSelection?.id);

    selectedGroupTodos.forEach((grouping) =>
      currGroupingTodos.appendChild((0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(grouping))
    );
  };

  const showSelectedGroup = (event) => {
    const listGroupSelection = event.target.closest("li");
    if (listGroupSelection !== previousListGroupSelection) {
      const projectID = listGroupSelection.dataset.project;
      if (projectID !== undefined)
        _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(+projectID);
      renderSelectedGroup(listGroupSelection);
      previousListGroupSelection = listGroupSelection;
    }
  };
  sideBar.addEventListener("click", showSelectedGroup);

  const addLatestItem = (object, isNewProject) => {
    console.log(object);
    const currGroupTodosList = document.querySelector("#curr-grouping-todos");
    const item = (0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object);
    isNewProject
      ? projectsList.appendChild(item)
      : currGroupTodosList.appendChild(item);
  };

  const editSelectedItem = (event) => {
    const [isDeleteAction, isEditAction] = determineEditOrDeleteAction(event);
    const [object, objectID, parentLi] =
      isDeleteAction || isEditAction ? determineTodoOrProject(event) : null;

    if (isDeleteAction) removeSelectedItem(object, objectID, parentLi);

    if (isEditAction) {
      _FormManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].createEditForm(object, objectID, parentLi);
    }
  };
  appContent.addEventListener("click", editSelectedItem);

  const removeSelectedItem = (objectToDelete, objectID, parentLi) => {
    if (objectToDelete === "project") {
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeSelectedProject(objectID);
      renderSelectedGroup();
    }

    if (objectToDelete === "todo") _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeSelectedTodo(objectID);

    parentLi?.remove();

    console.log(_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());
  };

  function determineEditOrDeleteAction(event) {
    const isDeleteAction = event.target.classList.contains("delete-item")
      ? true
      : false;
    const isEditAction = event.target.classList.contains("edit-item")
      ? true
      : false;
    return [isDeleteAction, isEditAction];
  }

  function determineTodoOrProject(event) {
    const parentLi = event.target.closest("li");
    const parentObjectDataset = parentLi.dataset;
    const object = Object.keys(parentObjectDataset)[0];
    const objectID = +Object.values(parentObjectDataset)[0];
    return [object, objectID, parentLi];
  }

  const toggleBtnTodoProperty = (event) => {
    let todoProperty = determineTodoProperty(event);

    if (todoProperty) {
      const btn = event.target;
      const todoID = +btn.closest("li").dataset.todo;
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].toggleSelectedTodoProperty(todoID, todoProperty);
    }
  };
  appContent.addEventListener("click", toggleBtnTodoProperty);

  return {
    renderProjectsList,
    renderSelectedGroup,
    addLatestItem,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoUIManager);

function determineTodoProperty(event) {
  let todoProperty = null;
  if (event.target.classList.contains("toggle-complete-btn"))
    todoProperty = "isCompleted";
  if (event.target.classList.contains("toggle-important-btn"))
    todoProperty = "isImportant";
  return todoProperty;
}

function removeHTMLContent(element) {
  element.innerHTML = "";
}


/***/ }),

/***/ "./src/modules/createBaseGroupHTML.js":
/*!********************************************!*\
  !*** ./src/modules/createBaseGroupHTML.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ "./src/modules/createElement.js");


function createBaseGroupHTML(listGroupSelection) {
  console.log(listGroupSelection);
  const h1 = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("h1", "test", "grouping-title");
  h1.textContent =
    listGroupSelection?.querySelector("h3").textContent ?? "All Tasks";

  const list = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("ul", "test2", "curr-grouping-todos");

  return [h1, list];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createBaseGroupHTML);


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

  if (object.hasOwnProperty("todoID")) {
    /* use order to place completeBtn all the way to left in li */
    const checkCompleteBtn = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("button", "toggle-complete-btn");
    checkCompleteBtn.textContent = "Mark complete"; /* make sep fn */
    li.appendChild(checkCompleteBtn);

    const checkImportantBtn = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("button", "toggle-important-btn");
    checkImportantBtn.textContent = "Mark important"; /* make sep fn */
    li.appendChild(checkImportantBtn);
  }

  const editContainer = createEditContainer();
  li.appendChild(editContainer);

  return li; /* lots of repeating appendCHilding */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createListItemFromObject);

function createEditContainer() {
  const editContainer = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("div", "edit-container");
  const editBtn = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("button", "edit-item");
  editBtn.textContent = "Edit";
  const deleteBtn = (0,_createElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])("button", "delete-item");
  deleteBtn.textContent = "Delete";
  editContainer.append(editBtn, deleteBtn);

  return editContainer;
}

function getObjectIDAndTag(object) {
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
}


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
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].renderProjectsList("projects");
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].renderSelectedGroup();
/* TodoUIManager.renderSelectedGroup("todos"); */

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YTtBQUMzQyxzREFBc0Q7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7QUFFQSxpRUFBZSx3QkFBd0IsRUFBQzs7QUFFeEM7QUFDQSx3QkFBd0IsNkRBQWE7QUFDckMsa0JBQWtCLDZEQUFhO0FBQy9CO0FBQ0Esb0JBQW9CLDZEQUFhO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztVQ3JFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNtRDtBQUNNO0FBQ0Y7QUFDdkQsSUFBSSxrRUFBYztBQUNsQixrRUFBYyxjQUFjLHlCQUF5QjtBQUNyRCxrRUFBYyxjQUFjLHNCQUFzQjtBQUNsRCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Q7QUFDQTtBQUNBLENBQUM7QUFDRCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBLENBQUM7QUFDRCxJQUFJLGtFQUFjO0FBQ2xCLGlFQUFhO0FBQ2IsaUVBQWE7QUFDYiwrQ0FBK0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvRm9ybU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9VSU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUJhc2VHcm91cEhUTUwuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL1RvZG9VSU1hbmFnZXIuanNcIjtcblxuY29uc3QgRm9ybU1hbmFnZXIgPSAoKCkgPT4ge1xuICAvKiByZWZlcmVuY2VzICovXG4gIGNvbnN0IGNyZWF0ZU5ld1RvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctdG9kb1wiKTtcbiAgY29uc3QgY3JlYXRlTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy1wcm9qZWN0XCIpO1xuXG4gIGNvbnN0IGhhbmRsZUJ0bkNyZWF0ZUZvcm1DbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUb0FwcGVuZEZvcm1UbyA9IGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIGlmIChlbGVtZW50VG9BcHBlbmRGb3JtVG8ucXVlcnlTZWxlY3RvcihcImZvcm1cIikpIHJldHVybjtcblxuICAgIGNvbnN0IGlzTmV3UHJvamVjdCA9IGRldGVybWluZUZvcm1UeXBlKGV2ZW50KTtcblxuICAgIGNvbnN0IGZvcm1UeXBlVGVtcGxhdGUgPSBpc05ld1Byb2plY3RcbiAgICAgID8gY3JlYXRlUHJvamVjdEZvcm0oKVxuICAgICAgOiBjcmVhdGVUb2RvRm9ybSgpO1xuXG4gICAgY3JlYXRlQW5kQXBwZW5kRm9ybShlbGVtZW50VG9BcHBlbmRGb3JtVG8sIGZvcm1UeXBlVGVtcGxhdGUpO1xuXG4gICAgY29uc3QgZm9ybSA9IGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgICBpbml0aWFsaXplRm9ybShmb3JtLCBpc05ld1Byb2plY3QpO1xuICB9O1xuICBjcmVhdGVOZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdG5DcmVhdGVGb3JtQ2xpY2spO1xuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdG5DcmVhdGVGb3JtQ2xpY2spO1xuXG4gIGNvbnN0IGluaXRpYWxpemVGb3JtID0gKGZvcm0sIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHN1Ym1pdEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQsIGZvcm0sIGlzTmV3UHJvamVjdCk7XG4gICAgICBmb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgc3VibWl0SGFuZGxlcik7XG4gICAgICBmb3JtLnJlbW92ZSgpO1xuICAgIH07XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHN1Ym1pdEhhbmRsZXIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoZXZlbnQsIGZvcm0sIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGVtcGxhdGVPYmogPSBjcmVhdGVPYmplY3RGcm9tRm9ybShnZXRJbnB1dEVsZW1lbnRzKGZvcm0pKTtcbiAgICBjb25zdCBvYmplY3QgPSBpc05ld1Byb2plY3RcbiAgICAgID8gUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh0ZW1wbGF0ZU9iailcbiAgICAgIDogUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHRlbXBsYXRlT2JqKTtcblxuICAgIFRvZG9VSU1hbmFnZXIuYWRkTGF0ZXN0SXRlbShvYmplY3QsIGlzTmV3UHJvamVjdCk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRWRpdEZvcm0gPSAob2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGkpID0+IHtcbiAgICBjb25zb2xlLmxvZyhvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUVkaXRGb3JtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRm9ybU1hbmFnZXI7XG5cbmZ1bmN0aW9uIGRldGVybWluZUZvcm1UeXBlKGV2ZW50KSB7XG4gIHJldHVybiBldmVudC50YXJnZXQuaWQuaW5jbHVkZXMoXCJwcm9qZWN0XCIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0Rm9ybSgpIHtcbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXByb2plY3QtZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0Zvcm0oKSB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC10b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiaXNJbXBvcnRhbnRcIj5FeHRyYSBpbXBvcnRhbnQ/PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImlzSW1wb3J0YW50XCIgaWQ9XCJpc0ltcG9ydGFudFwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RGcm9tRm9ybShmb3JtSW5wdXRzKSB7XG4gIHJldHVybiBmb3JtSW5wdXRzLnJlZHVjZSgob2JqZWN0LCBpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0udHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICByZXR1cm4geyAuLi5vYmplY3QsIFtpdGVtLmlkXTogaXRlbS5jaGVja2VkIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpdGVtLnZhbHVlID8geyAuLi5vYmplY3QsIFtpdGVtLmlkXTogaXRlbS52YWx1ZSB9IDogb2JqZWN0O1xuICAgIH1cbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbmRBcHBlbmRGb3JtKGVsZW1lbnRUb0FwcGVuZEZvcm1UbywgZm9ybVR5cGVUZW1wbGF0ZSkge1xuICBlbGVtZW50VG9BcHBlbmRGb3JtVG8uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGZvcm1UeXBlVGVtcGxhdGUpO1xufVxuIiwibGV0IHByb2plY3RJRENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBQcm9qZWN0RmFjdG9yeShvYmplY3QpIHtcbiAgY29uc3QgcHJvamVjdCA9IHtcbiAgICB0aXRsZTogb2JqZWN0LnRpdGxlLFxuICAgIHByb2plY3RJRDogcHJvamVjdElEQ291bnRlcixcbiAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICB0b2RvczogW10sXG4gIH07XG5cbiAgLy91c2Ugb2JqZWN0LnNldFByb3RvdHlwZU9mIHRvIGFzc2lnbiBtZXRob2RzIHRvIHByb3RveXBlLCB0byBhdm9pZCBkdXBsaWNhdGlvblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvamVjdCwgc2hhcmVkTWV0aG9kcyk7XG5cbiAgcHJvamVjdElEQ291bnRlcisrO1xuICByZXR1cm4gcHJvamVjdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdEZhY3Rvcnk7XG5cbmNvbnN0IHNoYXJlZE1ldGhvZHMgPSB7XG4gIGdldFRvZG9zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH0sXG5cbiAgZ2V0VG9kbzogZnVuY3Rpb24gKHRvZG9JRCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zLmZpbmQoKHRvZG8pID0+IHRvZG8udG9kb0lEID09PSB0b2RvSUQpO1xuICB9LFxuXG4gIGFkZFRvZG86IGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9LFxuXG4gIHJlbW92ZVRvZG86IGZ1bmN0aW9uICh0b2RvSUQpIHtcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8udG9kb0lEICE9PSB0b2RvSUQpO1xuICB9LFxuXG4gIHRvZ2dsZVRvZG9Cb29sUHJvcGVydHk6IGZ1bmN0aW9uICh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSkge1xuICAgIGNvbnN0IHRhcmdldFRvZG8gPSB0aGlzLmdldFRvZG8odG9kb0lEKTtcbiAgICB0YXJnZXRUb2RvW3RvZG9Qcm9wZXJ0eV0gPSAhdGFyZ2V0VG9kb1t0b2RvUHJvcGVydHldO1xuICB9LFxuXG4gIHRvZ2dsZVNlbGVjdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pc1NlbGVjdGVkID0gIXRoaXMuaXNTZWxlY3RlZDtcbiAgfSxcbn07XG4iLCJpbXBvcnQgVG9kb0ZhY3RvcnkgZnJvbSBcIi4vVG9kb0ZhY3RvcnkuanNcIjtcbmltcG9ydCBQcm9qZWN0RmFjdG9yeSBmcm9tIFwiLi9Qcm9qZWN0RmFjdG9yeS5qc1wiO1xuXG5jb25zdCBQcm9qZWN0TWFuYWdlciA9ICgoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtdO1xuICBsZXQgY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0RmFjdG9yeShwcm9qZWN0VGl0bGUpO1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgcmV0dXJuIHByb2plY3Q7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT5cbiAgICAocHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdElEICE9PSBwcm9qZWN0SUQpKTtcblxuICAvKiBjb25zdCBnZXRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge307ICovXG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICBjb25zdCBnZXRTZWxlY3RlZFByb2plY3QgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qO1xuXG4gIGNvbnN0IGdldFNlbGVjdGVkUHJvamVjdFRvZG9zID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvai5nZXRUb2RvcygpO1xuXG4gIGNvbnN0IHNldFNlbGVjdGVkUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcbiAgICBkZXNlbGVjdEN1cnJQcm9qZWN0KCk7XG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QucHJvamVjdElEID09PSBwcm9qZWN0SUQpIHtcbiAgICAgICAgY3VyclNlbGVjdGVkUHJvaiA9IHByb2plY3Q7XG4gICAgICAgIGN1cnJTZWxlY3RlZFByb2oudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VyclNlbGVjdGVkUHJvaik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkZXNlbGVjdEN1cnJQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvaj8udG9nZ2xlU2VsZWN0ZWQoKTtcblxuICBjb25zdCBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QgPSAoaW5wdXRFbGVtZW50cykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgcHJvamVjdCBpczogXCIsIGN1cnJTZWxlY3RlZFByb2opO1xuICAgIGNvbnN0IHRvZG8gPSBUb2RvRmFjdG9yeShpbnB1dEVsZW1lbnRzKTtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLmFkZFRvZG8odG9kbyk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIHJldHVybiB0b2RvO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkVG9kbyA9ICh0b2RvSUQpID0+IHtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBwcm9qZWN0LnJlbW92ZVRvZG8odG9kb0lEKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSA9ICh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHRvZG9JRCwgdG9kb1Byb3BlcnR5KTtcbiAgICBwcm9qZWN0c1xuICAgICAgLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VG9kbyh0b2RvSUQpKVxuICAgICAgLnRvZ2dsZVRvZG9Cb29sUHJvcGVydHkodG9kb0lELCB0b2RvUHJvcGVydHkpO1xuICB9O1xuXG4gIGNvbnN0IGdldEZpbHRlcmVkVGFza3MgPSAobGlzdEdyb3VwU2VsZWN0aW9uSUQgPSBcImFsbC10YXNrc1wiKSA9PiB7XG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbklEID09PSBcImFsbC10YXNrc1wiKSB7XG4gICAgICByZXR1cm4gcHJvamVjdHNcbiAgICAgICAgLm1hcCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgIHJldHVybiBwcm9qZWN0LmdldFRvZG9zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mbGF0KCk7XG4gICAgfVxuICAgIGlmIChsaXN0R3JvdXBTZWxlY3Rpb25JRCA9PT0gXCJ0b2RheS10YXNrc1wiKSB7XG4gICAgICAvLyBmaWx0ZXIgdGhyb3VnaCBhbGwgcHJvamVjdHMgdG9kb3NcbiAgICAgIC8vIHJldHVybiB0aGUgb25lcyB3aXRoIGEgZGF0ZSBvYmogb2YgdG9kYXlcbiAgICB9XG4gICAgaWYgKHNvbWVGbGFnID09PSBcIndlZWstdGFza3NcIikge1xuICAgICAgLy8gZmlsdGVyIHRocm91Z2ggYWxsIHByb2plY3RzIHRvZG9zXG4gICAgICAvLyByZXR1cm4gdGhlIG9uZXMgd2l0aCBhIGRhdGUgd2l0aGluIG5leHQgNyBkYXlzXG4gICAgfVxuICAgIGlmIChzb21lRmxhZyA9PT0gXCJpbXBvcnRhbnQtdGFza3NcIikge1xuICAgICAgLy8gZmlsdGVyIHRocm91Z2ggYWxsIHByb2plY3RzIHRvZG9zXG4gICAgICAvLyByZXR1cm4gdGhlIG9uZXMgd2l0aCBhIGlzSW1wb3J0YW50ID09PSB0cnVlXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkUHJvamVjdCxcbiAgICByZW1vdmVTZWxlY3RlZFByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZ2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGdldFNlbGVjdGVkUHJvamVjdFRvZG9zIC8qIHN1cmUgYWJvdXQgZXhwb3J0IGFsbCBvZiB0aGVtPz8gKi8sXG4gICAgc2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCxcbiAgICByZW1vdmVTZWxlY3RlZFRvZG8sXG4gICAgdG9nZ2xlU2VsZWN0ZWRUb2RvUHJvcGVydHksXG4gICAgZ2V0RmlsdGVyZWRUYXNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RNYW5hZ2VyO1xuIiwibGV0IHRvZG9JRENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBUb2RvRmFjdG9yeShvYmopIHtcbiAgY29uc3QgdG9kbyA9IHt9O1xuICB0b2RvLnRvZG9JRCA9IHRvZG9JRENvdW50ZXI7XG4gIHRvZG8uaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgdG9kby5pc0ltcG9ydGFudCA9IGZhbHNlO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICB0b2RvW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHRvZG9JRENvdW50ZXIrKztcbiAgcmV0dXJuIHRvZG87XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuXG4vKiBsb29wcyB0aHJvdWdoIGVhY2gga2V5IGluIGFyZ3VtZW50b2JqICovXG4vKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbi8qIHRpdGxlICovXG4vKiBkZXNjcmlwdGlvbiAqL1xuLyogZHVlRGF0ZSAqL1xuLyogcHJpb3JpdHkgKi9cbi8qIG5vdGVzICovXG4vKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbi8qIG1heWJlIGFkZCBtZXRob2RzIHRvIHRoZSBvYmplY3RzIGFzIHdlbGw/ICovXG4iLCJpbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vRm9ybU1hbmFnZXIuanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdCBmcm9tIFwiLi9jcmVhdGVMaXN0SXRlbUZyb21PYmplY3QuanNcIjtcbmltcG9ydCBjcmVhdGVCYXNlR3JvdXBIVE1MIGZyb20gXCIuL2NyZWF0ZUJhc2VHcm91cEhUTUwuanNcIjtcblxuY29uc3QgVG9kb1VJTWFuYWdlciA9ICgoKSA9PiB7XG4gIC8qIHJlZmVyZW5jZXMgKi9cbiAgY29uc3QgYXBwQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLWNvbnRlbnRcIik7XG4gIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWxpc3RcIik7XG4gIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGUtYmFyXCIpO1xuICBsZXQgcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb247XG5cbiAgY29uc3QgcmVuZGVyUHJvamVjdHNMaXN0ID0gKCkgPT4ge1xuICAgIHJlbW92ZUhUTUxDb250ZW50KHByb2plY3RzTGlzdCk7XG4gICAgY29uc3QgcHJvamVjdHMgPSBQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT5cbiAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QocHJvamVjdCkpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJTZWxlY3RlZEdyb3VwID0gKGxpc3RHcm91cFNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gICAgcmVtb3ZlSFRNTENvbnRlbnQobWFpbkNvbnRlbnQpO1xuICAgIGNvbnN0IFtoMSwgY3Vyckdyb3VwaW5nVG9kb3NdID0gY3JlYXRlQmFzZUdyb3VwSFRNTChsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICAgIG1haW5Db250ZW50LmFwcGVuZChoMSwgY3Vyckdyb3VwaW5nVG9kb3MpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRHcm91cFRvZG9zID1cbiAgICAgIGxpc3RHcm91cFNlbGVjdGlvbiAmJiBsaXN0R3JvdXBTZWxlY3Rpb24uZGF0YXNldC5wcm9qZWN0XG4gICAgICAgID8gUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MoKVxuICAgICAgICA6IFByb2plY3RNYW5hZ2VyLmdldEZpbHRlcmVkVGFza3MobGlzdEdyb3VwU2VsZWN0aW9uPy5pZCk7XG5cbiAgICBzZWxlY3RlZEdyb3VwVG9kb3MuZm9yRWFjaCgoZ3JvdXBpbmcpID0+XG4gICAgICBjdXJyR3JvdXBpbmdUb2Rvcy5hcHBlbmRDaGlsZChjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QoZ3JvdXBpbmcpKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc2hvd1NlbGVjdGVkR3JvdXAgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBsaXN0R3JvdXBTZWxlY3Rpb24gPSBldmVudC50YXJnZXQuY2xvc2VzdChcImxpXCIpO1xuICAgIGlmIChsaXN0R3JvdXBTZWxlY3Rpb24gIT09IHByZXZpb3VzTGlzdEdyb3VwU2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SUQgPSBsaXN0R3JvdXBTZWxlY3Rpb24uZGF0YXNldC5wcm9qZWN0O1xuICAgICAgaWYgKHByb2plY3RJRCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBQcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoK3Byb2plY3RJRCk7XG4gICAgICByZW5kZXJTZWxlY3RlZEdyb3VwKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gICAgICBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbiA9IGxpc3RHcm91cFNlbGVjdGlvbjtcbiAgICB9XG4gIH07XG4gIHNpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dTZWxlY3RlZEdyb3VwKTtcblxuICBjb25zdCBhZGRMYXRlc3RJdGVtID0gKG9iamVjdCwgaXNOZXdQcm9qZWN0KSA9PiB7XG4gICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICBjb25zdCBjdXJyR3JvdXBUb2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnItZ3JvdXBpbmctdG9kb3NcIik7XG4gICAgY29uc3QgaXRlbSA9IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChvYmplY3QpO1xuICAgIGlzTmV3UHJvamVjdFxuICAgICAgPyBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSlcbiAgICAgIDogY3Vyckdyb3VwVG9kb3NMaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICB9O1xuXG4gIGNvbnN0IGVkaXRTZWxlY3RlZEl0ZW0gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBbaXNEZWxldGVBY3Rpb24sIGlzRWRpdEFjdGlvbl0gPSBkZXRlcm1pbmVFZGl0T3JEZWxldGVBY3Rpb24oZXZlbnQpO1xuICAgIGNvbnN0IFtvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaV0gPVxuICAgICAgaXNEZWxldGVBY3Rpb24gfHwgaXNFZGl0QWN0aW9uID8gZGV0ZXJtaW5lVG9kb09yUHJvamVjdChldmVudCkgOiBudWxsO1xuXG4gICAgaWYgKGlzRGVsZXRlQWN0aW9uKSByZW1vdmVTZWxlY3RlZEl0ZW0ob2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGkpO1xuXG4gICAgaWYgKGlzRWRpdEFjdGlvbikge1xuICAgICAgRm9ybU1hbmFnZXIuY3JlYXRlRWRpdEZvcm0ob2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGkpO1xuICAgIH1cbiAgfTtcbiAgYXBwQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFNlbGVjdGVkSXRlbSk7XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWRJdGVtID0gKG9iamVjdFRvRGVsZXRlLCBvYmplY3RJRCwgcGFyZW50TGkpID0+IHtcbiAgICBpZiAob2JqZWN0VG9EZWxldGUgPT09IFwicHJvamVjdFwiKSB7XG4gICAgICBQcm9qZWN0TWFuYWdlci5yZW1vdmVTZWxlY3RlZFByb2plY3Qob2JqZWN0SUQpO1xuICAgICAgcmVuZGVyU2VsZWN0ZWRHcm91cCgpO1xuICAgIH1cblxuICAgIGlmIChvYmplY3RUb0RlbGV0ZSA9PT0gXCJ0b2RvXCIpIFByb2plY3RNYW5hZ2VyLnJlbW92ZVNlbGVjdGVkVG9kbyhvYmplY3RJRCk7XG5cbiAgICBwYXJlbnRMaT8ucmVtb3ZlKCk7XG5cbiAgICBjb25zb2xlLmxvZyhQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpKTtcbiAgfTtcblxuICBmdW5jdGlvbiBkZXRlcm1pbmVFZGl0T3JEZWxldGVBY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCBpc0RlbGV0ZUFjdGlvbiA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtaXRlbVwiKVxuICAgICAgPyB0cnVlXG4gICAgICA6IGZhbHNlO1xuICAgIGNvbnN0IGlzRWRpdEFjdGlvbiA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWl0ZW1cIilcbiAgICAgID8gdHJ1ZVxuICAgICAgOiBmYWxzZTtcbiAgICByZXR1cm4gW2lzRGVsZXRlQWN0aW9uLCBpc0VkaXRBY3Rpb25dO1xuICB9XG5cbiAgZnVuY3Rpb24gZGV0ZXJtaW5lVG9kb09yUHJvamVjdChldmVudCkge1xuICAgIGNvbnN0IHBhcmVudExpID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJsaVwiKTtcbiAgICBjb25zdCBwYXJlbnRPYmplY3REYXRhc2V0ID0gcGFyZW50TGkuZGF0YXNldDtcbiAgICBjb25zdCBvYmplY3QgPSBPYmplY3Qua2V5cyhwYXJlbnRPYmplY3REYXRhc2V0KVswXTtcbiAgICBjb25zdCBvYmplY3RJRCA9ICtPYmplY3QudmFsdWVzKHBhcmVudE9iamVjdERhdGFzZXQpWzBdO1xuICAgIHJldHVybiBbb2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGldO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlQnRuVG9kb1Byb3BlcnR5ID0gKGV2ZW50KSA9PiB7XG4gICAgbGV0IHRvZG9Qcm9wZXJ0eSA9IGRldGVybWluZVRvZG9Qcm9wZXJ0eShldmVudCk7XG5cbiAgICBpZiAodG9kb1Byb3BlcnR5KSB7XG4gICAgICBjb25zdCBidG4gPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCB0b2RvSUQgPSArYnRuLmNsb3Nlc3QoXCJsaVwiKS5kYXRhc2V0LnRvZG87XG4gICAgICBQcm9qZWN0TWFuYWdlci50b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSk7XG4gICAgfVxuICB9O1xuICBhcHBDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVCdG5Ub2RvUHJvcGVydHkpO1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUHJvamVjdHNMaXN0LFxuICAgIHJlbmRlclNlbGVjdGVkR3JvdXAsXG4gICAgYWRkTGF0ZXN0SXRlbSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9VSU1hbmFnZXI7XG5cbmZ1bmN0aW9uIGRldGVybWluZVRvZG9Qcm9wZXJ0eShldmVudCkge1xuICBsZXQgdG9kb1Byb3BlcnR5ID0gbnVsbDtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGUtY29tcGxldGUtYnRuXCIpKVxuICAgIHRvZG9Qcm9wZXJ0eSA9IFwiaXNDb21wbGV0ZWRcIjtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGUtaW1wb3J0YW50LWJ0blwiKSlcbiAgICB0b2RvUHJvcGVydHkgPSBcImlzSW1wb3J0YW50XCI7XG4gIHJldHVybiB0b2RvUHJvcGVydHk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhUTUxDb250ZW50KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSBcIi4vY3JlYXRlRWxlbWVudC5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlR3JvdXBIVE1MKGxpc3RHcm91cFNlbGVjdGlvbikge1xuICBjb25zb2xlLmxvZyhsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICBjb25zdCBoMSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcInRlc3RcIiwgXCJncm91cGluZy10aXRsZVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPVxuICAgIGxpc3RHcm91cFNlbGVjdGlvbj8ucXVlcnlTZWxlY3RvcihcImgzXCIpLnRleHRDb250ZW50ID8/IFwiQWxsIFRhc2tzXCI7XG5cbiAgY29uc3QgbGlzdCA9IGNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBcInRlc3QyXCIsIFwiY3Vyci1ncm91cGluZy10b2Rvc1wiKTtcblxuICByZXR1cm4gW2gxLCBsaXN0XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUdyb3VwSFRNTDtcbiIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSA9IFwiZGl2XCIsIGNsYXNzbmFtZSA9IFwiXCIsIGlkID0gXCJcIikge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBpZiAoY2xhc3NuYW1lKSBlbGUuY2xhc3NMaXN0LmFkZChjbGFzc25hbWUpO1xuICBpZiAoaWQpIGVsZS5pZCA9IGlkO1xuICByZXR1cm4gZWxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbGVtZW50O1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSBcIi4vY3JlYXRlRWxlbWVudC5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3Qob2JqZWN0KSB7XG4gIGNvbnN0IFtvYmpJRCwgaWRUYWddID0gZ2V0T2JqZWN0SURBbmRUYWcob2JqZWN0KTtcblxuICBjb25zdCBsaSA9IGNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGkuZGF0YXNldFtpZFRhZ10gPSBvYmpJRDtcblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmplY3QpKSB7XG4gICAgLyogY29uc29sZS5sb2coa2V5ICsgXCI6IFwiICsgdmFsdWUpOyAqL1xuICAgIGlmIChrZXkgPT09IFwidGl0bGVcIikge1xuICAgICAgY29uc3QgaGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgIGhlYWRpbmcudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09IFwiZGVzY3JpcHRpb25cIikge1xuICAgICAgY29uc3QgcCA9IGNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgcC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQocCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShcInRvZG9JRFwiKSkge1xuICAgIC8qIHVzZSBvcmRlciB0byBwbGFjZSBjb21wbGV0ZUJ0biBhbGwgdGhlIHdheSB0byBsZWZ0IGluIGxpICovXG4gICAgY29uc3QgY2hlY2tDb21wbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJ0b2dnbGUtY29tcGxldGUtYnRuXCIpO1xuICAgIGNoZWNrQ29tcGxldGVCdG4udGV4dENvbnRlbnQgPSBcIk1hcmsgY29tcGxldGVcIjsgLyogbWFrZSBzZXAgZm4gKi9cbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja0NvbXBsZXRlQnRuKTtcblxuICAgIGNvbnN0IGNoZWNrSW1wb3J0YW50QnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcInRvZ2dsZS1pbXBvcnRhbnQtYnRuXCIpO1xuICAgIGNoZWNrSW1wb3J0YW50QnRuLnRleHRDb250ZW50ID0gXCJNYXJrIGltcG9ydGFudFwiOyAvKiBtYWtlIHNlcCBmbiAqL1xuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrSW1wb3J0YW50QnRuKTtcbiAgfVxuXG4gIGNvbnN0IGVkaXRDb250YWluZXIgPSBjcmVhdGVFZGl0Q29udGFpbmVyKCk7XG4gIGxpLmFwcGVuZENoaWxkKGVkaXRDb250YWluZXIpO1xuXG4gIHJldHVybiBsaTsgLyogbG90cyBvZiByZXBlYXRpbmcgYXBwZW5kQ0hpbGRpbmcgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0O1xuXG5mdW5jdGlvbiBjcmVhdGVFZGl0Q29udGFpbmVyKCkge1xuICBjb25zdCBlZGl0Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImVkaXQtY29udGFpbmVyXCIpO1xuICBjb25zdCBlZGl0QnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcImVkaXQtaXRlbVwiKTtcbiAgZWRpdEJ0bi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuICBjb25zdCBkZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiZGVsZXRlLWl0ZW1cIik7XG4gIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG4gIGVkaXRDb250YWluZXIuYXBwZW5kKGVkaXRCdG4sIGRlbGV0ZUJ0bik7XG5cbiAgcmV0dXJuIGVkaXRDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGdldE9iamVjdElEQW5kVGFnKG9iamVjdCkge1xuICBjb25zdCBrZXkxID0gXCJwcm9qZWN0SURcIjtcbiAgY29uc3Qga2V5MiA9IFwidG9kb0lEXCI7XG4gIGNvbnN0IG9iaklEID0gb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTEpXG4gICAgPyBvYmplY3QucHJvamVjdElEXG4gICAgOiBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MilcbiAgICA/IG9iamVjdC50b2RvSURcbiAgICA6IG51bGw7XG5cbiAgY29uc3QgaWRUYWcgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IFwicHJvamVjdFwiXG4gICAgOiBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MilcbiAgICA/IFwidG9kb1wiXG4gICAgOiBudWxsO1xuXG4gIHJldHVybiBbb2JqSUQsIGlkVGFnXTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qc1wiO1xubG9nKFByb2plY3RNYW5hZ2VyKTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoeyB0aXRsZTogXCJSZWZ1cm5pc2ggSG9tZVwiIH0pO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlBhaW50IFdhbGxzXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMCk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHNvZmFcIixcbiAgZGVzY3JpcHRpb246IFwibGlmdCBkb250IGRyYWdcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwibW92ZSB0YWJsZVwiLFxuICBkZXNjcmlwdGlvbjogXCJkcmFnIGl0IHJvdWdobHlcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KDEpO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwiYnV5IHBhaW50XCIsXG4gIGRlc2NyaXB0aW9uOiBcIm1peCBpdCB3ZWxsIGJlZm9yZSBhcHBseWluZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJidXkgYnJ1c2hcIixcbn0pO1xubG9nKFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCkpO1xuVG9kb1VJTWFuYWdlci5yZW5kZXJQcm9qZWN0c0xpc3QoXCJwcm9qZWN0c1wiKTtcblRvZG9VSU1hbmFnZXIucmVuZGVyU2VsZWN0ZWRHcm91cCgpO1xuLyogVG9kb1VJTWFuYWdlci5yZW5kZXJTZWxlY3RlZEdyb3VwKFwidG9kb3NcIik7ICovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=