import ProjectManager from "./ProjectManager.js";
import createListItemFromObject from "./createListItemFromObject.js";
import createBaseGroupHTML from "./createBaseGroupHTML.js";

const TodoUIManager = (() => {
  /* references */
  const appContent = document.querySelector("#app-content");
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  const sideBar = document.querySelector("#side-bar");

  let previousListGroupSelection;

  const renderProjectsList = () => {
    removeHTMLContent(projectsList);
    const projects = ProjectManager.getProjects();

    projects.forEach((project) =>
      projectsList.appendChild(createListItemFromObject(project))
    );
  };

  const renderSelectedGroup = (listGroupSelection) => {
    console.log(listGroupSelection);
    removeHTMLContent(mainContent);
    const [h1, currGroupingTodos] = createBaseGroupHTML(listGroupSelection);
    mainContent.append(h1, currGroupingTodos);

    const selectedGroupTodos =
      listGroupSelection && listGroupSelection.dataset.project
        ? ProjectManager.getSelectedProjectTodos()
        : ProjectManager.getFilteredTasks(listGroupSelection?.id);

    selectedGroupTodos.forEach((grouping) =>
      currGroupingTodos.appendChild(createListItemFromObject(grouping))
    );
  };

  const showSelectedGroup = (event) => {
    const listGroupSelection = event.target.closest("li");
    if (listGroupSelection !== previousListGroupSelection) {
      const projectID = listGroupSelection.dataset.project;
      if (projectID !== undefined)
        ProjectManager.setSelectedProject(+projectID);
      renderSelectedGroup(listGroupSelection);
      previousListGroupSelection = listGroupSelection;
    }
  };
  sideBar.addEventListener("click", showSelectedGroup);

  const addLatestItem = (object, isNewProject) => {
    console.log(object);
    const currGroupTodosList = document.querySelector("#curr-grouping-todos");
    const item = createListItemFromObject(object);
    isNewProject
      ? projectsList.appendChild(item)
      : currGroupTodosList.appendChild(item);
  };

  const editSelectedItem = (event) => {
    const [isDeleteAction, isEditAction] = determineEditOrDeleteAction(event);
    const [objectToDelete, objectID, parentLi] = determineTodoOrProject(event);

    //if delete button was pressed
    //run removeSelectedItem
    if (isEditAction) removeSelectedItem();

    //if edit button was pressed
    //continue with running editSelectedItem
    //tells formManager to create form to edit in

    if (isDeleteAction) {
    }
    //all actual data changes handled by project manager
  };

  const removeSelectedItem = (event) => {
    const [objectToDelete, objectID, parentLi] = determineTodoOrProject(event);

    if (objectToDelete === "project") {
      ProjectManager.removeSelectedProject(objectID);
      renderSelectedGroup();
    }

    if (objectToDelete === "todo") ProjectManager.removeSelectedTodo(objectID);

    parentLi?.remove();

    console.log(ProjectManager.getProjects());
  };
  appContent.addEventListener("click", removeSelectedItem);

  function determineEditOrDeleteAction(event) {}

  function determineTodoOrProject(event) {
    if (
      event.target.classList.contains("delete-item") ||
      event.target.classList.contains("edit-item")
    ) {
      const parentLi = event.target.closest("li");
      const parentObjectDataset = parentLi.dataset;
      const objectToDelete = Object.keys(parentObjectDataset)[0];
      const objectID = +Object.values(parentObjectDataset)[0];
      return [objectToDelete, objectID, parentLi];
    }
    return [null, null];
  }

  const toggleBtnTodoProperty = (event) => {
    let todoProperty = determineTodoProperty(event);

    if (todoProperty) {
      const btn = event.target;
      const todoID = +btn.closest("li").dataset.todo;
      ProjectManager.toggleSelectedTodoProperty(todoID, todoProperty);
    }
  };
  appContent.addEventListener("click", toggleBtnTodoProperty);

  return {
    renderProjectsList,
    renderSelectedGroup,
    addLatestItem,
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

function removeHTMLContent(element) {
  element.innerHTML = "";
}
