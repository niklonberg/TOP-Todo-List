import "./index.css";
const log = console.log;
import FormManager from "./modules/FormManager.js";
import ProjectManager from "./modules/ProjectManager.js";
import TodoUIManager from "./modules/TodoUIManager.js";
log(ProjectManager);
ProjectManager.addProject({ title: "Refurnish Home" });
ProjectManager.addProject({ title: "Paint Walls" });
ProjectManager.setSelectedProject(0);
ProjectManager.addTodoToCurrSelectedProject({
  title: "move sofa",
  description: "lift dont drag",
});
ProjectManager.addTodoToCurrSelectedProject({
  title: "move table",
  description: "drag it roughly",
  dueDate: "No Due Date",
});
ProjectManager.setSelectedProject(1);
ProjectManager.addTodoToCurrSelectedProject({
  title: "buy paint",
  description: "mix it well before applying",
});
ProjectManager.addTodoToCurrSelectedProject({
  title: "buy brush",
});
log(ProjectManager.getProjects());
TodoUIManager.renderProjectsList("projects");
TodoUIManager.renderSelectedGroup();
