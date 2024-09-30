import { loadData, saveData } from './storage';
import { isToday, isThisWeek } from 'date-fns';
import { Todos } from './todos';
import { Projects } from './projects';

// Filter lists by date (and uncompleted)
export function getTodosDueToday() {
    const todos = loadData('projects') || [];
    return todos.filter(todo => {
        // Convert dueDate to Date object:
        const dueDate = new Date(todo.dueDate);
        // Check if the todo is due today and is also uncompleted:
        return isToday(dueDate) && !todo.complete;
    });
}

// Filter lists for high priority (and uncompleted)
export function getHighPriority() {
    const todos = loadData('projects') || [];
    return todos.filter(todo => todo.priority === 'High' && !todo.complete);
}

// Same as above, but with this week rather than today:
export function getTodosDueThisWeek() {
    const todos = loadData('projects') || [];
    return todos.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return isThisWeek(dueDate) && !todo.complete;
    });
}

// Filter for completed:
export function getCompletedTodos() {
    const todos = loadData('projects') || [];
    return todos.filter(todo => todo.complete);
}

// Get names of all lists
export function getProjectNames() {
    const projects = loadData('projects') || [];
    return projects.map(project => project.name);
}

// Render all in order
export function getUncompletedByDueDate() {
    const todos = loadData('projects') || [];
    return todos
        // Filter for incomplete:
        .filter(todo => !todo.complete)
        // Sort by due date
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

// Logic for rendering project list on sidebar:
export function appendProjectNames() {
    const projectList = document.getElementById('project_list');
    projectList.textContent = '';
    const projects = getProjectNames();

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.textContent = project.name;
        projectItem.classList.add('project_name');
        // Adding event listener to listen for clicks here:
        projectItem.addEventListener('click', () => {
            renderTodos(project);
        });
        projectList.appendChild(projectItem);
    });
};

// Logic for displaying todos on content
export function renderTodos(project) {
    // Clear the content div:
    const content = document.getElementById('content');
    content.textContent = '';

    // Add a project title:
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project.name;
    content.appendChild(projectTitle);

    project.getTodos().forEach(todo => {
        // Create a div for each todo:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo_div');  // Class for CSS grid styling

        // Create a checkbox for completion:
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // This explains what to happen when checked:
        checkbox.checked = todo.complete;
        checkbox.addEventListener('change', () => {
            todo.toggleComplete();
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