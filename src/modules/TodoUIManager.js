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

  //change to renderProjects, as it is run once on startup / or is it?
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
    const [h1, currGroupingTodos] = createBaseGroupHTML();
    mainContent.append(h1, currGroupingTodos);

    const selectedGroupTodos =
      listGroupSelection && listGroupSelection.dataset.project
        ? ProjectManager.getSelectedProjectTodos()
        : ProjectManager.getFilteredTasks(listGroupSelection?.id);

    selectedGroupTodos.forEach((project) =>
      currGroupingTodos.appendChild(createListItemFromObject(project))
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

  const editSelectedItem = () => {
    //update selected items textContent
    //tells formManager to create form to edit in
    //all actual data changes handled by project manager
  };

  /* revisit fn */
  const removeSelectedItem = (event) => {
    const [objectToDelete, objectID, parentLi] = determineTodoOrProject(event);

    if (objectToDelete === "project") {
      ProjectManager.removeProject(objectID);
      parentLi.remove();
      mainContent.innerHTML = ""; //This needs to change
    }
    if (objectToDelete === "todo") {
      ProjectManager.removeTodoFromSelectedProject(objectID);
      parentLi.remove();
    }

    console.log(ProjectManager.getProjects());
  };
  appContent.addEventListener("click", removeSelectedItem);

  const toggleBtnTodoProperty = (event) => {
    let todoProperty = determineTodoProperty(event);

    if (todoProperty) {
      const btn = event.target;
      const todoID = +btn.parentElement.dataset.todo;
      ProjectManager.getSelectedProject().toggleTodoBoolProperty(
        todoID,
        todoProperty
      );
      console.log(ProjectManager.getSelectedProject());
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
