import { Todos } from './todos.js';
import { Projects } from './projects.js';
import { saveData, loadData } from './storage.js';

// Sample data for todos in the "Personal Tasks" project
const todos1 = [
    new Todos("Buy groceries", "2024-09-26", "high", "Get milk, bread, eggs, and fruits", false),
    new Todos("Plan birthday party", "2024-09-26", "low", "Send out invitations, book the venue, and order cake", false),
    new Todos("Finish project report", "2024-09-27", "medium", "Complete the draft and send it for review", false),
    new Todos("Book dentist appointment", "2024-09-30", "high", "Teeth cleaning and check-up", false),
    new Todos("Do laundry", "2024-09-29", "low", "Wash and fold clothes", false),
    new Todos("Exercise", "2024-09-27", "medium", "Go for a run or hit the gym", false),
    new Todos("Read a book", "2024-10-02", "medium", "Finish 'The Great Gatsby'", false),
    new Todos("Clean the house", "2024-10-05", "low", "Dust, vacuum, and organize rooms", false),
];

// Sample data for Todoss in the "Work Projects" project
const todos2 = [
    new Todos("Book flight tickets", "2024-09-28", "high", "Look for the cheapest fares and book them", false),
    new Todos("Attend meeting with client", "2024-10-01", "medium", "Prepare the presentation and agenda", false),
    new Todos("Call the plumber", "2024-09-25", "low", "Fix the kitchen sink and bathroom faucet", true),
    new Todos("Update project timeline", "2024-09-29", "medium", "Revise the deadlines based on the team's feedback", false),
    new Todos("Submit budget proposal", "2024-10-03", "high", "Ensure all expenses are included and submitted on time", false),
    new Todos("Conduct team meeting", "2024-10-02", "medium", "Discuss project progress and assign new tasks", false),
    new Todos("Prepare quarterly report", "2024-10-05", "high", "Gather data and analyze performance metrics", false),
    new Todos("Review code changes", "2024-09-30", "medium", "Ensure all changes are compliant with coding standards", false),
];

// Sample data for projects
export const defaultProjects = [
    new Projects("Personal Tasks", todos1),
    new Projects("Work Projects", todos2),
];

// Save projects to storage or localStorage if needed
function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Call this function to initialize projects and todos
function initializeData() {
    const existingProjects = loadData('projects');
    if (!existingProjects) {
        saveProjectsToLocalStorage();
    }
}

// Call initializeData() when your application starts
initializeData();