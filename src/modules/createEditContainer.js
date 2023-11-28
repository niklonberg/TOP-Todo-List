import createElement from "./createElement";

function createEditContainer() {
  const editContainer = createElement("div", "edit-container");
  const editBtn = createElement("button", "edit-item");
  editBtn.textContent = "Edit";
  const deleteBtn = createElement("button", "delete-item");
  deleteBtn.textContent = "Delete";
  editContainer.append(editBtn, deleteBtn);

  return editContainer;
}

export default createEditContainer;
