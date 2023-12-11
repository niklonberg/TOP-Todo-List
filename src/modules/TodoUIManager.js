import FormManager from "./FormManager.js";
import ProjectManager from "./ProjectManager.js";
import createListItemFromObject from "./createListItemFromObject.js";
import createBaseGroupHTML from "./createBaseGroupHTML.js";

const TodoUIManager = (() => {
  /* references */
  const appContent = document.querySelector("#app-content");
  const mainContent = document.querySelector("#main-content");
  const projectsList = document.querySelector("#projects-list");
  const sideBar = document.querySelector("#side-bar");
  const hideSideBarBtn = document.querySelector("#hide-sidebar");
  let previousListGroupSelection;

  const renderProjectsList = () => {
    removeHTMLContent(projectsList);
    const projects = ProjectManager.getProjects();

    projects.forEach((project) =>
      projectsList.appendChild(createListItemFromObject(project))
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
      const projectID = +listGroupSelection?.dataset?.project;
      if (projectID) ProjectManager.setSelectedProject(projectID);
      renderSelectedGroup(listGroupSelection);
      previousListGroupSelection = listGroupSelection;

      FormManager.resetTodoFormExists();
    }
  };
  sideBar.addEventListener("click", showSelectedGroup);

  const renderSelectedGroup = (listGroupSelection) => {
    console.log(listGroupSelection);
    removeHTMLContent(mainContent);
    const [h1, currGroupingTodos] = createBaseGroupHTML(listGroupSelection);
    mainContent.append(h1, currGroupingTodos);

    const selectedGroupTodos =
      listGroupSelection && listGroupSelection.dataset.project
        ? ProjectManager.getCurrSelectedProjectTodos()
        : ProjectManager.getFilteredTasks(listGroupSelection?.id);

    selectedGroupTodos.forEach((grouping) =>
      currGroupingTodos.appendChild(createListItemFromObject(grouping))
    );
  };

  const addLatestItem = (object, isNewProject) => {
    console.log(object);
    const currGroupTodosList = document.querySelector("#curr-grouping-todos");
    const item = createListItemFromObject(object);
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

    if (isEditAction) FormManager.createForm(event, object, objectID, parentLi);
  };
  appContent.addEventListener("click", editSelectedItem);

  const cancelEditSelectedItem = (event) => {
    const [object, objectID, parentLi] = determineTodoOrProject(event);
    console.log(object, objectID, parentLi);
    const searchObj = ProjectManager.getSelectedItem(object, objectID);
    console.log(searchObj);
    const newLI = createListItemFromObject(searchObj);
    parentLi.innerHTML = newLI.innerHTML;
  };

  const updateEditedItem = (templateObj, elementToChange) => {
    const newItem = createListItemFromObject(templateObj);
    console.log(templateObj, elementToChange, newItem);
    elementToChange.replaceWith(newItem);
  };

  const removeSelectedItem = (objectToDelete, objectID, parentLi) => {
    if (objectToDelete === "project") {
      ProjectManager.removeSelectedProject(objectID);
      renderSelectedGroup();
    }

    if (objectToDelete === "todo") ProjectManager.removeSelectedTodo(objectID);

    parentLi?.remove();

    console.log(ProjectManager.getProjects());
  };

  const toggleBtnTodoProperty = (event) => {
    let todoProperty = determineTodoProperty(event);

    if (todoProperty) {
      const btn = event.target;
      btn.classList.toggle("checked");
      const todoID = +btn.closest("li").dataset.todo;
      ProjectManager.toggleSelectedTodoProperty(todoID, todoProperty);
      todoProperty === "isCompleted"
        ? btn.closest("li").classList.toggle("todo-complete")
        : null;
    }
  };
  appContent.addEventListener("click", toggleBtnTodoProperty);

  hideSideBarBtn.addEventListener("click", () => {
    sideBar.classList.toggle("hidden");
  });

  return {
    renderProjectsList,
    renderSelectedGroup,
    addLatestItem,
    cancelEditSelectedItem,
    updateEditedItem,
  };
})();

export default TodoUIManager;

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
