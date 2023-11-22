/* const sharedMethods = {
  
} */

function ProjectFactory() {
  const todos = [];

  const getTodos = () => todos;

  const addTodo = (todo) => todos.push(todo);

  //use object.assign to assign methods to protoype, to avoid duplication

  return {
    todos, //keep private
    getTodos,
    addTodo,
  };
}

export default ProjectFactory;
