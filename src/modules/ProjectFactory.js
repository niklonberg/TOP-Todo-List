let projectIDCounter = 0;

const sharedMethods = {
  getTodos: function () {
    return this.todos;
  },

  addTodo: function (todo) {
    this.todos.push(todo);
  },

  removeTodo: function (todoID) {
    this.todos = this.todos.filter((todo) => todo.todoID !== todoID);
    /* this.todos.forEach((todo, index) => {
      if (todo.todoID === todoID) {
        this.todos.splice(index, 1);
        return;
      }
    }); */
  },

  toggleTodoComplete: function (todoID) {
    const targetTodo = this.todos.find((todo) => todo.todoID === todoID);
    targetTodo.isCompleted = !targetTodo.isCompleted;
    /* this.todos.forEach((todo) => {
      if (todo.todoID === todoID) {
        todo.isCompleted = !todo.isCompleted;
        console.log(todo.isCompleted);
        return;
      }
    }); */
  },

  toggleTodoImportant: function (todoID) {},

  toggleSelected: function () {
    this.isSelected = !this.isSelected;
  },
};

function ProjectFactory(object) {
  const project = {
    title: object.title,
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
