/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */
/* import createTodoForm */

const FormManager = (() => {
  let addTodoForm;

  const initializeAddTodoForm = (addTodoFormID) => {
    addTodoForm = document.querySelector(`#${addTodoFormID}`);

    addTodoForm.addEventListener("submit", (event) => {
      event.preventDefault(); /* all of this logic put in seperate function */
      console.log("i worked");
    });
  };

  const getFormInputs = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  const logForm = () => {
    console.log(addTodoForm);
    console.log(addTodoForm.elements);
  };

  return {
    initializeAddTodoForm,
    getFormInputs,
    logForm,
  };
})();

export default FormManager;
