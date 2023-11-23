let todoIDCounter = 0;

function TodoFactory(inputElements) {
  const todo = {};
  let val = 0;

  inputElements.forEach((element) => {
    todo.todoID = todoIDCounter;
    todo[val] = element;
    val++;
  });

  todoIDCounter++;
  return todo;
  /* return inputElements.reduce(
    (todoObj, item) =>
      item.value ? { ...todoObj, [item.id]: item.value } : todoObj,
    {}
  ); */
}

export default TodoFactory;

/* loops through each key in argumentobj */
/* returns {} with key:value pairs*/
/* title */
/* description */
/* dueDate */
/* priority */
/* notes */
/* checklist (sub steps) */
/* maybe add methods to the objects as well? */
