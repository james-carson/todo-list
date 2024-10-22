// functions.js will house the main functions that will help the app to run, and that are not associated
// ...with the UI, dummy data, or initialisation from the 'main' file

import { isToday, isThisWeek } from "date-fns";
import {
  loadData,
} from "./storage";

export function getAllTodos() {
  console.log("Initiated getAllTodos()");
  // Load Data into a variable, loadedData
  const loadedData = loadData("projects");
  // Create a variable, allTodos, made from taking the projects object, which is
  // now an array, and maps (performs a function on every item of the array), in this
  // case (project => project.todoList). This simply gets all the todos
  // from each of the projects. It then flattens this array, which results in a flat array of
  // all of the todos from every project.
  const allTodos = loadedData.flatMap((project) => project.todoList);

  // Return the todos for use
  return allTodos;
}

export function getTodosDueToday() {
  console.log("Initiated getTodosDueToday()");
  // Load Data in getAllTodos and assign to a variable
  const allTodos = getAllTodos();
  // This list is then filtered by...
  return allTodos.filter((todo) => {
    // Converting dueDate to a Date object...
    const dueDate = new Date(todo.dueDate);
    // and checking if the todo is due today and is also uncompleted, then
    // returning those that match
    return isToday(dueDate) && !todo.complete;
  });
}

export function getOverdueTodos() {
  console.log("Initiated getOverdueTodos()");
  // Load Data in getAllTodos and assign to a variable
  const allTodos = getAllTodos();
  // This list is then filtered by...
  return allTodos.filter((todo) => {
    // Converting dueDate to a Date object...
    const dueDate = new Date(todo.dueDate);
    // and checking if the todo is due before today and is also uncompleted, then
    // returning those that match
    return dueDate < new Date() && !todo.completed;
  });
}

export function getTodosDueThisWeek() {
  console.log("Initiated getTodosDueThisWeek()");
  // Load Data in getAllTodos and assign to a variable
  const allTodos = getAllTodos();
  // This list is then filtered by...
  return allTodos.filter((todo) => {
    // Converting dueDate to a Date object...
    const dueDate = new Date(todo.dueDate);
    // and checking if the todo is due today and is also uncompleted, then
    // returning those that match
    return isThisWeek(dueDate) && !todo.completed;
  });
}

export function getHighPriorityTodos() {
  console.log("Initiated getHighPriorityTodos()");
  // Load Data in getAllTodos and assign to a variable
  const allTodos = getAllTodos();
  // This list is then filtered by high priority and incomplete, then returned
  return allTodos.filter((todo) => todo.priority === "high" && !todo.completed);
}

export function getCompletedTodos() {
  console.log("Initiated getCompletedTodos()");
  // Load Data
  const allTodos = getAllTodos();
  // This list is then filtered by completed status
  return allTodos.filter((todo) => todo.completed);
}

export function getTodosForSpecificProject(projectName) {
  // Note - this does not filter for incomplete todos:
  console.log(`Initiated getTodosForSpecificProject(${projectName})`);
  // Load Data
  const loadedData = loadData("projects");
  // Find the project by its name
  const projectByName = loadedData.find(
    (project) => project.name === projectName,
  );

  // If it's found...
  if (projectByName) {
    // Return the specific list if found
    return projectByName.todoList;
  } else {
    console.error(`Project with name "${projectName}" not found.`);
    return [];
  }
}

export function getAllProjectNames() {
  console.log("Initiated getAllProjectNames()");
  // Load Data
  const loadedData = loadData("projects");
  // Create variable that will contain all project names
  const allNames = loadedData.map((project) => project.name);
  // Return it
  return allNames;
}
