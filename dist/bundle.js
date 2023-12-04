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

  //variable that tracks if editForm exists
  //variable that tracks if addForm exists
  /* that way can avoid trying to do multiple create/edit actions at a time
  and also having to track which element currently contains a form */
  let addFormExists;
  let editFormExists;

  /* function checkIfProjectFormExists() {
    return document.querySelector("#add-project-form") ? true : false;
  } */

  const createForm = (event, object, objectID, parentElement) => {
    /*     if (checkIfProjectFormExists()) return; */
    const elementToChange =
      parentElement || event.target.previousElementSibling;
    console.log(elementToChange);

    const itemToEdit = object
      ? object === "project"
        ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(objectID)
        : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedTodo(objectID)
      : null;

    const isProjectForm = determineFormType(object || event.target.id);
    const formTypeTemplate = isProjectForm
      ? createProjectForm(itemToEdit)
      : createTodoForm(itemToEdit);

    createAndAppendForm(elementToChange, formTypeTemplate);

    const form = elementToChange.querySelector("form");
    initializeForm(form, isProjectForm, itemToEdit, elementToChange);
  };
  createNewProjectBtn.addEventListener("click", createForm);
  createNewTodoBtn.addEventListener("click", createForm);

  const initializeForm = (form, isProjectForm, itemToEdit, elementToChange) => {
    const submitHandler = (event) => {
      handleFormSubmit(event, form, isProjectForm, itemToEdit, elementToChange);
      form.removeEventListener("submit", submitHandler);
      form.remove();
    };
    form.addEventListener("submit", submitHandler);
  };

  /* refactor me */
  /* DO WE NEED TO FEED THE TEMPLATE OBJ TO TODOUI,
  CAN WE NOT JUST EDIT THE PROJECT/TODO DATA,
  THEN RE RENDER THE LI ?? */
  const handleFormSubmit = (
    event,
    form,
    isProjectForm,
    itemToEdit,
    elementToChange
  ) => {
    event.preventDefault();
    const templateObj = createObjectFromForm(getInputElements(form));
    if (itemToEdit) {
      "projectID" in itemToEdit || "todoID" in itemToEdit
        ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].editItem(itemToEdit, templateObj)
        : null;
      _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateEditedItem(templateObj, elementToChange);

      return;
    }

    const object = isProjectForm
      ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(templateObj)
      : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].addTodoToSelectedProject(templateObj);

    _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addLatestItem(object, isProjectForm);
  };

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  return {
    createForm,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormManager);

function determineFormType(objectType) {
  console.log(objectType);
  return objectType.includes("project") || objectType === "project";
}

function createProjectForm(project) {
  const titleAttribute = project?.title ? `${project.title}` : "";

  return `
  <form action="#" id="project-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" value="${titleAttribute}" />
    <button type="submit">Add todo</button>
  </form>
  `;
}

