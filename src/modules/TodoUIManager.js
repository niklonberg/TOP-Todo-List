import ProjectManager from "./ProjectManager.js";
import populateListFromObject from "./populateListFromObject.js";
/* responsible for adding and inserting projects & todos into the dom etc. */

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  projectsList.addEventListener("click", (event) => {
    const target = event.target;
    const isListItem = target.tagName === "li" || target.closest("li");

    if (isListItem) {
      console.log(target);
      /* set h1 to title of project */
      /* get data- attr of listItem */
      /* call setSelectedProject pass data attr value */
      /* call populateTodos */
    }
  });

  const populateProjects = () => {
    const projects = ProjectManager.getProjects();
    const list = projectsList;

    projects.forEach((project) => {
      list.appendChild(populateListFromObject(project));
    });
  };

  const populateTodos = (projectID) => {
    const selectedProjectTodos = ProjectManager.getCurrSelectedProjectTodos();
    const list = currProjectTodosList;

    console.log(selectedProjectTodos, list);
    selectedProjectTodos.forEach((project) => {
      list.appendChild(populateListFromObject(project));
    });
  };

  return {
    populateProjects,
    populateTodos,
  };
})();

export default TodoUIManager;
