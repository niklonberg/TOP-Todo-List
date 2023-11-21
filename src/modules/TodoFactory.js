function TodoFactory(inputElements) {
  /* loops through each key in argumentobj */
  /* returns {} with key:value pairs*/
  /* title */
  /* description */
  /* dueDate */
  /* priority */
  /* notes */
  /* checklist (sub steps) */
  /* maybe add methods to the objects as well? */
  return inputElements.reduce(
    (resultObj, item) =>
      item.value ? { ...resultObj, [item.id]: item.value } : resultObj,
    {}
  );
}

export default TodoFactory;
