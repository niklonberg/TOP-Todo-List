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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7QUFDRCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZCxrRUFBYztBQUNkO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0VBQWM7QUFDZDtBQUNBLENBQUM7QUFDRCxJQUFJLGtFQUFjO0FBQ2xCLGlFQUFhO0FBQ2IsaUVBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvRm9ybU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG9VSU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUJhc2VHcm91cEhUTUwuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vUHJvamVjdE1hbmFnZXIuanNcIjtcbmltcG9ydCBUb2RvVUlNYW5hZ2VyIGZyb20gXCIuL1RvZG9VSU1hbmFnZXIuanNcIjtcblxuY29uc3QgRm9ybU1hbmFnZXIgPSAoKCkgPT4ge1xuICAvKiByZWZlcmVuY2VzICovXG4gIGNvbnN0IGNyZWF0ZU5ld1RvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1uZXctdG9kb1wiKTtcbiAgY29uc3QgY3JlYXRlTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLW5ldy1wcm9qZWN0XCIpO1xuXG4gIC8vdmFyaWFibGUgdGhhdCB0cmFja3MgaWYgZWRpdEZvcm0gZXhpc3RzXG4gIC8vdmFyaWFibGUgdGhhdCB0cmFja3MgaWYgYWRkRm9ybSBleGlzdHNcbiAgLyogdGhhdCB3YXkgY2FuIGF2b2lkIHRyeWluZyB0byBkbyBtdWx0aXBsZSBjcmVhdGUvZWRpdCBhY3Rpb25zIGF0IGEgdGltZVxuICBhbmQgYWxzbyBoYXZpbmcgdG8gdHJhY2sgd2hpY2ggZWxlbWVudCBjdXJyZW50bHkgY29udGFpbnMgYSBmb3JtICovXG4gIGxldCBhZGRGb3JtRXhpc3RzO1xuICBsZXQgZWRpdEZvcm1FeGlzdHM7XG5cbiAgY29uc3QgY3JlYXRlRm9ybSA9IChldmVudCwgb2JqZWN0LCBvYmplY3RJRCwgcGFyZW50RWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUb0NoYW5nZSA9XG4gICAgICBwYXJlbnRFbGVtZW50IHx8IGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgY29uc3QgaXRlbVRvRWRpdCA9IG9iamVjdFxuICAgICAgPyBvYmplY3QgPT09IFwicHJvamVjdFwiXG4gICAgICAgID8gUHJvamVjdE1hbmFnZXIuZ2V0UHJvamVjdChvYmplY3RJRClcbiAgICAgICAgOiBQcm9qZWN0TWFuYWdlci5nZXRTZWxlY3RlZFRvZG8ob2JqZWN0SUQpXG4gICAgICA6IG51bGw7XG5cbiAgICBjb25zdCBpc1Byb2plY3RGb3JtID0gZGV0ZXJtaW5lRm9ybVR5cGUob2JqZWN0IHx8IGV2ZW50LnRhcmdldC5pZCk7XG4gICAgY29uc3QgZm9ybVR5cGVUZW1wbGF0ZSA9IGlzUHJvamVjdEZvcm1cbiAgICAgID8gY3JlYXRlUHJvamVjdEZvcm0oaXRlbVRvRWRpdClcbiAgICAgIDogY3JlYXRlVG9kb0Zvcm0oaXRlbVRvRWRpdCk7XG5cbiAgICBjcmVhdGVBbmRBcHBlbmRGb3JtKGVsZW1lbnRUb0NoYW5nZSwgZm9ybVR5cGVUZW1wbGF0ZSk7XG5cbiAgICBjb25zdCBmb3JtID0gZWxlbWVudFRvQ2hhbmdlLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGluaXRpYWxpemVGb3JtKGZvcm0sIGlzUHJvamVjdEZvcm0sIGl0ZW1Ub0VkaXQsIGVsZW1lbnRUb0NoYW5nZSk7XG4gIH07XG4gIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZUZvcm0pO1xuICBjcmVhdGVOZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVGb3JtKTtcblxuICBjb25zdCBpbml0aWFsaXplRm9ybSA9IChmb3JtLCBpc1Byb2plY3RGb3JtLCBpdGVtVG9FZGl0LCBlbGVtZW50VG9DaGFuZ2UpID0+IHtcbiAgICBjb25zdCBzdWJtaXRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICBoYW5kbGVGb3JtU3VibWl0KGV2ZW50LCBmb3JtLCBpc1Byb2plY3RGb3JtLCBpdGVtVG9FZGl0LCBlbGVtZW50VG9DaGFuZ2UpO1xuICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHN1Ym1pdEhhbmRsZXIpO1xuICAgICAgZm9ybS5yZW1vdmUoKTtcbiAgICB9O1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5kbGVyKTtcbiAgfTtcblxuICAvKiByZWZhY3RvciBtZSAqL1xuICAvKiBETyBXRSBORUVEIFRPIEZFRUQgVEhFIFRFTVBMQVRFIE9CSiBUTyBUT0RPVUksXG4gIENBTiBXRSBOT1QgSlVTVCBFRElUIFRIRSBQUk9KRUNUL1RPRE8gREFUQSxcbiAgVEhFTiBSRSBSRU5ERVIgVEhFIExJID8/ICovXG4gIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoXG4gICAgZXZlbnQsXG4gICAgZm9ybSxcbiAgICBpc1Byb2plY3RGb3JtLFxuICAgIGl0ZW1Ub0VkaXQsXG4gICAgZWxlbWVudFRvQ2hhbmdlXG4gICkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGVtcGxhdGVPYmogPSBjcmVhdGVPYmplY3RGcm9tRm9ybShnZXRJbnB1dEVsZW1lbnRzKGZvcm0pKTtcbiAgICBpZiAoaXRlbVRvRWRpdCkge1xuICAgICAgXCJwcm9qZWN0SURcIiBpbiBpdGVtVG9FZGl0IHx8IFwidG9kb0lEXCIgaW4gaXRlbVRvRWRpdFxuICAgICAgICA/IFByb2plY3RNYW5hZ2VyLmVkaXRJdGVtKGl0ZW1Ub0VkaXQsIHRlbXBsYXRlT2JqKVxuICAgICAgICA6IG51bGw7XG4gICAgICBUb2RvVUlNYW5hZ2VyLnVwZGF0ZUVkaXRlZEl0ZW0odGVtcGxhdGVPYmosIGVsZW1lbnRUb0NoYW5nZSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYmplY3QgPSBpc1Byb2plY3RGb3JtXG4gICAgICA/IFByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QodGVtcGxhdGVPYmopXG4gICAgICA6IFByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh0ZW1wbGF0ZU9iaik7XG5cbiAgICBUb2RvVUlNYW5hZ2VyLmFkZExhdGVzdEl0ZW0ob2JqZWN0LCBpc1Byb2plY3RGb3JtKTtcbiAgfTtcblxuICBjb25zdCBnZXRJbnB1dEVsZW1lbnRzID0gKGZvcm0pID0+XG4gICAgWy4uLmZvcm0uZWxlbWVudHNdLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50YWdOYW1lID09PSBcIklOUFVUXCIpO1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlRm9ybSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1NYW5hZ2VyO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGb3JtVHlwZShvYmplY3RUeXBlKSB7XG4gIHJldHVybiBvYmplY3RUeXBlLmluY2x1ZGVzKFwicHJvamVjdFwiKSB8fCBvYmplY3RUeXBlID09PSBcInByb2plY3RcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdEZvcm0ocHJvamVjdCkge1xuICBjb25zdCB0aXRsZUF0dHJpYnV0ZSA9IHByb2plY3Q/LnRpdGxlID8gYCR7cHJvamVjdC50aXRsZX1gIDogXCJcIjtcblxuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtcHJvamVjdC1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIHZhbHVlPVwiJHt0aXRsZUF0dHJpYnV0ZX1cIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0Zvcm0odG9kbykge1xuICByZXR1cm4gYFxuICA8Zm9ybSBhY3Rpb249XCIjXCIgaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb246IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIC8+XG4gICAgPGxhYmVsIGZvcj1cImlzSW1wb3J0YW50XCI+RXh0cmEgaW1wb3J0YW50PzwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpc0ltcG9ydGFudFwiIGlkPVwiaXNJbXBvcnRhbnRcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCB0b2RvPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgYDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0RnJvbUZvcm0oZm9ybUlucHV0cykge1xuICByZXR1cm4gZm9ybUlucHV0cy5yZWR1Y2UoKG9iamVjdCwgaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtLnR5cGUgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgcmV0dXJuIHsgLi4ub2JqZWN0LCBbaXRlbS5pZF06IGl0ZW0uY2hlY2tlZCB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXRlbS52YWx1ZSA/IHsgLi4ub2JqZWN0LCBbaXRlbS5pZF06IGl0ZW0udmFsdWUgfSA6IG9iamVjdDtcbiAgICB9XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQW5kQXBwZW5kRm9ybShlbGVtZW50VG9BcHBlbmRGb3JtVG8sIGZvcm1UeXBlVGVtcGxhdGUpIHtcbiAgZWxlbWVudFRvQXBwZW5kRm9ybVRvLnRhZ05hbWUgPT09IFwiTElcIlxuICAgID8gKGVsZW1lbnRUb0FwcGVuZEZvcm1Uby5pbm5lckhUTUwgPSBmb3JtVHlwZVRlbXBsYXRlKVxuICAgIDogZWxlbWVudFRvQXBwZW5kRm9ybVRvLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBmb3JtVHlwZVRlbXBsYXRlKTtcbn1cbiIsImxldCBwcm9qZWN0SURDb3VudGVyID0gMDtcblxuZnVuY3Rpb24gUHJvamVjdEZhY3Rvcnkob2JqZWN0KSB7XG4gIGNvbnN0IHByb2plY3QgPSB7XG4gICAgdGl0bGU6IG9iamVjdC50aXRsZSxcbiAgICBwcm9qZWN0SUQ6IHByb2plY3RJRENvdW50ZXIsXG4gICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgdG9kb3M6IFtdLFxuICB9O1xuXG4gIC8vdXNlIG9iamVjdC5zZXRQcm90b3R5cGVPZiB0byBhc3NpZ24gbWV0aG9kcyB0byBwcm90b3lwZSwgdG8gYXZvaWQgZHVwbGljYXRpb25cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb2plY3QsIHNoYXJlZE1ldGhvZHMpO1xuXG4gIHByb2plY3RJRENvdW50ZXIrKztcbiAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RGYWN0b3J5O1xuXG5jb25zdCBzaGFyZWRNZXRob2RzID0ge1xuICBnZXRUb2RvczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9LFxuXG4gIGdldFRvZG86IGZ1bmN0aW9uICh0b2RvSUQpIHtcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5maW5kKCh0b2RvKSA9PiB0b2RvLnRvZG9JRCA9PT0gdG9kb0lEKTtcbiAgfSxcblxuICBhZGRUb2RvOiBmdW5jdGlvbiAodG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfSxcblxuICByZW1vdmVUb2RvOiBmdW5jdGlvbiAodG9kb0lEKSB7XG4gICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRvZG9JRCAhPT0gdG9kb0lEKTtcbiAgfSxcblxuICB0b2dnbGVUb2RvQm9vbFByb3BlcnR5OiBmdW5jdGlvbiAodG9kb0lELCB0b2RvUHJvcGVydHkpIHtcbiAgICBjb25zdCB0YXJnZXRUb2RvID0gdGhpcy5nZXRUb2RvKHRvZG9JRCk7XG4gICAgdGFyZ2V0VG9kb1t0b2RvUHJvcGVydHldID0gIXRhcmdldFRvZG9bdG9kb1Byb3BlcnR5XTtcbiAgfSxcblxuICB0b2dnbGVTZWxlY3RlZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNTZWxlY3RlZCA9ICF0aGlzLmlzU2VsZWN0ZWQ7XG4gIH0sXG59O1xuIiwiaW1wb3J0IFRvZG9GYWN0b3J5IGZyb20gXCIuL1RvZG9GYWN0b3J5LmpzXCI7XG5pbXBvcnQgUHJvamVjdEZhY3RvcnkgZnJvbSBcIi4vUHJvamVjdEZhY3RvcnkuanNcIjtcblxuY29uc3QgUHJvamVjdE1hbmFnZXIgPSAoKCkgPT4ge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcbiAgbGV0IGN1cnJTZWxlY3RlZFByb2o7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0VGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdEZhY3RvcnkocHJvamVjdFRpdGxlKTtcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHJldHVybiBwcm9qZWN0O1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkUHJvamVjdCA9IChwcm9qZWN0SUQpID0+XG4gICAgKHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RJRCAhPT0gcHJvamVjdElEKSk7XG5cbiAgY29uc3QgZ2V0UHJvamVjdCA9IChwcm9qZWN0SUQpID0+XG4gICAgcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0SUQgPT09IHByb2plY3RJRCk7XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICBjb25zdCBnZXRTZWxlY3RlZFByb2plY3QgPSAoKSA9PiBjdXJyU2VsZWN0ZWRQcm9qO1xuXG4gIGNvbnN0IGdldFNlbGVjdGVkUHJvamVjdFRvZG9zID0gKCkgPT4gY3VyclNlbGVjdGVkUHJvai5nZXRUb2RvcygpO1xuXG4gIGNvbnN0IHNldFNlbGVjdGVkUHJvamVjdCA9IChwcm9qZWN0SUQpID0+IHtcbiAgICBkZXNlbGVjdEN1cnJQcm9qZWN0KCk7XG4gICAgY3VyclNlbGVjdGVkUHJvaiA9IGdldFByb2plY3QocHJvamVjdElEKTtcbiAgICBjdXJyU2VsZWN0ZWRQcm9qLnRvZ2dsZVNlbGVjdGVkKCk7XG4gIH07XG5cbiAgY29uc3QgZGVzZWxlY3RDdXJyUHJvamVjdCA9ICgpID0+IGN1cnJTZWxlY3RlZFByb2o/LnRvZ2dsZVNlbGVjdGVkKCk7XG5cbiAgY29uc3QgYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0ID0gKGlucHV0RWxlbWVudHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHByb2plY3QgaXM6IFwiLCBjdXJyU2VsZWN0ZWRQcm9qKTtcbiAgICBjb25zdCB0b2RvID0gVG9kb0ZhY3RvcnkoaW5wdXRFbGVtZW50cyk7XG4gICAgY3VyclNlbGVjdGVkUHJvai5hZGRUb2RvKHRvZG8pO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICByZXR1cm4gdG9kbztcbiAgfTtcblxuICBjb25zdCBnZXRTZWxlY3RlZFRvZG8gPSAodG9kb0lEKSA9PlxuICAgIGdldFByb2plY3RGcm9tVG9kb0lEKHRvZG9JRCkuZ2V0VG9kbyh0b2RvSUQpO1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkVG9kbyA9ICh0b2RvSUQpID0+XG4gICAgZ2V0UHJvamVjdEZyb21Ub2RvSUQodG9kb0lEKS5yZW1vdmVUb2RvKHRvZG9JRCk7XG5cbiAgY29uc3QgZWRpdEl0ZW0gPSAoaXRlbVRvRWRpdCwgdGVtcGxhdGVPYmopID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIml0ZW0gdG8gZWRpdCBpczogXCIsIGl0ZW1Ub0VkaXQpO1xuICAgIGNvbnNvbGUubG9nKFwidGVtcGxhdGVPYmogaXM6IFwiLCB0ZW1wbGF0ZU9iaik7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGVtcGxhdGVPYmopIHtcbiAgICAgIGl0ZW1Ub0VkaXRba2V5XSA9IHRlbXBsYXRlT2JqW2tleV07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSA9ICh0b2RvSUQsIHRvZG9Qcm9wZXJ0eSkgPT5cbiAgICBnZXRQcm9qZWN0RnJvbVRvZG9JRCh0b2RvSUQpLnRvZ2dsZVRvZG9Cb29sUHJvcGVydHkodG9kb0lELCB0b2RvUHJvcGVydHkpO1xuXG4gIGNvbnN0IGdldFByb2plY3RGcm9tVG9kb0lEID0gKHRvZG9JRCkgPT5cbiAgICBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRvZG8odG9kb0lEKSk7XG5cbiAgY29uc3QgZ2V0RmlsdGVyZWRUYXNrcyA9IChsaXN0R3JvdXBTZWxlY3Rpb25JRCA9IFwiYWxsLXRhc2tzXCIpID0+IHtcbiAgICBpZiAobGlzdEdyb3VwU2VsZWN0aW9uSUQgPT09IFwiYWxsLXRhc2tzXCIpIHtcbiAgICAgIHJldHVybiBwcm9qZWN0c1xuICAgICAgICAubWFwKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByb2plY3QuZ2V0VG9kb3MoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZsYXQoKTtcbiAgICB9XG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbklEID09PSBcInRvZGF5LXRhc2tzXCIpIHtcbiAgICAgIC8vIGZpbHRlciB0aHJvdWdoIGFsbCBwcm9qZWN0cyB0b2Rvc1xuICAgICAgLy8gcmV0dXJuIHRoZSBvbmVzIHdpdGggYSBkYXRlIG9iaiBvZiB0b2RheVxuICAgIH1cbiAgICBpZiAoc29tZUZsYWcgPT09IFwid2Vlay10YXNrc1wiKSB7XG4gICAgICAvLyBmaWx0ZXIgdGhyb3VnaCBhbGwgcHJvamVjdHMgdG9kb3NcbiAgICAgIC8vIHJldHVybiB0aGUgb25lcyB3aXRoIGEgZGF0ZSB3aXRoaW4gbmV4dCA3IGRheXNcbiAgICB9XG4gICAgaWYgKHNvbWVGbGFnID09PSBcImltcG9ydGFudC10YXNrc1wiKSB7XG4gICAgICAvLyBmaWx0ZXIgdGhyb3VnaCBhbGwgcHJvamVjdHMgdG9kb3NcbiAgICAgIC8vIHJldHVybiB0aGUgb25lcyB3aXRoIGEgaXNJbXBvcnRhbnQgPT09IHRydWVcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIHJlbW92ZVNlbGVjdGVkUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBnZXRQcm9qZWN0LFxuICAgIGdldFNlbGVjdGVkUHJvamVjdCxcbiAgICBnZXRTZWxlY3RlZFByb2plY3RUb2RvcyAvKiBzdXJlIGFib3V0IGV4cG9ydCBhbGwgb2YgdGhlbT8/ICovLFxuICAgIHNldFNlbGVjdGVkUHJvamVjdCxcbiAgICBhZGRUb2RvVG9TZWxlY3RlZFByb2plY3QsXG4gICAgcmVtb3ZlU2VsZWN0ZWRUb2RvLFxuICAgIGdldFNlbGVjdGVkVG9kbyxcbiAgICBlZGl0SXRlbSxcbiAgICB0b2dnbGVTZWxlY3RlZFRvZG9Qcm9wZXJ0eSxcbiAgICBnZXRGaWx0ZXJlZFRhc2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdE1hbmFnZXI7XG4iLCJsZXQgdG9kb0lEQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIFRvZG9GYWN0b3J5KG9iaikge1xuICBjb25zdCB0b2RvID0ge307XG4gIHRvZG8udG9kb0lEID0gdG9kb0lEQ291bnRlcjtcbiAgdG9kby5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICB0b2RvLmlzSW1wb3J0YW50ID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIHRvZG9ba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgdG9kb0lEQ291bnRlcisrO1xuICByZXR1cm4gdG9kbztcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0ZhY3Rvcnk7XG5cbi8qIGxvb3BzIHRocm91Z2ggZWFjaCBrZXkgaW4gYXJndW1lbnRvYmogKi9cbi8qIHJldHVybnMge30gd2l0aCBrZXk6dmFsdWUgcGFpcnMqL1xuLyogdGl0bGUgKi9cbi8qIGRlc2NyaXB0aW9uICovXG4vKiBkdWVEYXRlICovXG4vKiBwcmlvcml0eSAqL1xuLyogbm90ZXMgKi9cbi8qIGNoZWNrbGlzdCAoc3ViIHN0ZXBzKSAqL1xuLyogbWF5YmUgYWRkIG1ldGhvZHMgdG8gdGhlIG9iamVjdHMgYXMgd2VsbD8gKi9cbiIsImltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9Gb3JtTWFuYWdlci5qc1wiO1xuaW1wb3J0IFByb2plY3RNYW5hZ2VyIGZyb20gXCIuL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0IGZyb20gXCIuL2NyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdC5qc1wiO1xuaW1wb3J0IGNyZWF0ZUJhc2VHcm91cEhUTUwgZnJvbSBcIi4vY3JlYXRlQmFzZUdyb3VwSFRNTC5qc1wiO1xuXG5jb25zdCBUb2RvVUlNYW5hZ2VyID0gKCgpID0+IHtcbiAgLyogcmVmZXJlbmNlcyAqL1xuICBjb25zdCBhcHBDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtY29udGVudFwiKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtbGlzdFwiKTtcbiAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZS1iYXJcIik7XG4gIGxldCBwcmV2aW91c0xpc3RHcm91cFNlbGVjdGlvbjtcblxuICBjb25zdCByZW5kZXJQcm9qZWN0c0xpc3QgPSAoKSA9PiB7XG4gICAgcmVtb3ZlSFRNTENvbnRlbnQocHJvamVjdHNMaXN0KTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IFByb2plY3RNYW5hZ2VyLmdldFByb2plY3RzKCk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PlxuICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChwcm9qZWN0KSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclNlbGVjdGVkR3JvdXAgPSAobGlzdEdyb3VwU2VsZWN0aW9uKSA9PiB7XG4gICAgY29uc29sZS5sb2cobGlzdEdyb3VwU2VsZWN0aW9uKTtcbiAgICByZW1vdmVIVE1MQ29udGVudChtYWluQ29udGVudCk7XG4gICAgY29uc3QgW2gxLCBjdXJyR3JvdXBpbmdUb2Rvc10gPSBjcmVhdGVCYXNlR3JvdXBIVE1MKGxpc3RHcm91cFNlbGVjdGlvbik7XG4gICAgbWFpbkNvbnRlbnQuYXBwZW5kKGgxLCBjdXJyR3JvdXBpbmdUb2Rvcyk7XG5cbiAgICBjb25zdCBzZWxlY3RlZEdyb3VwVG9kb3MgPVxuICAgICAgbGlzdEdyb3VwU2VsZWN0aW9uICYmIGxpc3RHcm91cFNlbGVjdGlvbi5kYXRhc2V0LnByb2plY3RcbiAgICAgICAgPyBQcm9qZWN0TWFuYWdlci5nZXRTZWxlY3RlZFByb2plY3RUb2RvcygpXG4gICAgICAgIDogUHJvamVjdE1hbmFnZXIuZ2V0RmlsdGVyZWRUYXNrcyhsaXN0R3JvdXBTZWxlY3Rpb24/LmlkKTtcblxuICAgIHNlbGVjdGVkR3JvdXBUb2Rvcy5mb3JFYWNoKChncm91cGluZykgPT5cbiAgICAgIGN1cnJHcm91cGluZ1RvZG9zLmFwcGVuZENoaWxkKGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdChncm91cGluZykpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBzaG93U2VsZWN0ZWRHcm91cCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGxpc3RHcm91cFNlbGVjdGlvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwibGlcIik7XG4gICAgaWYgKGxpc3RHcm91cFNlbGVjdGlvbiAhPT0gcHJldmlvdXNMaXN0R3JvdXBTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHByb2plY3RJRCA9IGxpc3RHcm91cFNlbGVjdGlvbi5kYXRhc2V0LnByb2plY3Q7XG4gICAgICBpZiAocHJvamVjdElEICE9PSB1bmRlZmluZWQpXG4gICAgICAgIFByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgrcHJvamVjdElEKTtcbiAgICAgIHJlbmRlclNlbGVjdGVkR3JvdXAobGlzdEdyb3VwU2VsZWN0aW9uKTtcbiAgICAgIHByZXZpb3VzTGlzdEdyb3VwU2VsZWN0aW9uID0gbGlzdEdyb3VwU2VsZWN0aW9uO1xuICAgIH1cbiAgfTtcbiAgc2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd1NlbGVjdGVkR3JvdXApO1xuXG4gIGNvbnN0IGFkZExhdGVzdEl0ZW0gPSAob2JqZWN0LCBpc05ld1Byb2plY3QpID0+IHtcbiAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgIGNvbnN0IGN1cnJHcm91cFRvZG9zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3Vyci1ncm91cGluZy10b2Rvc1wiKTtcbiAgICBjb25zdCBpdGVtID0gY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KG9iamVjdCk7XG4gICAgY29uc29sZS5sb2coaXRlbSk7XG4gICAgaXNOZXdQcm9qZWN0XG4gICAgICA/IHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChpdGVtKVxuICAgICAgOiBjdXJyR3JvdXBUb2Rvc0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIH07XG5cbiAgY29uc3QgZWRpdFNlbGVjdGVkSXRlbSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IFtpc0RlbGV0ZUFjdGlvbiwgaXNFZGl0QWN0aW9uXSA9IGRldGVybWluZUVkaXRPckRlbGV0ZUFjdGlvbihldmVudCk7XG4gICAgY29uc3QgW29iamVjdCwgb2JqZWN0SUQsIHBhcmVudExpXSA9XG4gICAgICBpc0RlbGV0ZUFjdGlvbiB8fCBpc0VkaXRBY3Rpb24gPyBkZXRlcm1pbmVUb2RvT3JQcm9qZWN0KGV2ZW50KSA6IG51bGw7XG5cbiAgICBpZiAoaXNEZWxldGVBY3Rpb24pIHJlbW92ZVNlbGVjdGVkSXRlbShvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaSk7XG5cbiAgICBpZiAoaXNFZGl0QWN0aW9uKSBGb3JtTWFuYWdlci5jcmVhdGVGb3JtKGV2ZW50LCBvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaSk7XG4gIH07XG4gIGFwcENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVkaXRTZWxlY3RlZEl0ZW0pO1xuXG4gIC8qIHNvbWV0aGluZyB3ZWlyZCBnb2luZyBvbiBoZXJlLiAqL1xuICBjb25zdCB1cGRhdGVFZGl0ZWRJdGVtID0gKHRlbXBsYXRlT2JqLCBlbGVtZW50VG9DaGFuZ2UpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtID0gY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KHRlbXBsYXRlT2JqKTtcbiAgICBjb25zb2xlLmxvZyh0ZW1wbGF0ZU9iaiwgZWxlbWVudFRvQ2hhbmdlLCBuZXdJdGVtKTtcbiAgICBlbGVtZW50VG9DaGFuZ2UuaW5uZXJIVE1MID0gbmV3SXRlbS5pbm5lckhUTUw7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWRJdGVtID0gKG9iamVjdFRvRGVsZXRlLCBvYmplY3RJRCwgcGFyZW50TGkpID0+IHtcbiAgICBpZiAob2JqZWN0VG9EZWxldGUgPT09IFwicHJvamVjdFwiKSB7XG4gICAgICBQcm9qZWN0TWFuYWdlci5yZW1vdmVTZWxlY3RlZFByb2plY3Qob2JqZWN0SUQpO1xuICAgICAgcmVuZGVyU2VsZWN0ZWRHcm91cCgpO1xuICAgIH1cblxuICAgIGlmIChvYmplY3RUb0RlbGV0ZSA9PT0gXCJ0b2RvXCIpIFByb2plY3RNYW5hZ2VyLnJlbW92ZVNlbGVjdGVkVG9kbyhvYmplY3RJRCk7XG5cbiAgICBwYXJlbnRMaT8ucmVtb3ZlKCk7XG5cbiAgICBjb25zb2xlLmxvZyhQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpKTtcbiAgfTtcblxuICAvKiBtb3ZlIGRvd24gKi9cbiAgZnVuY3Rpb24gZGV0ZXJtaW5lRWRpdE9yRGVsZXRlQWN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgaXNEZWxldGVBY3Rpb24gPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLWl0ZW1cIilcbiAgICAgID8gdHJ1ZVxuICAgICAgOiBmYWxzZTtcbiAgICBjb25zdCBpc0VkaXRBY3Rpb24gPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1pdGVtXCIpXG4gICAgICA/IHRydWVcbiAgICAgIDogZmFsc2U7XG4gICAgcmV0dXJuIFtpc0RlbGV0ZUFjdGlvbiwgaXNFZGl0QWN0aW9uXTtcbiAgfVxuXG4gIC8qIG1vdmUgZG93biAqL1xuICBmdW5jdGlvbiBkZXRlcm1pbmVUb2RvT3JQcm9qZWN0KGV2ZW50KSB7XG4gICAgY29uc3QgcGFyZW50TGkgPSBldmVudC50YXJnZXQuY2xvc2VzdChcImxpXCIpO1xuICAgIGNvbnN0IHBhcmVudE9iamVjdERhdGFzZXQgPSBwYXJlbnRMaS5kYXRhc2V0O1xuICAgIGNvbnN0IG9iamVjdCA9IE9iamVjdC5rZXlzKHBhcmVudE9iamVjdERhdGFzZXQpWzBdO1xuICAgIGNvbnN0IG9iamVjdElEID0gK09iamVjdC52YWx1ZXMocGFyZW50T2JqZWN0RGF0YXNldClbMF07XG4gICAgcmV0dXJuIFtvYmplY3QsIG9iamVjdElELCBwYXJlbnRMaV07XG4gIH1cblxuICBjb25zdCB0b2dnbGVCdG5Ub2RvUHJvcGVydHkgPSAoZXZlbnQpID0+IHtcbiAgICBsZXQgdG9kb1Byb3BlcnR5ID0gZGV0ZXJtaW5lVG9kb1Byb3BlcnR5KGV2ZW50KTtcblxuICAgIGlmICh0b2RvUHJvcGVydHkpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IHRvZG9JRCA9ICtidG4uY2xvc2VzdChcImxpXCIpLmRhdGFzZXQudG9kbztcbiAgICAgIFByb2plY3RNYW5hZ2VyLnRvZ2dsZVNlbGVjdGVkVG9kb1Byb3BlcnR5KHRvZG9JRCwgdG9kb1Byb3BlcnR5KTtcbiAgICB9XG4gIH07XG4gIGFwcENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZUJ0blRvZG9Qcm9wZXJ0eSk7XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQcm9qZWN0c0xpc3QsXG4gICAgcmVuZGVyU2VsZWN0ZWRHcm91cCxcbiAgICBhZGRMYXRlc3RJdGVtLFxuICAgIHVwZGF0ZUVkaXRlZEl0ZW0sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvVUlNYW5hZ2VyO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUb2RvUHJvcGVydHkoZXZlbnQpIHtcbiAgbGV0IHRvZG9Qcm9wZXJ0eSA9IG51bGw7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlLWNvbXBsZXRlLWJ0blwiKSlcbiAgICB0b2RvUHJvcGVydHkgPSBcImlzQ29tcGxldGVkXCI7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlLWltcG9ydGFudC1idG5cIikpXG4gICAgdG9kb1Byb3BlcnR5ID0gXCJpc0ltcG9ydGFudFwiO1xuICByZXR1cm4gdG9kb1Byb3BlcnR5O1xufVxuXG5mdW5jdGlvbiByZW1vdmVIVE1MQ29udGVudChlbGVtZW50KSB7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbn1cbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gXCIuL2NyZWF0ZUVsZW1lbnQuanNcIjtcblxuZnVuY3Rpb24gY3JlYXRlQmFzZUdyb3VwSFRNTChsaXN0R3JvdXBTZWxlY3Rpb24pIHtcbiAgY29uc3QgaDEgPSBjcmVhdGVFbGVtZW50KFwiaDFcIiwgXCJ0ZXN0XCIsIFwiZ3JvdXBpbmctdGl0bGVcIik7XG4gIGgxLnRleHRDb250ZW50ID1cbiAgICBsaXN0R3JvdXBTZWxlY3Rpb24/LnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKS50ZXh0Q29udGVudCA/PyBcIkFsbCBUYXNrc1wiO1xuXG4gIGNvbnN0IGxpc3QgPSBjcmVhdGVFbGVtZW50KFwidWxcIiwgXCJ0ZXN0MlwiLCBcImN1cnItZ3JvdXBpbmctdG9kb3NcIik7XG5cbiAgcmV0dXJuIFtoMSwgbGlzdF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJhc2VHcm91cEhUTUw7XG4iLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUgPSBcImRpdlwiLCBjbGFzc25hbWUgPSBcIlwiLCBpZCA9IFwiXCIpIHtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgaWYgKGNsYXNzbmFtZSkgZWxlLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKTtcbiAgaWYgKGlkKSBlbGUuaWQgPSBpZDtcbiAgcmV0dXJuIGVsZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRWxlbWVudDtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gXCIuL2NyZWF0ZUVsZW1lbnQuanNcIjtcblxuZnVuY3Rpb24gY3JlYXRlTGlzdEl0ZW1Gcm9tT2JqZWN0KG9iamVjdCkge1xuICBjb25zdCBbb2JqSUQsIGlkVGFnXSA9IGdldE9iamVjdElEQW5kVGFnKG9iamVjdCk7XG5cbiAgY29uc3QgbGkgPSBjcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGxpLmRhdGFzZXRbaWRUYWddID0gb2JqSUQ7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqZWN0KSkge1xuICAgIC8qIGNvbnNvbGUubG9nKGtleSArIFwiOiBcIiArIHZhbHVlKTsgKi9cbiAgICBpZiAoa2V5ID09PSBcInRpdGxlXCIpIHtcbiAgICAgIGNvbnN0IGhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICBoZWFkaW5nLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaS5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSBcImRlc2NyaXB0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHAgPSBjcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIHAudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKHApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoXCJ0b2RvSURcIikpIHtcbiAgICAvKiB1c2Ugb3JkZXIgdG8gcGxhY2UgY29tcGxldGVCdG4gYWxsIHRoZSB3YXkgdG8gbGVmdCBpbiBsaSAqL1xuICAgIGNvbnN0IGNoZWNrQ29tcGxldGVCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwidG9nZ2xlLWNvbXBsZXRlLWJ0blwiKTtcbiAgICBjaGVja0NvbXBsZXRlQnRuLnRleHRDb250ZW50ID0gXCJNYXJrIGNvbXBsZXRlXCI7IC8qIG1ha2Ugc2VwIGZuICovXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tDb21wbGV0ZUJ0bik7XG5cbiAgICBjb25zdCBjaGVja0ltcG9ydGFudEJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJ0b2dnbGUtaW1wb3J0YW50LWJ0blwiKTtcbiAgICBjaGVja0ltcG9ydGFudEJ0bi50ZXh0Q29udGVudCA9IFwiTWFyayBpbXBvcnRhbnRcIjsgLyogbWFrZSBzZXAgZm4gKi9cbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja0ltcG9ydGFudEJ0bik7XG4gIH1cblxuICBjb25zdCBlZGl0Q29udGFpbmVyID0gY3JlYXRlRWRpdENvbnRhaW5lcigpO1xuICBsaS5hcHBlbmRDaGlsZChlZGl0Q29udGFpbmVyKTtcblxuICByZXR1cm4gbGk7IC8qIGxvdHMgb2YgcmVwZWF0aW5nIGFwcGVuZENIaWxkaW5nICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUxpc3RJdGVtRnJvbU9iamVjdDtcblxuZnVuY3Rpb24gY3JlYXRlRWRpdENvbnRhaW5lcigpIHtcbiAgY29uc3QgZWRpdENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJlZGl0LWNvbnRhaW5lclwiKTtcbiAgY29uc3QgZWRpdEJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJlZGl0LWl0ZW1cIik7XG4gIGVkaXRCdG4udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcbiAgY29uc3QgZGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcImRlbGV0ZS1pdGVtXCIpO1xuICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuICBlZGl0Q29udGFpbmVyLmFwcGVuZChlZGl0QnRuLCBkZWxldGVCdG4pO1xuXG4gIHJldHVybiBlZGl0Q29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBnZXRPYmplY3RJREFuZFRhZyhvYmplY3QpIHtcbiAgY29uc3Qga2V5MSA9IFwicHJvamVjdElEXCI7XG4gIGNvbnN0IGtleTIgPSBcInRvZG9JRFwiO1xuICBjb25zdCBvYmpJRCA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkxKVxuICAgID8gb2JqZWN0LnByb2plY3RJRFxuICAgIDogb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTIpXG4gICAgPyBvYmplY3QudG9kb0lEXG4gICAgOiBudWxsO1xuXG4gIGNvbnN0IGlkVGFnID0gb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTEpXG4gICAgPyBcInByb2plY3RcIlxuICAgIDogb2JqZWN0Lmhhc093blByb3BlcnR5KGtleTIpXG4gICAgPyBcInRvZG9cIlxuICAgIDogbnVsbDtcblxuICByZXR1cm4gW29iaklELCBpZFRhZ107XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IGxvZyA9IGNvbnNvbGUubG9nO1xuaW1wb3J0IEZvcm1NYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvRm9ybU1hbmFnZXIuanNcIjtcbmltcG9ydCBQcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL1Byb2plY3RNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgVG9kb1VJTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL1RvZG9VSU1hbmFnZXIuanNcIjtcbmxvZyhQcm9qZWN0TWFuYWdlcik7XG5Qcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KHsgdGl0bGU6IFwiUmVmdXJuaXNoIEhvbWVcIiB9KTtcblByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoeyB0aXRsZTogXCJQYWludCBXYWxsc1wiIH0pO1xuUHJvamVjdE1hbmFnZXIuc2V0U2VsZWN0ZWRQcm9qZWN0KDApO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwibW92ZSBzb2ZhXCIsXG4gIGRlc2NyaXB0aW9uOiBcImxpZnQgZG9udCBkcmFnXCIsXG59KTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcIm1vdmUgdGFibGVcIixcbiAgZGVzY3JpcHRpb246IFwiZHJhZyBpdCByb3VnaGx5XCIsXG59KTtcblByb2plY3RNYW5hZ2VyLnNldFNlbGVjdGVkUHJvamVjdCgxKTtcblByb2plY3RNYW5hZ2VyLmFkZFRvZG9Ub1NlbGVjdGVkUHJvamVjdCh7XG4gIHRpdGxlOiBcImJ1eSBwYWludFwiLFxuICBkZXNjcmlwdGlvbjogXCJtaXggaXQgd2VsbCBiZWZvcmUgYXBwbHlpbmdcIixcbn0pO1xuUHJvamVjdE1hbmFnZXIuYWRkVG9kb1RvU2VsZWN0ZWRQcm9qZWN0KHtcbiAgdGl0bGU6IFwiYnV5IGJydXNoXCIsXG59KTtcbmxvZyhQcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpKTtcblRvZG9VSU1hbmFnZXIucmVuZGVyUHJvamVjdHNMaXN0KFwicHJvamVjdHNcIik7XG5Ub2RvVUlNYW5hZ2VyLnJlbmRlclNlbGVjdGVkR3JvdXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==