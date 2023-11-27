import createTodoForm from "./createTodoForm.js";
import createProjectForm from "./createProjectForm.js";
import createObjectFromForm from "./createObjectFromForm.js";
import ProjectManager from "./ProjectManager.js";
import TodoUIManager from "./TodoUIManager.js";

const FormManager = (() => {
  /* references */
  const createNewTodoBtn = document.querySelector("#create-new-todo");
  const createNewProjectBtn = document.querySelector("#create-new-project");

  const handleBtnCreateFormClick = (event) => {
    const elementToAppendFormTo = event.target.previousElementSibling;
    if (elementToAppendFormTo.querySelector("form")) return;
    const isNewProject = event.target.id.includes("project");
    let formTypeTemplate;
    isNewProject
      ? (formTypeTemplate = createProjectForm())
      : (formTypeTemplate = createTodoForm());
    elementToAppendFormTo.insertAdjacentHTML("beforeend", formTypeTemplate);
    const form = elementToAppendFormTo.querySelector("form");
    initializeForm(form, isNewProject);
  };

  const initializeForm = (form, isNewProject) => {
    const submitHandler = (event) => {
      handleFormSubmit(event, form, isNewProject);
      form.removeEventListener("submit", submitHandler);
      form.remove();
    };

    form.addEventListener("submit", submitHandler);
  };

  const handleFormSubmit = (event, form, isNewProject) => {
    event.preventDefault();
    const object = createObjectFromForm(getInputElements(form));
    if (isNewProject) {
      ProjectManager.addProject(object);
      TodoUIManager.populateProjects();
    } else {
      ProjectManager.addTodoToSelectedProject(object);
      TodoUIManager.populateSelectGroupTodos();
    }
  };

  const getInputElements = (form) =>
    [...form.elements].filter((item) => item.tagName === "INPUT");

  createNewProjectBtn.addEventListener("click", handleBtnCreateFormClick);

  createNewTodoBtn.addEventListener("click", handleBtnCreateFormClick);
})();

export default FormManager;
