import createElement from "./createElement.js";

function createBaseGroupHTML(elementToAppendTo, projectObj) {
  const h1 = createElement("h1", "test", "grouping-title");
  h1.textContent =
    projectObj?.title ?? "Default Title"; /* projects must have title
  so get rid of this line */
  /* get title from li that called it? */

  /* change curr-project-todos to curr-grouping-todos */
  const list = createElement("ul", "test2", "curr-grouping-todos");

  elementToAppendTo.append(h1, list);
}

export default createBaseGroupHTML;
