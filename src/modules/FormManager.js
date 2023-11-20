/* Handles all form data, submitting and sending that data to other modules*/
/* opens and closes modal */
/* gets hold of submitted form data */
/* can construct an object from form data, which it can send */
const FormManager = (() => {
  let addTodoForm;

  const getRefsToForms = (addTodoFormID) => {
    addTodoForm = document.querySelector(`#${addTodoFormID}`);
  };

  /* const getFormInputValues = () => {}; */

  const logForm = () => {
    console.log(addTodoForm);
  };

  return {
    getRefsToForms,
    getFormInputValues,
    logForm,
  };
})();

export default FormManager;
