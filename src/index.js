const log = console.log;
import FormManager from "./modules/FormManager.js";
FormManager.initializeAddTodoForm("add-todo-form");
FormManager.logForm();
log(FormManager.getFormInputs());
