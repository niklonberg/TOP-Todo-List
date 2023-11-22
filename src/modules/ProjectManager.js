import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";

const ProjectManager = (() => {
  //projects is an object
  //each key is an object, a project
  //each project has a key of todos, which is an array
  //and a key with its methods (for now, will hopefully be set on its protoype)
  let projectID = 0; /* set back to 0 eventually */
  const projects = [];

  const addProject = (projectTitle) => {
    const project = ProjectFactory(projectTitle, projectID);
    projects.push(project);
    projectID++;
  };

  /* edit this to use projectID instead */
  const deleteProject = (projectTitle) => delete projects[projectTitle];

  const getSelectedProject = () => {
    return projects.filter((project) => project.isSelected === true);
  };

  const setSelectedProject = (projectID) => {
    /* temporary looping and setting all isSelected to false*/
    projects.forEach((project) => (project.isSelected = false));
    projects.forEach((project) => {
      console.log(project.id);
      if (project.id === projectID) {
        project.toggleSelected();
        return;
      }
    });
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
