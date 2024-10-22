// project.js contains the Project class, its constuctor, and functions to manipulate existing objects, including todos.

import { loadData, saveData, addToCounter } from "./storage";

// Project class, including a constructor.
// Update - adding methods back in fo simplicity of later functions
export class Project {
  // Projects constructor:
  constructor(id, name, todoList = []) {
    this.id = id;
    this.name = name;
    // This property contains the todos - it's important to remember that this is an array of objects
    this.todoList = todoList;
  }

  // Pushes a todo into the array
  addTodo(todo) {
    this.todoList.push(todo);
  }

  // Splices a todo out of the array - index needed
  deleteTodoFromProject(todoId) {
    const todoIndex = this.getTodoIndex(todoId);
    // The todoIndex MUST be found before running this:
    this.todoList.splice(todoIndex, 1);
  }

  // Moves a todo from one project to another
  moveTodo(todoId, oldProject, newProject) {
    // Get the todo's index:
    const todoIndex = oldProject.getTodoIndex(todoId);
    // If it has one...
    if (todoIndex > -1) {
      // Splice the todo from the old project
      const [todoToMove] = oldProject.todoList.splice(todoIndex, 1);
      // Add the todo to the new project's todoList
      newProject.todoList.push(todoToMove);
    }
  }

  getProjectTodoList() {
    // Get all todos from this project
    return this.todoList;
  }

  // Find a todo's index number using its ID
  getTodoIndex(todoId) {
    return this.todoList.findIndex((todo) => todo.id === todoId);
  }
}

// Creates a new project into which todos can be pushed. A name is required and a unique ID is given
export function createNewProject(name) {
  // Load the current data
  let currentData = loadData("projects");
  // Get the unique number needed for an ID and add p- to it to create the ID
  const numberForId = addToCounter("projectCounter");
  const newProjectId = `p-${numberForId}`;
  const newProjectName = name;
  const newProject = new Project(newProjectId, newProjectName, []);
  // Push the new project into the project list
  currentData.push(newProject);
  // Save the data and return the project so that it can be immediately used
  saveData("projects", currentData);
  return newProject;
}
