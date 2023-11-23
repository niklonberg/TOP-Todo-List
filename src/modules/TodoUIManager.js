import ProjectManager from "./ProjectManager.js";
/* responsible for adding and inserting projects & todos into the dom etc. */

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  const populateList = (whatContent, whichList) => {
    let content;
    if (whatContent === "projects") {
      content = ProjectManager.getProjects();
    } else if (whatContent === "todos") {
      content = ProjectManager.getCurrSelectedProjectTodos();
    }
    console.log(content); /* 
    projects.forEach((val) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = val;
      li.appendChild(button);

      projectsList.appendChild(li);
    }); */
  };

  return {
    populateList,
  };
})();

export default TodoUIManager;
