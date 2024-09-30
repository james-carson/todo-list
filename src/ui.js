import { loadData, saveData } from './storage';
// Are these 2 necessary if loadData is being used?
import { Todo } from './todo';
import { Projects } from './project';

import { isToday, isThisWeek } from 'date-fns';

// Filter lists by date (and uncompleted)
function getTodosDueToday() {
    const todos = loadData('todos') || [];
    return todos.filter(todo => {
        // Convert dueDate to Date object:
        const dueDate = new Date(todo.dueDate);
        // Check if the todo is due today and is also uncompleted:
        return isToday(dueDate) && !todo.completed;
    });
}

// Filter lists for high priority (and uncompleted)
function getHighPriority() {
    const todos = loadData('todos') || [];
    return todos.filter(todo => todo.priority === 'High' && !todo.complete);
}

// Same as above, but with this week rather than today:
function getTodosDueThisWeek() {
    const todos = loadData('todos') || [];
    return todos.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return isThisWeek(dueDate) && !todo.completed;
    });
}

// Filter for completed:
function getCompletedTodos() {
    const todos = loadData('todos') || [];
    return todos.filter(todo => todo.complete);
}

// Get names of all lists
function getProjectNames() {
    const projects = loadData('projects') || [];
    return projects.map(project => project.name);
}

// Render all in order
function getUncompletedByDueDate() {
    const todos = loadData('todos') || [];
    return todos
        // Filter for incomplete:
        .filter(todo => !todo.complete)
        // Sort by due date
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

// Add event listener for clicks for Due Today:
const dueTodayButton = document.getElementById('due_today');
dueTodayButton.addEventListener('click', () => {
    const dueTodayTodos = getTodosDueToday();
    renderTodos(dueTodayTodos, 'Due Today');
});

// Add event listener for clicks for This Week:
const dueThisWeekButton = document.getElementById('due_this_week');
dueThisWeekButton.addEventListener('click', () => {
    const dueThisWeekTodos = getTodosDueThisWeek();
    renderTodos(dueThisWeekTodos, 'Due This Week');
});

// Add event listener for clicks for High Priority:
const highPriorityButton = document.getElementById('high_priority');
highPriorityButton.addEventListener('click', () => {
    const highPriorityTodos = getHighPriority();
    renderTodos(highPriorityTodos, 'High Priority');
});

// Add event listener for clicks for Completed:
const completedButton = document.getElementById('completed_list');
completedButton.addEventListener('click', () => {
    const completedTodos = getCompletedTodos();
    renderTodos(completedTodos, 'Completed');
});

// Logic for rendering project list on sidebar:
const projectList = document.getElementById('project_list');

function appendProjectNames() {
    projectList.textContent = '';
    const projectNames = getProjectNames();

    projectNames.forEach(projectName => {
        const projectItem = document.createElement('div');
        projectItem.textContent = projectName;
        projectItem.classList.add('project_name');
        projectList.appendChild(projectItem);
    });
};

// Event listener to append the Project Names:
document.addEventListener('DOMContentLoaded', () => {
    appendProjectNames();
});

// Logic for displaying todos on content
function renderTodos(todos, projectName) {
    // Clear the content div:
    const content = getElementById('content');
    content.TextContent = '';

    // Add a project title:
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = projectName;
    content.appendChild(projectTitle);

    todos.forEach(todo => {
        // Create a div for each todo:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo_div');  // Class for CSS grid styling

        // Create a checkbox for completion:
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // This explains what to happen when checked:
        checkbox.checked = todo.complete;
        checkbox.addEventListener('change', () => {
            todo.complete = checkbox.checked;
            // This part saves the data to storage.js using the imported function: 
            saveData();
            //    Removes todo when checked after 2 seconds:
            if (todo.complete) {
                setTimeout(() => {
                    todoDiv.remove();
                }, 2000);
            }
        });
        todoDiv.appendChild(checkbox);

        // Add the title of the todo - Will I need this? ***:
        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo_title');
        todoTitle.textContent = todo.title;
        todoDiv.appendChild(todoTitle);

        // Add the due date:
        const dueDate = document.createElement('div');
        dueDate.classList.add('todo_due_date');
        dueDate.textContent = `Due: ${todo.dueDate}`;
        todoDiv.appendChild(dueDate);

        // Add the priority:
        const priority = document.createElement('div');
        priority.classList.add('todo_priority');
        priority.textContent = `Priority: ${todo.priority}`;
        todoDiv.appendChild(priority);

        // Append the completed todo div to the content area:
        content.appendChild(todoDiv);
    });
}