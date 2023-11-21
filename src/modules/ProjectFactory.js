function ProjectFactory(title) {
  const todos = [];

  const getTodos = () => todos;

  //use object.assign to assign methods to protoype, to avoid duplication

  return {
    todos, //keep private
    getTodos,
  };
}

export default ProjectFactory;
