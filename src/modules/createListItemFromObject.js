import createElement from "./createElement.js";

function createEditContainer() {
  const editContainer = createElement("div", "edit-container");
  const editBtn = createElement("button", "edit-item");
  editBtn.textContent = "Edit";
  const deleteBtn = createElement("button", "delete-item");
  deleteBtn.textContent = "Delete";
  editContainer.append(editBtn, deleteBtn);

  return editContainer;
}

function getObjectIDAndTag(object) {
  const key1 = "projectID";
  const key2 = "todoID";
  const objID = object.hasOwnProperty(key1)
    ? object.projectID
    : object.hasOwnProperty(key2)
    ? object.todoID
    : null;

  const idTag = object.hasOwnProperty(key1)
    ? "project"
    : object.hasOwnProperty(key2)
    ? "todo"
    : null;

  return [objID, idTag];
}

function createListItemFromObject(object) {
  const [objID, idTag] = getObjectIDAndTag(object);

  const li = createElement("li");
  li.dataset[idTag] = objID;

  for (const [key, value] of Object.entries(object)) {
    /* console.log(key + ": " + value); */
    if (key === "title") {
      const heading = createElement("h3");
      heading.textContent = value;
      li.appendChild(heading);
    }

    if (key === "description") {
      const p = createElement("p");
      p.textContent = value;
      li.appendChild(p);
    }
  }

  /* use order to place this all the way to left in li */
  if (object.hasOwnProperty("todoID")) {
    const checkCompleteBtn = createElement("button", "not-complete");
    checkCompleteBtn.textContent = "Mark complete";
    li.appendChild(checkCompleteBtn);
  }

  const editContainer = createEditContainer();
  li.appendChild(editContainer);

  return li;
}

export default createListItemFromObject;
