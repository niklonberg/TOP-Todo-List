import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";

const ProjectManager = (() => {
  //projects is an object
  //each key is an object, a project
  //each project has a key of todos, which is an array
  //and a key with its methods (for now, will hopefully be set on its protoype)
  let projectID = 2;
  const projects = {
    default: {
      projectID: 0,
      isSelected: false,
      todos: [
        {
          title: "Wash dishes",
          description: "Remember to use soap",
        },
      ],
      getTodos() {
        return this.todos;
      },
      addTodo(todo) {
        this.todos.push(todo);
      },
    },
    paint: {
      projectID: 1,
      isSelected: true,
      todos: [
        {
          title: "buy paint",
          description: "take i-95 highway",
        },
      ],
      getTodos() {
        return this.todos;
      },
      addTodo(todo) {
        this.todos.push(todo);
      },
    },
  };

  const addProject = (projectTitle) =>
    (projects[projectTitle] = ProjectFactory());

  const deleteProject = (projectTitle) => delete projects[projectTitle];

  const getSelectedProject = () => {
    for (const project of Object.values(projects)) {
      if (project.isSelected) {
        return project;
      }
    }
    return null; //needed? i think one project will always be selected
  };

  const setSelectedProject = (project) => {};

  const addTodoToSelectedProject = (inputElements) => {
    const selectedProject = getSelectedProject();
    const todo = TodoFactory(inputElements);
    selectedProject.addTodo(todo);
    console.log(projects);
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
