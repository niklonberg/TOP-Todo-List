import ProjectManager from "./ProjectManager.js";
/* responsible for adding and inserting projects & todos into the dom etc. */

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  const populateProjectsList = () => {
    /* shorten */
    const projects = ProjectManager.getProjects();
    console.log(projects);
    const values = projects.map((project) => {
      return project.title;
    });
    console.log(values);
    values.forEach((val) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = val;
      li.appendChild(button);

      projectsList.appendChild(li);
    });
  };

  return {
    populateProjectsList,
  };
})();

export default TodoUIManager;
