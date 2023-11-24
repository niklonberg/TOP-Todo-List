const createElement = (type = "div", classname = "") => {
  const ele = document.createElement(type);
  if (classname) ele.classList.add(classname);
  return ele;
};

function populateListFromObject(object) {
  const objID = object.projectID || object.todoID;
  const idTag = object.projectID ? "project" : object.todoID ? "todo" : null;

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
  }
  return li;
}

export default populateListFromObject;
