import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";

const ProjectManager = (() => {
  //projects is an object
  //each key is an object, a project
  //each project has a key of todos, which is an array
  //and a key with its methods (for now, will hopefully be set on its protoype)
  let projectID = 0;
  const projects = {};

  const addProject = (projectTitle) => {
    projects[projectTitle] = ProjectFactory(projectID);
    projectID++;
  };

  /* edit this to use projectID instead */
  const deleteProject = (projectTitle) => delete projects[projectTitle];

  const getSelectedProject = () => {
    for (const project of Object.values(projects)) {
      if (project.isSelected) return project;
    }
    return null; //needed? i think one project will always be selected
  };

  const setSelectedProject = (projectTitle, projectID) => {
    /* will be using projectID later, for now its just by title */
    /* temporary looping and setting all isSelected to false*/
    for (const key in projects) {
      projects[key].isSelected = false;
    }
    projects[projectTitle].isSelected = true;
  };

  const addTodoToSelectedProject = (inputElements) => {
    const selectedProject = getSelectedProject();
    console.log(selectedProject);
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
