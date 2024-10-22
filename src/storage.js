// Storage.js deals with localStorage, including saving, loading, and handling ID counters

import { Project } from "./project";
import { Todo } from './todo';

// Save projects to localStorage, with a key and its data
export function saveData(key, data) {
    // Convert the data to JSON data, and save it by the key.
    localStorage.setItem(key, JSON.stringify(data));
    console.log('Data saved')
}

// Load projects to localStorage, using a key, and 'revive' the data from JSON data to create 'new' objects
export function loadData(key) {
    console.log(`Initiated loadData(${key})`)
    // Create a temporary variable to load the JSON data into, and load it
    let currentData = JSON.parse(localStorage.getItem(key));
    // console.log(`Current data loaded: ${currentData}`);

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

// Save state is used with two keys: 'state', which saves the current state/view type, and 'currentProject', which is self-explanatory.
// Current todos can also be used
export function saveState(key, state) {
    // Convert the state object to JSON data, and save it by the key.
    localStorage.setItem(key, JSON.stringify(state));
    console.log('State saved')
}

export function loadState(key) {
    console.log(`Initiated loadData(${key})`)
    // Create a temporary variable to load the JSON data into, and load it
    return JSON.parse(localStorage.getItem(key));
}

// Clears local storage. Can be (but isn't currently) used to get rid of the demo data.
export function clearStorage() {
    console.log('Local Storage is about to be cleared!')
    // Clear the console
    localStorage.clear();
    console.log('Local Storage has just been cleared');
}

// Sets a counter if none exists
export function setCounter(key) {
    console.log(`Initialised setCounter(${key}).`)
    // Create a counter variable and set it to 0
    let counter = 0
    // Save the new data as 'counter' using the correct key
    saveCounter(key, counter);
    console.log(`Counter for ${key} has been setup at 0.`)
    // Return the number - ***Do I need to do this, or is the act of doing it enough?***
    return counter;
}

// Gets a counter for ID purposes, usually so that it can be added to for a new ID
export function getCounter(key) {
    console.log(`Initited getCounter(${key}).`);
    // Load Todo Counter data into a variable
    const counter = loadCounter(key);
    // Check the counter exists and is a valid number
    if (counter !== null && !isNaN(counter)) {
        console.log(`Counter is ${counter}.`)
        // If it is, return it
        return counter;
    } else {
        console.log('No Counter exists, so set to 0.')
        // If it isn't create it.
        return setCounter(key);
    }
}

// Adds to a new counter for ID purposes
export function addToCounter(key) {
    console.log(`Initiated addToCounter(${key})`);
    // Load Todo Counter data
    let counter = getCounter(key);
    // Increment by 1
    counter++;
    // Save the new data
    saveCounter(key, counter);
    console.log(`${key} Counter is now ${counter}.`)
    // Return the number
    return counter;
}

export function saveCounter(key, counter) {
    localStorage.setItem(key, JSON.stringify(counter));
}

export function loadCounter(key) {
    console.log(`Initiated loadCounter(${key})`)
    // Create a temporary variable to load the JSON data into, and load it
    return JSON.parse(localStorage.getItem(key));
}