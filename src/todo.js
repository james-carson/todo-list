// todo.js contains the Todo class, its constuctor, and functions to manipulate existing objects.

import { loadData, saveData } from "./storage"
import { refreshContent } from "./ui"

// Todo class, including a constructor. No methods; functions will be handled separately.
// Update - adding methods back in fo simplicity of later functions
export class Todo {
    constructor(id, title, dueDate, priority, notes, completed = 'false') {
        // ID needs to be able to accept input from dummy data
        this.id = id
        // Don't create any until this is sorted!
        this.title = title
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.completed = completed
    }

    editTodo(newTitle, newDueDate, newPriority, newNotes) {
        // Updates each todo property to the new provided value, or defaults to the original if none provided.
        // ID not necessary as this is unique and shoul not/cannot be changed
        this.title = newTitle || this.title;
        this.dueDate = newDueDate || this.dueDate;
        this.priority = newPriority || this.priority;
        this.notes = newNotes || this.notes
        // No need for completed as this will be handled separately
    }

};

// Moved from a method to a function for simplicity
export function toggleTodoCompleted(todoId) {
    console.log(`Initiated toggleTodoCompleted(${todoId})`)
    // Load current data
    let currentData = loadData('projects');
    // console.log(`Current data loaded: ${JSON.stringify(currentData)}`);

    // Find the current todo by its id:
    // console.log('Initiating loop to find todo')
    for (let project of currentData) {
        const todoById = project.todoList.find(todoToChange => todoToChange.id === todoId);
        if (todoById) {
            // console.log(`${JSON.stringify(todoById)} found in project: ${JSON.stringify(project)}`)
            // Toggle the completed value, which is Boolean, to its opposite
            todoById.completed = !todoById.completed;
            // console.log(`${JSON.stringify(todoById)} completed status is now ${todoById.completed}`)
            // Save the updated data
            saveData('projects', currentData);
            console.log(`Todo with ID ${todoId} has been updated.`);



            // Refresh the content area
            refreshContent();

            // THIS IS WHERE I AM AT THE MOMENT - REFRESH CONTENT NEEDS TO KEEP TRACK OF MORE, SUCH AS PROJECT TYPE!



            return;
        } else {
            console.log(`Todo with ID ${todoId} cannot be found`);
        }
    }
};

function createTodo(todoCounter) { // Need to work out the counter functions before I can use this.
    // Load data
    // Get todo counter number
    // Add one to it and assign this as ID
    // Add to project using func
    // Save data
}

window.toggleTodoCompleted = toggleTodoCompleted;