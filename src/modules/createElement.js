function createElement(type = "div", classname = "") {
  const ele = document.createElement(type);
  if (classname) ele.classList.add(classname);
  return ele;
}

export default createElement;
