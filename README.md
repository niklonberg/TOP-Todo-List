# TOP-todo-list
Todo list app built with webpack, practicing implementing SOLID design principles and trying to avoid tight coupling between modules.

LESSONS LEARNED

Started too early with implementing the form to add items, meaning throughout the development 
and testing I kept having to fill out the form to add items, instead of writing a couple of lines to do it automatically on refresh

# Functionality
Add projects
Edit projects
Add todos to projects
Edit todos, toggle different properties of todos, isComplete, isImportant etc.
Dynamically create different types of forms - according to what the user wants to do,
apppends said form to different sections of the dom, attaches/detaches event listeners from them.
Dynamically update main content section of ui with currently selected group/project details.
