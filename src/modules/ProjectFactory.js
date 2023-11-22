/* const sharedMethods = {

} */

function ProjectFactory(id) {
  const projectID = id;
  const isSelected = false;
  const todos = [];

  const getTodos = () => todos;

  const addTodo = (todo) => todos.push(todo);

  //use object.assign to assign methods to protoype, to avoid duplication

  return {
    projectID,
    isSelected,
    todos, //keep private
    getTodos,
    addTodo,
  };
}

export default ProjectFactory;
