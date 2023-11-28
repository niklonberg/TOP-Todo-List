function createAndAppendForm(elementToAppendFormTo, formTypeTemplate) {
  elementToAppendFormTo.insertAdjacentHTML("beforeend", formTypeTemplate);
}

export default createAndAppendForm;
