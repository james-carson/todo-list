// demo-data.js is used for dummy data, which can be used for testing and for demos. Later, this can be used
// ...for a demo mode. functions will be be used to create and export the dummy data

import { Todos } from './todos.js';
import { Project } from './projects.js';
import { saveData, loadData } from './storage.js';

// Sample data for todos in the "Personal Tasks" project
const demoTodos1 = [
    new Todos("t-0", "Buy groceries", "2024-09-26", "high", "Get milk, bread, eggs, and fruits", false),
    new Todos("t-1", "Plan birthday party", "2024-09-26", "low", "Send out invitations, book the venue, and order cake", false),
    new Todos("t-2", "Finish project report", "2024-09-27", "medium", "Complete the draft and send it for review", false),
    new Todos("t-3", "Book dentist appointment", "2024-09-30", "high", "Teeth cleaning and check-up", false),
    new Todos("t-4", "Do laundry", "2024-09-29", "low", "Wash and fold clothes", false),
    new Todos("t-5", "Exercise", "2024-09-27", "medium", "Go for a run or hit the gym", false),
    new Todos("t-6", "Read a book", "2024-10-02", "medium", "Finish 'The Great Gatsby'", false),
    new Todos("t-7", "Clean the house", "2024-10-05", "low", "Dust, vacuum, and organize rooms", false),
];

// Sample data for todos in the "Work Projects" project
const demoTodos2 = [
    new Todos("t-8", "Book flight tickets", "2024-09-28", "high", "Look for the cheapest fares and book them", false),
    new Todos("t-9", "Attend meeting with client", "2024-10-01", "medium", "Prepare the presentation and agenda", false),
    new Todos("t-10", "Call the plumber", "2024-09-25", "low", "Fix the kitchen sink and bathroom faucet", true),
    new Todos("t-11", "Update project timeline", "2024-09-29", "medium", "Revise the deadlines based on the team's feedback", false),
    new Todos("t-12", "Submit budget proposal", "2024-10-03", "high", "Ensure all expenses are included and submitted on time", false),
    new Todos("t-13", "Conduct team meeting", "2024-10-02", "medium", "Discuss project progress and assign new tasks", false),
    new Todos("t-14", "Prepare quarterly report", "2024-10-05", "high", "Gather data and analyze performance metrics", false),
    new Todos("t-16", "Review code changes", "2024-09-30", "medium", "Ensure all changes are compliant with coding standards", false),
];

// // Sample data for projects
export const demoProjects = [
    new Project("p-0", "Personal Tasks", demoTodos1),
    new Project("p-1", "Work Projects", demoTodos2),
];

export function setDemoData() {
    saveData('projects', demoProjects);
    console.log('Demo data saved into localStorage')
};



//  ------------------------------------------------------------------------------------------------------



// import { Todos } from './todos.js';
// import { Projects } from './projects.js';
// import { saveData, loadData } from './storage.js';

// // Sample data for todos in the "Personal Tasks" project
// const todos1 = [
//     new Todos(1695772800000, "Buy groceries", "2024-09-26", "high", "Get milk, bread, eggs, and fruits", false), // ID: 2024-09-26
//     new Todos(1695772900000, "Plan birthday party", "2024-09-26", "low", "Send out invitations, book the venue, and order cake", false), // ID: 2024-09-26
//     new Todos(1695773000000, "Finish project report", "2024-09-27", "medium", "Complete the draft and send it for review", false), // ID: 2024-09-27
//     new Todos(1696032000000, "Book dentist appointment", "2024-09-30", "high", "Teeth cleaning and check-up", false), // ID: 2024-09-30
//     new Todos(1696032100000, "Do laundry", "2024-09-29", "low", "Wash and fold clothes", false), // ID: 2024-09-29
//     new Todos(1696032200000, "Exercise", "2024-09-27", "medium", "Go for a run or hit the gym", false), // ID: 2024-09-27
//     new Todos(1696118400000, "Read a book", "2024-10-02", "medium", "Finish 'The Great Gatsby'", false), // ID: 2024-10-02
//     new Todos(1696118500000, "Clean the house", "2024-10-05", "low", "Dust, vacuum, and organize rooms", false), // ID: 2024-10-05
// ];

// const todos2 = [
//     new Todos(1696032300000, "Book flight tickets", "2024-09-28", "high", "Look for the cheapest fares and book them", false), // ID: 2024-09-28
//     new Todos(1696118600000, "Attend meeting with client", "2024-10-01", "medium", "Prepare the presentation and agenda", false), // ID: 2024-10-01
//     new Todos(1695686400000, "Call the plumber", "2024-09-25", "low", "Fix the kitchen sink and bathroom faucet", true), // ID: 2024-09-25
//     new Todos(1696032400000, "Update project timeline", "2024-09-29", "medium", "Revise the deadlines based on the team's feedback", false), // ID: 2024-09-29
//     new Todos(1696118700000, "Submit budget proposal", "2024-10-03", "high", "Ensure all expenses are included and submitted on time", false), // ID: 2024-10-03
//     new Todos(1696118800000, "Conduct team meeting", "2024-10-02", "medium", "Discuss project progress and assign new tasks", false), // ID: 2024-10-02
//     new Todos(1696204800000, "Prepare quarterly report", "2024-10-05", "high", "Gather data and analyze performance metrics", false), // ID: 2024-10-05
//     new Todos(1696032500000, "Review code changes", "2024-09-30", "medium", "Ensure all changes are compliant with coding standards", false), // ID: 2024-09-30
// ];




// // Sample data for projects
// export const defaultProjects = [
//     new Projects("Personal Tasks", todos1),
//     new Projects("Work Projects", todos2),
// ];

// // Call this function to initialise projects and todos
// export function initialiseData() {
//     // Create a variable to load the data into:
//     const storedProjects = loadData('projects');
//     // If there is no data
//     if (!storedProjects || storedProjects.length === 0) {
//         saveData('projects', defaultProjects);
//         console.log('No local storage found, so defaultProjects was initialised')
//     // If data exists:
//     } else {
//         console.log('Local storage found and loaded')
//         return storedProjects;
//     }
// }
// // ^^This seems to now be working correctly^^

// window.initialiseData = initialiseData;