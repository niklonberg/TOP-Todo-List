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
  const appContent = document.querySelector("#app-content");
  const createNewTodoBtn = document.querySelector("#create-new-todo");
  const createNewProjectBtn = document.querySelector("#create-new-project");
  let projectFormExists = false;
  let todoFormExists = false;

  const limitFormCount = (isProjectForm) => {
    if (isProjectForm && projectFormExists) return true;
    if (!isProjectForm && todoFormExists) return true;
    return false;
  };

  const toggleProjectTodoExisting = (boolean, isProjectForm) => {
    isProjectForm ? (projectFormExists = boolean) : (todoFormExists = boolean);
  };

  const createForm = (event, object, objectID, parentElement) => {
    const isProjectForm = determineFormType(object || event.target.id);
    if (limitFormCount(isProjectForm)) return;

    const elementToChange =
      parentElement || event.target.previousElementSibling;
    console.log(elementToChange);
    const itemToEdit = object
      ? object === "project"
        ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(objectID)
        : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectedTodo(objectID)
      : null;
    console.log(object);
    console.log(itemToEdit);

    const formTypeTemplate = isProjectForm
      ? createProjectForm(itemToEdit)
      : createTodoForm(itemToEdit);

    createAndAppendForm(elementToChange, formTypeTemplate);

    const form = elementToChange.querySelector("form");
    initializeForm(form, isProjectForm, itemToEdit, elementToChange);

    toggleProjectTodoExisting(true, isProjectForm);
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
      : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].addTodoToCurrSelectedProject(templateObj);

    _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addLatestItem(object, isProjectForm);

    toggleProjectTodoExisting(false, isProjectForm);
  };

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  const resetTodoFormExists = () => (todoFormExists = false);

  const handleEditFormCancelClicked = (event) => {
    if (event.target.classList.contains("cancel-item-edit")) {
      _TodoUIManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].cancelEditSelectedItem(event);
    }
  };
  appContent.addEventListener("click", handleEditFormCancelClicked);

  return {
    createForm,
    resetTodoFormExists,
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
    <button type="submit">Confirm</button>
    <button type="button" class="cancel-item-edit">Cancel</button>
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
    <button type="submit">Confirm</button>
    <button type="button" class="cancel-item-edit">Cancel</button>
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

  /* currSelectedProject operations */
  const getCurrSelectedProject = () => currSelectedProj;

  const getCurrSelectedProjectTodos = () => currSelectedProj.getTodos();

  const setSelectedProject = (projectID) => {
    deselectCurrProject();
    currSelectedProj = getProject(projectID);
    currSelectedProj.toggleSelected();
  };

  const deselectCurrProject = () => currSelectedProj?.toggleSelected();

  const addTodoToCurrSelectedProject = (inputElements) => {
    console.log("selected project is: ", currSelectedProj);
    const todo = (0,_TodoFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(inputElements);
    currSelectedProj.addTodo(todo);
    console.log(projects);
    return todo;
  };

  /* project operations */
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
    if (listGroupSelectionID === "week-tasks") {
      // filter through all projects todos
      // return the ones with a date within next 7 days
    }
    if (listGroupSelectionID === "important-tasks") {
      // filter through all projects todos
      // return the ones with a isImportant === true
    }
  };

  return {
    addProject,
    removeSelectedProject,
    getProjects,
    getProject,
    getCurrSelectedProject,
    getCurrSelectedProjectTodos /* sure about export all of them?? */,
    setSelectedProject,
    addTodoToCurrSelectedProject,
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
        ? _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrSelectedProjectTodos()
        : _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getFilteredTasks(listGroupSelection?.id);

    selectedGroupTodos.forEach((grouping) =>
      currGroupingTodos.appendChild((0,_createListItemFromObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(grouping))
    );
  };

  const showSelectedGroup = (event) => {
    const listGroupSelection =
      event.target.tagName === "LI" || event.target.tagName === "H3"
        ? event.target.closest("LI")
        : null;

    if (!listGroupSelection) return;

    if (listGroupSelection !== previousListGroupSelection) {
      console.log("selection is: ", listGroupSelection);
      const projectID = listGroupSelection?.dataset?.project;
      if (projectID !== undefined)
        _ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(+projectID);
      renderSelectedGroup(listGroupSelection);
      previousListGroupSelection = listGroupSelection;

      _FormManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].resetTodoFormExists();
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
    if (!isDeleteAction && !isEditAction) return;

    const [object, objectID, parentLi] =
      isDeleteAction || isEditAction ? determineTodoOrProject(event) : null;

    if (isDeleteAction) removeSelectedItem(object, objectID, parentLi);

    if (isEditAction) _FormManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].createForm(event, object, objectID, parentLi);
  };
  appContent.addEventListener("click", editSelectedItem);

  const cancelEditSelectedItem = (event) => {
    const [object, objectID, parentLi] = determineTodoOrProject(event);
    console.log(object, objectID, parentLi);
    const searchObj = {
      [`${object}ID`]: objectID,
    };
    console.log(searchObj);
    const newLI = null;
  };

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
    cancelEditSelectedItem,
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
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToCurrSelectedProject({
  title: "move sofa",
  description: "lift dont drag",
});
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToCurrSelectedProject({
  title: "move table",
  description: "drag it roughly",
});
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].setSelectedProject(1);
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToCurrSelectedProject({
  title: "buy paint",
  description: "mix it well before applying",
});
_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToCurrSelectedProject({
  title: "buy brush",
});
log(_modules_ProjectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].renderProjectsList("projects");
_modules_TodoUIManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].renderSelectedGroup();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDbUQ7QUFDTTtBQUNGO0FBQ3ZELElBQUksa0VBQWM7QUFDbEIsa0VBQWMsY0FBYyx5QkFBeUI7QUFDckQsa0VBQWMsY0FBYyxzQkFBc0I7QUFDbEQsa0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Q7QUFDQSxDQUFDO0FBQ0QsSUFBSSxrRUFBYztBQUNsQixpRUFBYTtBQUNiLGlFQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9GYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVCYXNlR3JvdXBIVE1MLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVMaXN0SXRlbUZyb21PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgVG9kb1VJTWFuYWdlciBmcm9tIFwiLi9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5cbmNvbnN0IEZvcm1NYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBhcHBDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtY29udGVudFwiKTtcbiAgY29uc3QgY3JlYXRlTmV3VG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy10b2RvXCIpO1xuICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXByb2plY3RcIik7XG4gIGxldCBwcm9qZWN0Rm9ybUV4aXN0cyA9IGZhbHNlO1xuICBsZXQgdG9kb0Zvcm1FeGlzdHMgPSBmYWxzZTtcblxuICBjb25zdCBsaW1pdEZvcm1Db3VudCA9IChpc1Byb2plY3RGb3JtKSA9PiB7XG4gICAgaWYgKGlzUHJvamVjdEZvcm0gJiYgcHJvamVjdEZvcm1FeGlzdHMpIHJldHVybiB0cnVlO1xuICAgIGlmICghaXNQcm9qZWN0Rm9ybSAmJiB0b2RvRm9ybUV4aXN0cykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVByb2plY3RUb2RvRXhpc3RpbmcgPSAoYm9vbGVhbiwgaXNQcm9qZWN0Rm9ybSkgPT4ge1xuICAgIGlzUHJvamVjdEZvcm0gPyAocHJvamVjdEZvcm1FeGlzdHMgPSBib29sZWFuKSA6ICh0b2RvRm9ybUV4aXN0cyA9IGJvb2xlYW4pO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUZvcm0gPSAoZXZlbnQsIG9iamVjdCwgb2JqZWN0SUQsIHBhcmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBpc1Byb2plY3RGb3JtID0gZGV0ZXJtaW5lRm9ybVR5cGUob2JqZWN0IHx8IGV2ZW50LnRhcmdldC5pZCk7XG4gICAgaWYgKGxpbWl0Rm9ybUNvdW50KGlzUHJvamVjdEZvcm0pKSByZXR1cm47XG5cbiAgICBjb25zdCBlbGVtZW50VG9DaGFuZ2UgPVxuICAgICAgcGFyZW50RWxlbWVudCB8fCBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICBjb25zb2xlLmxvZyhlbGVtZW50VG9DaGFuZ2UpO1xuICAgIGNvbnN0IGl0ZW1Ub0VkaXQgPSBvYmplY3RcbiAgICAgID8gb2JqZWN0ID09PSBcInByb2plY3RcIlxuICAgICAgICA/IFByb2plY3RNYW5hZ2VyLmdldFByb2plY3Qob2JqZWN0SUQpXG4gICAgICAgIDogUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRUb2RvKG9iamVjdElEKVxuICAgICAgOiBudWxsO1xuICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgY29uc29sZS5sb2coaXRlbVRvRWRpdCk7XG5cbiAgICBjb25zdCBmb3JtVHlwZVRlbXBsYXRlID0gaXNQcm9qZWN0Rm9ybVxuICAgICAgPyBjcmVhdGVQcm9qZWN0Rm9ybShpdGVtVG9FZGl0KVxuICAgICAgOiBjcmVhdGVUb2RvRm9ybShpdGVtVG9FZGl0KTtcblxuICAgIGNyZWF0ZUFuZEFwcGVuZEZvcm0oZWxlbWVudFRvQ2hhbmdlLCBmb3JtVHlwZVRlbXBsYXRlKTtcblxuICAgIGNvbnN0IGZvcm0gPSBlbGVtZW50VG9DaGFuZ2UucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG4gICAgaW5pdGlhbGl6ZUZvcm0oZm9ybSwgaXNQcm9qZWN0Rm9ybSwgaXRlbVRvRWRpdCwgZWxlbWVudFRvQ2hhbmdlKTtcblxuICAgIHRvZ2dsZVByb2plY3RUb2RvRXhpc3RpbmcodHJ1ZSwgaXNQcm9qZWN0Rm9ybSk7XG4gIH07XG4gIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZUZvcm0pO1xuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVGb3JtKTtcblxuICBjb25zdCBpbml0aWFsaXplRm9ybSA9IChmb3JtLCBpc1Byb2plY3RGb3JtLCBpdGVtVG9FZGl0LCBlbGVtZW50VG9DaGFuZ2UpID0+IHtcbiAgICBjb25zdCBzdWJtaXRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICBoYW5kbGVGb3JtU3VibWl0KGV2ZW50LCBmb3JtLCBpc1Byb2plY3RGb3JtLCBpdGVtVG9FZGl0LCBlbGVtZW50VG9DaGFuZ2UpO1xuICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHN1Ym1pdEhhbmRsZXIpO1xuICAgICAgZm9ybS5yZW1vdmUoKTtcbiAgICB9O1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5kbGVyKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gKFxuICAgIGV2ZW50LFxuICAgIGZvcm0sXG4gICAgaXNQcm9qZWN0Rm9ybSxcbiAgICBpdGVtVG9FZGl0LFxuICAgIGVsZW1lbnRUb0NoYW5nZVxuICApID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRlbXBsYXRlT2JqID0gY3JlYXRlT2JqZWN0RnJvbUZvcm0oZ2V0SW5wdXRFbGVtZW50cyhmb3JtKSk7XG4gICAgaWYgKGl0ZW1Ub0VkaXQpIHtcbiAgICAgIFwicHJvamVjdElEXCIgaW4gaXRlbVRvRWRpdCB8fCBcInRvZG9JRFwiIGluIGl0ZW1Ub0VkaXRcbiAgICAgICAgPyBQcm9qZWN0TWFuYWdlci5lZGl0SXRlbShpdGVtVG9FZGl0LCB0ZW1wbGF0ZU9iailcbiAgICAgICAgOiBudWxsO1xuICAgICAgVG9kb1VJTWFuYWdlci51cGRhdGVFZGl0ZWRJdGVtKHRlbXBsYXRlT2JqLCBlbGVtZW50VG9DaGFuZ2UpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb2JqZWN0ID0gaXNQcm9qZWN0Rm9ybVxuICAgICAgPyBQcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHRlbXBsYXRlT2JqKVxuICAgICAgOiBQcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9DdXJyU2VsZWN0ZWRQcm9qZWN0KHRlbXBsYXRlT2JqKTtcblxuICAgIFRvZG9VSU1hbmFnZXIuYWRkTGF0ZXN0SXRlbShvYmplY3QsIGlzUHJvamVjdEZvcm0pO1xuXG4gICAgdG9nZ2xlUHJvamVjdFRvZG9FeGlzdGluZyhmYWxzZSwgaXNQcm9qZWN0Rm9ybSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICBjb25zdCByZXNldFRvZG9Gb3JtRXhpc3RzID0gKCkgPT4gKHRvZG9Gb3JtRXhpc3RzID0gZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZUVkaXRGb3JtQ2FuY2VsQ2xpY2tlZCA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FuY2VsLWl0ZW0tZWRpdFwiKSkge1xuICAgICAgVG9kb1VJTWFuYWdlci5jYW5jZWxFZGl0U2VsZWN0ZWRJdGVtKGV2ZW50KTtcbiAgICB9XG4gIH07XG4gIGFwcENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUVkaXRGb3JtQ2FuY2VsQ2xpY2tlZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVGb3JtLFxuICAgIHJlc2V0VG9kb0Zvcm1FeGlzdHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRm9ybVR5cGUob2JqZWN0VHlwZSkge1xuICBjb25zb2xlLmxvZyhvYmplY3RUeXBlKTtcbiAgcmV0dXJuIG9iamVjdFR5cGUuaW5jbHVkZXMoXCJwcm9qZWN0XCIpIHx8IG9iamVjdFR5cGUgPT09IFwicHJvamVjdFwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0Rm9ybShwcm9qZWN0KSB7XG4gIGNvbnN0IHRpdGxlQXR0cmlidXRlID0gcHJvamVjdD8udGl0bGUgPyBgJHtwcm9qZWN0LnRpdGxlfWAgOiBcIlwiO1xuXG4gIHJldHVybiBgXG4gIDxmb3JtIGFjdGlvbj1cIiNcIiBpZD1cInByb2plY3QtZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiB2YWx1ZT1cIiR7dGl0bGVBdHRyaWJ1dGV9XCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5Db25maXJtPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjYW5jZWwtaXRlbS1lZGl0XCI+Q2FuY2VsPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0Zvcm0odG9kbykge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJ0b2RvLWZvcm1cIj5cbiAgICA8bGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICA8bGFiZWwgZm9yPVwiaXNJbXBvcnRhbnRcIj5FeHRyYSBpbXBvcnRhbnQ/PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImlzSW1wb3J0YW50XCIgaWQ9XCJpc0ltcG9ydGFudFwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2FuY2VsLWl0ZW0tZWRpdFwiPkNhbmNlbDwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdEZyb21Gb3JtKGZvcm1JbnB1dHMpIHtcbiAgcmV0dXJuIGZvcm1JbnB1dHMucmVkdWNlKChvYmplY3QsIGl0ZW0pID0+IHtcbiAgICBpZiAoaXRlbS50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgIHJldHVybiB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLmNoZWNrZWQgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGl0ZW0udmFsdWUgPyB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiBvYmplY3Q7XG4gICAgfVxuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFuZEFwcGVuZEZvcm0oZWxlbWVudFRvQXBwZW5kRm9ybVRvLCBmb3JtVHlwZVRlbXBsYXRlKSB7XG4gIGVsZW1lbnRUb0FwcGVuZEZvcm1Uby50YWdOYW1lID09PSBcIkxJXCJcbiAgICA/IChlbGVtZW50VG9BcHBlbmRGb3JtVG8uaW5uZXJIVE1MID0gZm9ybVR5cGVUZW1wbGF0ZSlcbiAgICA6IGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZm9ybVR5cGVUZW1wbGF0ZSk7XG59XG4iLCJsZXQgcHJvamVjdElEQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KG9iamVjdCkge1xuICBjb25zdCBwcm9qZWN0ID0ge1xuICAgIHRpdGxlOiBvYmplY3QudGl0bGUsXG4gICAgcHJvamVjdElEOiBwcm9qZWN0SURDb3VudGVyLFxuICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgIHRvZG9zOiBbXSxcbiAgfTtcblxuICAvL3VzZSBvYmplY3Quc2V0UHJvdG90eXBlT2YgdG8gYXNzaWduIG1ldGhvZHMgdG8gcHJvdG95cGUsIHRvIGF2b2lkIGR1cGxpY2F0aW9uXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihwcm9qZWN0LCBzaGFyZWRNZXRob2RzKTtcblxuICBwcm9qZWN0SURDb3VudGVyKys7XG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcblxuY29uc3Qgc2hhcmVkTWV0aG9kcyA9IHtcbiAgZ2V0VG9kb3M6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfSxcblxuICBnZXRUb2RvOiBmdW5jdGlvbiAodG9kb0lEKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3MuZmluZCgodG9kbykgPT4gdG9kby50b2RvSUQgPT09IHRvZG9JRCk7XG4gIH0sXG5cbiAgYWRkVG9kbzogZnVuY3Rpb24gKHRvZG8pIHtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gIH0sXG5cbiAgcmVtb3ZlVG9kbzogZnVuY3Rpb24gKHRvZG9JRCkge1xuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvSUQgIT09IHRvZG9JRCk7XG4gIH0sXG5cbiAgdG9nZ2xlVG9kb0Jvb2xQcm9wZXJ0eTogZnVuY3Rpb24gKHRvZG9JRCwgdG9kb1Byb3BlcnR5KSB7XG4gICAgY29uc3QgdGFyZ2V0VG9kbyA9IHRoaXMuZ2V0VG9kbyh0b2RvSUQpO1xuICAgIHRhcmdldFRvZG9bdG9kb1Byb3BlcnR5XSA9ICF0YXJnZXRUb2RvW3RvZG9Qcm9wZXJ0eV07XG4gIH0sXG5cbiAgdG9nZ2xlU2VsZWN0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlzU2VsZWN0ZWQgPSAhdGhpcy5pc1NlbGVjdGVkO1xuICB9LFxufTtcbiIsImltcG9ydCBUb2RvRmFjdG9yeSBmcm9tIFwiLi9Ub2RvRmFjdG9yeS5qc1wiO1xuaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFByb2plY3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgbGV0IHByb2plY3RzID0gW107XG4gIGxldCBjdXJyU2VsZWN0ZWRQcm9qO1xuXG4gIC8qIGN1cnJTZWxlY3RlZFByb2plY3Qgb3BlcmF0aW9ucyAqL1xuICBjb25zdCBnZXRDdXJyU2VsZWN0ZWRQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBnZXRDdXJyU2VsZWN0ZWRQcm9qZWN0VG9kb3MgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qLmdldFRvZG9zKCk7XG5cbiAgY29uc3Qgc2V0U2VsZWN0ZWRQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xuICAgIGRlc2VsZWN0Q3VyclByb2plY3QoKTtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qID0gZ2V0UHJvamVjdChwcm9qZWN0SUQpO1xuICAgIGN1cnJTZWxlY3RlZFByb2oudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgfTtcblxuICBjb25zdCBkZXNlbGVjdEN1cnJQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvaj8udG9nZ2xlU2VsZWN0ZWQoKTtcblxuICBjb25zdCBhZGRUb2RvVG9DdXJyU2VsZWN0ZWRQcm9qZWN0ID0gKGlucHV0RWxlbWVudHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHByb2plY3QgaXM6IFwiLCBjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICBjb25zdCB0b2RvID0gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cyk7XG4gICAgY3VyclNlbGVjdGVkUHJvai5hZGRUb2RvKHRvZG8pO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICByZXR1cm4gdG9kbztcbiAgfTtcblxuICAvKiBwcm9qZWN0IG9wZXJhdGlvbnMgKi9cbiAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0VGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdEZhY3RvcnkocHJvamVjdFRpdGxlKTtcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHJldHVybiBwcm9qZWN0O1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkUHJvamVjdCA9IChwcm9qZWN0SUQpID0+XG4gICAgKHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RJRCAhPT0gcHJvamVjdElEKSk7XG5cbiAgY29uc3QgZ2V0UHJvamVjdCA9IChwcm9qZWN0SUQpID0+XG4gICAgcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0SUQgPT09IHByb2plY3RJRCk7XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICBjb25zdCBnZXRTZWxlY3RlZFRvZG8gPSAodG9kb0lEKSA9PlxuICAgIGdldFByb2plY3RGcm9tVG9kb0lEKHRvZG9JRCkuZ2V0VG9kbyh0b2RvSUQpO1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkVG9kbyA9ICh0b2RvSUQpID0+XG4gICAgZ2V0UHJvamVjdEZyb21Ub2RvSUQodG9kb0lEKS5yZW1vdmVUb2RvKHRvZG9JRCk7XG5cbiAgY29uc3QgZWRpdEl0ZW0gPSAoaXRlbVRvRWRpdCwgdGVtcGxhdGVPYmopID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIml0ZW0gdG8gZWRpdCBpczogXCIsIGl0ZW1Ub0VkaXQpO1xuICAgIGNvbnNvbGUubG9nKFwidGVtcGxhdGVPYmogaXM6IFwiLCB0ZW1wbGF0ZU9iaik7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGVtcGxhdGVPYmopIHtcbiAgICAgIGl0ZW1Ub0VkaXRba2V5XSA9IHRlbXBsYXRlT2JqW2tleV07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSA9ICh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSkgPT5cbiAgICBnZXRQcm9qZWN0RnJvbVRvZG9JRCh0b2RvSUQpLnRvZ2dsZVRvZG9Cb29sUHJvcGVydHkodG9kb0lELCB0b2RvUHJvcGVydHkpO1xuXG4gIGNvbnN0IGdldFByb2plY3RGcm9tVG9kb0lEID0gKHRvZG9JRCkgPT5cbiAgICBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRvZG8odG9kb0lEKSk7XG5cbiAgY29uc3QgZ2V0RmlsdGVyZWRUYXNrcyA9IChsaXN0R3JvdXBTZWxlY3Rpb25JRCA9IFwiYWxsLXRhc2tzXCIpID0+IHtcbiAgICBpZiAobGlzdEdyb3VwU2VsZWN0aW9uSUQgPT09IFwiYWxsLXRhc2tzXCIpIHtcbiAgICAgIHJldHVybiBwcm9qZWN0c1xuICAgICAgICAubWFwKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByb2plY3QuZ2V0VG9kb3MoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZsYXQoKTtcbiAgICB9XG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbklEID09PSBcInRvZGF5LXRhc2tzXCIpIHtcbiAgICAgIC8vIGZpbHRlciB0aHJvdWdoIGFsbCBwcm9qZWN0cyB0b2Rvc1xuICAgICAgLy8gcmV0dXJuIHRoZSBvbmVzIHdpdGggYSBkYXRlIG9iaiBvZiB0b2RheVxuICAgIH1cbiAgICBpZiAobGlzdEdyb3VwU2VsZWN0aW9uSUQgPT09IFwid2Vlay10YXNrc1wiKSB7XG4gICAgICAvLyBmaWx0ZXIgdGhyb3VnaCBhbGwgcHJvamVjdHMgdG9kb3NcbiAgICAgIC8vIHJldHVybiB0aGUgb25lcyB3aXRoIGEgZGF0ZSB3aXRoaW4gbmV4dCA3IGRheXNcbiAgICB9XG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbklEID09PSBcImltcG9ydGFudC10YXNrc1wiKSB7XG4gICAgICAvLyBmaWx0ZXIgdGhyb3VnaCBhbGwgcHJvamVjdHMgdG9kb3NcbiAgICAgIC8vIHJldHVybiB0aGUgb25lcyB3aXRoIGEgaXNJbXBvcnRhbnQgPT09IHRydWVcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIHJlbW92ZVNlbGVjdGVkUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBnZXRQcm9qZWN0LFxuICAgIGdldEN1cnJTZWxlY3RlZFByb2plY3QsXG4gICAgZ2V0Q3VyclNlbGVjdGVkUHJvamVjdFRvZG9zIC8qIHN1cmUgYWJvdXQgZXhwb3J0IGFsbCBvZiB0aGVtPz8gKi8sXG4gICAgc2V0U2VsZWN0ZWRQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub0N1cnJTZWxlY3RlZFByb2plY3QsXG4gICAgcmVtb3ZlU2VsZWN0ZWRUb2RvLFxuICAgIGdldFNlbGVjdGVkVG9kbyxcbiAgICBlZGl0SXRlbSxcbiAgICB0b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSxcbiAgICBnZXRGaWx0ZXJlZFRhc2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdE1hbmFnZXI7XG4iLCJsZXQgdG9kb0lEQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIFRvZG9GYWN0b3J5KG9iaikge1xuICBjb25zdCB0b2RvID0ge307XG4gIHRvZG8udG9kb0lEID0gdG9kb0lEQ291bnRlcjtcbiAgdG9kby5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICB0b2RvLmlzSW1wb3J0YW50ID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIHRvZG9ba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgdG9kb0lEQ291bnRlcisrO1xuICByZXR1cm4gdG9kbztcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0ZhY3Rvcnk7XG5cbi8qIGxvb3BzIHRocm91Z2ggZWFjaCBrZXkgaW4gYXJndW1lbnRvYmogKi9cbi8qIHJldHVybnMge30gd2l0aCBrZXk6dmFsdWUgcGFpcnMqL1xuLyogdGl0bGUgKi9cbi8qIGRlc2NyaXB0aW9uICovXG4vKiBkdWVEYXRlICovXG4vKiBwcmlvcml0eSAqL1xuLyogbm90ZXMgKi9cbi8qIGNoZWNrbGlzdCAoc3ViIHN0ZXBzKSAqL1xuLyogbWF5YmUgYWRkIG1ldGhvZHMgdG8gdGhlIG9iamVjdHMgYXMgd2VsbD8gKi9cbiIsImltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0IGZyb20gXCIuL2NyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdC5qc1wiO1xuaW1wb3J0IGNyZWF0ZUJhc2VHcm91cEhUTUwgZnJvbSBcIi4vY3JlYXRlQmFzZUdyb3VwSFRNTC5qc1wiO1xuXG5jb25zdCBUb2RvVUlNYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBhcHBDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtY29udGVudFwiKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtbGlzdFwiKTtcbiAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZS1iYXJcIik7XG4gIGxldCBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbjtcblxuICBjb25zdCByZW5kZXJQcm9qZWN0c0xpc3QgPSAoKSA9PiB7XG4gICAgcmVtb3ZlSFRNTENvbnRlbnQocHJvamVjdHNMaXN0KTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PlxuICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChwcm9qZWN0KSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclNlbGVjdGVkR3JvdXAgPSAobGlzdEdyb3VwU2VsZWN0aW9uKSA9PiB7XG4gICAgY29uc29sZS5sb2cobGlzdEdyb3VwU2VsZWN0aW9uKTtcbiAgICByZW1vdmVIVE1MQ29udGVudChtYWluQ29udGVudCk7XG4gICAgY29uc3QgW2gxLCBjdXJyR3JvdXBpbmdUb2Rvc10gPSBjcmVhdGVCYXNlR3JvdXBIVE1MKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gICAgbWFpbkNvbnRlbnQuYXBwZW5kKGgxLCBjdXJyR3JvdXBpbmdUb2Rvcyk7XG5cbiAgICBjb25zdCBzZWxlY3RlZEdyb3VwVG9kb3MgPVxuICAgICAgbGlzdEdyb3VwU2VsZWN0aW9uICYmIGxpc3RHcm91cFNlbGVjdGlvbi5kYXRhc2V0LnByb2plY3RcbiAgICAgICAgPyBQcm9qZWN0TWFuYWdlci5nZXRDdXJyU2VsZWN0ZWRQcm9qZWN0VG9kb3MoKVxuICAgICAgICA6IFByb2plY3RNYW5hZ2VyLmdldEZpbHRlcmVkVGFza3MobGlzdEdyb3VwU2VsZWN0aW9uPy5pZCk7XG5cbiAgICBzZWxlY3RlZEdyb3VwVG9kb3MuZm9yRWFjaCgoZ3JvdXBpbmcpID0+XG4gICAgICBjdXJyR3JvdXBpbmdUb2Rvcy5hcHBlbmRDaGlsZChjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QoZ3JvdXBpbmcpKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc2hvd1NlbGVjdGVkR3JvdXAgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBsaXN0R3JvdXBTZWxlY3Rpb24gPVxuICAgICAgZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiTElcIiB8fCBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJIM1wiXG4gICAgICAgID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJMSVwiKVxuICAgICAgICA6IG51bGw7XG5cbiAgICBpZiAoIWxpc3RHcm91cFNlbGVjdGlvbikgcmV0dXJuO1xuXG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbiAhPT0gcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0aW9uIGlzOiBcIiwgbGlzdEdyb3VwU2VsZWN0aW9uKTtcbiAgICAgIGNvbnN0IHByb2plY3RJRCA9IGxpc3RHcm91cFNlbGVjdGlvbj8uZGF0YXNldD8ucHJvamVjdDtcbiAgICAgIGlmIChwcm9qZWN0SUQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KCtwcm9qZWN0SUQpO1xuICAgICAgcmVuZGVyU2VsZWN0ZWRHcm91cChsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICAgICAgcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb24gPSBsaXN0R3JvdXBTZWxlY3Rpb247XG5cbiAgICAgIEZvcm1NYW5hZ2VyLnJlc2V0VG9kb0Zvcm1FeGlzdHMoKTtcbiAgICB9XG4gIH07XG4gIHNpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dTZWxlY3RlZEdyb3VwKTtcblxuICBjb25zdCBhZGRMYXRlc3RJdGVtID0gKG9iamVjdCwgaXNOZXdQcm9qZWN0KSA9PiB7XG4gICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICBjb25zdCBjdXJyR3JvdXBUb2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnItZ3JvdXBpbmctdG9kb3NcIik7XG4gICAgY29uc3QgaXRlbSA9IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChvYmplY3QpO1xuICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgIGlzTmV3UHJvamVjdFxuICAgICAgPyBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSlcbiAgICAgIDogY3Vyckdyb3VwVG9kb3NMaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICB9O1xuXG4gIGNvbnN0IGVkaXRTZWxlY3RlZEl0ZW0gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBbaXNEZWxldGVBY3Rpb24sIGlzRWRpdEFjdGlvbl0gPSBkZXRlcm1pbmVFZGl0T3JEZWxldGVBY3Rpb24oZXZlbnQpO1xuICAgIGlmICghaXNEZWxldGVBY3Rpb24gJiYgIWlzRWRpdEFjdGlvbikgcmV0dXJuO1xuXG4gICAgY29uc3QgW29iamVjdCwgb2JqZWN0SUQsIHBhcmVudExpXSA9XG4gICAgICBpc0RlbGV0ZUFjdGlvbiB8fCBpc0VkaXRBY3Rpb24gPyBkZXRlcm1pbmVUb2RvT3JQcm9qZWN0KGV2ZW50KSA6IG51bGw7XG5cbiAgICBpZiAoaXNEZWxldGVBY3Rpb24pIHJlbW92ZVNlbGVjdGVkSXRlbShvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaSk7XG5cbiAgICBpZiAoaXNFZGl0QWN0aW9uKSBGb3JtTWFuYWdlci5jcmVhdGVGb3JtKGV2ZW50LCBvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaSk7XG4gIH07XG4gIGFwcENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVkaXRTZWxlY3RlZEl0ZW0pO1xuXG4gIGNvbnN0IGNhbmNlbEVkaXRTZWxlY3RlZEl0ZW0gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBbb2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGldID0gZGV0ZXJtaW5lVG9kb09yUHJvamVjdChldmVudCk7XG4gICAgY29uc29sZS5sb2cob2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGkpO1xuICAgIGNvbnN0IHNlYXJjaE9iaiA9IHtcbiAgICAgIFtgJHtvYmplY3R9SURgXTogb2JqZWN0SUQsXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhzZWFyY2hPYmopO1xuICAgIGNvbnN0IG5ld0xJID0gbnVsbDtcbiAgfTtcblxuICAvKiBzb21ldGhpbmcgd2VpcmQgZ29pbmcgb24gaGVyZS4gKi9cbiAgY29uc3QgdXBkYXRlRWRpdGVkSXRlbSA9ICh0ZW1wbGF0ZU9iaiwgZWxlbWVudFRvQ2hhbmdlKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbSA9IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdCh0ZW1wbGF0ZU9iaik7XG4gICAgY29uc29sZS5sb2codGVtcGxhdGVPYmosIGVsZW1lbnRUb0NoYW5nZSwgbmV3SXRlbSk7XG4gICAgZWxlbWVudFRvQ2hhbmdlLmlubmVySFRNTCA9IG5ld0l0ZW0uaW5uZXJIVE1MO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkSXRlbSA9IChvYmplY3RUb0RlbGV0ZSwgb2JqZWN0SUQsIHBhcmVudExpKSA9PiB7XG4gICAgaWYgKG9iamVjdFRvRGVsZXRlID09PSBcInByb2plY3RcIikge1xuICAgICAgUHJvamVjdE1hbmFnZXIucmVtb3ZlU2VsZWN0ZWRQcm9qZWN0KG9iamVjdElEKTtcbiAgICAgIHJlbmRlclNlbGVjdGVkR3JvdXAoKTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0VG9EZWxldGUgPT09IFwidG9kb1wiKSBQcm9qZWN0TWFuYWdlci5yZW1vdmVTZWxlY3RlZFRvZG8ob2JqZWN0SUQpO1xuXG4gICAgcGFyZW50TGk/LnJlbW92ZSgpO1xuXG4gICAgY29uc29sZS5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlQnRuVG9kb1Byb3BlcnR5ID0gKGV2ZW50KSA9PiB7XG4gICAgbGV0IHRvZG9Qcm9wZXJ0eSA9IGRldGVybWluZVRvZG9Qcm9wZXJ0eShldmVudCk7XG5cbiAgICBpZiAodG9kb1Byb3BlcnR5KSB7XG4gICAgICBjb25zdCBidG4gPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCB0b2RvSUQgPSArYnRuLmNsb3Nlc3QoXCJsaVwiKS5kYXRhc2V0LnRvZG87XG4gICAgICBQcm9qZWN0TWFuYWdlci50b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSk7XG4gICAgfVxuICB9O1xuICBhcHBDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVCdG5Ub2RvUHJvcGVydHkpO1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUHJvamVjdHNMaXN0LFxuICAgIHJlbmRlclNlbGVjdGVkR3JvdXAsXG4gICAgYWRkTGF0ZXN0SXRlbSxcbiAgICBjYW5jZWxFZGl0U2VsZWN0ZWRJdGVtLFxuICAgIHVwZGF0ZUVkaXRlZEl0ZW0sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvVUlNYW5hZ2VyO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUb2RvUHJvcGVydHkoZXZlbnQpIHtcbiAgbGV0IHRvZG9Qcm9wZXJ0eSA9IG51bGw7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlLWNvbXBsZXRlLWJ0blwiKSlcbiAgICB0b2RvUHJvcGVydHkgPSBcImlzQ29tcGxldGVkXCI7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlLWltcG9ydGFudC1idG5cIikpXG4gICAgdG9kb1Byb3BlcnR5ID0gXCJpc0ltcG9ydGFudFwiO1xuICByZXR1cm4gdG9kb1Byb3BlcnR5O1xufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmVFZGl0T3JEZWxldGVBY3Rpb24oZXZlbnQpIHtcbiAgY29uc3QgaXNEZWxldGVBY3Rpb24gPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLWl0ZW1cIilcbiAgICA/IHRydWVcbiAgICA6IGZhbHNlO1xuICBjb25zdCBpc0VkaXRBY3Rpb24gPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1pdGVtXCIpXG4gICAgPyB0cnVlXG4gICAgOiBmYWxzZTtcbiAgcmV0dXJuIFtpc0RlbGV0ZUFjdGlvbiwgaXNFZGl0QWN0aW9uXTtcbn1cblxuZnVuY3Rpb24gZGV0ZXJtaW5lVG9kb09yUHJvamVjdChldmVudCkge1xuICBjb25zdCBwYXJlbnRMaSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwibGlcIik7XG4gIGNvbnN0IHBhcmVudE9iamVjdERhdGFzZXQgPSBwYXJlbnRMaS5kYXRhc2V0O1xuICBjb25zdCBvYmplY3QgPSBPYmplY3Qua2V5cyhwYXJlbnRPYmplY3REYXRhc2V0KVswXTtcbiAgY29uc3Qgb2JqZWN0SUQgPSArT2JqZWN0LnZhbHVlcyhwYXJlbnRPYmplY3REYXRhc2V0KVswXTtcbiAgcmV0dXJuIFtvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaV07XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhUTUxDb250ZW50KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSBcIi4vY3JlYXRlRWxlbWVudC5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlR3JvdXBIVE1MKGxpc3RHcm91cFNlbGVjdGlvbikge1xuICBjb25zdCBoMSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcInRlc3RcIiwgXCJncm91cGluZy10aXRsZVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPVxuICAgIGxpc3RHcm91cFNlbGVjdGlvbj8ucXVlcnlTZWxlY3RvcihcImgzXCIpLnRleHRDb250ZW50ID8/IFwiQWxsIFRhc2tzXCI7XG5cbiAgY29uc3QgbGlzdCA9IGNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBcInRlc3QyXCIsIFwiY3Vyci1ncm91cGluZy10b2Rvc1wiKTtcblxuICByZXR1cm4gW2gxLCBsaXN0XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUdyb3VwSFRNTDtcbiIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSA9IFwiZGl2XCIsIGNsYXNzbmFtZSA9IFwiXCIsIGlkID0gXCJcIikge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBpZiAoY2xhc3NuYW1lKSBlbGUuY2xhc3NMaXN0LmFkZChjbGFzc25hbWUpO1xuICBpZiAoaWQpIGVsZS5pZCA9IGlkO1xuICByZXR1cm4gZWxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbGVtZW50O1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSBcIi4vY3JlYXRlRWxlbWVudC5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3Qob2JqZWN0KSB7XG4gIGNvbnN0IFtvYmpJRCwgaWRUYWddID0gZ2V0T2JqZWN0SURBbmRUYWcob2JqZWN0KTtcblxuICBjb25zdCBsaSA9IGNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGkuZGF0YXNldFtpZFRhZ10gPSBvYmpJRDtcblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmplY3QpKSB7XG4gICAgLyogY29uc29sZS5sb2coa2V5ICsgXCI6IFwiICsgdmFsdWUpOyAqL1xuICAgIGlmIChrZXkgPT09IFwidGl0bGVcIikge1xuICAgICAgY29uc3QgaGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgIGhlYWRpbmcudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09IFwiZGVzY3JpcHRpb25cIikge1xuICAgICAgY29uc3QgcCA9IGNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgcC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQocCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShcInRvZG9JRFwiKSkge1xuICAgIC8qIHVzZSBvcmRlciB0byBwbGFjZSBjb21wbGV0ZUJ0biBhbGwgdGhlIHdheSB0byBsZWZ0IGluIGxpICovXG4gICAgY29uc3QgY2hlY2tDb21wbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJ0b2dnbGUtY29tcGxldGUtYnRuXCIpO1xuICAgIGNoZWNrQ29tcGxldGVCdG4udGV4dENvbnRlbnQgPSBcIk1hcmsgY29tcGxldGVcIjsgLyogbWFrZSBzZXAgZm4gKi9cbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja0NvbXBsZXRlQnRuKTtcblxuICAgIGNvbnN0IGNoZWNrSW1wb3J0YW50QnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcInRvZ2dsZS1pbXBvcnRhbnQtYnRuXCIpO1xuICAgIGNoZWNrSW1wb3J0YW50QnRuLnRleHRDb250ZW50ID0gXCJNYXJrIGltcG9ydGFudFwiOyAvKiBtYWtlIHNlcCBmbiAqL1xuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrSW1wb3J0YW50QnRuKTtcbiAgfVxuXG4gIGNvbnN0IGVkaXRDb250YWluZXIgPSBjcmVhdGVFZGl0Q29udGFpbmVyKCk7XG4gIGxpLmFwcGVuZENoaWxkKGVkaXRDb250YWluZXIpO1xuXG4gIHJldHVybiBsaTsgLyogbG90cyBvZiByZXBlYXRpbmcgYXBwZW5kQ0hpbGRpbmcgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0O1xuXG5mdW5jdGlvbiBjcmVhdGVFZGl0Q29udGFpbmVyKCkge1xuICBjb25zdCBlZGl0Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImVkaXQtY29udGFpbmVyXCIpO1xuICBjb25zdCBlZGl0QnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcImVkaXQtaXRlbVwiKTtcbiAgZWRpdEJ0bi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuICBjb25zdCBkZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiZGVsZXRlLWl0ZW1cIik7XG4gIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG4gIGVkaXRDb250YWluZXIuYXBwZW5kKGVkaXRCdG4sIGRlbGV0ZUJ0bik7XG5cbiAgcmV0dXJuIGVkaXRDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGdldE9iamVjdElEQW5kVGFnKG9iamVjdCkge1xuICBjb25zdCBrZXkxID0gXCJwcm9qZWN0SURcIjtcbiAgY29uc3Qga2V5MiA9IFwidG9kb0lEXCI7XG4gIGNvbnN0IG9iaklEID0gb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTEpXG4gICAgPyBvYmplY3QucHJvamVjdElEXG4gICAgOiBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MilcbiAgICA/IG9iamVjdC50b2RvSURcbiAgICA6IG51bGw7XG5cbiAgY29uc3QgaWRUYWcgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IFwicHJvamVjdFwiXG4gICAgOiBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MilcbiAgICA/IFwidG9kb1wiXG4gICAgOiBudWxsO1xuXG4gIHJldHVybiBbb2JqSUQsIGlkVGFnXTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbG9nID0gY29uc29sZS5sb2c7XG5pbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvVG9kb1VJTWFuYWdlci5qc1wiO1xubG9nKFByb2plY3RNYW5hZ2VyKTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoeyB0aXRsZTogXCJSZWZ1cm5pc2ggSG9tZVwiIH0pO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlBhaW50IFdhbGxzXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMCk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9DdXJyU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwibW92ZSBzb2ZhXCIsXG4gIGRlc2NyaXB0aW9uOiBcImxpZnQgZG9udCBkcmFnXCIsXG59KTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub0N1cnJTZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHRhYmxlXCIsXG4gIGRlc2NyaXB0aW9uOiBcImRyYWcgaXQgcm91Z2hseVwiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9DdXJyU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwiYnV5IHBhaW50XCIsXG4gIGRlc2NyaXB0aW9uOiBcIm1peCBpdCB3ZWxsIGJlZm9yZSBhcHBseWluZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9DdXJyU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwiYnV5IGJydXNoXCIsXG59KTtcbmxvZyhQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpKTtcblRvZG9VSU1hbmFnZXIucmVuZGVyUHJvamVjdHNMaXN0KFwicHJvamVjdHNcIik7XG5Ub2RvVUlNYW5hZ2VyLnJlbmRlclNlbGVjdGVkR3JvdXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==