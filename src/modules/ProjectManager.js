import ProjectFactory from "./ProjectFactory.js";

const ProjectManager = (() => {
  const projects = {
    //user can add keys that will be new projects
    default: [
      //each key is an array of objects, that are each a todo
      {
        title: "Wash dishes",
        description: "Remember to use soap",
      },
    ],
  };

  const addProject = (projectTitle) => {
    projects[projectTitle] = ProjectFactory();
  };

  const deleteProject = (projectTitle) => {
    delete projects[projectTitle];
  };

  const sendProjects = () => {}; //send projects to be rendered in side-bar

  const methods = {
    addProject,
    deleteProject,
  };

  return {
    projects, //should be private, create methods for getting it instead
    methods,
  };
})();

export default ProjectManager;
