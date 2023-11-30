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

  const editSelectedItem = () => {};

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  createNewProjectBtn.addEventListener("click", handleBtnCreateFormClick);

  createNewTodoBtn.addEventListener("click", handleBtnCreateFormClick);
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormManager);

function determineFormType(event) {
  return event.target.id.includes("project");
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

function createProjectForm() {
  return `
  <form action="#" id="add-project-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" />
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

  addTodo: function (todo) {
    this.todos.push(todo);
  },

  removeTodo: function (todoID) {
    this.todos = this.todos.filter((todo) => todo.todoID !== todoID);
  },

  toggleTodoBoolProperty: function (todoID, todoProperty) {
    const targetTodo = this.todos.find((todo) => todo.todoID === todoID);
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
/* harmony import */ var _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectManager.js */ "./src/modules/ProjectManager.js");
/* harmony import */ var _createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createListItemFromObject.js */ "./src/modules/createListItemFromObject.js");
/* harmony import */ var _createBaseGroupHTML_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createBaseGroupHTML.js */ "./src/modules/createBaseGroupHTML.js");




const TodoUIManager = (() => {
  /* references */
  const appContent = document.querySelector("#app-content");
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  const sideBar = document.querySelector("#side-bar");

  let previousListGroupSelection;

  const renderProjectsList = () => {
    removeHTMLContent(projectsList);
    const projects = _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects();

    projects.forEach((project) =>
      projectsList.appendChild((0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project))
    );
  };

  const renderSelectedGroup = (listGroupSelection) => {
    console.log(listGroupSelection);
    removeHTMLContent(mainContent);
    const [h1, currGroupingTodos] = (0,_createBaseGroupHTML_js__WEBPACK_IMPORTED_MODULE_2__["default"])(listGroupSelection);
    mainContent.append(h1, currGroupingTodos);

    const selectedGroupTodos =
      listGroupSelection && listGroupSelection.dataset.project
        ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedProjectTodos()
        : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getFilteredTasks(listGroupSelection?.id);

    selectedGroupTodos.forEach((grouping) =>
      currGroupingTodos.appendChild((0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(grouping))
    );
  };

  const showSelectedGroup = (event) => {
    const listGroupSelection = event.target.closest("li");
    if (listGroupSelection !== previousListGroupSelection) {
      const projectID = listGroupSelection.dataset.project;
      if (projectID !== undefined)
        _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].setSelectedProject(+projectID);
      renderSelectedGroup(listGroupSelection);
      previousListGroupSelection = listGroupSelection;
    }
  };
  sideBar.addEventListener("click", showSelectedGroup);

  const addLatestItem = (object, isNewProject) => {
    console.log(object);
    const currGroupTodosList = document.querySelector("#curr-grouping-todos");
    const item = (0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object);
    isNewProject
      ? projectsList.appendChild(item)
      : currGroupTodosList.appendChild(item);
  };

  const editSelectedItem = () => {
    //update selected items textContent
    //tells formManager to create form to edit in
    //all actual data changes handled by project manager
  };

  const removeSelectedItem = (event) => {
    const [objectToDelete, objectID, parentLi] = determineTodoOrProject(event);

    if (objectToDelete === "project") {
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeSelectedProject(objectID);
      renderSelectedGroup();
    }

    if (objectToDelete === "todo") _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeSelectedTodo(objectID);

    parentLi?.remove();

    console.log(_ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects());
  };
  appContent.addEventListener("click", removeSelectedItem);

  const toggleBtnTodoProperty = (event) => {
    let todoProperty = determineTodoProperty(event);

    if (todoProperty) {
      const btn = event.target;
      const todoID = +btn.parentElement.dataset.todo;
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedProject().toggleTodoBoolProperty(
        todoID,
        todoProperty
      );
      console.log(_ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedProject());
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

function determineTodoOrProject(event) {
  if (event.target.classList.contains("delete-item")) {
    const btn = event.target;
    const parentLi = btn.closest("li");
    const parentObjectDataset = parentLi.dataset;
    const objectToDelete = Object.keys(parentObjectDataset)[0];
    const objectID = +Object.values(parentObjectDataset)[0];
    return [objectToDelete, objectID, parentLi];
  }
  return [null, null];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxrQkFBa0IsNkRBQWE7QUFDL0I7QUFDQSxvQkFBb0IsNkRBQWE7QUFDakM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O1VDckVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ21EO0FBQ007QUFDRjtBQUN2RCxJQUFJLGtFQUFjO0FBQ2xCLGtFQUFjLGNBQWMseUJBQXlCO0FBQ3JELGtFQUFjLGNBQWMsc0JBQXNCO0FBQ2xELGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Q7QUFDQTtBQUNBLENBQUM7QUFDRCxrRUFBYztBQUNkLGtFQUFjO0FBQ2Q7QUFDQTtBQUNBLENBQUM7QUFDRCxrRUFBYztBQUNkO0FBQ0EsQ0FBQztBQUNELElBQUksa0VBQWM7QUFDbEIsaUVBQWE7QUFDYixpRUFBYTtBQUNiLCtDQUErQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Gb3JtTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlQmFzZUdyb3VwSFRNTC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vVG9kb1VJTWFuYWdlci5qc1wiO1xuXG5jb25zdCBGb3JtTWFuYWdlciA9ICgoKSA9PiB7XG4gIC8qIHJlZmVyZW5jZXMgKi9cbiAgY29uc3QgY3JlYXRlTmV3VG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy10b2RvXCIpO1xuICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXByb2plY3RcIik7XG5cbiAgY29uc3QgaGFuZGxlQnRuQ3JlYXRlRm9ybUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFRvQXBwZW5kRm9ybVRvID0gZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgaXNOZXdQcm9qZWN0ID0gZGV0ZXJtaW5lRm9ybVR5cGUoZXZlbnQpO1xuXG4gICAgY29uc3QgZm9ybVR5cGVUZW1wbGF0ZSA9IGlzTmV3UHJvamVjdFxuICAgICAgPyBjcmVhdGVQcm9qZWN0Rm9ybSgpXG4gICAgICA6IGNyZWF0ZVRvZG9Gb3JtKCk7XG5cbiAgICBjcmVhdGVBbmRBcHBlbmRGb3JtKGVsZW1lbnRUb0FwcGVuZEZvcm1UbywgZm9ybVR5cGVUZW1wbGF0ZSk7XG5cbiAgICBjb25zdCBmb3JtID0gZWxlbWVudFRvQXBwZW5kRm9ybVRvLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGluaXRpYWxpemVGb3JtKGZvcm0sIGlzTmV3UHJvamVjdCk7XG4gIH07XG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZvcm0gPSAoZm9ybSwgaXNOZXdQcm9qZWN0KSA9PiB7XG4gICAgY29uc3Qgc3VibWl0SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgICAgaGFuZGxlRm9ybVN1Ym1pdChldmVudCwgZm9ybSwgaXNOZXdQcm9qZWN0KTtcbiAgICAgIGZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5kbGVyKTtcbiAgICAgIGZvcm0ucmVtb3ZlKCk7XG4gICAgfTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgc3VibWl0SGFuZGxlcik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRm9ybVN1Ym1pdCA9IChldmVudCwgZm9ybSwgaXNOZXdQcm9qZWN0KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0ZW1wbGF0ZU9iaiA9IGNyZWF0ZU9iamVjdEZyb21Gb3JtKGdldElucHV0RWxlbWVudHMoZm9ybSkpO1xuICAgIGNvbnN0IG9iamVjdCA9IGlzTmV3UHJvamVjdFxuICAgICAgPyBQcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHRlbXBsYXRlT2JqKVxuICAgICAgOiBQcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3QodGVtcGxhdGVPYmopO1xuXG4gICAgVG9kb1VJTWFuYWdlci5hZGRMYXRlc3RJdGVtKG9iamVjdCwgaXNOZXdQcm9qZWN0KTtcbiAgfTtcblxuICBjb25zdCBlZGl0U2VsZWN0ZWRJdGVtID0gKCkgPT4ge307XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICBjcmVhdGVOZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdG5DcmVhdGVGb3JtQ2xpY2spO1xuXG4gIGNyZWF0ZU5ld1RvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUJ0bkNyZWF0ZUZvcm1DbGljayk7XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRm9ybVR5cGUoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LnRhcmdldC5pZC5pbmNsdWRlcyhcInByb2plY3RcIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9Gb3JtKCkge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb246IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImlzSW1wb3J0YW50XCI+RXh0cmEgaW1wb3J0YW50PzwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpc0ltcG9ydGFudFwiIGlkPVwiaXNJbXBvcnRhbnRcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdEZvcm0oKSB7XG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cImFkZC1wcm9qZWN0LWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdEZyb21Gb3JtKGZvcm1JbnB1dHMpIHtcbiAgcmV0dXJuIGZvcm1JbnB1dHMucmVkdWNlKChvYmplY3QsIGl0ZW0pID0+IHtcbiAgICBpZiAoaXRlbS50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgIHJldHVybiB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLmNoZWNrZWQgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGl0ZW0udmFsdWUgPyB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiBvYmplY3Q7XG4gICAgfVxuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFuZEFwcGVuZEZvcm0oZWxlbWVudFRvQXBwZW5kRm9ybVRvLCBmb3JtVHlwZVRlbXBsYXRlKSB7XG4gIGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZm9ybVR5cGVUZW1wbGF0ZSk7XG59XG4iLCJsZXQgcHJvamVjdElEQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KG9iamVjdCkge1xuICBjb25zdCBwcm9qZWN0ID0ge1xuICAgIHRpdGxlOiBvYmplY3QudGl0bGUsXG4gICAgcHJvamVjdElEOiBwcm9qZWN0SURDb3VudGVyLFxuICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgIHRvZG9zOiBbXSxcbiAgfTtcblxuICAvL3VzZSBvYmplY3Quc2V0UHJvdG90eXBlT2YgdG8gYXNzaWduIG1ldGhvZHMgdG8gcHJvdG95cGUsIHRvIGF2b2lkIGR1cGxpY2F0aW9uXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihwcm9qZWN0LCBzaGFyZWRNZXRob2RzKTtcblxuICBwcm9qZWN0SURDb3VudGVyKys7XG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcblxuY29uc3Qgc2hhcmVkTWV0aG9kcyA9IHtcbiAgZ2V0VG9kb3M6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfSxcblxuICBhZGRUb2RvOiBmdW5jdGlvbiAodG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfSxcblxuICByZW1vdmVUb2RvOiBmdW5jdGlvbiAodG9kb0lEKSB7XG4gICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRvZG9JRCAhPT0gdG9kb0lEKTtcbiAgfSxcblxuICB0b2dnbGVUb2RvQm9vbFByb3BlcnR5OiBmdW5jdGlvbiAodG9kb0lELCB0b2RvUHJvcGVydHkpIHtcbiAgICBjb25zdCB0YXJnZXRUb2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvKSA9PiB0b2RvLnRvZG9JRCA9PT0gdG9kb0lEKTtcbiAgICB0YXJnZXRUb2RvW3RvZG9Qcm9wZXJ0eV0gPSAhdGFyZ2V0VG9kb1t0b2RvUHJvcGVydHldO1xuICB9LFxuXG4gIHRvZ2dsZVNlbGVjdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pc1NlbGVjdGVkID0gIXRoaXMuaXNTZWxlY3RlZDtcbiAgfSxcbn07XG4iLCJpbXBvcnQgVG9kb0ZhY3RvcnkgZnJvbSBcIi4vVG9kb0ZhY3RvcnkuanNcIjtcbmltcG9ydCBQcm9qZWN0RmFjdG9yeSBmcm9tIFwiLi9Qcm9qZWN0RmFjdG9yeS5qc1wiO1xuXG5jb25zdCBQcm9qZWN0TWFuYWdlciA9ICgoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtdO1xuICBsZXQgY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0RmFjdG9yeShwcm9qZWN0VGl0bGUpO1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgcmV0dXJuIHByb2plY3Q7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT5cbiAgICAocHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdElEICE9PSBwcm9qZWN0SUQpKTtcblxuICAvKiBjb25zdCBnZXRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge307ICovXG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICBjb25zdCBnZXRTZWxlY3RlZFByb2plY3QgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qO1xuXG4gIGNvbnN0IGdldFNlbGVjdGVkUHJvamVjdFRvZG9zID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvai5nZXRUb2RvcygpO1xuXG4gIGNvbnN0IHNldFNlbGVjdGVkUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcbiAgICBkZXNlbGVjdEN1cnJQcm9qZWN0KCk7XG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QucHJvamVjdElEID09PSBwcm9qZWN0SUQpIHtcbiAgICAgICAgY3VyclNlbGVjdGVkUHJvaiA9IHByb2plY3Q7XG4gICAgICAgIGN1cnJTZWxlY3RlZFByb2oudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VyclNlbGVjdGVkUHJvaik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkZXNlbGVjdEN1cnJQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvaj8udG9nZ2xlU2VsZWN0ZWQoKTtcblxuICBjb25zdCBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QgPSAoaW5wdXRFbGVtZW50cykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgcHJvamVjdCBpczogXCIsIGN1cnJTZWxlY3RlZFByb2opO1xuICAgIGNvbnN0IHRvZG8gPSBUb2RvRmFjdG9yeShpbnB1dEVsZW1lbnRzKTtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLmFkZFRvZG8odG9kbyk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIHJldHVybiB0b2RvO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkVG9kbyA9ICh0b2RvSUQpID0+IHtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBwcm9qZWN0LnJlbW92ZVRvZG8odG9kb0lEKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBnZXRGaWx0ZXJlZFRhc2tzID0gKGxpc3RHcm91cFNlbGVjdGlvbklEID0gXCJhbGwtdGFza3NcIikgPT4ge1xuICAgIGlmIChsaXN0R3JvdXBTZWxlY3Rpb25JRCA9PT0gXCJhbGwtdGFza3NcIikge1xuICAgICAgcmV0dXJuIHByb2plY3RzXG4gICAgICAgIC5tYXAoKHByb2plY3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gcHJvamVjdC5nZXRUb2RvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuZmxhdCgpO1xuICAgIH1cbiAgICBpZiAobGlzdEdyb3VwU2VsZWN0aW9uSUQgPT09IFwidG9kYXktdGFza3NcIikge1xuICAgICAgLy8gZmlsdGVyIHRocm91Z2ggYWxsIHByb2plY3RzIHRvZG9zXG4gICAgICAvLyByZXR1cm4gdGhlIG9uZXMgd2l0aCBhIGRhdGUgb2JqIG9mIHRvZGF5XG4gICAgfVxuICAgIGlmIChzb21lRmxhZyA9PT0gXCJ3ZWVrLXRhc2tzXCIpIHtcbiAgICAgIC8vIGZpbHRlciB0aHJvdWdoIGFsbCBwcm9qZWN0cyB0b2Rvc1xuICAgICAgLy8gcmV0dXJuIHRoZSBvbmVzIHdpdGggYSBkYXRlIHdpdGhpbiBuZXh0IDcgZGF5c1xuICAgIH1cbiAgICBpZiAoc29tZUZsYWcgPT09IFwiaW1wb3J0YW50LXRhc2tzXCIpIHtcbiAgICAgIC8vIGZpbHRlciB0aHJvdWdoIGFsbCBwcm9qZWN0cyB0b2Rvc1xuICAgICAgLy8gcmV0dXJuIHRoZSBvbmVzIHdpdGggYSBpc0ltcG9ydGFudCA9PT0gdHJ1ZVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgcmVtb3ZlU2VsZWN0ZWRQcm9qZWN0LFxuICAgIGdldFByb2plY3RzLFxuICAgIGdldFNlbGVjdGVkUHJvamVjdCxcbiAgICBnZXRTZWxlY3RlZFByb2plY3RUb2RvcyAvKiBzdXJlIGFib3V0IGV4cG9ydCBhbGwgb2YgdGhlbT8/ICovLFxuICAgIHNldFNlbGVjdGVkUHJvamVjdCxcbiAgICBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QsXG4gICAgcmVtb3ZlU2VsZWN0ZWRUb2RvLFxuICAgIGdldEZpbHRlcmVkVGFza3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TWFuYWdlcjtcbiIsImxldCB0b2RvSURDb3VudGVyID0gMDtcblxuZnVuY3Rpb24gVG9kb0ZhY3Rvcnkob2JqKSB7XG4gIGNvbnN0IHRvZG8gPSB7fTtcbiAgdG9kby50b2RvSUQgPSB0b2RvSURDb3VudGVyO1xuICB0b2RvLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gIHRvZG8uaXNJbXBvcnRhbnQgPSBmYWxzZTtcblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgdG9kb1trZXldID0gdmFsdWU7XG4gIH1cblxuICB0b2RvSURDb3VudGVyKys7XG4gIHJldHVybiB0b2RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvRmFjdG9yeTtcblxuLyogbG9vcHMgdGhyb3VnaCBlYWNoIGtleSBpbiBhcmd1bWVudG9iaiAqL1xuLyogcmV0dXJucyB7fSB3aXRoIGtleTp2YWx1ZSBwYWlycyovXG4vKiB0aXRsZSAqL1xuLyogZGVzY3JpcHRpb24gKi9cbi8qIGR1ZURhdGUgKi9cbi8qIHByaW9yaXR5ICovXG4vKiBub3RlcyAqL1xuLyogY2hlY2tsaXN0IChzdWIgc3RlcHMpICovXG4vKiBtYXliZSBhZGQgbWV0aG9kcyB0byB0aGUgb2JqZWN0cyBhcyB3ZWxsPyAqL1xuIiwiaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0IGZyb20gXCIuL2NyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdC5qc1wiO1xuaW1wb3J0IGNyZWF0ZUJhc2VHcm91cEhUTUwgZnJvbSBcIi4vY3JlYXRlQmFzZUdyb3VwSFRNTC5qc1wiO1xuXG5jb25zdCBUb2RvVUlNYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBhcHBDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtY29udGVudFwiKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtbGlzdFwiKTtcbiAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZS1iYXJcIik7XG5cbiAgbGV0IHByZXZpb3VzTGlzdEdyb3VwU2VsZWN0aW9uO1xuXG4gIGNvbnN0IHJlbmRlclByb2plY3RzTGlzdCA9ICgpID0+IHtcbiAgICByZW1vdmVIVE1MQ29udGVudChwcm9qZWN0c0xpc3QpO1xuICAgIGNvbnN0IHByb2plY3RzID0gUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKTtcblxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+XG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQoY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KHByb2plY3QpKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyU2VsZWN0ZWRHcm91cCA9IChsaXN0R3JvdXBTZWxlY3Rpb24pID0+IHtcbiAgICBjb25zb2xlLmxvZyhsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICAgIHJlbW92ZUhUTUxDb250ZW50KG1haW5Db250ZW50KTtcbiAgICBjb25zdCBbaDEsIGN1cnJHcm91cGluZ1RvZG9zXSA9IGNyZWF0ZUJhc2VHcm91cEhUTUwobGlzdEdyb3VwU2VsZWN0aW9uKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmQoaDEsIGN1cnJHcm91cGluZ1RvZG9zKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkR3JvdXBUb2RvcyA9XG4gICAgICBsaXN0R3JvdXBTZWxlY3Rpb24gJiYgbGlzdEdyb3VwU2VsZWN0aW9uLmRhdGFzZXQucHJvamVjdFxuICAgICAgICA/IFByb2plY3RNYW5hZ2VyLmdldFNlbGVjdGVkUHJvamVjdFRvZG9zKClcbiAgICAgICAgOiBQcm9qZWN0TWFuYWdlci5nZXRGaWx0ZXJlZFRhc2tzKGxpc3RHcm91cFNlbGVjdGlvbj8uaWQpO1xuXG4gICAgc2VsZWN0ZWRHcm91cFRvZG9zLmZvckVhY2goKGdyb3VwaW5nKSA9PlxuICAgICAgY3Vyckdyb3VwaW5nVG9kb3MuYXBwZW5kQ2hpbGQoY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KGdyb3VwaW5nKSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHNob3dTZWxlY3RlZEdyb3VwID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbGlzdEdyb3VwU2VsZWN0aW9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJsaVwiKTtcbiAgICBpZiAobGlzdEdyb3VwU2VsZWN0aW9uICE9PSBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbikge1xuICAgICAgY29uc3QgcHJvamVjdElEID0gbGlzdEdyb3VwU2VsZWN0aW9uLmRhdGFzZXQucHJvamVjdDtcbiAgICAgIGlmIChwcm9qZWN0SUQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KCtwcm9qZWN0SUQpO1xuICAgICAgcmVuZGVyU2VsZWN0ZWRHcm91cChsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICAgICAgcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb24gPSBsaXN0R3JvdXBTZWxlY3Rpb247XG4gICAgfVxuICB9O1xuICBzaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93U2VsZWN0ZWRHcm91cCk7XG5cbiAgY29uc3QgYWRkTGF0ZXN0SXRlbSA9IChvYmplY3QsIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgY29uc3QgY3Vyckdyb3VwVG9kb3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyLWdyb3VwaW5nLXRvZG9zXCIpO1xuICAgIGNvbnN0IGl0ZW0gPSBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3Qob2JqZWN0KTtcbiAgICBpc05ld1Byb2plY3RcbiAgICAgID8gcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKGl0ZW0pXG4gICAgICA6IGN1cnJHcm91cFRvZG9zTGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgfTtcblxuICBjb25zdCBlZGl0U2VsZWN0ZWRJdGVtID0gKCkgPT4ge1xuICAgIC8vdXBkYXRlIHNlbGVjdGVkIGl0ZW1zIHRleHRDb250ZW50XG4gICAgLy90ZWxscyBmb3JtTWFuYWdlciB0byBjcmVhdGUgZm9ybSB0byBlZGl0IGluXG4gICAgLy9hbGwgYWN0dWFsIGRhdGEgY2hhbmdlcyBoYW5kbGVkIGJ5IHByb2plY3QgbWFuYWdlclxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkSXRlbSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IFtvYmplY3RUb0RlbGV0ZSwgb2JqZWN0SUQsIHBhcmVudExpXSA9IGRldGVybWluZVRvZG9PclByb2plY3QoZXZlbnQpO1xuXG4gICAgaWYgKG9iamVjdFRvRGVsZXRlID09PSBcInByb2plY3RcIikge1xuICAgICAgUHJvamVjdE1hbmFnZXIucmVtb3ZlU2VsZWN0ZWRQcm9qZWN0KG9iamVjdElEKTtcbiAgICAgIHJlbmRlclNlbGVjdGVkR3JvdXAoKTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0VG9EZWxldGUgPT09IFwidG9kb1wiKSBQcm9qZWN0TWFuYWdlci5yZW1vdmVTZWxlY3RlZFRvZG8ob2JqZWN0SUQpO1xuXG4gICAgcGFyZW50TGk/LnJlbW92ZSgpO1xuXG4gICAgY29uc29sZS5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG4gIH07XG4gIGFwcENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbW92ZVNlbGVjdGVkSXRlbSk7XG5cbiAgY29uc3QgdG9nZ2xlQnRuVG9kb1Byb3BlcnR5ID0gKGV2ZW50KSA9PiB7XG4gICAgbGV0IHRvZG9Qcm9wZXJ0eSA9IGRldGVybWluZVRvZG9Qcm9wZXJ0eShldmVudCk7XG5cbiAgICBpZiAodG9kb1Byb3BlcnR5KSB7XG4gICAgICBjb25zdCBidG4gPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCB0b2RvSUQgPSArYnRuLnBhcmVudEVsZW1lbnQuZGF0YXNldC50b2RvO1xuICAgICAgUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRQcm9qZWN0KCkudG9nZ2xlVG9kb0Jvb2xQcm9wZXJ0eShcbiAgICAgICAgdG9kb0lELFxuICAgICAgICB0b2RvUHJvcGVydHlcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhQcm9qZWN0TWFuYWdlci5nZXRTZWxlY3RlZFByb2plY3QoKSk7XG4gICAgfVxuICB9O1xuICBhcHBDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVCdG5Ub2RvUHJvcGVydHkpO1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUHJvamVjdHNMaXN0LFxuICAgIHJlbmRlclNlbGVjdGVkR3JvdXAsXG4gICAgYWRkTGF0ZXN0SXRlbSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9VSU1hbmFnZXI7XG5cbmZ1bmN0aW9uIGRldGVybWluZVRvZG9Qcm9wZXJ0eShldmVudCkge1xuICBsZXQgdG9kb1Byb3BlcnR5ID0gbnVsbDtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGUtY29tcGxldGUtYnRuXCIpKVxuICAgIHRvZG9Qcm9wZXJ0eSA9IFwiaXNDb21wbGV0ZWRcIjtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGUtaW1wb3J0YW50LWJ0blwiKSlcbiAgICB0b2RvUHJvcGVydHkgPSBcImlzSW1wb3J0YW50XCI7XG4gIHJldHVybiB0b2RvUHJvcGVydHk7XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZVRvZG9PclByb2plY3QoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtaXRlbVwiKSkge1xuICAgIGNvbnN0IGJ0biA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBwYXJlbnRMaSA9IGJ0bi5jbG9zZXN0KFwibGlcIik7XG4gICAgY29uc3QgcGFyZW50T2JqZWN0RGF0YXNldCA9IHBhcmVudExpLmRhdGFzZXQ7XG4gICAgY29uc3Qgb2JqZWN0VG9EZWxldGUgPSBPYmplY3Qua2V5cyhwYXJlbnRPYmplY3REYXRhc2V0KVswXTtcbiAgICBjb25zdCBvYmplY3RJRCA9ICtPYmplY3QudmFsdWVzKHBhcmVudE9iamVjdERhdGFzZXQpWzBdO1xuICAgIHJldHVybiBbb2JqZWN0VG9EZWxldGUsIG9iamVjdElELCBwYXJlbnRMaV07XG4gIH1cbiAgcmV0dXJuIFtudWxsLCBudWxsXTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSFRNTENvbnRlbnQoZWxlbWVudCkge1xuICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VHcm91cEhUTUwobGlzdEdyb3VwU2VsZWN0aW9uKSB7XG4gIGNvbnNvbGUubG9nKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gIGNvbnN0IGgxID0gY3JlYXRlRWxlbWVudChcImgxXCIsIFwidGVzdFwiLCBcImdyb3VwaW5nLXRpdGxlXCIpO1xuICBoMS50ZXh0Q29udGVudCA9XG4gICAgbGlzdEdyb3VwU2VsZWN0aW9uPy5xdWVyeVNlbGVjdG9yKFwiaDNcIikudGV4dENvbnRlbnQgPz8gXCJBbGwgVGFza3NcIjtcblxuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbWVudChcInVsXCIsIFwidGVzdDJcIiwgXCJjdXJyLWdyb3VwaW5nLXRvZG9zXCIpO1xuXG4gIHJldHVybiBbaDEsIGxpc3RdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlR3JvdXBIVE1MO1xuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlID0gXCJkaXZcIiwgY2xhc3NuYW1lID0gXCJcIiwgaWQgPSBcIlwiKSB7XG4gIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGlmIChjbGFzc25hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSk7XG4gIGlmIChpZCkgZWxlLmlkID0gaWQ7XG4gIHJldHVybiBlbGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVsZW1lbnQ7XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChvYmplY3QpIHtcbiAgY29uc3QgW29iaklELCBpZFRhZ10gPSBnZXRPYmplY3RJREFuZFRhZyhvYmplY3QpO1xuXG4gIGNvbnN0IGxpID0gY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5kYXRhc2V0W2lkVGFnXSA9IG9iaklEO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcbiAgICAvKiBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB2YWx1ZSk7ICovXG4gICAgaWYgKGtleSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICBjb25zdCBoZWFkaW5nID0gY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XG4gICAgICBjb25zdCBwID0gY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICB9XG4gIH1cblxuICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KFwidG9kb0lEXCIpKSB7XG4gICAgLyogdXNlIG9yZGVyIHRvIHBsYWNlIGNvbXBsZXRlQnRuIGFsbCB0aGUgd2F5IHRvIGxlZnQgaW4gbGkgKi9cbiAgICBjb25zdCBjaGVja0NvbXBsZXRlQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcInRvZ2dsZS1jb21wbGV0ZS1idG5cIik7XG4gICAgY2hlY2tDb21wbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiTWFyayBjb21wbGV0ZVwiOyAvKiBtYWtlIHNlcCBmbiAqL1xuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrQ29tcGxldGVCdG4pO1xuXG4gICAgY29uc3QgY2hlY2tJbXBvcnRhbnRCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwidG9nZ2xlLWltcG9ydGFudC1idG5cIik7XG4gICAgY2hlY2tJbXBvcnRhbnRCdG4udGV4dENvbnRlbnQgPSBcIk1hcmsgaW1wb3J0YW50XCI7IC8qIG1ha2Ugc2VwIGZuICovXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tJbXBvcnRhbnRCdG4pO1xuICB9XG5cbiAgY29uc3QgZWRpdENvbnRhaW5lciA9IGNyZWF0ZUVkaXRDb250YWluZXIoKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZWRpdENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIGxpOyAvKiBsb3RzIG9mIHJlcGVhdGluZyBhcHBlbmRDSGlsZGluZyAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3Q7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVkaXRDb250YWluZXIoKSB7XG4gIGNvbnN0IGVkaXRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZWRpdC1jb250YWluZXJcIik7XG4gIGNvbnN0IGVkaXRCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiZWRpdC1pdGVtXCIpO1xuICBlZGl0QnRuLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJkZWxldGUtaXRlbVwiKTtcbiAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgZWRpdENvbnRhaW5lci5hcHBlbmQoZWRpdEJ0biwgZGVsZXRlQnRuKTtcblxuICByZXR1cm4gZWRpdENvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0SURBbmRUYWcob2JqZWN0KSB7XG4gIGNvbnN0IGtleTEgPSBcInByb2plY3RJRFwiO1xuICBjb25zdCBrZXkyID0gXCJ0b2RvSURcIjtcbiAgY29uc3Qgb2JqSUQgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IG9iamVjdC5wcm9qZWN0SURcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gb2JqZWN0LnRvZG9JRFxuICAgIDogbnVsbDtcblxuICBjb25zdCBpZFRhZyA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkxKVxuICAgID8gXCJwcm9qZWN0XCJcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gXCJ0b2RvXCJcbiAgICA6IG51bGw7XG5cbiAgcmV0dXJuIFtvYmpJRCwgaWRUYWddO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBsb2cgPSBjb25zb2xlLmxvZztcbmltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5sb2coUHJvamVjdE1hbmFnZXIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlJlZnVybmlzaCBIb21lXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHsgdGl0bGU6IFwiUGFpbnQgV2FsbHNcIiB9KTtcblByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgwKTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcIm1vdmUgc29mYVwiLFxuICBkZXNjcmlwdGlvbjogXCJsaWZ0IGRvbnQgZHJhZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHRhYmxlXCIsXG4gIGRlc2NyaXB0aW9uOiBcImRyYWcgaXQgcm91Z2hseVwiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJidXkgcGFpbnRcIixcbiAgZGVzY3JpcHRpb246IFwibWl4IGl0IHdlbGwgYmVmb3JlIGFwcGx5aW5nXCIsXG59KTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcImJ1eSBicnVzaFwiLFxufSk7XG5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG5Ub2RvVUlNYW5hZ2VyLnJlbmRlclByb2plY3RzTGlzdChcInByb2plY3RzXCIpO1xuVG9kb1VJTWFuYWdlci5yZW5kZXJTZWxlY3RlZEdyb3VwKCk7XG4vKiBUb2RvVUlNYW5hZ2VyLnJlbmRlclNlbGVjdGVkR3JvdXAoXCJ0b2Rvc1wiKTsgKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==