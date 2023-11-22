import TodoFactory from "./TodoFactory.js";
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

  const addTodoToSelectedProject = (inputElements) => {
    console.log(inputElements);
    //get selected project                    -
    //use todofactory to create a todo        - these 3 not done here
    //append todo to selected project.todos   -
  };

  const sendProjects = () => {}; //send projects to be rendered in side-bar

  const methods = {
    addProject,
    deleteProject,
    addTodoToSelectedProject,
  };

  return {
    projects, //should be private, create methods for getting it instead
    methods,
  };
})();

export default ProjectManager;
