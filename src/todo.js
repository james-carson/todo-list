// todo.js contains the Todo class, its constuctor, and functions to manipulate existing objects.

// Todo class, including a constructor. No methods; functions will be handled separately.
export class Todo {
    constructor(id, title, dueDate, priority, notes, completed) {
        // ID needs to be able to accept input from dummy data
        this.id = id
        // Don't create any until this is sorted!
        this.title = title
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.completed = completed
    }
};

function createTodo(todoCounter) {
    // Load data
    // Get todo counter number
    // Add one to it and assign this as ID
    // Add to project using func
    // Save data
}

function editTodo(todoID) {
    // Load data
    // ID todo by ID
    // Edit todo properties
    // Save data
}

function toggleTodoCompleted(todoID) {
    // Load data
    // ID todo by ID
    // Edit todo properties
    // Save data
}

// TODO: Create relevant functions



//  ------------------------------------------------------------------------------------------------------



// import { saveData } from "./storage"

// // Here we have a class for todos, which constructs new todos and contains methods
// export class Todos {

//     // Todo item constructor:
//     constructor(id, title, dueDate, priority, notes, complete) {
//         // New addition: This gives the todo a unique id so it can be identified when editing:
//         this.id = id || Date.now();
//         this.title = title
//         this.dueDate = dueDate
//         this.priority = priority
//         this.notes = notes
//         this.complete = complete
//     }

//     // Method to edit items: -- SHOULD THIS BE MOVED OUT OF THE CLASS?
//     editTodo(newTitle, newDueDate, newPriority, newNotes) {
//         this.title = newTitle || this.title;
//         this.dueDate = newDueDate || this.dueDate;
//         this.priority = newPriority || this.priority;
//         this.notes = newNotes || this.notes;
//     }
// };

//     // Have moved toggleComplete out of here - now a standalone function rather than a method.