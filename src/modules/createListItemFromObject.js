import createElement from "./createElement.js";
import format from "date-fns/format";

function createListItemFromObject(object) {
  const [objID, idTag] = getObjectIDAndTag(object);

  const li = createElement("li", "list-item");
  li.dataset[idTag] = objID;

  if (object.hasOwnProperty("projectID")) {
    const img = createElement("img");
    img.src = "../src/images/drag.png";
    img.alt = "";
    img.height = "25";
    img.width = "25";
    li.appendChild(img);
  }

  const listDetailsDiv = createElement("div", "list-details");
  for (const [key, value] of Object.entries(object)) {
    if (key === "title") {
      const heading = createElement("h3");
      heading.textContent = value;
      listDetailsDiv.appendChild(heading);
    }

    if (key === "description") {
      const p = createElement("p");
      p.textContent = value;
      listDetailsDiv.appendChild(p);
    }
    li.appendChild(listDetailsDiv);

    if (key === "dueDate") {
      let ele;
      if (value !== "No Due Date") {
        ele = createElement("time");
        ele.setAttribute("datetime", value);
        ele.textContent = format(value, "MMMM do, ccc - yyyy");
      } else {
        ele = createElement("p");
        ele.textContent = value;
      }

      li.appendChild(ele);
    }
  }

  if (object.hasOwnProperty("todoID")) {
    const checkCompleteBtn = createElement("button", "toggle-complete-btn");
    checkCompleteBtn.setAttribute("aria-label", "Toggle complete");
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
