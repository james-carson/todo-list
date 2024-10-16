// project.js contains the Project class, its constuctor, and functions to manipulate existing objects, including todos.

import { loadData, saveData } from "./storage"

// Project class, including a constructor.
// Update - adding methods back in fo simplicity of later functions
export class Project {
    // Projects constructor:
    constructor(id, name, todoList = []) {
        this.id = id
        this.name = name
        // This property contains the todos - it's important to remember that this is an array of objects
        this.todoList = todoList
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }

    deleteTodo(todoId) {
        const todoIndex = this.getTodoIndex(todoId);
        // The todoIndex MUST be found before running this:
        this.todoList.splice(todoIndex, 1);
    }

    moveTodo(todoId, oldProject, newProject) {
        // Get the todo's index:
        const todoIndex = oldProject.getTodoIndex(todoId);

        if (todoIndex > -1) {
            // Splice the todo from the old project
            const [todoToMove] = oldProject.todoList.splice(todoIndex, 1);

            // Add the todo to the new project's todoList
            newProject.todoList.push(todoToMove);

            // Simplifying that as it is too complicated and tightly coupled:

            // // Load data
            // currentData = loadData('projects');
            // // ID current project by ID
            // const currentProjectById = currentData.find(project => project.id === oldProject.id);
            // // Check for a match:
            // if (currentProjectById) {
            //     // Find the index of this todo:
            //     const todoIndex = currentProjectById.todoList.findIndex(todo => todo.id === todoId);
            //     // Check that the todo exists by seeing if its index is 0 or higher
            //     if (todoIndex > -1) {
            //         // Splice todo from array into a variable
            //         const [temporaryTodo] = currentProjectById.todoList.splice(todoIndex, 1);
            //         // Find the new Project
            //         const newProjectById = currentData.find(project => project.id === newProject.id);
            //         // Check that the new project exists:
            //         if (newProjectById) {
            //             // Push spliced todo to project by ID
            //             newProjectById.todoList.push(temporaryTodo);
            //             // Save the data
            //             saveData('projects', currentData)
            //             console.log(`Todo with ID ${todoId} moved from project "${oldProject.name}" to "${newProject.name}".`);
            //         } else {
            //             console.error(`New project with ID ${newProject.id} not found.`);
            //         }
            //     } else {
            //         console.error(`Todo with ID ${todoId} not found in the source project "${oldProject.name}".`);
            //     }
            // } else {
            //     console.error(`Source project with ID ${oldProject.id} not found.`);
            // }
        };
    };

    getProjectTodoList() {
        // Get all todos from this project
        return this.todoList;
    }

    getTodoIndex(todoId) {
        return this.todoList.findIndex(todo => todo.id === todoId);
    }

    // Necessary?
    getTodoList() {
        return this.todoList;
    }

};