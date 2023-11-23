import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";

const ProjectManager = (() => {
  let projectID = 0;
  const projects = [];
  let currSelectedProj;

  const addProject = (projectTitle) => {
    const project = ProjectFactory(projectTitle, projectID);
    projects.push(project);
    projectID++;
  };

  const deleteProject = (projectID) => {
    projects.forEach((project, index) => {
      if (project.id === projectID) {
        projects.splice(index, 1);
      }
    });
    /* alt version could use filter and reassign to projects var. */
  };

  const getProjects = () => projects;

  const setSelectedProject = (projectID) => {
    console.log(currSelectedProj);
    deselectCurrProject();
    console.log(currSelectedProj);
    projects.forEach((project) => {
      if (project.projectID === projectID) {
        currSelectedProj = project;
        currSelectedProj.toggleSelected();
        console.log(currSelectedProj);
        return;
      }
    });
  };

  const deselectCurrProject = () => currSelectedProj?.toggleSelected();

  const addTodoToSelectedProject = (inputElements) => {
    console.log("selected project is: ", currSelectedProj);
    const todo = TodoFactory(inputElements);
    currSelectedProj.addTodo(todo);
    console.log(projects);
  };

  return {
    addProject,
    deleteProject,
    getProjects,
    addTodoToSelectedProject,
    setSelectedProject,
  };
})();

export default ProjectManager;
