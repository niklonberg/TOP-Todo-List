import createTodoForm from "./createTodoForm.js";
import createProjectForm from "./createProjectForm.js";
import ProjectManager from "./ProjectManager.js";

const FormManager = (() => {
  const createNewTodoBtn = document.querySelector("#create-new-todo");
  const createNewProjectBtn = document.querySelector("#create-new-project");
  const projectsList = document.querySelector("#projects-list");
  const mainContent = document.querySelector("#content");
  let addProjectForm; /* needed? */
  let addTodoForm; /* needed? */

  createNewProjectBtn.addEventListener("click", () => {
    const form = createProjectForm();
    projectsList.insertAdjacentHTML("beforeend", form);
    addProjectForm = document.querySelector("#add-project-form");
    initializeForm(addProjectForm);
  });

  const initializeForm = (form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
      ProjectManager.addTodoToSelectedProject(getInputElements(form));
    });
  };

  createNewTodoBtn.addEventListener("click", () => {
    //atm adds multiple identical eventlisteners if clicked multiple times
    //make into single function
    //add guard clause incase form is already present
    content.innerHTML = createTodoForm();
    const form = document.querySelector("#add-todo-form"); //temp hardcoded val
    console.log(form);
    initializeForm(form);
  });

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  return {
    getInputElements,
  };
})();

export default FormManager;
