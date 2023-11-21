/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */
import createTodoForm from "./createTodoForm.js";
import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";

const FormManager = (() => {
  const createNewTodo = document.querySelector("#create-new-todo"); /* temp */
  const createNewProject = document.querySelector(
    "#create-new-project"
  ); /* temp */
  const content = document.querySelector("#content"); /* temp */
  let addTodoForm;
  let addProjectForm;

  const initializeForm = (formID) => {
    form = document.querySelector(`#${formID}`);
    form.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
    });
  };

  const getInputElements = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  createNewTodo.addEventListener("click", () => {
    content.innerHTML = createTodoForm();
    initializeCreateTodo();
  });

  return {
    getInputElements,
  };
})();

export default FormManager;
