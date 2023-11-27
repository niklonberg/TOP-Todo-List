import ProjectManager from "./ProjectManager.js";
import populateListFromObject from "./populateListFromObject.js";
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

  const addLatest = () => {};

  const removeSelected = () => {};

  const editSelected = () => {};

  const populateProjects = () => {
    projectsList.innerHTML = ""; /* bad? */
    const projects = ProjectManager.getProjects();

    projects.forEach((project) =>
      projectsList.appendChild(populateListFromObject(project))
    );
  };

  const populateSelectGroupTodos = () => {
    mainContent.innerHTML = ""; /* bad? */
    renderSelectProjTodosHTML(mainContent, ProjectManager.getSelectedProject());
    const selectedProjectTodos = ProjectManager.getSelectedProjectTodos();
    const currProjectTodosList = document.querySelector("#curr-project-todos");

    selectedProjectTodos.forEach((project) =>
      currProjectTodosList.appendChild(populateListFromObject(project))
    );
  };

  projectsList.addEventListener("click", showSelectedGroup);

  return {
    populateProjects,
    populateSelectGroupTodos,
  };
})();

export default TodoUIManager;