function createTodoForm(todo) {
  return `
  <form action="#" id="todo-form">
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
  elementToAppendFormTo.tagName === "LI"
    ? (elementToAppendFormTo.innerHTML = formTypeTemplate)
    : elementToAppendFormTo.insertAdjacentHTML("beforeend", formTypeTemplate);
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

  const getProject = (projectID) =>
    projects.find((project) => project.projectID === projectID);

  const getProjects = () => projects;

  const getSelectedProject = () => currSelectedProj;

  const getSelectedProjectTodos = () => currSelectedProj.getTodos();

  const setSelectedProject = (projectID) => {
    deselectCurrProject();
    currSelectedProj = getProject(projectID);
    currSelectedProj.toggleSelected();
  };

  const deselectCurrProject = () => currSelectedProj?.toggleSelected();

  const addTodoToSelectedProject = (inputElements) => {
    console.log("selected project is: ", currSelectedProj);
    const todo = (0,_TodoFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(inputElements);
    currSelectedProj.addTodo(todo);
    console.log(projects);
    return todo;
  };

  const getSelectedTodo = (todoID) =>
    getProjectFromTodoID(todoID).getTodo(todoID);

  const removeSelectedTodo = (todoID) =>
    getProjectFromTodoID(todoID).removeTodo(todoID);

  const editItem = (itemToEdit, templateObj) => {
    console.log("item to edit is: ", itemToEdit);
    console.log("templateObj is: ", templateObj);
    for (const key in templateObj) {
      itemToEdit[key] = templateObj[key];
    }
    console.log(projects);
  };

  const toggleSelectedTodoProperty = (todoID, todoProperty) =>
    getProjectFromTodoID(todoID).toggleTodoBoolProperty(todoID, todoProperty);

  const getProjectFromTodoID = (todoID) =>
    projects.find((project) => project.getTodo(todoID));

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
    getProject,
    getSelectedProject,
    getSelectedProjectTodos /* sure about export all of them?? */,
    setSelectedProject,
    addTodoToSelectedProject,
    removeSelectedTodo,
    getSelectedTodo,
    editItem,
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
    console.log(item);
    isNewProject
      ? projectsList.appendChild(item)
      : currGroupTodosList.appendChild(item);
  };

  const editSelectedItem = (event) => {
    const [isDeleteAction, isEditAction] = determineEditOrDeleteAction(event);
    const [object, objectID, parentLi] =
      isDeleteAction || isEditAction ? determineTodoOrProject(event) : null;

    if (isDeleteAction) removeSelectedItem(object, objectID, parentLi);

    if (isEditAction) _FormManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].createForm(event, object, objectID, parentLi);
  };
  appContent.addEventListener("click", editSelectedItem);

  /* something weird going on here. */
  const updateEditedItem = (templateObj, elementToChange) => {
    const newItem = (0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(templateObj);
    console.log(templateObj, elementToChange, newItem);
    elementToChange.innerHTML = newItem.innerHTML;
  };

  const removeSelectedItem = (objectToDelete, objectID, parentLi) => {
    if (objectToDelete === "project") {
      _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeSelectedProject(objectID);
      renderSelectedGroup();
    }

    if (objectToDelete === "todo") _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeSelectedTodo(objectID);

    parentLi?.remove();

    console.log(_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());
  };

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
    updateEditedItem,
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Q7QUFDQSxDQUFDO0FBQ0QsSUFBSSxrRUFBYztBQUNsQixpRUFBYTtBQUNiLGlFQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9GYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVCYXNlR3JvdXBIVE1MLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVMaXN0SXRlbUZyb21PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgVG9kb1VJTWFuYWdlciBmcm9tIFwiLi9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5cbmNvbnN0IEZvcm1NYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBjcmVhdGVOZXdUb2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXRvZG9cIik7XG4gIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctcHJvamVjdFwiKTtcblxuICAvL3ZhcmlhYmxlIHRoYXQgdHJhY2tzIGlmIGVkaXRGb3JtIGV4aXN0c1xuICAvL3ZhcmlhYmxlIHRoYXQgdHJhY2tzIGlmIGFkZEZvcm0gZXhpc3RzXG4gIC8qIHRoYXQgd2F5IGNhbiBhdm9pZCB0cnlpbmcgdG8gZG8gbXVsdGlwbGUgY3JlYXRlL2VkaXQgYWN0aW9ucyBhdCBhIHRpbWVcbiAgYW5kIGFsc28gaGF2aW5nIHRvIHRyYWNrIHdoaWNoIGVsZW1lbnQgY3VycmVudGx5IGNvbnRhaW5zIGEgZm9ybSAqL1xuICBsZXQgYWRkRm9ybUV4aXN0cztcbiAgbGV0IGVkaXRGb3JtRXhpc3RzO1xuXG4gIC8qIGZ1bmN0aW9uIGNoZWNrSWZQcm9qZWN0Rm9ybUV4aXN0cygpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtcHJvamVjdC1mb3JtXCIpID8gdHJ1ZSA6IGZhbHNlO1xuICB9ICovXG5cbiAgY29uc3QgY3JlYXRlRm9ybSA9IChldmVudCwgb2JqZWN0LCBvYmplY3RJRCwgcGFyZW50RWxlbWVudCkgPT4ge1xuICAgIC8qICAgICBpZiAoY2hlY2tJZlByb2plY3RGb3JtRXhpc3RzKCkpIHJldHVybjsgKi9cbiAgICBjb25zdCBlbGVtZW50VG9DaGFuZ2UgPVxuICAgICAgcGFyZW50RWxlbWVudCB8fCBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICBjb25zb2xlLmxvZyhlbGVtZW50VG9DaGFuZ2UpO1xuXG4gICAgY29uc3QgaXRlbVRvRWRpdCA9IG9iamVjdFxuICAgICAgPyBvYmplY3QgPT09IFwicHJvamVjdFwiXG4gICAgICAgID8gUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdChvYmplY3RJRClcbiAgICAgICAgOiBQcm9qZWN0TWFuYWdlci5nZXRTZWxlY3RlZFRvZG8ob2JqZWN0SUQpXG4gICAgICA6IG51bGw7XG5cbiAgICBjb25zdCBpc1Byb2plY3RGb3JtID0gZGV0ZXJtaW5lRm9ybVR5cGUob2JqZWN0IHx8IGV2ZW50LnRhcmdldC5pZCk7XG4gICAgY29uc3QgZm9ybVR5cGVUZW1wbGF0ZSA9IGlzUHJvamVjdEZvcm1cbiAgICAgID8gY3JlYXRlUHJvamVjdEZvcm0oaXRlbVRvRWRpdClcbiAgICAgIDogY3JlYXRlVG9kb0Zvcm0oaXRlbVRvRWRpdCk7XG5cbiAgICBjcmVhdGVBbmRBcHBlbmRGb3JtKGVsZW1lbnRUb0NoYW5nZSwgZm9ybVR5cGVUZW1wbGF0ZSk7XG5cbiAgICBjb25zdCBmb3JtID0gZWxlbWVudFRvQ2hhbmdlLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGluaXRpYWxpemVGb3JtKGZvcm0sIGlzUHJvamVjdEZvcm0sIGl0ZW1Ub0VkaXQsIGVsZW1lbnRUb0NoYW5nZSk7XG4gIH07XG4gIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZUZvcm0pO1xuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVGb3JtKTtcblxuICBjb25zdCBpbml0aWFsaXplRm9ybSA9IChmb3JtLCBpc1Byb2plY3RGb3JtLCBpdGVtVG9FZGl0LCBlbGVtZW50VG9DaGFuZ2UpID0+IHtcbiAgICBjb25zdCBzdWJtaXRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICBoYW5kbGVGb3JtU3VibWl0KGV2ZW50LCBmb3JtLCBpc1Byb2plY3RGb3JtLCBpdGVtVG9FZGl0LCBlbGVtZW50VG9DaGFuZ2UpO1xuICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHN1Ym1pdEhhbmRsZXIpO1xuICAgICAgZm9ybS5yZW1vdmUoKTtcbiAgICB9O1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5kbGVyKTtcbiAgfTtcblxuICAvKiByZWZhY3RvciBtZSAqL1xuICAvKiBETyBXRSBORUVEIFRPIEZFRUQgVEhFIFRFTVBMQVRFIE9CSiBUTyBUT0RPVUksXG4gIENBTiBXRSBOT1QgSlVTVCBFRElUIFRIRSBQUk9KRUNUL1RPRE8gREFUQSxcbiAgVEhFTiBSRSBSRU5ERVIgVEhFIExJID8/ICovXG4gIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoXG4gICAgZXZlbnQsXG4gICAgZm9ybSxcbiAgICBpc1Byb2plY3RGb3JtLFxuICAgIGl0ZW1Ub0VkaXQsXG4gICAgZWxlbWVudFRvQ2hhbmdlXG4gICkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGVtcGxhdGVPYmogPSBjcmVhdGVPYmplY3RGcm9tRm9ybShnZXRJbnB1dEVsZW1lbnRzKGZvcm0pKTtcbiAgICBpZiAoaXRlbVRvRWRpdCkge1xuICAgICAgXCJwcm9qZWN0SURcIiBpbiBpdGVtVG9FZGl0IHx8IFwidG9kb0lEXCIgaW4gaXRlbVRvRWRpdFxuICAgICAgICA/IFByb2plY3RNYW5hZ2VyLmVkaXRJdGVtKGl0ZW1Ub0VkaXQsIHRlbXBsYXRlT2JqKVxuICAgICAgICA6IG51bGw7XG4gICAgICBUb2RvVUlNYW5hZ2VyLnVwZGF0ZUVkaXRlZEl0ZW0odGVtcGxhdGVPYmosIGVsZW1lbnRUb0NoYW5nZSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYmplY3QgPSBpc1Byb2plY3RGb3JtXG4gICAgICA/IFByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QodGVtcGxhdGVPYmopXG4gICAgICA6IFByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh0ZW1wbGF0ZU9iaik7XG5cbiAgICBUb2RvVUlNYW5hZ2VyLmFkZExhdGVzdEl0ZW0ob2JqZWN0LCBpc1Byb2plY3RGb3JtKTtcbiAgfTtcblxuICBjb25zdCBnZXRJbnB1dEVsZW1lbnRzID0gKGZvcm0pID0+XG4gICAgWy4uLmZvcm0uZWxlbWVudHNdLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50YWdOYW1lID09PSBcIklOUFVUXCIpO1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlRm9ybSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1NYW5hZ2VyO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGb3JtVHlwZShvYmplY3RUeXBlKSB7XG4gIGNvbnNvbGUubG9nKG9iamVjdFR5cGUpO1xuICByZXR1cm4gb2JqZWN0VHlwZS5pbmNsdWRlcyhcInByb2plY3RcIikgfHwgb2JqZWN0VHlwZSA9PT0gXCJwcm9qZWN0XCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RGb3JtKHByb2plY3QpIHtcbiAgY29uc3QgdGl0bGVBdHRyaWJ1dGUgPSBwcm9qZWN0Py50aXRsZSA/IGAke3Byb2plY3QudGl0bGV9YCA6IFwiXCI7XG5cbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwicHJvamVjdC1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIHZhbHVlPVwiJHt0aXRsZUF0dHJpYnV0ZX1cIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0Zvcm0odG9kbykge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJ0b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiaXNJbXBvcnRhbnRcIj5FeHRyYSBpbXBvcnRhbnQ/PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImlzSW1wb3J0YW50XCIgaWQ9XCJpc0ltcG9ydGFudFwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIHRvZG88L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RGcm9tRm9ybShmb3JtSW5wdXRzKSB7XG4gIHJldHVybiBmb3JtSW5wdXRzLnJlZHVjZSgob2JqZWN0LCBpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0udHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICByZXR1cm4geyAuLi5vYmplY3QsIFtpdGVtLmlkXTogaXRlbS5jaGVja2VkIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpdGVtLnZhbHVlID8geyAuLi5vYmplY3QsIFtpdGVtLmlkXTogaXRlbS52YWx1ZSB9IDogb2JqZWN0O1xuICAgIH1cbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbmRBcHBlbmRGb3JtKGVsZW1lbnRUb0FwcGVuZEZvcm1UbywgZm9ybVR5cGVUZW1wbGF0ZSkge1xuICBlbGVtZW50VG9BcHBlbmRGb3JtVG8udGFnTmFtZSA9PT0gXCJMSVwiXG4gICAgPyAoZWxlbWVudFRvQXBwZW5kRm9ybVRvLmlubmVySFRNTCA9IGZvcm1UeXBlVGVtcGxhdGUpXG4gICAgOiBlbGVtZW50VG9BcHBlbmRGb3JtVG8uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGZvcm1UeXBlVGVtcGxhdGUpO1xufVxuIiwibGV0IHByb2plY3RJRENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBQcm9qZWN0RmFjdG9yeShvYmplY3QpIHtcbiAgY29uc3QgcHJvamVjdCA9IHtcbiAgICB0aXRsZTogb2JqZWN0LnRpdGxlLFxuICAgIHByb2plY3RJRDogcHJvamVjdElEQ291bnRlcixcbiAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICB0b2RvczogW10sXG4gIH07XG5cbiAgLy91c2Ugb2JqZWN0LnNldFByb3RvdHlwZU9mIHRvIGFzc2lnbiBtZXRob2RzIHRvIHByb3RveXBlLCB0byBhdm9pZCBkdXBsaWNhdGlvblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvamVjdCwgc2hhcmVkTWV0aG9kcyk7XG5cbiAgcHJvamVjdElEQ291bnRlcisrO1xuICByZXR1cm4gcHJvamVjdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdEZhY3Rvcnk7XG5cbmNvbnN0IHNoYXJlZE1ldGhvZHMgPSB7XG4gIGdldFRvZG9zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH0sXG5cbiAgZ2V0VG9kbzogZnVuY3Rpb24gKHRvZG9JRCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zLmZpbmQoKHRvZG8pID0+IHRvZG8udG9kb0lEID09PSB0b2RvSUQpO1xuICB9LFxuXG4gIGFkZFRvZG86IGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9LFxuXG4gIHJlbW92ZVRvZG86IGZ1bmN0aW9uICh0b2RvSUQpIHtcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8udG9kb0lEICE9PSB0b2RvSUQpO1xuICB9LFxuXG4gIHRvZ2dsZVRvZG9Cb29sUHJvcGVydHk6IGZ1bmN0aW9uICh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSkge1xuICAgIGNvbnN0IHRhcmdldFRvZG8gPSB0aGlzLmdldFRvZG8odG9kb0lEKTtcbiAgICB0YXJnZXRUb2RvW3RvZG9Qcm9wZXJ0eV0gPSAhdGFyZ2V0VG9kb1t0b2RvUHJvcGVydHldO1xuICB9LFxuXG4gIHRvZ2dsZVNlbGVjdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pc1NlbGVjdGVkID0gIXRoaXMuaXNTZWxlY3RlZDtcbiAgfSxcbn07XG4iLCJpbXBvcnQgVG9kb0ZhY3RvcnkgZnJvbSBcIi4vVG9kb0ZhY3RvcnkuanNcIjtcbmltcG9ydCBQcm9qZWN0RmFjdG9yeSBmcm9tIFwiLi9Qcm9qZWN0RmFjdG9yeS5qc1wiO1xuXG5jb25zdCBQcm9qZWN0TWFuYWdlciA9ICgoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtdO1xuICBsZXQgY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0RmFjdG9yeShwcm9qZWN0VGl0bGUpO1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgcmV0dXJuIHByb2plY3Q7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT5cbiAgICAocHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdElEICE9PSBwcm9qZWN0SUQpKTtcblxuICBjb25zdCBnZXRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT5cbiAgICBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RJRCA9PT0gcHJvamVjdElEKTtcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzO1xuXG4gIGNvbnN0IGdldFNlbGVjdGVkUHJvamVjdCA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2o7XG5cbiAgY29uc3QgZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qLmdldFRvZG9zKCk7XG5cbiAgY29uc3Qgc2V0U2VsZWN0ZWRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgIGRlc2VsZWN0Q3VyclByb2plY3QoKTtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qID0gZ2V0UHJvamVjdChwcm9qZWN0SUQpO1xuICAgIGN1cnJTZWxlY3RlZFByb2oudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgfTtcblxuICBjb25zdCBkZXNlbGVjdEN1cnJQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvaj8udG9nZ2xlU2VsZWN0ZWQoKTtcblxuICBjb25zdCBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QgPSAoaW5wdXRFbGVtZW50cykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgcHJvamVjdCBpczogXCIsIGN1cnJTZWxlY3RlZFByb2opO1xuICAgIGNvbnN0IHRvZG8gPSBUb2RvRmFjdG9yeShpbnB1dEVsZW1lbnRzKTtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLmFkZFRvZG8odG9kbyk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIHJldHVybiB0b2RvO1xuICB9O1xuXG4gIGNvbnN0IGdldFNlbGVjdGVkVG9kbyA9ICh0b2RvSUQpID0+XG4gICAgZ2V0UHJvamVjdEZyb21Ub2RvSUQodG9kb0lEKS5nZXRUb2RvKHRvZG9JRCk7XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWRUb2RvID0gKHRvZG9JRCkgPT5cbiAgICBnZXRQcm9qZWN0RnJvbVRvZG9JRCh0b2RvSUQpLnJlbW92ZVRvZG8odG9kb0lEKTtcblxuICBjb25zdCBlZGl0SXRlbSA9IChpdGVtVG9FZGl0LCB0ZW1wbGF0ZU9iaikgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiaXRlbSB0byBlZGl0IGlzOiBcIiwgaXRlbVRvRWRpdCk7XG4gICAgY29uc29sZS5sb2coXCJ0ZW1wbGF0ZU9iaiBpczogXCIsIHRlbXBsYXRlT2JqKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0ZW1wbGF0ZU9iaikge1xuICAgICAgaXRlbVRvRWRpdFtrZXldID0gdGVtcGxhdGVPYmpba2V5XTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVNlbGVjdGVkVG9kb1Byb3BlcnR5ID0gKHRvZG9JRCwgdG9kb1Byb3BlcnR5KSA9PlxuICAgIGdldFByb2plY3RGcm9tVG9kb0lEKHRvZG9JRCkudG9nZ2xlVG9kb0Jvb2xQcm9wZXJ0eSh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSk7XG5cbiAgY29uc3QgZ2V0UHJvamVjdEZyb21Ub2RvSUQgPSAodG9kb0lEKSA9PlxuICAgIHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VG9kbyh0b2RvSUQpKTtcblxuICBjb25zdCBnZXRGaWx0ZXJlZFRhc2tzID0gKGxpc3RHcm91cFNlbGVjdGlvbklEID0gXCJhbGwtdGFza3NcIikgPT4ge1xuICAgIGlmIChsaXN0R3JvdXBTZWxlY3Rpb25JRCA9PT0gXCJhbGwtdGFza3NcIikge1xuICAgICAgcmV0dXJuIHByb2plY3RzXG4gICAgICAgIC5tYXAoKHByb2plY3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gcHJvamVjdC5nZXRUb2RvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuZmxhdCgpO1xuICAgIH1cbiAgICBpZiAobGlzdEdyb3VwU2VsZWN0aW9uSUQgPT09IFwidG9kYXktdGFza3NcIikge1xuICAgICAgLy8gZmlsdGVyIHRocm91Z2ggYWxsIHByb2plY3RzIHRvZG9zXG4gICAgICAvLyByZXR1cm4gdGhlIG9uZXMgd2l0aCBhIGRhdGUgb2JqIG9mIHRvZGF5XG4gICAgfVxuICAgIGlmIChzb21lRmxhZyA9PT0gXCJ3ZWVrLXRhc2tzXCIpIHtcbiAgICAgIC8vIGZpbHRlciB0aHJvdWdoIGFsbCBwcm9qZWN0cyB0b2Rvc1xuICAgICAgLy8gcmV0dXJuIHRoZSBvbmVzIHdpdGggYSBkYXRlIHdpdGhpbiBuZXh0IDcgZGF5c1xuICAgIH1cbiAgICBpZiAoc29tZUZsYWcgPT09IFwiaW1wb3J0YW50LXRhc2tzXCIpIHtcbiAgICAgIC8vIGZpbHRlciB0aHJvdWdoIGFsbCBwcm9qZWN0cyB0b2Rvc1xuICAgICAgLy8gcmV0dXJuIHRoZSBvbmVzIHdpdGggYSBpc0ltcG9ydGFudCA9PT0gdHJ1ZVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgcmVtb3ZlU2VsZWN0ZWRQcm9qZWN0LFxuICAgIGdldFByb2plY3RzLFxuICAgIGdldFByb2plY3QsXG4gICAgZ2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGdldFNlbGVjdGVkUHJvamVjdFRvZG9zIC8qIHN1cmUgYWJvdXQgZXhwb3J0IGFsbCBvZiB0aGVtPz8gKi8sXG4gICAgc2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCxcbiAgICByZW1vdmVTZWxlY3RlZFRvZG8sXG4gICAgZ2V0U2VsZWN0ZWRUb2RvLFxuICAgIGVkaXRJdGVtLFxuICAgIHRvZ2dsZVNlbGVjdGVkVG9kb1Byb3BlcnR5LFxuICAgIGdldEZpbHRlcmVkVGFza3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TWFuYWdlcjtcbiIsImxldCB0b2RvSURDb3VudGVyID0gMDtcblxuZnVuY3Rpb24gVG9kb0ZhY3Rvcnkob2JqKSB7XG4gIGNvbnN0IHRvZG8gPSB7fTtcbiAgdG9kby50b2RvSUQgPSB0b2RvSURDb3VudGVyO1xuICB0b2RvLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gIHRvZG8uaXNJbXBvcnRhbnQgPSBmYWxzZTtcblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgdG9kb1trZXldID0gdmFsdWU7XG4gIH1cblxuICB0b2RvSURDb3VudGVyKys7XG4gIHJldHVybiB0b2RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvRmFjdG9yeTtcblxuLyogbG9vcHMgdGhyb3VnaCBlYWNoIGtleSBpbiBhcmd1bWVudG9iaiAqL1xuLyogcmV0dXJucyB7fSB3aXRoIGtleTp2YWx1ZSBwYWlycyovXG4vKiB0aXRsZSAqL1xuLyogZGVzY3JpcHRpb24gKi9cbi8qIGR1ZURhdGUgKi9cbi8qIHByaW9yaXR5ICovXG4vKiBub3RlcyAqL1xuLyogY2hlY2tsaXN0IChzdWIgc3RlcHMpICovXG4vKiBtYXliZSBhZGQgbWV0aG9kcyB0byB0aGUgb2JqZWN0cyBhcyB3ZWxsPyAqL1xuIiwiaW1wb3J0IEZvcm1NYW5hZ2VyIGZyb20gXCIuL0Zvcm1NYW5hZ2VyLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QgZnJvbSBcIi4vY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0LmpzXCI7XG5pbXBvcnQgY3JlYXRlQmFzZUdyb3VwSFRNTCBmcm9tIFwiLi9jcmVhdGVCYXNlR3JvdXBIVE1MLmpzXCI7XG5cbmNvbnN0IFRvZG9VSU1hbmFnZXIgPSAoKCkgPT4ge1xuICAvKiByZWZlcmVuY2VzICovXG4gIGNvbnN0IGFwcENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1jb250ZW50XCIpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1saXN0XCIpO1xuICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlLWJhclwiKTtcbiAgbGV0IHByZXZpb3VzTGlzdEdyb3VwU2VsZWN0aW9uO1xuXG4gIGNvbnN0IHJlbmRlclByb2plY3RzTGlzdCA9ICgpID0+IHtcbiAgICByZW1vdmVIVE1MQ29udGVudChwcm9qZWN0c0xpc3QpO1xuICAgIGNvbnN0IHByb2plY3RzID0gUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKTtcblxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+XG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQoY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KHByb2plY3QpKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyU2VsZWN0ZWRHcm91cCA9IChsaXN0R3JvdXBTZWxlY3Rpb24pID0+IHtcbiAgICBjb25zb2xlLmxvZyhsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICAgIHJlbW92ZUhUTUxDb250ZW50KG1haW5Db250ZW50KTtcbiAgICBjb25zdCBbaDEsIGN1cnJHcm91cGluZ1RvZG9zXSA9IGNyZWF0ZUJhc2VHcm91cEhUTUwobGlzdEdyb3VwU2VsZWN0aW9uKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmQoaDEsIGN1cnJHcm91cGluZ1RvZG9zKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkR3JvdXBUb2RvcyA9XG4gICAgICBsaXN0R3JvdXBTZWxlY3Rpb24gJiYgbGlzdEdyb3VwU2VsZWN0aW9uLmRhdGFzZXQucHJvamVjdFxuICAgICAgICA/IFByb2plY3RNYW5hZ2VyLmdldFNlbGVjdGVkUHJvamVjdFRvZG9zKClcbiAgICAgICAgOiBQcm9qZWN0TWFuYWdlci5nZXRGaWx0ZXJlZFRhc2tzKGxpc3RHcm91cFNlbGVjdGlvbj8uaWQpO1xuXG4gICAgc2VsZWN0ZWRHcm91cFRvZG9zLmZvckVhY2goKGdyb3VwaW5nKSA9PlxuICAgICAgY3Vyckdyb3VwaW5nVG9kb3MuYXBwZW5kQ2hpbGQoY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KGdyb3VwaW5nKSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHNob3dTZWxlY3RlZEdyb3VwID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbGlzdEdyb3VwU2VsZWN0aW9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJsaVwiKTtcbiAgICBpZiAobGlzdEdyb3VwU2VsZWN0aW9uICE9PSBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbikge1xuICAgICAgY29uc3QgcHJvamVjdElEID0gbGlzdEdyb3VwU2VsZWN0aW9uLmRhdGFzZXQucHJvamVjdDtcbiAgICAgIGlmIChwcm9qZWN0SUQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KCtwcm9qZWN0SUQpO1xuICAgICAgcmVuZGVyU2VsZWN0ZWRHcm91cChsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICAgICAgcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb24gPSBsaXN0R3JvdXBTZWxlY3Rpb247XG4gICAgfVxuICB9O1xuICBzaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93U2VsZWN0ZWRHcm91cCk7XG5cbiAgY29uc3QgYWRkTGF0ZXN0SXRlbSA9IChvYmplY3QsIGlzTmV3UHJvamVjdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgY29uc3QgY3Vyckdyb3VwVG9kb3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyLWdyb3VwaW5nLXRvZG9zXCIpO1xuICAgIGNvbnN0IGl0ZW0gPSBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3Qob2JqZWN0KTtcbiAgICBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICBpc05ld1Byb2plY3RcbiAgICAgID8gcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKGl0ZW0pXG4gICAgICA6IGN1cnJHcm91cFRvZG9zTGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgfTtcblxuICBjb25zdCBlZGl0U2VsZWN0ZWRJdGVtID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgW2lzRGVsZXRlQWN0aW9uLCBpc0VkaXRBY3Rpb25dID0gZGV0ZXJtaW5lRWRpdE9yRGVsZXRlQWN0aW9uKGV2ZW50KTtcbiAgICBjb25zdCBbb2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGldID1cbiAgICAgIGlzRGVsZXRlQWN0aW9uIHx8IGlzRWRpdEFjdGlvbiA/IGRldGVybWluZVRvZG9PclByb2plY3QoZXZlbnQpIDogbnVsbDtcblxuICAgIGlmIChpc0RlbGV0ZUFjdGlvbikgcmVtb3ZlU2VsZWN0ZWRJdGVtKG9iamVjdCwgb2JqZWN0SUQsIHBhcmVudExpKTtcblxuICAgIGlmIChpc0VkaXRBY3Rpb24pIEZvcm1NYW5hZ2VyLmNyZWF0ZUZvcm0oZXZlbnQsIG9iamVjdCwgb2JqZWN0SUQsIHBhcmVudExpKTtcbiAgfTtcbiAgYXBwQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFNlbGVjdGVkSXRlbSk7XG5cbiAgLyogc29tZXRoaW5nIHdlaXJkIGdvaW5nIG9uIGhlcmUuICovXG4gIGNvbnN0IHVwZGF0ZUVkaXRlZEl0ZW0gPSAodGVtcGxhdGVPYmosIGVsZW1lbnRUb0NoYW5nZSkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QodGVtcGxhdGVPYmopO1xuICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlT2JqLCBlbGVtZW50VG9DaGFuZ2UsIG5ld0l0ZW0pO1xuICAgIGVsZW1lbnRUb0NoYW5nZS5pbm5lckhUTUwgPSBuZXdJdGVtLmlubmVySFRNTDtcbiAgfTtcblxuICBjb25zdCByZW1vdmVTZWxlY3RlZEl0ZW0gPSAob2JqZWN0VG9EZWxldGUsIG9iamVjdElELCBwYXJlbnRMaSkgPT4ge1xuICAgIGlmIChvYmplY3RUb0RlbGV0ZSA9PT0gXCJwcm9qZWN0XCIpIHtcbiAgICAgIFByb2plY3RNYW5hZ2VyLnJlbW92ZVNlbGVjdGVkUHJvamVjdChvYmplY3RJRCk7XG4gICAgICByZW5kZXJTZWxlY3RlZEdyb3VwKCk7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdFRvRGVsZXRlID09PSBcInRvZG9cIikgUHJvamVjdE1hbmFnZXIucmVtb3ZlU2VsZWN0ZWRUb2RvKG9iamVjdElEKTtcblxuICAgIHBhcmVudExpPy5yZW1vdmUoKTtcblxuICAgIGNvbnNvbGUubG9nKFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCkpO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZUJ0blRvZG9Qcm9wZXJ0eSA9IChldmVudCkgPT4ge1xuICAgIGxldCB0b2RvUHJvcGVydHkgPSBkZXRlcm1pbmVUb2RvUHJvcGVydHkoZXZlbnQpO1xuXG4gICAgaWYgKHRvZG9Qcm9wZXJ0eSkge1xuICAgICAgY29uc3QgYnRuID0gZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3QgdG9kb0lEID0gK2J0bi5jbG9zZXN0KFwibGlcIikuZGF0YXNldC50b2RvO1xuICAgICAgUHJvamVjdE1hbmFnZXIudG9nZ2xlU2VsZWN0ZWRUb2RvUHJvcGVydHkodG9kb0lELCB0b2RvUHJvcGVydHkpO1xuICAgIH1cbiAgfTtcbiAgYXBwQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlQnRuVG9kb1Byb3BlcnR5KTtcblxuICByZXR1cm4ge1xuICAgIHJlbmRlclByb2plY3RzTGlzdCxcbiAgICByZW5kZXJTZWxlY3RlZEdyb3VwLFxuICAgIGFkZExhdGVzdEl0ZW0sXG4gICAgdXBkYXRlRWRpdGVkSXRlbSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9VSU1hbmFnZXI7XG5cbmZ1bmN0aW9uIGRldGVybWluZVRvZG9Qcm9wZXJ0eShldmVudCkge1xuICBsZXQgdG9kb1Byb3BlcnR5ID0gbnVsbDtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGUtY29tcGxldGUtYnRuXCIpKVxuICAgIHRvZG9Qcm9wZXJ0eSA9IFwiaXNDb21wbGV0ZWRcIjtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGUtaW1wb3J0YW50LWJ0blwiKSlcbiAgICB0b2RvUHJvcGVydHkgPSBcImlzSW1wb3J0YW50XCI7XG4gIHJldHVybiB0b2RvUHJvcGVydHk7XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZUVkaXRPckRlbGV0ZUFjdGlvbihldmVudCkge1xuICBjb25zdCBpc0RlbGV0ZUFjdGlvbiA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtaXRlbVwiKVxuICAgID8gdHJ1ZVxuICAgIDogZmFsc2U7XG4gIGNvbnN0IGlzRWRpdEFjdGlvbiA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWl0ZW1cIilcbiAgICA/IHRydWVcbiAgICA6IGZhbHNlO1xuICByZXR1cm4gW2lzRGVsZXRlQWN0aW9uLCBpc0VkaXRBY3Rpb25dO1xufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmVUb2RvT3JQcm9qZWN0KGV2ZW50KSB7XG4gIGNvbnN0IHBhcmVudExpID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJsaVwiKTtcbiAgY29uc3QgcGFyZW50T2JqZWN0RGF0YXNldCA9IHBhcmVudExpLmRhdGFzZXQ7XG4gIGNvbnN0IG9iamVjdCA9IE9iamVjdC5rZXlzKHBhcmVudE9iamVjdERhdGFzZXQpWzBdO1xuICBjb25zdCBvYmplY3RJRCA9ICtPYmplY3QudmFsdWVzKHBhcmVudE9iamVjdERhdGFzZXQpWzBdO1xuICByZXR1cm4gW29iamVjdCwgb2JqZWN0SUQsIHBhcmVudExpXTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSFRNTENvbnRlbnQoZWxlbWVudCkge1xuICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VHcm91cEhUTUwobGlzdEdyb3VwU2VsZWN0aW9uKSB7XG4gIGNvbnN0IGgxID0gY3JlYXRlRWxlbWVudChcImgxXCIsIFwidGVzdFwiLCBcImdyb3VwaW5nLXRpdGxlXCIpO1xuICBoMS50ZXh0Q29udGVudCA9XG4gICAgbGlzdEdyb3VwU2VsZWN0aW9uPy5xdWVyeVNlbGVjdG9yKFwiaDNcIikudGV4dENvbnRlbnQgPz8gXCJBbGwgVGFza3NcIjtcblxuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbWVudChcInVsXCIsIFwidGVzdDJcIiwgXCJjdXJyLWdyb3VwaW5nLXRvZG9zXCIpO1xuXG4gIHJldHVybiBbaDEsIGxpc3RdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlR3JvdXBIVE1MO1xuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlID0gXCJkaXZcIiwgY2xhc3NuYW1lID0gXCJcIiwgaWQgPSBcIlwiKSB7XG4gIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGlmIChjbGFzc25hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSk7XG4gIGlmIChpZCkgZWxlLmlkID0gaWQ7XG4gIHJldHVybiBlbGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVsZW1lbnQ7XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChvYmplY3QpIHtcbiAgY29uc3QgW29iaklELCBpZFRhZ10gPSBnZXRPYmplY3RJREFuZFRhZyhvYmplY3QpO1xuXG4gIGNvbnN0IGxpID0gY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5kYXRhc2V0W2lkVGFnXSA9IG9iaklEO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcbiAgICAvKiBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB2YWx1ZSk7ICovXG4gICAgaWYgKGtleSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICBjb25zdCBoZWFkaW5nID0gY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XG4gICAgICBjb25zdCBwID0gY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICB9XG4gIH1cblxuICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KFwidG9kb0lEXCIpKSB7XG4gICAgLyogdXNlIG9yZGVyIHRvIHBsYWNlIGNvbXBsZXRlQnRuIGFsbCB0aGUgd2F5IHRvIGxlZnQgaW4gbGkgKi9cbiAgICBjb25zdCBjaGVja0NvbXBsZXRlQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcInRvZ2dsZS1jb21wbGV0ZS1idG5cIik7XG4gICAgY2hlY2tDb21wbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiTWFyayBjb21wbGV0ZVwiOyAvKiBtYWtlIHNlcCBmbiAqL1xuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrQ29tcGxldGVCdG4pO1xuXG4gICAgY29uc3QgY2hlY2tJbXBvcnRhbnRCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwidG9nZ2xlLWltcG9ydGFudC1idG5cIik7XG4gICAgY2hlY2tJbXBvcnRhbnRCdG4udGV4dENvbnRlbnQgPSBcIk1hcmsgaW1wb3J0YW50XCI7IC8qIG1ha2Ugc2VwIGZuICovXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tJbXBvcnRhbnRCdG4pO1xuICB9XG5cbiAgY29uc3QgZWRpdENvbnRhaW5lciA9IGNyZWF0ZUVkaXRDb250YWluZXIoKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZWRpdENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIGxpOyAvKiBsb3RzIG9mIHJlcGVhdGluZyBhcHBlbmRDSGlsZGluZyAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3Q7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVkaXRDb250YWluZXIoKSB7XG4gIGNvbnN0IGVkaXRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZWRpdC1jb250YWluZXJcIik7XG4gIGNvbnN0IGVkaXRCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiZWRpdC1pdGVtXCIpO1xuICBlZGl0QnRuLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJkZWxldGUtaXRlbVwiKTtcbiAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgZWRpdENvbnRhaW5lci5hcHBlbmQoZWRpdEJ0biwgZGVsZXRlQnRuKTtcblxuICByZXR1cm4gZWRpdENvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0SURBbmRUYWcob2JqZWN0KSB7XG4gIGNvbnN0IGtleTEgPSBcInByb2plY3RJRFwiO1xuICBjb25zdCBrZXkyID0gXCJ0b2RvSURcIjtcbiAgY29uc3Qgb2JqSUQgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IG9iamVjdC5wcm9qZWN0SURcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gb2JqZWN0LnRvZG9JRFxuICAgIDogbnVsbDtcblxuICBjb25zdCBpZFRhZyA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkxKVxuICAgID8gXCJwcm9qZWN0XCJcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gXCJ0b2RvXCJcbiAgICA6IG51bGw7XG5cbiAgcmV0dXJuIFtvYmpJRCwgaWRUYWddO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBsb2cgPSBjb25zb2xlLmxvZztcbmltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5sb2coUHJvamVjdE1hbmFnZXIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlJlZnVybmlzaCBIb21lXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHsgdGl0bGU6IFwiUGFpbnQgV2FsbHNcIiB9KTtcblByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgwKTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcIm1vdmUgc29mYVwiLFxuICBkZXNjcmlwdGlvbjogXCJsaWZ0IGRvbnQgZHJhZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHRhYmxlXCIsXG4gIGRlc2NyaXB0aW9uOiBcImRyYWcgaXQgcm91Z2hseVwiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJidXkgcGFpbnRcIixcbiAgZGVzY3JpcHRpb246IFwibWl4IGl0IHdlbGwgYmVmb3JlIGFwcGx5aW5nXCIsXG59KTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcImJ1eSBicnVzaFwiLFxufSk7XG5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG5Ub2RvVUlNYW5hZ2VyLnJlbmRlclByb2plY3RzTGlzdChcInByb2plY3RzXCIpO1xuVG9kb1VJTWFuYWdlci5yZW5kZXJTZWxlY3RlZEdyb3VwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=