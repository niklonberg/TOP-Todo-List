const log = console.log;
import FormManager from "./modules/FormManager.js";
import ProjectManager from "./modules/ProjectManager.js";
log(ProjectManager);
ProjectManager.addProject("skate");
ProjectManager.addProject("bike");
ProjectManager.addProject("glasses");
ProjectManager.setSelectedProject(1);
ProjectManager.addTodoToSelectedProject(["buy skateboard", "at darbys skates"]);
ProjectManager.setSelectedProject(0);
ProjectManager.addTodoToSelectedProject(["sell bike", "at darbys skates"]);
ProjectManager.addTodoToSelectedProject([
  "use bike money",
  "to purchase cookies",
]);
ProjectManager.deleteProject(2);
log(ProjectManager.getProjects());
