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
    projects.forEach((project) => {
      if (project.id === projectID) {
        /* project.isSelected = true; */
        project.toggleSelected();
        console.log({ project });
        return;
      }
    });
  };

  const addTodoToSelectedProject = (inputElements) => {
    const selectedProject = getSelectedProject();
    console.log("selected project is: ", { selectedProject });
    const todo = TodoFactory(inputElements);
    selectedProject.addTodo(todo);
    console.log(projects);
  };

  const sendProjects = () => {}; //send projects to be rendered in side-bar

  const methods = {
    addProject,
    deleteProject,
    addTodoToSelectedProject,
    getSelectedProject,
    setSelectedProject,
  };

  return {
    projects, //should be private, create methods for getting it instead
    methods,
  };
})();

export default ProjectManager;
