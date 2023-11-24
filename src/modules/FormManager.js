import createTodoForm from "./createTodoForm.js";
import createProjectForm from "./createProjectForm.js";
import ProjectManager from "./ProjectManager.js";
import TodoUIManager from "./TodoUIManager.js";

const FormManager = (() => {
  const createNewTodoBtn = document.querySelector("#create-new-todo");
  const createNewProjectBtn = document.querySelector("#create-new-project");
  const projectsList = document.querySelector("#projects-list");
  const mainContent = document.querySelector("#content");
  let addProjectForm; /* needed? */
  let addTodoForm; /* needed? */

  createNewProjectBtn.addEventListener("click", () => {
    if (document.querySelector("#projects-list form")) return;
    const form = createProjectForm();
    projectsList.insertAdjacentHTML("beforeend", form);
    const addProjectForm = document.querySelector("#add-project-form");
    initializeForm(addProjectForm);
  });

  const initializeForm = (form) => {
    /* needs to remove itself on submit */
    form.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
      ProjectManager.addProject(getInputElements(form));
      console.log(getInputElements(form));
      console.log(ProjectManager.getProjects());
      TodoUIManager.populateProjects();
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
