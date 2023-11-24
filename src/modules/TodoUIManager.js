import ProjectManager from "./ProjectManager.js";
import populateListFromObject from "./populateListFromObject.js";
import renderSelectProjTodosHTML from "./renderSelectProjTodos.js";

const TodoUIManager = (() => {
  /* references */
  const mainContent = document.querySelector("#content");
  const projectsList = document.querySelector("#projects-list");

  projectsList.addEventListener("click", (event) => {
    const target = event.target;
    const isListItem = target.closest("li");

    /* Add statement to avoid running this if user clicks same project */
    if (isListItem) {
      console.log(isListItem);
      const projectID = +isListItem.dataset.project;
      ProjectManager.setSelectedProject(projectID);
      populateSelectProjTodos();
    }
  });

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

  return {
    populateProjects,
    populateSelectProjTodos,
  };
})();

export default TodoUIManager;
