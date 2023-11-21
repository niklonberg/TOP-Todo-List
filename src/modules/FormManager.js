/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */
import createTodoForm from "./createTodoForm.js";

const FormManager = (() => {
  const createNewTodo = document.querySelector("#create-new-todo"); /* temp */
  const content = document.querySelector("#content");
  let addTodoForm;

  const getFormInputs = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  createNewTodo.addEventListener("click", () => {
    content.innerHTML = createTodoForm();
  });

  return {
    getFormInputs,
  };
})();

export default FormManager;
