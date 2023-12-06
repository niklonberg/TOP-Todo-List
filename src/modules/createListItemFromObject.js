import createElement from "./createElement.js";
import format from "date-fns/format";

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

    if (key === "completionDate") {
      //add default value if no completionDate is given
      console.log(value);
      const time = createElement("time");
      time.setAttribute("datetime", value);
      time.textContent = format(value, "MMMM do, ccc - yyyy");
      li.appendChild(time);
    }
  }

  if (object.hasOwnProperty("todoID")) {
    /* use order to place completeBtn all the way to left in li */
    const checkCompleteBtn = createElement("button", "toggle-complete-btn");
    checkCompleteBtn.textContent = "Mark complete"; /* make sep fn */
    li.appendChild(checkCompleteBtn);

    const checkImportantBtn = createElement("button", "toggle-important-btn");
    checkImportantBtn.textContent = "Mark important"; /* make sep fn */
    li.appendChild(checkImportantBtn);
  }

  const editContainer = createEditContainer();
  li.appendChild(editContainer);

  return li; /* lots of repeating appendCHilding */
}

export default createListItemFromObject;

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
