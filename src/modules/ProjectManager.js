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

  /* edit this to use projectID instead */
  const deleteProject = (projectTitle) => delete projects[projectTitle];

  const setSelectedProject = (projectID) => {
    console.log(currSelectedProj);
    deselectCurrProject();
    console.log(currSelectedProj);
    projects.forEach((project) => {
      if (project.id === projectID) {
        project.toggleSelected();
        currSelectedProj = project;
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

  const sendProjects = () => {}; //send projects to be rendered in side-bar

  const methods = {
    addProject,
    deleteProject,
    addTodoToSelectedProject,
    setSelectedProject,
  };

  return {
    projects, //should be private, create methods for getting it instead
    methods,
  };
})();

export default ProjectManager;
