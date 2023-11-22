const log = console.log;
import FormManager from "./modules/FormManager.js";
import ProjectManager from "./modules/ProjectManager.js";
import ProjectFactory from "./modules/ProjectFactory.js";
import TodoFactory from "./modules/TodoFactory.js";
log(ProjectManager);
ProjectManager.methods.addProject("skate");
ProjectManager.methods.setSelectedProject(2);
