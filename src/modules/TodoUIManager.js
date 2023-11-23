import ProjectManager from "./ProjectManager.js";
/* responsible for adding and inserting projects & todos into the dom etc. */

const TodoUIManager = (() => {
  /* references */
  const projectsList = document.querySelector("#projects-list");
  const currProjectTodosList = document.querySelector("#curr-project-todos");

  projectsList.addEventListener("click", (event) => {
    const target = event.target;
    const isListItem = target.tagName === "LI" || target.closest("li");

    if (isListItem) {
      console.log(target);
    }
  });

  const populateTodos = (projectID) => {
    let content;
    let list; /* temp */
    if (whatContent === "projects") {
      content = ProjectManager.getProjects();
      list = projectsList;
    } else if (whatContent === "todos") {
      content = ProjectManager.getCurrSelectedProjectTodos();
      list = currProjectTodosList;
    }

    console.log(content, list);
    /* put below in sep util function */
    content.forEach((val) => {
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

        if (key === "description") {
          const p = document.createElement("p");
          p.textContent = value;
          li.appendChild(p);
        }
      }

      list.appendChild(li);
    });
  };

  const populateProjects = () => {};

  return {
    populateTodos,
    populateProjects,
  };
})();

export default TodoUIManager;
