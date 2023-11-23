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
    }
  });

  const populateTodos = (projectID) => {
    const content = ProjectManager.getCurrSelectedProjectTodos();
    const list = currProjectTodosList;

    console.log(content, list);
    /* put below in sep util function */
    content.forEach((project) => {
      populateListFromObject(project);
    });
  };

  /* const populateProjects = () => {
    const content = ProjectManager.getProjects();
    const list = projectsList;

    content.forEach((project) => {
      populateListFromObject(project);
    });
  }; */

  return {
    populateTodos,
    /* populateProjects, */
  };
})();

export default TodoUIManager;
