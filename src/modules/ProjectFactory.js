let projectIDCounter = 0;

const sharedMethods = {
  getTodos: function () {
    return this.todos;
  },

  addTodo: function (todo) {
    this.todos.push(todo);
  },

  deleteTodo: function (todoID) {},

  toggleSelected: function () {
    this.isSelected = !this.isSelected;
  },
};

function ProjectFactory(projectTitle) {
  const project = {
    title: projectTitle,
    projectID: projectIDCounter,
    isSelected: false,
    todos: [],
  };

  //use object.setPrototypeOf to assign methods to protoype, to avoid duplication
  Object.setPrototypeOf(project, sharedMethods);

  projectIDCounter++;
  return project;
}

export default ProjectFactory;
