// demo-data.js is used for dummy data, which can be used for testing and for demos. Later, this can be used
// ...for a demo mode. functions will be be used to create and export the dummy data

import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { saveData, saveState } from "./storage.js";
import { format, addDays, startOfToday } from "date-fns";

// Sample data for todos in the "Personal Tasks" project, using today to ensure there is always something there.
const today = startOfToday();

const demoTodos1 = [
  new Todo(
    "td-0",
    "Buy groceries",
    format(today, "yyyy-MM-dd"),
    "high",
    "Get milk, bread, eggs, and fruits",
    false,
  ), // Today
  new Todo(
    "td-1",
    "Plan birthday party",
    format(addDays(today, -7), "yyyy-MM-dd"),
    "low",
    "Send out invitations, book the venue, and order cake",
    false,
  ), // Overdue
  new Todo(
    "td-2",
    "Finish project report",
    format(addDays(today, -3), "yyyy-MM-dd"),
    "medium",
    "Complete the draft and send it for review",
    false,
  ), // Overdue
  new Todo(
    "td-3",
    "Book dentist appointment",
    format(today, "yyyy-MM-dd"),
    "high",
    "Teeth cleaning and check-up",
    false,
  ), // Today
  new Todo(
    "td-4",
    "Do laundry",
    format(addDays(today, -10), "yyyy-MM-dd"),
    "low",
    "Wash and fold clothes",
    false,
  ), // Overdue
  new Todo(
    "td-5",
    "Exercise",
    format(today, "yyyy-MM-dd"),
    "medium",
    "Go for a run or hit the gym",
    false,
  ), // Today
  new Todo(
    "td-6",
    "Read a book",
    format(addDays(today, 3), "yyyy-MM-dd"),
    "medium",
    "Finish 'The Great Gatsby'",
    false,
  ), // This week
  new Todo(
    "td-7",
    "Clean the house",
    format(addDays(today, 6), "yyyy-MM-dd"),
    "low",
    "Dust, vacuum, and organize rooms",
    false,
  ), // This week
];

const demoTodos2 = [
  new Todo(
    "td-8",
    "Book flight tickets",
    format(addDays(today, -5), "yyyy-MM-dd"),
    "high",
    "Look for the cheapest fares and book them",
    false,
  ), // Overdue
  new Todo(
    "td-9",
    "Attend meeting with client",
    format(today, "yyyy-MM-dd"),
    "medium",
    "Prepare the presentation and agenda",
    false,
  ), // Today
  new Todo(
    "td-10",
    "Call the plumber",
    format(addDays(today, -20), "yyyy-MM-dd"),
    "low",
    "Fix the kitchen sink and bathroom faucet",
    true,
  ), // Overdue
  new Todo(
    "td-11",
    "Update project timeline",
    format(today, "yyyy-MM-dd"),
    "medium",
    "Revise the deadlines based on the team's feedback",
    false,
  ), // Today
  new Todo(
    "td-12",
    "Submit budget proposal",
    format(addDays(today, 5), "yyyy-MM-dd"),
    "high",
    "Ensure all expenses are included and submitted on time",
    false,
  ), // This week
  new Todo(
    "td-13",
    "Conduct team meeting",
    format(addDays(today, 2), "yyyy-MM-dd"),
    "medium",
    "Discuss project progress and assign new tasks",
    false,
  ), // This week
  new Todo(
    "td-14",
    "Prepare quarterly report",
    format(addDays(today, 7), "yyyy-MM-dd"),
    "high",
    "Gather data and analyze performance metrics",
    false,
  ), // This week
  new Todo(
    "td-16",
    "Review code changes",
    format(addDays(today, -2), "yyyy-MM-dd"),
    "medium",
    "Ensure all changes are compliant with coding standards",
    false,
  ), // Overdue
];

// // Sample data for projects
export const demoProjects = [
  new Project("pd-0", "Personal Tasks", demoTodos1),
  new Project("pd-1", "Work Projects", demoTodos2),
];

// This function simply saves the above demo data in storage, and saves the state as default so that the default view is loaded afterwards
export function setDemoData() {
  saveData("projects", demoProjects);
  saveState("state", "default");
  console.log(`Demo data saved into localStorage: ${demoProjects}`);
}
