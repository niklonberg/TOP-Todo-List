import ProjectManager from "./ProjectManager.js";
import populateListFromObject from "./populateListFromObject.js";
/* responsible for adding and inserting projects & todos into the dom etc. */

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
    const list = projectsList;

    projects.forEach((project) => {
      console.log("id is: ", project.projectID);
      console.log({ project });
      list.appendChild(populateListFromObject(project));
    });
  };

  const populateSelectProjTodos = () => {
    const selectedProjectTodos = ProjectManager.getSelectedProjectTodos();
    const list = currProjectTodosList;

    console.log(selectedProjectTodos, list);
    selectedProjectTodos.forEach((project) => {
      list.appendChild(populateListFromObject(project));
    });
  };

  return {
    populateProjects,
    populateSelectProjTodos,
  };
})();

export default TodoUIManager;
