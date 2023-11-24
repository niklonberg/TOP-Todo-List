function createObjectFromForm(formInputs) {
  return formInputs.reduce(
    (object, item) =>
      item.value ? { ...object, [item.id]: item.value } : object,
    {}
  );
}

export default createObjectFromForm;
