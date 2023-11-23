const log = console.log;
import FormManager from "./modules/FormManager.js";
import ProjectManager from "./modules/ProjectManager.js";
import TodoUIManager from "./modules/TodoUIManager.js";
log(ProjectManager);
ProjectManager.addProject("Refurnish Home");
ProjectManager.addProject("Paint Walls");
ProjectManager.addProject("test");
ProjectManager.setSelectedProject(1);
ProjectManager.addTodoToSelectedProject(["buy skateboard", "at darbys skates"]);
ProjectManager.setSelectedProject(0);
ProjectManager.addTodoToSelectedProject(["sell bike", "at darbys skates"]);
ProjectManager.addTodoToSelectedProject([
  "use bike money",
  "to purchase cookies",
]);
log(ProjectManager.getProjects());
TodoUIManager.populateList("projects");
TodoUIManager.populateList("todos");
