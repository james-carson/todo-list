
// Storage.js deals with localStorage, including saving, loading, and handling ID counters

// Save projects to localStorage, with a key and its data
export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load projects to localStorage, using a key, and revive the data from JSON data to create 'new' objects
export function loadData(key) {
    // Create a temporary variable to load the JSON data into
    // Check for the existence of data and assign an empty array if there isn't any
    // Create a new variable to store the project data and using map create a 'new' Project object...
    // using its ID to populate it along with an empty array where the todos will soon go
    // Within this, do the same with todos, using their ID
    // Add each todo to the relevant project array
    // Return the project object for each loop
}

function clearStorage () {
    // Check for existing data
    // Assign an empty array to the data under the name 'projects'
}

function setTodoCounter() {
    // Create a variable to store the todoCounter
    // Set it to 0
}

function getTodoCounter(key) {
    // Create a variable to store the todoCounter and retrieve it from memory
    // If it doesn't exist, set it
    // Return it
}

function addTodoCounter(key) {
    // Create a variable to store the todoCounter and retrieve it from memory
    // Save it
    // Return it
}

function saveTodoCounter(key, counter) {
    // Save the counter to localStorage using its key
}

function setProjectCounter() {
    // Create a variable to store the projectCounter
    // Set it to 0
}

function getProjectCounter(key) {
    // Create a variable to store the projectCounter and retrieve it from memory
    // If it doesn't exist, set it
    // Return it
}

function addProjectCounter(key) {
    // Create a variable to store the projectCounter and retrieve it from memory
    // Save it
    // Return it
}

function saveTodoCounter(key, counter) {
    // Save the counter to localStorage using its key
}



//  ------------------------------------------------------------------------------------------------------



// import { Projects } from './projects';
// import { Todos } from './todos';

// // Save projects to localStorage, with a key and its data
// export function saveData(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
// }

// export function loadData(key) {
//     // Create a variable, savedProjects, which either parses the data from localStorage,
//     // Or creates an empty array if there isn't any (to avoid a crash)
//     const savedData = JSON.parse(localStorage.getItem(key)) || [];
    
//     // Checks if savedData exists and is an array...
//     if (!Array.isArray(savedData)) {
//     // And if this is true (it's not an array) returns an empty array
//         return []; 
//     }
//     // Maps over the data (in whichever form) and runs a function on each item
//     return savedData.map(loadedProject => {
//         // Creates a new variable, project, and creates a new Project class using the name
//         // to populate it along with an empty array where the todos will go soon.
//         const project = new Projects(loadedProject.name, []);
        
//         // For each of these new projects...
//         loadedProject.todos.forEach(savedTodo => {
//             // Creates a new Todo using the information from the loaded data
//             const todo = new Todos(
//                 savedTodo.id,
//                 savedTodo.title,
//                 savedTodo.dueDate,
//                 savedTodo.priority,
//                 savedTodo.notes,
//                 savedTodo.complete
//             );
//             // Adds the relevant todo to the relevant project
//             project.addTodo(todo);
//         });
//         console.log(project)
//         return project;
//     });
// }
// // ^^This seems to be working at the momet^^

// window.saveData = saveData;
// window.loadData = loadData;