// todo.js contains the Todo class, its constuctor, and functions to manipulate existing objects.

import { getCompletedTodos, getHighPriorityTodos, getOverdueTodos, getTodosDueThisWeek, getTodosDueToday } from "./functions"
import { loadData, loadState, saveData, loadProject, saveState } from "./storage"
import { updateScreen, getCurrentType, getCurrentProject, getCurrentTodos, renderContent } from "./ui"

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

export function toggleTodoCompleted(todoId) {
    console.log(`Initiated toggleTodoCompleted(${todoId})`)
    // Load variables for use later
    let currentData = loadData('projects');
    let currentState = loadState('state');
    const currentProject = loadState('currentProject');
    let updatedTodos;

    // Find the current todo by its id:
    for (let project of currentData) {
        const todoById = project.todoList.find(todoToChange => todoToChange.id === todoId);
        if (todoById) {
            console.log(todoById);
            // Toggle the completed value, which is Boolean, to its opposite
            todoById.completed = !todoById.completed;
            // Save the updated data
            saveData('projects', currentData);
            // Check current state and filter throught
            if (currentState === 'default') {
                updatedTodos = getOverdueTodos();
            } else if (currentState === 'static') {
                if (currentProject === 'Due Today') {
                    updatedTodos = getTodosDueToday();
                } else if (currentProject === 'Due This Week') {
                    updatedTodos = getTodosDueThisWeek();
                } else if (currentProject === 'Overdue') {
                    updatedTodos = getOverdueTodos();
                } else if (currentProject === 'High Priority') {
                    updatedTodos = getHighPriorityTodos();
                } else if (currentProject === 'Completed') {
                    updatedTodos = getCompletedTodos();
                }
            } else if (currentState === 'dynamic') {
                // No todos needed, will be added in updateScreen
                updatedTodos = [];
            };
             
            // Refresh the content area
            setTimeout(() => updateScreen(currentProject, updatedTodos), 1500);
            return;
        }
    }
    console.error(`Todo with ID ${todoId} cannot be found`);
};

function createTodo(todoCounter) { // Need to work out the counter functions before I can use this.
    // Load data
    // Get todo counter number
    // Add one to it and assign this as ID
    // Add to project using func
    // Save data
}