// Storage.js deals with localStorage, including saving, loading, and handling ID counters

import { Project } from "./project";
import { Todo } from './todo';

// Save projects to localStorage, with a key and its data
export function saveData(key, data) {
    // Convert the data to JSON data, and save it by the key.
    localStorage.setItem(key, JSON.stringify(data));
    console.log('Data saved')
}

// Load projects to localStorage, using a key, and revive the data from JSON data to create 'new' objects
export function loadData(key) {
    console.log(`Initiated loadData(${key})`)
    // Create a temporary variable to load the JSON data into, and load it
    let currentData = JSON.parse(localStorage.getItem(key));
    console.log(`Current data loaded: ${currentData}`);

    // Start mapping the first level of projects, by project name, to revive the data
    return currentData.map(projectToMap => {
        // console.log('Reviving project:', projectToMap);
        // Create a 'new' project, titled with its own name, with a blank array to put its todos back into
        const revivedProject = new Project(projectToMap.id, projectToMap.name, []);
        // console.log(`Successfully re-created project ${revivedProject.name}`);
        
        // Now we need to map each todo and put it into the array, reviving each as we go.
        projectToMap.todoList.forEach(todoToMap => {
            // Create each todo
            let revivedTodo = new Todo(
                // Use original properties
                todoToMap.id,
                todoToMap.title,
                todoToMap.dueDate,
                todoToMap.priority,
                todoToMap.notes,
                todoToMap.completed,
            );
            // console.log(`Successfully re-created todo ${revivedTodo.title}`);
            // Add the revived todo back into the revived project
        revivedProject.addTodo(revivedTodo);
        // console.log(`${revivedTodo.title} added back into ${revivedProject.name}`);
        });
        return revivedProject;
    });
}

export function clearStorage () {
    console.log('Console is about to be cleared!')
    // Clear the console
    console.clear();
    console.log('Console has just been cleared');
}

export function setCounter(key) {
    console.log(`Initialised setCounter(${key}).`)
    // Create a counter variable and set it to 0
    let counter = 0
    // Save the new data as 'counter' using the correct key
    saveData(key, counter);
    console.log(`Counter for ${key} has been setup at 0.`)
    // Return the number - ***Do I need to do this, or is the act of doing it enough?***
    return counter;
}

export function getCounter(key) {
    console.log(`Initited getCounter(${key}).`);
    // Load Todo Counter data into a variable
    const counter = loadData(key);
    // Check the counter exists and is a valid number
    if (counter !== null && !isNaN(counter)) {
        console.log(`Counter is ${counter}.`)
        // If it is, return it
        return counter;
    } else {
        console.log('No Todo Counter exists, so set to 0.')
        // If it isn't create it.
        return setCounter();
    }
}

export function addToCounter(key) {
    console.log(`Initiated addToCounter(${key})`);
    // Load Todo Counter data
    const counter = loadData(key);
    // Increment by 1
    counter++;
    // Save the new data
    saveData(key, counter);
    console.log(`${key} Counter is now ${counter}.`)
    // Return the number - ***Do I need to do this, or is the act of doing it enough?*** I think I need it
    return counter;
}

export function saveCounter(key, counter) {
    saveData(key, counter);
}

// *** Do I need these project counters, or can I just use a generic counter data and set the key when saving/loading? ***
// UPDATE: Moving to generic counters
// function setProjectCounter() {
//     console.log('Initialised setProjectCounter().')
//     // Create a project counter variable and set it to 0
//     let projectCounter = 0
//     // Save the new data as 'projectCounter'
//     saveData('projectCounter', projectCounter);
//     console.log('Project Counter has been setup at 0.')
//     // Return the number - ***Do I need to do this, or is the act of doing it enough?***
//     return projectCounter;
// }

// function getProjectCounter(key) {
//     console.log(`Initited getProjectCounter(${key}).`);
//     // Load Project Counter data into a variable
//     const projectCounter = loadData(key);
//     // Check the counter exists and is a valid number
//     if (projectCounter !== null && !isNaN(projectCounter)) {
//         console.log(`Project Counter is ${projectCounter}.`)
//         // If it is, return it
//         return projectCounter;
//     } else {
//         console.log('No Project Counter exists, so set to 0.')
//         // If it isn't create it.
//         return setProjectCounter();
//     }
// }

// function addProjectCounter(key) {
//     console.log(`Initited addToProjectCounter(${key})`);
//     // Load Project Counter data
//     const projectCounter = loadData(key);
//     // Increment by 1
//     projectCounter++;
//     // Save the new data
//     saveData(key, projectCounter);
//     console.log(`Project Counter is now ${projectCounter}.`)
//     // Return the number - ***Do I need to do this, or is the act of doing it enough?***
//     return projectCounter;
// }



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

window.saveData = saveData;
window.loadData = loadData;