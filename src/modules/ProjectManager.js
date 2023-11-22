import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";

const ProjectManager = (() => {
  //projects is an object
  //each key is an object, a project
  //each project has a key of todos, which is an array
  //and a key with its methods (for now, will hopefully be set on its protoype)
  const projects = {
    default: {
      todos: [
        {
          title: "Wash dishes",
          description: "Remember to use soap",
        },
      ],
      getTodos() {
        return todos;
      },
    },
  };

  const addProject = (projectTitle) => {
    projects[projectTitle] = ProjectFactory();
  };

  const deleteProject = (projectTitle) => {
    delete projects[projectTitle];
  };

  const addTodoToSelectedProject = (inputElements) => {
    const selectedProject = projects.default;
    const todo = TodoFactory(inputElements);

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
