import ProjectManager from "./ProjectManager.js";
/* responsible for adding and inserting projects & todos into the dom etc. */

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  const populateList = (whatContent) => {
    let content;
    let list;
    if (whatContent === "projects") {
      content = ProjectManager.getProjects();
      list = projectsList;
    } else if (whatContent === "todos") {
      content = ProjectManager.getCurrSelectedProjectTodos();
      list = currProjectTodosList;
    }

    console.log(content, list);
    content.forEach((val) => {
      /* put this in sep util function */
      const li = document.createElement("li");
      /* const button = document.createElement("button"); */
      for (const [key, value] of Object.entries(val)) {
        console.log(key + ": " + value);
        if (key === "title") {
          const h1 = document.createElement("h1");
          h1.textContent = value;
          console.log(h1);
          li.appendChild(h1);
        }
      }

      list.appendChild(li);
    });
  };

  return {
    populateList,
  };
})();

export default TodoUIManager;
