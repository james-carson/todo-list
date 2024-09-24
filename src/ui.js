import { loadData, saveData } from './storage';
import { Todo } from './todo';
import { Projects } from './project';
import { isToday, isThisWeek } from 'date-fns';

// Filter lists by date (and uncompleted)

function getTodosDueToday(todos) {
    return todos.filter(todo => {
        // Convert dueDate to Date object:
        const dueDate = new Date(todo.dueDate);
        // Check if the todo is due today and is also uncompleted:
        return isToday(dueDate) && !todo.completed;
    });
}

// Filter lists for high priority (and uncompleted)

// Same as above, but with this week rather than today:
function getTodosDueThisWeek(todos) {
    return todos.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return isThisWeek(dueDate) && !todo.completed;
    });
}

// Filter for completed

function getCompletedTodos(todos) {
    return todos.filter(todo => todo.complete);
}

// Get names of all lists

function getProjectNames(projects) {
    return projects.map(project => project.name);
}

// Render all in order


// Add event listeners for clicks



// Logic for displaying todos on content