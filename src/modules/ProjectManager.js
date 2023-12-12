import TodoFactory from "./TodoFactory.js";
import ProjectFactory from "./ProjectFactory.js";
import parse from "date-fns/parse";
import { isToday } from "date-fns";

const ProjectManager = (() => {
  let projects = [];
  let currSelectedProj;

  /* currSelectedProject operations */
  const getCurrSelectedProjectTodos = () => currSelectedProj.getTodos();

  const setSelectedProject = (projectID) => {
    deselectCurrProject();
    currSelectedProj = getProject(projectID);
    currSelectedProj.toggleSelected();
  };

  const deselectCurrProject = () => currSelectedProj?.toggleSelected();

  const addTodoToCurrSelectedProject = (inputElements) => {
    const todo = TodoFactory(inputElements);
    currSelectedProj.addTodo(todo);
    return todo;
  };

  /* project operations */
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

  const getProjectFromTodoID = (todoID) =>
    projects.find((project) => project.getTodo(todoID));

  /* todo operations */
  const getSelectedTodo = (todoID) =>
    getProjectFromTodoID(todoID).getTodo(todoID);

  const removeSelectedTodo = (todoID) =>
    getProjectFromTodoID(todoID).removeTodo(todoID);

  /* edit operations */
  const editItem = (itemToEdit, templateObj) => {
    console.log("item to edit is: ", itemToEdit);
    console.log("templateObj is: ", templateObj);
    for (const key in templateObj) {
      itemToEdit[key] = templateObj[key];
    }
    console.log(projects);
  };

  const toggleSelectedTodoProperty = (todoID, todoProperty) =>
    getProjectFromTodoID(todoID).toggleTodoBoolProperty(todoID, todoProperty);

  const getSelectedItem = (objectType, ID) => {
    if (objectType === "project") {
      return getProject(ID);
    }

    if (objectType === "todo") {
      return getSelectedTodo(ID);
    }
  };

  const getFilteredTasks = (listGroupSelectionID = "all-tasks") => {
    if (listGroupSelectionID === "all-tasks")
      return projects.flatMap((project) => project.getTodos());
    /* am i even using dates properly? */
    if (listGroupSelectionID === "today-tasks") {
      return projects.flatMap((project) => {
        return project.getTodos().filter((todo) => {
          if (typeof todo.dueDate === "object") {
            if (isToday(todo.dueDate)) return todo;
          }
        });
      });
    }
    if (listGroupSelectionID === "week-tasks") {
      // filter through all projects todos
      // return the ones with a date within next 7 days
    }
    if (listGroupSelectionID === "important-tasks") {
      return projects.flatMap((project) => {
        return project.getTodos().filter((todo) => todo.isImportant);
      });
    }
  };

  return {
    addProject,
    removeSelectedProject,
    getProjects,
    getProject,
    getCurrSelectedProjectTodos /* sure about export all of them?? */,
    setSelectedProject,
    addTodoToCurrSelectedProject,
    removeSelectedTodo,
    getSelectedTodo,
    editItem,
    getSelectedItem,
    toggleSelectedTodoProperty,
    getFilteredTasks,
  };
})();

export default ProjectManager;
