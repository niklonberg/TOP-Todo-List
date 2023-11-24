import ProjectManager from "./ProjectManager.js";
import populateListFromObject from "./populateListFromObject.js";

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  projectsList.addEventListener("click", (event) => {
    const target = event.target;
    const isListItem = target.closest("li");

    if (isListItem) {
      console.log(isListItem);
      /* set h1 to title of project */
      const projectID = +isListItem.dataset.project;
      ProjectManager.setSelectedProject(projectID);
      populateSelectProjTodos();
    }
  });

  const populateProjects = () => {
    const projects = ProjectManager.getProjects();

    projects.forEach((project) =>
      projectsList.appendChild(populateListFromObject(project))
    );
  };

  const populateSelectProjTodos = () => {
    const selectedProjectTodos = ProjectManager.getSelectedProjectTodos();
    const list = currProjectTodosList;

    selectedProjectTodos.forEach((project) =>
      list.appendChild(populateListFromObject(project))
    );
  };

  return {
    populateProjects,
    populateSelectProjTodos,
  };
})();

export default TodoUIManager;
