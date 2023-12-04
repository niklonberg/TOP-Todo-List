import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";

const ProjectManager = (() => {
  let projects = [];
  let currSelectedProj;

  const addProject = (projectTitle) => {
    const project = ProjectFactory(projectTitle);
    projects.push(project);
    return project;
  };

  const removeSelectedProject = (projectID) =>
    (projects = projects.filter((project) => project.projectID !== projectID));

  const getProject = (projectID) =>
    projects.find((project) => project.projectID === projectID);

  const getProjects = () => projects;

  const getSelectedProject = () => currSelectedProj;

  const getSelectedProjectTodos = () => currSelectedProj.getTodos();

  const setSelectedProject = (projectID) => {
    deselectCurrProject();
    currSelectedProj = getProject(projectID);
    currSelectedProj.toggleSelected();
  };

  const deselectCurrProject = () => currSelectedProj?.toggleSelected();

  const addTodoToSelectedProject = (inputElements) => {
    console.log("selected project is: ", currSelectedProj);
    const todo = TodoFactory(inputElements);
    currSelectedProj.addTodo(todo);
    console.log(projects);
    return todo;
  };

  /* refactor me? */
  const getSelectedTodo = (todoID) => {
    const projectWithTodo = projects.find((project) => project.getTodo(todoID));
    console.log(projectWithTodo);
    console.log(projectWithTodo.getTodo(todoID));
    return projectWithTodo.getTodo(todoID);
  };

  /* refactor me */
  const removeSelectedTodo = (todoID) => {
    const projectWithTodo = projects.find((project) => project.getTodo(todoID));
    projectWithTodo.removeTodo(todoID);
  };

  const editItem = (itemToEdit, templateObj) => {
    console.log("item to edit is: ", itemToEdit);
    console.log("templateObj is: ", templateObj);
    for (const key in templateObj) {
      itemToEdit[key] = templateObj[key];
    }
    console.log(projects);
  };

  /* refactor me */
  const toggleSelectedTodoProperty = (todoID, todoProperty) => {
    console.log(todoID, todoProperty);
    projects
      .find((project) => project.getTodo(todoID))
      .toggleTodoBoolProperty(todoID, todoProperty);
  };

  const getFilteredTasks = (listGroupSelectionID = "all-tasks") => {
    if (listGroupSelectionID === "all-tasks") {
      return projects
        .map((project) => {
          return project.getTodos();
        })
        .flat();
    }
    if (listGroupSelectionID === "today-tasks") {
      // filter through all projects todos
      // return the ones with a date obj of today
    }
    if (someFlag === "week-tasks") {
      // filter through all projects todos
      // return the ones with a date within next 7 days
    }
    if (someFlag === "important-tasks") {
      // filter through all projects todos
      // return the ones with a isImportant === true
    }
  };

  return {
    addProject,
    removeSelectedProject,
    getProjects,
    getProject,
    getSelectedProject,
    getSelectedProjectTodos /* sure about export all of them?? */,
    setSelectedProject,
    addTodoToSelectedProject,
    removeSelectedTodo,
    getSelectedTodo,
    editItem,
    toggleSelectedTodoProperty,
    getFilteredTasks,
  };
})();

export default ProjectManager;
