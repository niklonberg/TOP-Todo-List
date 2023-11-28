function determineFormType(event) {
  return event.target.id.includes("project");
}

export default determineFormType;
