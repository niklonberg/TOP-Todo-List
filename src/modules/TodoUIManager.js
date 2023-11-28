import ProjectManager from "./ProjectManager.js";
import createListItemFromObject from "./createListItemFromObject.js";
import renderSelectProjTodosHTML from "./renderSelectProjTodos.js";

const TodoUIManager = (() => {
  /* references */
  const appContent = document.querySelector("#app-content");
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  let previousListGroupSelection;

  const showSelectedGroup = (event) => {
    const listGroupSelection = event.target.closest("li");
    if (listGroupSelection !== previousListGroupSelection) {
      const projectID = +listGroupSelection.dataset.project;
      ProjectManager.setSelectedProject(projectID); //rename when you add the other groups
      populateSelectGroupTodos(); //'today', 'important' etc.
      previousListGroupSelection = listGroupSelection;
    }
  };

  const addLatestItem = (object, isNewProject) => {
    console.log(object);
    const currProjectTodosList = document.querySelector("#curr-project-todos");
    const item = createListItemFromObject(object);
    isNewProject
      ? projectsList.appendChild(item)
      : currProjectTodosList.appendChild(item);
  };

  const removeSelectedItem = () => {
    //query dom for selected item and remove it
    //all actual data changes handled by project manager
  };

  const editSelectedItem = () => {
    //update selected items textContent
    //tells formManager to create form to edit in
    //all actual data changes handled by project manager
  };

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

  projectsList.addEventListener("click", showSelectedGroup);

  appContent.addEventListener("click", (event) => {
    let todoProperty = null;
    if (event.target.classList.contains("toggle-complete-btn"))
      todoProperty = "isCompleted";
    if (event.target.classList.contains("toggle-important-btn"))
      todoProperty = "isImportant";

    if (todoProperty) {
      const btn = event.target;
      const todoID = +btn.parentElement.dataset.todo;
      ProjectManager.getSelectedProject().toggleTodoBoolProperty(
        todoID,
        todoProperty
      );
      console.log(ProjectManager.getSelectedProject());
    }
  });

  return {
    populateProjects,
    populateSelectGroupTodos,
    addLatestItem,
  };
})();

export default TodoUIManager;
