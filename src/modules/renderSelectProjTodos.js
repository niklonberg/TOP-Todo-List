import createElement from "./createElement.js";
/*
  <button id="create-new-todo">Create todo</button> */

function renderSelectProjTodosHTML(elementToAppendTo, projectObj) {
  elementToAppendTo.innerHTML = "";
  const h1 = createElement("h1", "test", "project-title");
  h1.textContent = projectObj?.title ?? "Default Title";

  const list = createElement("ul", "test2", "curr-project-todos");

  elementToAppendTo.append(h1, list);
}

function initializeEventListeners() {}

export default renderSelectProjTodosHTML;
