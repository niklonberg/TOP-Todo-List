import createElement from "./createElement.js";

function renderSelectProjTodosHTML(elementToAppendTo, projectObj) {
  const h1 = createElement("h1", "test", "project-title");
  h1.textContent = projectObj?.title ?? "Default Title";

  const list = createElement("ul", "test2", "curr-project-todos");

  elementToAppendTo.append(h1, list);
}

export default renderSelectProjTodosHTML;
