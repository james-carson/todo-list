// project.js contains the Project class, its constuctor, and functions to manipulate existing objects, including todos.

// Project class, including a constructor. No methods; functions will be handled separately.
export class Project {
    // Projects constructor:
    constructor(id, name, todoList) {
        this.id = id
        this.name = name
        // This property contains the todos - it's important to remember that these are arrays
        this.todoList = todoList
    }
}

function addTodo(todoID, ProjectID) {
    // Load data
    // ID todo by ID
    // ID project by ID
    // Push spliced todo to project by ID
    // Save data
}

function deleteTodo(todoID, projectID) {
    // Load data
    // ID todo by ID
    // ID project by ID
    // Splice todo from array
    // Save data
}

function moveTodo(todoID, oldProjectID, newProjectID) {
    // Load data
    // ID todo by ID
    // ID project by ID
    // Splice todo from array
    // Push spliced todo to new project by ID
    // Save data
}

function createProject() {
    // Load data
    // Get project counter
    // Increase it by 1 and assign this as the project's ID
    // Assign a blank array to todoList
    // Save data
}


//  ------------------------------------------------------------------------------------------------------



// // Here we have a class for todos, which constructs new projects (which include todos) and contains methods
// export class Projects {

//     // Constructor for Projects:
//     constructor(name, todos) {
//         this.name = name
//         this.todos = todos
//     }

//     // Add a todo to the project
//     addTodo(todo) {
//         this.todos.push(todo);
//     }

//     // Remove a todo from the project by index or reference
//     removeTodo(todoIndex) {
//         this.todos.splice(todoIndex, 1);
//     }

//     // Get all todos so that they can be viewed
//     getTodos() {
//         return this.todos;
//     }

//     // Get a specific todo by index - Is this useful? Better to sort by dates etc?
//     getTodoByIndex(index) {
//         return this.todos[index];
//     }
// }