import createElement from "./createElement.js";

function createBaseGroupHTML(listGroupSelection) {
  const h1 = createElement("h1", "test", "grouping-title");
  h1.textContent =
    listGroupSelection?.querySelector("h3").textContent ?? "All Tasks";

  const list = createElement("ul", "test2", "curr-grouping-todos");

  return [h1, list];
}

export default createBaseGroupHTML;
