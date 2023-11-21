/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */
import createTodoForm from "./createTodoForm.js";
import TodoFactory from "./TodoFactory.js";

const FormManager = (() => {
  const createNewTodo = document.querySelector("#create-new-todo"); /* temp */
  const content = document.querySelector("#content");
  let addTodoForm;

  const initializeCreateTodo = () => {
    addTodoForm = document.querySelector("#add-todo-form");
    addTodoForm.addEventListener("submit", (event) => {
      event.preventDefault(); /* make all this into sep. function */
      console.log(getInputElements());
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
