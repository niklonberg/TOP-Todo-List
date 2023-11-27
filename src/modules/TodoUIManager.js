import ProjectManager from "./ProjectManager.js";
import createListItemFromObject from "./createListItemFromObject.js";
import renderSelectProjTodosHTML from "./renderSelectProjTodos.js";

const TodoUIManager = (() => {
  /* references */
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");
  let previousListGroup;

  const showSelectedGroup = (event) => {
    const listGroup = event.target.closest("li");
    if (listGroup !== previousListGroup) {
      const projectID = +listGroup.dataset.project;
      ProjectManager.setSelectedProject(projectID); //rename when you add the other groups
      populateSelectGroupTodos(); //'today', 'important' etc.
      previousListGroup = listGroup;
    }
  };

  const addLatestItem = () => {
    //get list to add to
    //get last created item
    //use createListFromObject to append to list
  };

  const removeSelectedItem = () => {
    //query dom for selected item and remove it
    //all actual data changes handled by project manager
  };

  const editSelectedItem = () => {
    //update selected items textContent
    //all actual data changes handled by project manager
  };

  //change to renderProjects, as it is run once on startup
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

  return {
    populateProjects,
    populateSelectGroupTodos,
    addLatestItem,
  };
})();

export default TodoUIManager;
