const log = console.log;
import FormManager from "./modules/FormManager.js";
import ProjectManager from "./modules/ProjectManager.js";
import TodoUIManager from "./modules/TodoUIManager.js";
log(ProjectManager);
ProjectManager.addProject("Refurnish Home");
ProjectManager.addProject("Paint Walls");
ProjectManager.setSelectedProject(0);
ProjectManager.addTodoToSelectedProject({
  title: "move sofa",
  description: "lift dont drag",
});
ProjectManager.addTodoToSelectedProject({
  title: "move table",
  description: "drag it roughly",
});
ProjectManager.setSelectedProject(1);
ProjectManager.addTodoToSelectedProject({
  title: "buy paint",
  description: "mix it well before applying",
});
ProjectManager.addTodoToSelectedProject({
  title: "buy brush",
});
log(ProjectManager.getProjects());
/* TodoUIManager.populateProjects("projects"); */
TodoUIManager.populateTodos("todos");
