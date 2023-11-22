const log = console.log;
import FormManager from "./modules/FormManager.js";
import ProjectManager from "./modules/ProjectManager.js";
import ProjectFactory from "./modules/ProjectFactory.js";
import TodoFactory from "./modules/TodoFactory.js";
log(ProjectManager);
ProjectManager.methods.addProject("skate");
ProjectManager.methods.setSelectedProject("skate", 0);
ProjectManager.methods.addTodoToSelectedProject([
  "buy skateboard",
  "at darbys skates",
]);
ProjectManager.methods.addProject("bike");
ProjectManager.methods.setSelectedProject("bike", 0);
ProjectManager.methods.addTodoToSelectedProject([
  "sell bike",
  "at darbys skates",
]);
ProjectManager.methods.addTodoToSelectedProject([
  "use bike money",
  "to purchase cookies",
]);
