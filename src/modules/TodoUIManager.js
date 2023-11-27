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
      ProjectManager.setSelectedProject(projectID); //rename
      populateSelectProjTodos(); //rename
      previousListGroup = listGroup;
    }
  };

  const populateProjects = () => {
    projectsList.innerHTML = ""; /* bad? */
    const projects = ProjectManager.getProjects();

    projects.forEach((project) =>
      projectsList.appendChild(populateListFromObject(project))
    );
  };

  /* rename to populateSelectTodos later */
  const populateSelectProjTodos = () => {
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
    populateSelectProjTodos,
  };
})();

export default TodoUIManager;
