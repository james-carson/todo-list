// demo-data.js is used for dummy data, which can be used for testing and for demos. Later, this can be used
// ...for a demo mode. functions will be be used to create and export the dummy data

import { Todo } from './todo.js';
import { Project } from './project.js';
import { saveData, loadData } from './storage.js';

// Sample data for todos in the "Personal Tasks" project
const demoTodos1 = [
    new Todo("td-0", "Buy groceries", "2024-10-01", "high", "Get milk, bread, eggs, and fruits", false), // Today
    new Todo("td-1", "Plan birthday party", "2024-09-28", "low", "Send out invitations, book the venue, and order cake", false), // Past
    new Todo("td-2", "Finish project report", "2024-09-30", "medium", "Complete the draft and send it for review", false), // Past
    new Todo("td-3", "Book dentist appointment", "2024-10-02", "high", "Teeth cleaning and check-up", false), // Tomorrow
    new Todo("td-4", "Do laundry", "2024-09-27", "low", "Wash and fold clothes", false), // Past
    new Todo("td-5", "Exercise", "2024-10-01", "medium", "Go for a run or hit the gym", false), // Today
    new Todo("td-6", "Read a book", "2024-10-04", "medium", "Finish 'The Great Gatsby'", false), // Future (2 days)
    new Todo("td-7", "Clean the house", "2024-10-06", "low", "Dust, vacuum, and organize rooms", false), // Future (5 days)
];

// Sample data for todos in the "Work Projects" project
const demoTodos2 = [
    new Todo("td-8", "Book flight tickets", "2024-09-30", "high", "Look for the cheapest fares and book them", false), // Past
    new Todo("td-9", "Attend meeting with client", "2024-10-01", "medium", "Prepare the presentation and agenda", false), // Today
    new Todo("td-10", "Call the plumber", "2024-09-25", "low", "Fix the kitchen sink and bathroom faucet", true), // Past
    new Todo("td-11", "Update project timeline", "2024-10-03", "medium", "Revise the deadlines based on the team's feedback", false), // Future (tomorrow)
    new Todo("td-12", "Submit budget proposal", "2024-10-05", "high", "Ensure all expenses are included and submitted on time", false), // Future (4 days)
    new Todo("td-13", "Conduct team meeting", "2024-10-01", "medium", "Discuss project progress and assign new tasks", false), // Today
    new Todo("td-14", "Prepare quarterly report", "2024-10-08", "high", "Gather data and analyze performance metrics", false), // Future (6 days)
    new Todo("td-16", "Review code changes", "2024-09-30", "medium", "Ensure all changes are compliant with coding standards", false), // Past
];

// // Sample data for projects
export const demoProjects = [
    new Project("pd-0", "Personal Tasks", demoTodos1),
    new Project("pd-1", "Work Projects", demoTodos2),
];

export function setDemoData() {
    saveData('projects', demoProjects);
    console.log(`Demo data saved into localStorage: ${demoProjects}`)
};