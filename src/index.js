const log = console.log;
import FormManager from "./modules/FormManager.js";
import ProjectManager from "./modules/ProjectManager.js";
log(ProjectManager);
ProjectManager.methods.addProject("skate");
ProjectManager.methods.addProject("bike");
ProjectManager.methods.addProject("glasses");
ProjectManager.methods.setSelectedProject(1);
ProjectManager.methods.addTodoToSelectedProject([
  "buy skateboard",
  "at darbys skates",
]);
ProjectManager.methods.setSelectedProject(0);
ProjectManager.methods.addTodoToSelectedProject([
  "sell bike",
  "at darbys skates",
]);
ProjectManager.methods.addTodoToSelectedProject([
  "use bike money",
  "to purchase cookies",
]);
ProjectManager.methods.deleteProject(2);
log(ProjectManager);
