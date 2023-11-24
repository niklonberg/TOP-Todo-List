import createElement from "./createElement.js";

const getObjectIDAndTag = (object) => {
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
};

function populateListFromObject(object) {
  const [objID, idTag] = getObjectIDAndTag(object);

  const li = createElement("li");
  li.dataset[idTag] = objID;

  for (const [key, value] of Object.entries(object)) {
    /* console.log(key + ": " + value); */

    /* const button = document.createElement("button"); */
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

    const checkCompleteBtn = createElement("button", "not-complete");
    checkCompleteBtn.textContent = "Mark complete";
  }

  if (object.hasOwnProperty("todoID")) {
    const checkCompleteBtn = createElement("button", "not-complete");
    checkCompleteBtn.textContent = "Mark complete";
    li.appendChild(checkCompleteBtn);
  }

  return li;
}

export default populateListFromObject;
