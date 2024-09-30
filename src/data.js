import { Todo } from './todo';
import { Projects } from './project';

// Sample data for todos in the "Personal Tasks" project
const todos1 = [
    new Todo("Buy groceries", "2024-09-26", "high", "Get milk, bread, eggs, and fruits", false),
    new Todo("Plan birthday party", "2024-09-26", "low", "Send out invitations, book the venue, and order cake", false),
    new Todo("Finish project report", "2024-09-27", "medium", "Complete the draft and send it for review", false),
    new Todo("Book dentist appointment", "2024-09-30", "high", "Teeth cleaning and check-up", false),
    new Todo("Do laundry", "2024-09-29", "low", "Wash and fold clothes", false),
    new Todo("Exercise", "2024-09-27", "medium", "Go for a run or hit the gym", false),
    new Todo("Read a book", "2024-10-02", "medium", "Finish 'The Great Gatsby'", false),
    new Todo("Clean the house", "2024-10-05", "low", "Dust, vacuum, and organize rooms", false),
];

// Sample data for todos in the "Work Projects" project
const todos2 = [
    new Todo("Book flight tickets", "2024-09-28", "high", "Look for the cheapest fares and book them", false),
    new Todo("Attend meeting with client", "2024-10-01", "medium", "Prepare the presentation and agenda", false),
    new Todo("Call the plumber", "2024-09-25", "low", "Fix the kitchen sink and bathroom faucet", true),
    new Todo("Update project timeline", "2024-09-29", "medium", "Revise the deadlines based on the team’s feedback", false),
    new Todo("Submit budget proposal", "2024-10-03", "high", "Ensure all expenses are included and submitted on time", false),
    new Todo("Conduct team meeting", "2024-10-02", "medium", "Discuss project progress and assign new tasks", false),
    new Todo("Prepare quarterly report", "2024-10-05", "high", "Gather data and analyze performance metrics", false),
    new Todo("Review code changes", "2024-09-30", "medium", "Ensure all changes are compliant with coding standards", false),
];

// Sample data for projects
const projects = [
    new Projects("Personal Tasks", todos1),
    new Projects("Work Projects", todos2),
];

// Save projects to storage or localStorage if needed
function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Call this function to initialize projects and todos
function initializeData() {
    saveProjectsToLocalStorage();
}

// Call initializeData() when your application starts
initializeData();
