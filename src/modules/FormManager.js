import createTodoForm from "./createTodoForm.js";
import createProjectForm from "./createProjectForm.js";
import createObjectFromForm from "./createObjectFromForm.js";
import ProjectManager from "./ProjectManager.js";
import TodoUIManager from "./TodoUIManager.js";

const FormManager = (() => {
  const createNewTodoBtn = document.querySelector("#create-new-todo");
  const createNewProjectBtn = document.querySelector("#create-new-project");
  const projectsList = document.querySelector("#projects-list");
  const mainContent = document.querySelector("#content");
  let addProjectForm; /* needed? */
  let addTodoForm; /* needed? */

  createNewProjectBtn.addEventListener("click", handleBtnCreateFormClick);

  createNewTodoBtn.addEventListener("click", handleBtnCreateFormClick);

  function handleBtnCreateFormClick(event) {
    const elementToAppendFormTo = event.target.previousElementSibling;

    if (elementToAppendFormTo.querySelector("form")) return;

    const isNewProject = event.target.id.includes("project");

    let formTypeTemplate;
    isNewProject
      ? (formTypeTemplate = createProjectForm())
      : (formTypeTemplate = createTodoForm());

    elementToAppendFormTo.insertAdjacentHTML("beforeend", formTypeTemplate);
    const form = elementToAppendFormTo.querySelector("form");
    initializeForm(form);
  }

  /* make work for both buttons */
  const initializeForm = (form) => {
    /* needs to remove itself on submit */
    /* or maybe not? since populateProjects() overwrites it */
    form.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
      const object = createObjectFromForm(getInputElements(form));
      ProjectManager.addProject(object);
      TodoUIManager.populateProjects();
    });
  };

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  return {
    getInputElements,
  };
})();

export default FormManager;
