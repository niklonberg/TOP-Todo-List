function TodoFactory(inputElements) {
  return inputElements.reduce(
    (todoObj, item) =>
      item.value ? { ...todoObj, [item.id]: item.value } : resultObj,
    {}
  );
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
