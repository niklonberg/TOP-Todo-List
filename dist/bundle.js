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

  const createForm = (event, object, objectID, parentElement) => {
    const elementToChange =
      parentElement || event.target.previousElementSibling;

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
  return objectType.includes("project") || objectType === "project";
}

function createProjectForm(project) {
  const titleAttribute = project?.title ? `${project.title}` : "";

  return `
  <form action="#" id="add-project-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" value="${titleAttribute}" />
    <button type="submit">Add todo</button>
  </form>
  `;
}

function createTodoForm(todo) {
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

  /* refactor me */
  const removeSelectedTodo = (todoID) => {
    projects.forEach((project) => {
      project.removeTodo(todoID);
    });
  };

  /* refactor me? */
  const getSelectedTodo = (todoID) => {
    const projectWithTodo = projects.find((project) => project.getTodo(todoID));
    console.log(projectWithTodo);
    console.log(projectWithTodo.getTodo(todoID));
    return projectWithTodo.getTodo(todoID);
  };

  const editItem = (itemToEdit, templateObj) => {
    console.log("item to edit is: ", itemToEdit);
    console.log("templateObj is: ", templateObj);
    for (const key in templateObj) {
      itemToEdit[key] = templateObj[key];
    }
    console.log(projects);
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

  /* move down */
  function determineEditOrDeleteAction(event) {
    const isDeleteAction = event.target.classList.contains("delete-item")
      ? true
      : false;
    const isEditAction = event.target.classList.contains("edit-item")
      ? true
      : false;
    return [isDeleteAction, isEditAction];
  }

  /* move down */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDckQsa0VBQWMsY0FBYyxzQkFBc0I7QUFDbEQsa0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Qsa0VBQWM7QUFDZDtBQUNBO0FBQ0EsQ0FBQztBQUNELGtFQUFjO0FBQ2Q7QUFDQSxDQUFDO0FBQ0QsSUFBSSxrRUFBYztBQUNsQixpRUFBYTtBQUNiLGlFQUFhO0FBQ2IsK0NBQStDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9GYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVCYXNlR3JvdXBIVE1MLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVMaXN0SXRlbUZyb21PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgVG9kb1VJTWFuYWdlciBmcm9tIFwiLi9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5cbmNvbnN0IEZvcm1NYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBjcmVhdGVOZXdUb2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtbmV3LXRvZG9cIik7XG4gIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctcHJvamVjdFwiKTtcblxuICAvL3ZhcmlhYmxlIHRoYXQgdHJhY2tzIGlmIGVkaXRGb3JtIGV4aXN0c1xuICAvL3ZhcmlhYmxlIHRoYXQgdHJhY2tzIGlmIGFkZEZvcm0gZXhpc3RzXG4gIC8qIHRoYXQgd2F5IGNhbiBhdm9pZCB0cnlpbmcgdG8gZG8gbXVsdGlwbGUgY3JlYXRlL2VkaXQgYWN0aW9ucyBhdCBhIHRpbWVcbiAgYW5kIGFsc28gaGF2aW5nIHRvIHRyYWNrIHdoaWNoIGVsZW1lbnQgY3VycmVudGx5IGNvbnRhaW5zIGEgZm9ybSAqL1xuICBsZXQgYWRkRm9ybUV4aXN0cztcbiAgbGV0IGVkaXRGb3JtRXhpc3RzO1xuXG4gIGNvbnN0IGNyZWF0ZUZvcm0gPSAoZXZlbnQsIG9iamVjdCwgb2JqZWN0SUQsIHBhcmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VG9DaGFuZ2UgPVxuICAgICAgcGFyZW50RWxlbWVudCB8fCBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgIGNvbnN0IGl0ZW1Ub0VkaXQgPSBvYmplY3RcbiAgICAgID8gb2JqZWN0ID09PSBcInByb2plY3RcIlxuICAgICAgICA/IFByb2plY3RNYW5hZ2VyLmdldFByb2plY3Qob2JqZWN0SUQpXG4gICAgICAgIDogUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRUb2RvKG9iamVjdElEKVxuICAgICAgOiBudWxsO1xuXG4gICAgY29uc3QgaXNQcm9qZWN0Rm9ybSA9IGRldGVybWluZUZvcm1UeXBlKG9iamVjdCB8fCBldmVudC50YXJnZXQuaWQpO1xuICAgIGNvbnN0IGZvcm1UeXBlVGVtcGxhdGUgPSBpc1Byb2plY3RGb3JtXG4gICAgICA/IGNyZWF0ZVByb2plY3RGb3JtKGl0ZW1Ub0VkaXQpXG4gICAgICA6IGNyZWF0ZVRvZG9Gb3JtKGl0ZW1Ub0VkaXQpO1xuXG4gICAgY3JlYXRlQW5kQXBwZW5kRm9ybShlbGVtZW50VG9DaGFuZ2UsIGZvcm1UeXBlVGVtcGxhdGUpO1xuXG4gICAgY29uc3QgZm9ybSA9IGVsZW1lbnRUb0NoYW5nZS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgICBpbml0aWFsaXplRm9ybShmb3JtLCBpc1Byb2plY3RGb3JtLCBpdGVtVG9FZGl0LCBlbGVtZW50VG9DaGFuZ2UpO1xuICB9O1xuICBjcmVhdGVOZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVGb3JtKTtcbiAgY3JlYXRlTmV3VG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlRm9ybSk7XG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZvcm0gPSAoZm9ybSwgaXNQcm9qZWN0Rm9ybSwgaXRlbVRvRWRpdCwgZWxlbWVudFRvQ2hhbmdlKSA9PiB7XG4gICAgY29uc3Qgc3VibWl0SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgICAgaGFuZGxlRm9ybVN1Ym1pdChldmVudCwgZm9ybSwgaXNQcm9qZWN0Rm9ybSwgaXRlbVRvRWRpdCwgZWxlbWVudFRvQ2hhbmdlKTtcbiAgICAgIGZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5kbGVyKTtcbiAgICAgIGZvcm0ucmVtb3ZlKCk7XG4gICAgfTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgc3VibWl0SGFuZGxlcik7XG4gIH07XG5cbiAgLyogcmVmYWN0b3IgbWUgKi9cbiAgLyogRE8gV0UgTkVFRCBUTyBGRUVEIFRIRSBURU1QTEFURSBPQkogVE8gVE9ET1VJLFxuICBDQU4gV0UgTk9UIEpVU1QgRURJVCBUSEUgUFJPSkVDVC9UT0RPIERBVEEsXG4gIFRIRU4gUkUgUkVOREVSIFRIRSBMSSA/PyAqL1xuICBjb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gKFxuICAgIGV2ZW50LFxuICAgIGZvcm0sXG4gICAgaXNQcm9qZWN0Rm9ybSxcbiAgICBpdGVtVG9FZGl0LFxuICAgIGVsZW1lbnRUb0NoYW5nZVxuICApID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRlbXBsYXRlT2JqID0gY3JlYXRlT2JqZWN0RnJvbUZvcm0oZ2V0SW5wdXRFbGVtZW50cyhmb3JtKSk7XG4gICAgaWYgKGl0ZW1Ub0VkaXQpIHtcbiAgICAgIFwicHJvamVjdElEXCIgaW4gaXRlbVRvRWRpdCB8fCBcInRvZG9JRFwiIGluIGl0ZW1Ub0VkaXRcbiAgICAgICAgPyBQcm9qZWN0TWFuYWdlci5lZGl0SXRlbShpdGVtVG9FZGl0LCB0ZW1wbGF0ZU9iailcbiAgICAgICAgOiBudWxsO1xuICAgICAgVG9kb1VJTWFuYWdlci51cGRhdGVFZGl0ZWRJdGVtKHRlbXBsYXRlT2JqLCBlbGVtZW50VG9DaGFuZ2UpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb2JqZWN0ID0gaXNQcm9qZWN0Rm9ybVxuICAgICAgPyBQcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHRlbXBsYXRlT2JqKVxuICAgICAgOiBQcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3QodGVtcGxhdGVPYmopO1xuXG4gICAgVG9kb1VJTWFuYWdlci5hZGRMYXRlc3RJdGVtKG9iamVjdCwgaXNQcm9qZWN0Rm9ybSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0SW5wdXRFbGVtZW50cyA9IChmb3JtKSA9PlxuICAgIFsuLi5mb3JtLmVsZW1lbnRzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSA9PT0gXCJJTlBVVFwiKTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUZvcm0sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTWFuYWdlcjtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRm9ybVR5cGUob2JqZWN0VHlwZSkge1xuICByZXR1cm4gb2JqZWN0VHlwZS5pbmNsdWRlcyhcInByb2plY3RcIikgfHwgb2JqZWN0VHlwZSA9PT0gXCJwcm9qZWN0XCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RGb3JtKHByb2plY3QpIHtcbiAgY29uc3QgdGl0bGVBdHRyaWJ1dGUgPSBwcm9qZWN0Py50aXRsZSA/IGAke3Byb2plY3QudGl0bGV9YCA6IFwiXCI7XG5cbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXByb2plY3QtZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiB2YWx1ZT1cIiR7dGl0bGVBdHRyaWJ1dGV9XCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9Gb3JtKHRvZG8pIHtcbiAgcmV0dXJuIGBcbiAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiYWRkLXRvZG8tZm9ybVwiPlxuICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiAvPlxuICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIiAvPlxuICAgIDxsYWJlbCBmb3I9XCJpc0ltcG9ydGFudFwiPkV4dHJhIGltcG9ydGFudD88L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiaXNJbXBvcnRhbnRcIiBpZD1cImlzSW1wb3J0YW50XCIgLz5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5BZGQgdG9kbzwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIGA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdEZyb21Gb3JtKGZvcm1JbnB1dHMpIHtcbiAgcmV0dXJuIGZvcm1JbnB1dHMucmVkdWNlKChvYmplY3QsIGl0ZW0pID0+IHtcbiAgICBpZiAoaXRlbS50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgIHJldHVybiB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLmNoZWNrZWQgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGl0ZW0udmFsdWUgPyB7IC4uLm9iamVjdCwgW2l0ZW0uaWRdOiBpdGVtLnZhbHVlIH0gOiBvYmplY3Q7XG4gICAgfVxuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFuZEFwcGVuZEZvcm0oZWxlbWVudFRvQXBwZW5kRm9ybVRvLCBmb3JtVHlwZVRlbXBsYXRlKSB7XG4gIGVsZW1lbnRUb0FwcGVuZEZvcm1Uby50YWdOYW1lID09PSBcIkxJXCJcbiAgICA/IChlbGVtZW50VG9BcHBlbmRGb3JtVG8uaW5uZXJIVE1MID0gZm9ybVR5cGVUZW1wbGF0ZSlcbiAgICA6IGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZm9ybVR5cGVUZW1wbGF0ZSk7XG59XG4iLCJsZXQgcHJvamVjdElEQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KG9iamVjdCkge1xuICBjb25zdCBwcm9qZWN0ID0ge1xuICAgIHRpdGxlOiBvYmplY3QudGl0bGUsXG4gICAgcHJvamVjdElEOiBwcm9qZWN0SURDb3VudGVyLFxuICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgIHRvZG9zOiBbXSxcbiAgfTtcblxuICAvL3VzZSBvYmplY3Quc2V0UHJvdG90eXBlT2YgdG8gYXNzaWduIG1ldGhvZHMgdG8gcHJvdG95cGUsIHRvIGF2b2lkIGR1cGxpY2F0aW9uXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihwcm9qZWN0LCBzaGFyZWRNZXRob2RzKTtcblxuICBwcm9qZWN0SURDb3VudGVyKys7XG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0RmFjdG9yeTtcblxuY29uc3Qgc2hhcmVkTWV0aG9kcyA9IHtcbiAgZ2V0VG9kb3M6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfSxcblxuICBnZXRUb2RvOiBmdW5jdGlvbiAodG9kb0lEKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3MuZmluZCgodG9kbykgPT4gdG9kby50b2RvSUQgPT09IHRvZG9JRCk7XG4gIH0sXG5cbiAgYWRkVG9kbzogZnVuY3Rpb24gKHRvZG8pIHtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gIH0sXG5cbiAgcmVtb3ZlVG9kbzogZnVuY3Rpb24gKHRvZG9JRCkge1xuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvSUQgIT09IHRvZG9JRCk7XG4gIH0sXG5cbiAgdG9nZ2xlVG9kb0Jvb2xQcm9wZXJ0eTogZnVuY3Rpb24gKHRvZG9JRCwgdG9kb1Byb3BlcnR5KSB7XG4gICAgY29uc3QgdGFyZ2V0VG9kbyA9IHRoaXMuZ2V0VG9kbyh0b2RvSUQpO1xuICAgIHRhcmdldFRvZG9bdG9kb1Byb3BlcnR5XSA9ICF0YXJnZXRUb2RvW3RvZG9Qcm9wZXJ0eV07XG4gIH0sXG5cbiAgdG9nZ2xlU2VsZWN0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlzU2VsZWN0ZWQgPSAhdGhpcy5pc1NlbGVjdGVkO1xuICB9LFxufTtcbiIsImltcG9ydCBUb2RvRmFjdG9yeSBmcm9tIFwiLi9Ub2RvRmFjdG9yeS5qc1wiO1xuaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gXCIuL1Byb2plY3RGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IFByb2plY3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgbGV0IHByb2plY3RzID0gW107XG4gIGxldCBjdXJyU2VsZWN0ZWRQcm9qO1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3RGYWN0b3J5KHByb2plY3RUaXRsZSk7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICByZXR1cm4gcHJvamVjdDtcbiAgfTtcblxuICBjb25zdCByZW1vdmVTZWxlY3RlZFByb2plY3QgPSAocHJvamVjdElEKSA9PlxuICAgIChwcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0SUQgIT09IHByb2plY3RJRCkpO1xuXG4gIGNvbnN0IGdldFByb2plY3QgPSAocHJvamVjdElEKSA9PlxuICAgIHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdElEID09PSBwcm9qZWN0SUQpO1xuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgY29uc3QgZ2V0U2VsZWN0ZWRQcm9qZWN0ID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvajtcblxuICBjb25zdCBnZXRTZWxlY3RlZFByb2plY3RUb2RvcyA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2ouZ2V0VG9kb3MoKTtcblxuICBjb25zdCBzZXRTZWxlY3RlZFByb2plY3QgPSAocHJvamVjdElEKSA9PiB7XG4gICAgZGVzZWxlY3RDdXJyUHJvamVjdCgpO1xuICAgIGN1cnJTZWxlY3RlZFByb2ogPSBnZXRQcm9qZWN0KHByb2plY3RJRCk7XG4gICAgY3VyclNlbGVjdGVkUHJvai50b2dnbGVTZWxlY3RlZCgpO1xuICB9O1xuXG4gIGNvbnN0IGRlc2VsZWN0Q3VyclByb2plY3QgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qPy50b2dnbGVTZWxlY3RlZCgpO1xuXG4gIGNvbnN0IGFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCA9IChpbnB1dEVsZW1lbnRzKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBwcm9qZWN0IGlzOiBcIiwgY3VyclNlbGVjdGVkUHJvaik7XG4gICAgY29uc3QgdG9kbyA9IFRvZG9GYWN0b3J5KGlucHV0RWxlbWVudHMpO1xuICAgIGN1cnJTZWxlY3RlZFByb2ouYWRkVG9kbyh0b2RvKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgcmV0dXJuIHRvZG87XG4gIH07XG5cbiAgLyogcmVmYWN0b3IgbWUgKi9cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWRUb2RvID0gKHRvZG9JRCkgPT4ge1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHByb2plY3QucmVtb3ZlVG9kbyh0b2RvSUQpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qIHJlZmFjdG9yIG1lPyAqL1xuICBjb25zdCBnZXRTZWxlY3RlZFRvZG8gPSAodG9kb0lEKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdFdpdGhUb2RvID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUb2RvKHRvZG9JRCkpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RXaXRoVG9kbyk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdFdpdGhUb2RvLmdldFRvZG8odG9kb0lEKSk7XG4gICAgcmV0dXJuIHByb2plY3RXaXRoVG9kby5nZXRUb2RvKHRvZG9JRCk7XG4gIH07XG5cbiAgY29uc3QgZWRpdEl0ZW0gPSAoaXRlbVRvRWRpdCwgdGVtcGxhdGVPYmopID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIml0ZW0gdG8gZWRpdCBpczogXCIsIGl0ZW1Ub0VkaXQpO1xuICAgIGNvbnNvbGUubG9nKFwidGVtcGxhdGVPYmogaXM6IFwiLCB0ZW1wbGF0ZU9iaik7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGVtcGxhdGVPYmopIHtcbiAgICAgIGl0ZW1Ub0VkaXRba2V5XSA9IHRlbXBsYXRlT2JqW2tleV07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSA9ICh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHRvZG9JRCwgdG9kb1Byb3BlcnR5KTtcbiAgICBwcm9qZWN0c1xuICAgICAgLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VG9kbyh0b2RvSUQpKVxuICAgICAgLnRvZ2dsZVRvZG9Cb29sUHJvcGVydHkodG9kb0lELCB0b2RvUHJvcGVydHkpO1xuICB9O1xuXG4gIGNvbnN0IGdldEZpbHRlcmVkVGFza3MgPSAobGlzdEdyb3VwU2VsZWN0aW9uSUQgPSBcImFsbC10YXNrc1wiKSA9PiB7XG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbklEID09PSBcImFsbC10YXNrc1wiKSB7XG4gICAgICByZXR1cm4gcHJvamVjdHNcbiAgICAgICAgLm1hcCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgIHJldHVybiBwcm9qZWN0LmdldFRvZG9zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mbGF0KCk7XG4gICAgfVxuICAgIGlmIChsaXN0R3JvdXBTZWxlY3Rpb25JRCA9PT0gXCJ0b2RheS10YXNrc1wiKSB7XG4gICAgICAvLyBmaWx0ZXIgdGhyb3VnaCBhbGwgcHJvamVjdHMgdG9kb3NcbiAgICAgIC8vIHJldHVybiB0aGUgb25lcyB3aXRoIGEgZGF0ZSBvYmogb2YgdG9kYXlcbiAgICB9XG4gICAgaWYgKHNvbWVGbGFnID09PSBcIndlZWstdGFza3NcIikge1xuICAgICAgLy8gZmlsdGVyIHRocm91Z2ggYWxsIHByb2plY3RzIHRvZG9zXG4gICAgICAvLyByZXR1cm4gdGhlIG9uZXMgd2l0aCBhIGRhdGUgd2l0aGluIG5leHQgNyBkYXlzXG4gICAgfVxuICAgIGlmIChzb21lRmxhZyA9PT0gXCJpbXBvcnRhbnQtdGFza3NcIikge1xuICAgICAgLy8gZmlsdGVyIHRocm91Z2ggYWxsIHByb2plY3RzIHRvZG9zXG4gICAgICAvLyByZXR1cm4gdGhlIG9uZXMgd2l0aCBhIGlzSW1wb3J0YW50ID09PSB0cnVlXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkUHJvamVjdCxcbiAgICByZW1vdmVTZWxlY3RlZFByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZ2V0UHJvamVjdCxcbiAgICBnZXRTZWxlY3RlZFByb2plY3QsXG4gICAgZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MgLyogc3VyZSBhYm91dCBleHBvcnQgYWxsIG9mIHRoZW0/PyAqLyxcbiAgICBzZXRTZWxlY3RlZFByb2plY3QsXG4gICAgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0LFxuICAgIHJlbW92ZVNlbGVjdGVkVG9kbyxcbiAgICBnZXRTZWxlY3RlZFRvZG8sXG4gICAgZWRpdEl0ZW0sXG4gICAgdG9nZ2xlU2VsZWN0ZWRUb2RvUHJvcGVydHksXG4gICAgZ2V0RmlsdGVyZWRUYXNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RNYW5hZ2VyO1xuIiwibGV0IHRvZG9JRENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBUb2RvRmFjdG9yeShvYmopIHtcbiAgY29uc3QgdG9kbyA9IHt9O1xuICB0b2RvLnRvZG9JRCA9IHRvZG9JRENvdW50ZXI7XG4gIHRvZG8uaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgdG9kby5pc0ltcG9ydGFudCA9IGZhbHNlO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICB0b2RvW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHRvZG9JRENvdW50ZXIrKztcbiAgcmV0dXJuIHRvZG87XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9GYWN0b3J5O1xuXG4vKiBsb29wcyB0aHJvdWdoIGVhY2gga2V5IGluIGFyZ3VtZW50b2JqICovXG4vKiByZXR1cm5zIHt9IHdpdGgga2V5OnZhbHVlIHBhaXJzKi9cbi8qIHRpdGxlICovXG4vKiBkZXNjcmlwdGlvbiAqL1xuLyogZHVlRGF0ZSAqL1xuLyogcHJpb3JpdHkgKi9cbi8qIG5vdGVzICovXG4vKiBjaGVja2xpc3QgKHN1YiBzdGVwcykgKi9cbi8qIG1heWJlIGFkZCBtZXRob2RzIHRvIHRoZSBvYmplY3RzIGFzIHdlbGw/ICovXG4iLCJpbXBvcnQgRm9ybU1hbmFnZXIgZnJvbSBcIi4vRm9ybU1hbmFnZXIuanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdCBmcm9tIFwiLi9jcmVhdGVMaXN0SXRlbUZyb21PYmplY3QuanNcIjtcbmltcG9ydCBjcmVhdGVCYXNlR3JvdXBIVE1MIGZyb20gXCIuL2NyZWF0ZUJhc2VHcm91cEhUTUwuanNcIjtcblxuY29uc3QgVG9kb1VJTWFuYWdlciA9ICgoKSA9PiB7XG4gIC8qIHJlZmVyZW5jZXMgKi9cbiAgY29uc3QgYXBwQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLWNvbnRlbnRcIik7XG4gIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWxpc3RcIik7XG4gIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGUtYmFyXCIpO1xuICBsZXQgcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb247XG5cbiAgY29uc3QgcmVuZGVyUHJvamVjdHNMaXN0ID0gKCkgPT4ge1xuICAgIHJlbW92ZUhUTUxDb250ZW50KHByb2plY3RzTGlzdCk7XG4gICAgY29uc3QgcHJvamVjdHMgPSBQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT5cbiAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QocHJvamVjdCkpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJTZWxlY3RlZEdyb3VwID0gKGxpc3RHcm91cFNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gICAgcmVtb3ZlSFRNTENvbnRlbnQobWFpbkNvbnRlbnQpO1xuICAgIGNvbnN0IFtoMSwgY3Vyckdyb3VwaW5nVG9kb3NdID0gY3JlYXRlQmFzZUdyb3VwSFRNTChsaXN0R3JvdXBTZWxlY3Rpb24pO1xuICAgIG1haW5Db250ZW50LmFwcGVuZChoMSwgY3Vyckdyb3VwaW5nVG9kb3MpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRHcm91cFRvZG9zID1cbiAgICAgIGxpc3RHcm91cFNlbGVjdGlvbiAmJiBsaXN0R3JvdXBTZWxlY3Rpb24uZGF0YXNldC5wcm9qZWN0XG4gICAgICAgID8gUHJvamVjdE1hbmFnZXIuZ2V0U2VsZWN0ZWRQcm9qZWN0VG9kb3MoKVxuICAgICAgICA6IFByb2plY3RNYW5hZ2VyLmdldEZpbHRlcmVkVGFza3MobGlzdEdyb3VwU2VsZWN0aW9uPy5pZCk7XG5cbiAgICBzZWxlY3RlZEdyb3VwVG9kb3MuZm9yRWFjaCgoZ3JvdXBpbmcpID0+XG4gICAgICBjdXJyR3JvdXBpbmdUb2Rvcy5hcHBlbmRDaGlsZChjcmVhdGVMaXN0SXRlbUZyb21PYmplY3QoZ3JvdXBpbmcpKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc2hvd1NlbGVjdGVkR3JvdXAgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBsaXN0R3JvdXBTZWxlY3Rpb24gPSBldmVudC50YXJnZXQuY2xvc2VzdChcImxpXCIpO1xuICAgIGlmIChsaXN0R3JvdXBTZWxlY3Rpb24gIT09IHByZXZpb3VzTGlzdEdyb3VwU2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SUQgPSBsaXN0R3JvdXBTZWxlY3Rpb24uZGF0YXNldC5wcm9qZWN0O1xuICAgICAgaWYgKHByb2plY3RJRCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBQcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoK3Byb2plY3RJRCk7XG4gICAgICByZW5kZXJTZWxlY3RlZEdyb3VwKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gICAgICBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbiA9IGxpc3RHcm91cFNlbGVjdGlvbjtcbiAgICB9XG4gIH07XG4gIHNpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dTZWxlY3RlZEdyb3VwKTtcblxuICBjb25zdCBhZGRMYXRlc3RJdGVtID0gKG9iamVjdCwgaXNOZXdQcm9qZWN0KSA9PiB7XG4gICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICBjb25zdCBjdXJyR3JvdXBUb2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnItZ3JvdXBpbmctdG9kb3NcIik7XG4gICAgY29uc3QgaXRlbSA9IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChvYmplY3QpO1xuICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgIGlzTmV3UHJvamVjdFxuICAgICAgPyBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSlcbiAgICAgIDogY3Vyckdyb3VwVG9kb3NMaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICB9O1xuXG4gIGNvbnN0IGVkaXRTZWxlY3RlZEl0ZW0gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBbaXNEZWxldGVBY3Rpb24sIGlzRWRpdEFjdGlvbl0gPSBkZXRlcm1pbmVFZGl0T3JEZWxldGVBY3Rpb24oZXZlbnQpO1xuICAgIGNvbnN0IFtvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaV0gPVxuICAgICAgaXNEZWxldGVBY3Rpb24gfHwgaXNFZGl0QWN0aW9uID8gZGV0ZXJtaW5lVG9kb09yUHJvamVjdChldmVudCkgOiBudWxsO1xuXG4gICAgaWYgKGlzRGVsZXRlQWN0aW9uKSByZW1vdmVTZWxlY3RlZEl0ZW0ob2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGkpO1xuXG4gICAgaWYgKGlzRWRpdEFjdGlvbikgRm9ybU1hbmFnZXIuY3JlYXRlRm9ybShldmVudCwgb2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGkpO1xuICB9O1xuICBhcHBDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlZGl0U2VsZWN0ZWRJdGVtKTtcblxuICAvKiBzb21ldGhpbmcgd2VpcmQgZ29pbmcgb24gaGVyZS4gKi9cbiAgY29uc3QgdXBkYXRlRWRpdGVkSXRlbSA9ICh0ZW1wbGF0ZU9iaiwgZWxlbWVudFRvQ2hhbmdlKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbSA9IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdCh0ZW1wbGF0ZU9iaik7XG4gICAgY29uc29sZS5sb2codGVtcGxhdGVPYmosIGVsZW1lbnRUb0NoYW5nZSwgbmV3SXRlbSk7XG4gICAgZWxlbWVudFRvQ2hhbmdlLmlubmVySFRNTCA9IG5ld0l0ZW0uaW5uZXJIVE1MO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkSXRlbSA9IChvYmplY3RUb0RlbGV0ZSwgb2JqZWN0SUQsIHBhcmVudExpKSA9PiB7XG4gICAgaWYgKG9iamVjdFRvRGVsZXRlID09PSBcInByb2plY3RcIikge1xuICAgICAgUHJvamVjdE1hbmFnZXIucmVtb3ZlU2VsZWN0ZWRQcm9qZWN0KG9iamVjdElEKTtcbiAgICAgIHJlbmRlclNlbGVjdGVkR3JvdXAoKTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0VG9EZWxldGUgPT09IFwidG9kb1wiKSBQcm9qZWN0TWFuYWdlci5yZW1vdmVTZWxlY3RlZFRvZG8ob2JqZWN0SUQpO1xuXG4gICAgcGFyZW50TGk/LnJlbW92ZSgpO1xuXG4gICAgY29uc29sZS5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG4gIH07XG5cbiAgLyogbW92ZSBkb3duICovXG4gIGZ1bmN0aW9uIGRldGVybWluZUVkaXRPckRlbGV0ZUFjdGlvbihldmVudCkge1xuICAgIGNvbnN0IGlzRGVsZXRlQWN0aW9uID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZS1pdGVtXCIpXG4gICAgICA/IHRydWVcbiAgICAgIDogZmFsc2U7XG4gICAgY29uc3QgaXNFZGl0QWN0aW9uID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaXRlbVwiKVxuICAgICAgPyB0cnVlXG4gICAgICA6IGZhbHNlO1xuICAgIHJldHVybiBbaXNEZWxldGVBY3Rpb24sIGlzRWRpdEFjdGlvbl07XG4gIH1cblxuICAvKiBtb3ZlIGRvd24gKi9cbiAgZnVuY3Rpb24gZGV0ZXJtaW5lVG9kb09yUHJvamVjdChldmVudCkge1xuICAgIGNvbnN0IHBhcmVudExpID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJsaVwiKTtcbiAgICBjb25zdCBwYXJlbnRPYmplY3REYXRhc2V0ID0gcGFyZW50TGkuZGF0YXNldDtcbiAgICBjb25zdCBvYmplY3QgPSBPYmplY3Qua2V5cyhwYXJlbnRPYmplY3REYXRhc2V0KVswXTtcbiAgICBjb25zdCBvYmplY3RJRCA9ICtPYmplY3QudmFsdWVzKHBhcmVudE9iamVjdERhdGFzZXQpWzBdO1xuICAgIHJldHVybiBbb2JqZWN0LCBvYmplY3RJRCwgcGFyZW50TGldO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlQnRuVG9kb1Byb3BlcnR5ID0gKGV2ZW50KSA9PiB7XG4gICAgbGV0IHRvZG9Qcm9wZXJ0eSA9IGRldGVybWluZVRvZG9Qcm9wZXJ0eShldmVudCk7XG5cbiAgICBpZiAodG9kb1Byb3BlcnR5KSB7XG4gICAgICBjb25zdCBidG4gPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCB0b2RvSUQgPSArYnRuLmNsb3Nlc3QoXCJsaVwiKS5kYXRhc2V0LnRvZG87XG4gICAgICBQcm9qZWN0TWFuYWdlci50b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSk7XG4gICAgfVxuICB9O1xuICBhcHBDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVCdG5Ub2RvUHJvcGVydHkpO1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUHJvamVjdHNMaXN0LFxuICAgIHJlbmRlclNlbGVjdGVkR3JvdXAsXG4gICAgYWRkTGF0ZXN0SXRlbSxcbiAgICB1cGRhdGVFZGl0ZWRJdGVtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb1VJTWFuYWdlcjtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVG9kb1Byb3BlcnR5KGV2ZW50KSB7XG4gIGxldCB0b2RvUHJvcGVydHkgPSBudWxsO1xuICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRvZ2dsZS1jb21wbGV0ZS1idG5cIikpXG4gICAgdG9kb1Byb3BlcnR5ID0gXCJpc0NvbXBsZXRlZFwiO1xuICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRvZ2dsZS1pbXBvcnRhbnQtYnRuXCIpKVxuICAgIHRvZG9Qcm9wZXJ0eSA9IFwiaXNJbXBvcnRhbnRcIjtcbiAgcmV0dXJuIHRvZG9Qcm9wZXJ0eTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSFRNTENvbnRlbnQoZWxlbWVudCkge1xuICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VHcm91cEhUTUwobGlzdEdyb3VwU2VsZWN0aW9uKSB7XG4gIGNvbnNvbGUubG9nKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gIGNvbnN0IGgxID0gY3JlYXRlRWxlbWVudChcImgxXCIsIFwidGVzdFwiLCBcImdyb3VwaW5nLXRpdGxlXCIpO1xuICBoMS50ZXh0Q29udGVudCA9XG4gICAgbGlzdEdyb3VwU2VsZWN0aW9uPy5xdWVyeVNlbGVjdG9yKFwiaDNcIikudGV4dENvbnRlbnQgPz8gXCJBbGwgVGFza3NcIjtcblxuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbWVudChcInVsXCIsIFwidGVzdDJcIiwgXCJjdXJyLWdyb3VwaW5nLXRvZG9zXCIpO1xuXG4gIHJldHVybiBbaDEsIGxpc3RdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlR3JvdXBIVE1MO1xuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlID0gXCJkaXZcIiwgY2xhc3NuYW1lID0gXCJcIiwgaWQgPSBcIlwiKSB7XG4gIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGlmIChjbGFzc25hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSk7XG4gIGlmIChpZCkgZWxlLmlkID0gaWQ7XG4gIHJldHVybiBlbGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVsZW1lbnQ7XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9jcmVhdGVFbGVtZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChvYmplY3QpIHtcbiAgY29uc3QgW29iaklELCBpZFRhZ10gPSBnZXRPYmplY3RJREFuZFRhZyhvYmplY3QpO1xuXG4gIGNvbnN0IGxpID0gY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5kYXRhc2V0W2lkVGFnXSA9IG9iaklEO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcbiAgICAvKiBjb25zb2xlLmxvZyhrZXkgKyBcIjogXCIgKyB2YWx1ZSk7ICovXG4gICAgaWYgKGtleSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICBjb25zdCBoZWFkaW5nID0gY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XG4gICAgICBjb25zdCBwID0gY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICB9XG4gIH1cblxuICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KFwidG9kb0lEXCIpKSB7XG4gICAgLyogdXNlIG9yZGVyIHRvIHBsYWNlIGNvbXBsZXRlQnRuIGFsbCB0aGUgd2F5IHRvIGxlZnQgaW4gbGkgKi9cbiAgICBjb25zdCBjaGVja0NvbXBsZXRlQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcInRvZ2dsZS1jb21wbGV0ZS1idG5cIik7XG4gICAgY2hlY2tDb21wbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiTWFyayBjb21wbGV0ZVwiOyAvKiBtYWtlIHNlcCBmbiAqL1xuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrQ29tcGxldGVCdG4pO1xuXG4gICAgY29uc3QgY2hlY2tJbXBvcnRhbnRCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwidG9nZ2xlLWltcG9ydGFudC1idG5cIik7XG4gICAgY2hlY2tJbXBvcnRhbnRCdG4udGV4dENvbnRlbnQgPSBcIk1hcmsgaW1wb3J0YW50XCI7IC8qIG1ha2Ugc2VwIGZuICovXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tJbXBvcnRhbnRCdG4pO1xuICB9XG5cbiAgY29uc3QgZWRpdENvbnRhaW5lciA9IGNyZWF0ZUVkaXRDb250YWluZXIoKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZWRpdENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIGxpOyAvKiBsb3RzIG9mIHJlcGVhdGluZyBhcHBlbmRDSGlsZGluZyAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVMaXN0SXRlbUZyb21PYmplY3Q7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVkaXRDb250YWluZXIoKSB7XG4gIGNvbnN0IGVkaXRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZWRpdC1jb250YWluZXJcIik7XG4gIGNvbnN0IGVkaXRCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiZWRpdC1pdGVtXCIpO1xuICBlZGl0QnRuLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJkZWxldGUtaXRlbVwiKTtcbiAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgZWRpdENvbnRhaW5lci5hcHBlbmQoZWRpdEJ0biwgZGVsZXRlQnRuKTtcblxuICByZXR1cm4gZWRpdENvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0SURBbmRUYWcob2JqZWN0KSB7XG4gIGNvbnN0IGtleTEgPSBcInByb2plY3RJRFwiO1xuICBjb25zdCBrZXkyID0gXCJ0b2RvSURcIjtcbiAgY29uc3Qgb2JqSUQgPSBvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5MSlcbiAgICA/IG9iamVjdC5wcm9qZWN0SURcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gb2JqZWN0LnRvZG9JRFxuICAgIDogbnVsbDtcblxuICBjb25zdCBpZFRhZyA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkxKVxuICAgID8gXCJwcm9qZWN0XCJcbiAgICA6IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkyKVxuICAgID8gXCJ0b2RvXCJcbiAgICA6IG51bGw7XG5cbiAgcmV0dXJuIFtvYmpJRCwgaWRUYWddO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBsb2cgPSBjb25zb2xlLmxvZztcbmltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL0Zvcm1NYW5hZ2VyLmpzXCI7XG5pbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qc1wiO1xuaW1wb3J0IFRvZG9VSU1hbmFnZXIgZnJvbSBcIi4vbW9kdWxlcy9Ub2RvVUlNYW5hZ2VyLmpzXCI7XG5sb2coUHJvamVjdE1hbmFnZXIpO1xuUHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh7IHRpdGxlOiBcIlJlZnVybmlzaCBIb21lXCIgfSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHsgdGl0bGU6IFwiUGFpbnQgV2FsbHNcIiB9KTtcblByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgwKTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcIm1vdmUgc29mYVwiLFxuICBkZXNjcmlwdGlvbjogXCJsaWZ0IGRvbnQgZHJhZ1wiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJtb3ZlIHRhYmxlXCIsXG4gIGRlc2NyaXB0aW9uOiBcImRyYWcgaXQgcm91Z2hseVwiLFxufSk7XG5Qcm9qZWN0TWFuYWdlci5zZXRTZWxlY3RlZFByb2plY3QoMSk7XG5Qcm9qZWN0TWFuYWdlci5hZGRUb2RvVG9TZWxlY3RlZFByb2plY3Qoe1xuICB0aXRsZTogXCJidXkgcGFpbnRcIixcbiAgZGVzY3JpcHRpb246IFwibWl4IGl0IHdlbGwgYmVmb3JlIGFwcGx5aW5nXCIsXG59KTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcImJ1eSBicnVzaFwiLFxufSk7XG5sb2coUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG5Ub2RvVUlNYW5hZ2VyLnJlbmRlclByb2plY3RzTGlzdChcInByb2plY3RzXCIpO1xuVG9kb1VJTWFuYWdlci5yZW5kZXJTZWxlY3RlZEdyb3VwKCk7XG4vKiBUb2RvVUlNYW5hZ2VyLnJlbmRlclNlbGVjdGVkR3JvdXAoXCJ0b2Rvc1wiKTsgKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==