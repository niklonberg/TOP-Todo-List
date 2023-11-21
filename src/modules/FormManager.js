/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
import createTodoForm from "./createTodoForm.js";
import TodoFactory from "./TodoFactory.js";
import createProjectForm from "./createProjectForm.js";
import ProjectFactory from "./ProjectFactory.js";

const FormManager = (() => {
  const createNewTodoBtn =
    document.querySelector("#create-new-todo"); /* temp */
  const createNewProjectBtn = document.querySelector(
    "#create-new-project"
  ); /* temp */
  const content = document.querySelector("#content"); /* temp */
  let addTodoForm;
  let addProjectForm;

  const initializeForm = (formID) => {
    const form = document.querySelector(`#${formID}`);
    form.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
    });
  };

  createNewTodoBtn.addEventListener("click", () => {
    //atm adds multiple identical eventlisteners if clicked multiple times
    //make into single function
    content.innerHTML = createTodoForm();
    console.log(content);
    initializeForm(content.id);
  });

  createNewProjectBtn.addEventListener("click", () => {
    //atm adds multiple identical eventlisteners if clicked multiple times
    //make into single function
    content.innerHTML = createProjectForm();
    console.log(content);
    initializeForm(content.id);
  });

  const getInputElements = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  return {
    getInputElements,
  };
})();

export default FormManager;
