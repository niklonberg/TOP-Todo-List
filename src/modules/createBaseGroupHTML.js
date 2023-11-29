import createElement from "./createElement.js";

function createBaseGroupHTML(projectObj) {
  const h1 = createElement("h1", "test", "grouping-title");
  h1.textContent =
    projectObj?.title ?? "Default Title"; /* projects must have title
  so get rid of this line */
  /* get title from li that called it? */

  const list = createElement("ul", "test2", "curr-grouping-todos");

  return [h1, list];
}

export default createBaseGroupHTML;
