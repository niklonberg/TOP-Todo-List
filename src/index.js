const log = console.log;
import FormManager from "./modules/FormManager.js";
import TodoManager from "./modules/TodoManager.js";
log(JSON.stringify(TodoManager, null, 2));
TodoManager.methods.addProject("Vacuum ALan Moore");
log(JSON.stringify(TodoManager, null, 2));
TodoManager.methods.deleteProject("Vacuum ALan Moore");
log(JSON.stringify(TodoManager, null, 2));
log(TodoManager);
