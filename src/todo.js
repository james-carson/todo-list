// todo.js contains the Todo class, its constuctor, and functions to manipulate existing objects.

import {
  getCompletedTodos,
  getHighPriorityTodos,
  getOverdueTodos,
  getTodosDueThisWeek,
  getTodosDueToday,
} from "./functions";
import {
  loadData,
  loadState,
  saveData,
  addToCounter,
  loadProject,
  saveState,
} from "./storage";
import {
  updateScreen,
  getCurrentType,
  getCurrentProject,
  getCurrentTodos,
  renderContent,
} from "./ui";

// Todo class, including a constructor. No methods; functions will be handled separately.
// Update - adding methods back in fo simplicity of later functions
export class Todo {
  constructor(id, title, dueDate, priority, notes, completed = "false") {
    // ID needs to be able to accept input from dummy data and must also be unique
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = completed;
  }

  // currently not used but could be, for example if a todo can be directly edited from the content list.
  editTodo(newTitle, newDueDate, newPriority, newNotes) {
    // Updates each todo property to the new provided value, or defaults to the original if none provided.
    // ID not necessary as this is unique and should not/cannot be changed
    this.title = newTitle || this.title;
    this.dueDate = newDueDate || this.dueDate;
    this.priority = newPriority || this.priority;
    this.notes = newNotes || this.notes;
    // No need for completed as this will be handled separately
  }
}

// Toggles whether a todo has been completed or not. Fades after 1.5 seconds. Because of the different views, this gave me a lot of trouble!
export function toggleTodoCompleted(todoId) {
  console.log(`Initiated toggleTodoCompleted(${todoId})`);
  // Load variables for use later
  let currentData = loadData("projects");
  let currentState = loadState("state");
  const currentProject = loadState("currentProject");
  let updatedTodos;

  // Find the current todo by its id:
  for (let project of currentData) {
    const todoById = project.todoList.find(
      (todoToChange) => todoToChange.id === todoId,
    );
    if (todoById) {
      console.log(todoById);
      // Toggle the completed value, which is Boolean, to its opposite
      todoById.completed = !todoById.completed;
      // Save the updated data
      saveData("projects", currentData);
      // Check current state and filter throught
      if (currentState === "default") {
        updatedTodos = getOverdueTodos();
      } else if (currentState === "static") {
        if (currentProject === "Due Today") {
          updatedTodos = getTodosDueToday();
        } else if (currentProject === "Due This Week") {
          updatedTodos = getTodosDueThisWeek();
        } else if (currentProject === "Overdue") {
          updatedTodos = getOverdueTodos();
        } else if (currentProject === "High Priority") {
          updatedTodos = getHighPriorityTodos();
        } else if (currentProject === "Completed") {
          updatedTodos = getCompletedTodos();
        }
      } else if (currentState === "dynamic") {
        // No todos needed, will be added in updateScreen
        updatedTodos = [];
      }

      // Refresh the content area
      setTimeout(() => updateScreen(currentProject, updatedTodos), 1500);
      return;
    }
  }
  console.error(`Todo with ID ${todoId} cannot be found`);
}

// Currently not in use, but could be used if expanded to delete a todo in another way
export function deleteTodo(todoId) {
  const projects = loadData("projects");
  const parentProject = projects.find((project) =>
    project.todoList.find((todo) => todo.id === todoId),
  );

  if (parentProject) {
    // Remove the todo by filtering it out
    parentProject.todoList = parentProject.todoList.filter(
      (todo) => todo.id !== todoId,
    );
    saveData("projects", projects); // Save updated projects data
    console.log(`Todo with ID: ${todoId} deleted.`);
  } else {
    console.error(`Todo with ID: ${todoId} not found.`);
  }
}

// Similar to projects, uses a unique ID to identify each todo. Also requires a project as all todos belong to one (and currently only one)
export function createNewTodo(title, dueDate, priority, notes, projectName) {
  let currentData = loadData("projects");

  // Searching for the project chosen by its provided name
  const project = currentData.find((p) => p.name === projectName);
  console.log(`Has the project been found in currentData? Here: ${project}`);
  if (!project) {
    console.error(`Project with name "${projectName}" not found!`);
    return;
  }

  // Creating the ID for the new todo and pushing it into the chosen project.
  const numberForId = addToCounter("todoCounter");
  const newTodoId = `t-${numberForId}`;
  const newTodo = new Todo(newTodoId, title, dueDate, priority, notes, false);
  project.todoList.push(newTodo);
  saveData("projects", currentData);
  saveState("state", "dynamic");
  saveState("currentProject", project.name);
  saveState("currentTodos", project.todoList);

  console.log(`New todo added to project "${projectName}":`, newTodo);

  // This was used for debugging but could be useful in some situations
  // const updatedData = loadData('projects');
  // console.log(`Updated data after saving: ${JSON.stringify(updatedData, null, 2)}`);
}
