import ProjectManager from "./ProjectManager.js";
import createListItemFromObject from "./createListItemFromObject.js";
import renderSelectProjTodosHTML from "./renderSelectProjTodos.js";

const TodoUIManager = (() => {
  /* references */
  const appContent = document.querySelector("#app-content");
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  let previousListGroupSelection;

  //change to renderProjects, as it is run once on startup / or is it?
  const populateProjects = () => {
    projectsList.innerHTML = ""; /* bad? */
    const projects = ProjectManager.getProjects();

    projects.forEach((project) =>
      projectsList.appendChild(createListItemFromObject(project))
    );
  };

  const populateSelectGroupTodos = () => {
    mainContent.innerHTML = ""; /* bad? */
    renderSelectProjTodosHTML(mainContent, ProjectManager.getSelectedProject());
    const selectedProjectTodos = ProjectManager.getSelectedProjectTodos();
    const currProjectTodosList = document.querySelector("#curr-project-todos");

    selectedProjectTodos.forEach((project) =>
      currProjectTodosList.appendChild(createListItemFromObject(project))
    );
  };

  const addLatestItem = (object, isNewProject) => {
    console.log(object);
    const currProjectTodosList = document.querySelector("#curr-project-todos");
    const item = createListItemFromObject(object);
    isNewProject
      ? projectsList.appendChild(item)
      : currProjectTodosList.appendChild(item);
  };

  const editSelectedItem = () => {
    //update selected items textContent
    //tells formManager to create form to edit in
    //all actual data changes handled by project manager
  };

  const removeSelectedItem = (event) => {
    const [objectToDelete, objectID, parentLi] = determineTodoOrProject(event);

    if (objectToDelete === "project") {
      ProjectManager.removeProject(objectID);
      parentLi.remove();
      //select next project if exists
      //else empty content
    }
    if (objectToDelete === "todo") {
      ProjectManager.removeTodoFromSelectedProject(objectID);
      parentLi.remove();
    }

    console.log(ProjectManager.getProjects());
  };
  appContent.addEventListener("click", removeSelectedItem);

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

  const showSelectedGroup = (event) => {
    const listGroupSelection = event.target.closest("li");
    if (listGroupSelection !== previousListGroupSelection) {
      const projectID = +listGroupSelection.dataset.project;
      ProjectManager.setSelectedProject(projectID); //rename when you add the other groups
      populateSelectGroupTodos(); //'today', 'important' etc.
      previousListGroupSelection = listGroupSelection;
    }
  };
  projectsList.addEventListener("click", showSelectedGroup);

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
    populateProjects,
    populateSelectGroupTodos,
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
