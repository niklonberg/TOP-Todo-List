/* Handles all form data, submitting and sending that data to other modules*/
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */
const FormManager = (() => {
  let addTodoForm;

  const getRefsToForms = (addTodoFormID) => {
    addTodoForm = document.querySelector(`#${addTodoFormID}`);
  };

  const getFormInputs = () => {
    return [...addTodoForm.elements].filter((item) => item.tagName === "INPUT");
  };

  const logForm = () => {
    console.log(addTodoForm);
    console.log(addTodoForm.elements);
  };

  return {
    getRefsToForms,
    getFormInputs,
    logForm,
  };
})();

export default FormManager;
