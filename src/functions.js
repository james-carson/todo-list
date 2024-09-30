import { loadData, saveData } from './storage';
import { isToday, isThisWeek } from 'date-fns';
import { Todos } from './todos';
import { Projects } from './projects';

// Filter lists by date (and uncompleted)
export function getTodosDueToday() {
    console.log('running getTodosDueToday()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.todos || []);
    return todos.filter(todo => {
        // Convert dueDate to Date object:
        const dueDate = new Date(todo.dueDate);
        // Check if the todo is due today and is also uncompleted:
        return isToday(dueDate) && !todo.complete;
    });
}

// Same as above, but with this week rather than today:
export function getTodosDueThisWeek() {
    console.log('running getTodosDueThisWeek()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.todos || []);
    return todos.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return isThisWeek(dueDate) && !todo.complete;
    });
}

// Filter lists for high priority (and uncompleted)
export function getHighPriority() {
    console.log('running getHighPriority()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.todos || []);
    return todos.filter(todo => todo.priority === 'high' && !todo.complete);
}

// Filter for completed:
export function getCompletedTodos() {
    console.log('running getCompletedTodos()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.todos || []);
    return todos.filter(todo => todo.complete);
}

// Get names of all lists
export function getProjectNames() {
    console.log('running getProjectNames()')
    const projects = loadData('projects') || [];
    console.log(`Here is the data: ${projects}`)
    return projects;
}

// Render all in order
export function getUncompletedByDueDate() {
    console.log('running getUncompletedByDueDate()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.todos || []);
    return todos
        .filter(todo => !todo.complete)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

// Logic for rendering project list on sidebar:
export function appendProjectNames() {
    console.log('running appendProjectNames()')
    const projectList = document.getElementById('project_list');
    projectList.textContent = '';
    const projects = loadData('projects') || [];

    projects.forEach(project => {
        const projectItem = document.createElement('h3');
        projectItem.textContent = project.name;
        console.log(`The name of this project is ${project.name}`)
        projectItem.classList.add('project_name');
        // Adding event listener to listen for clicks here:
        projectItem.addEventListener('click', () => {
            renderDynamicTodos(project, project.name);
        });
        projectList.appendChild(projectItem);
    });
};

// Static render version:
export function renderStaticTodos(todos, title) {
    console.log('running renderStaticTodos(project)')
    // Clear the content div:
    const content = document.getElementById('content');
    content.textContent = '';

    // Add a project title:
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = title;
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
};

// Dynamic render version:
export function renderDynamicTodos(project, title = '') {
    console.log('running renderDynamicTodos');

    // Clear the content div:
    const content = document.getElementById('content');
    content.textContent = '';

    // Add a project title:
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = title;
    content.appendChild(projectTitle);

    // Get todos from the project:
    const todos = project.getTodos();

    // Loop through the todos and render them:
    todos.forEach(todo => {
        // Create a div for each todo:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo_div');  // Class for CSS grid styling

        // Create a checkbox for completion:
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;
        checkbox.addEventListener('change', () => {
            todo.toggleComplete();
            saveData();  // Save the data after toggling
            if (todo.complete) {
                setTimeout(() => {
                    todoDiv.remove();
                }, 2000);
            }
        });
        todoDiv.appendChild(checkbox);

        // Add the title of the todo:
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

        // Append the todo div to the content area:
        content.appendChild(todoDiv);
    });
}

// Logic for displaying todos on content
// export function renderTodos(input, title = '') {
//     console.log('running renderTodos(project)')
//     // Clear the content div:
//     const content = document.getElementById('content');
//     content.textContent = '';

//     // Add a project title:
//     const projectTitle = document.createElement('h2');
//     projectTitle.textContent = title || input.name;
//     content.appendChild(projectTitle);

//     // Get todos from a project or directly if input is an array:
//     let todos;
//     if (Array.isArray(input)) {
//         todos = input;  // Input is already an array of todos
//     } else if (input && typeof input.getTodos === 'function') {
//         todos = input.getTodos();  // Input is a project object
//     } else {
//         console.error('Invalid input passed to renderTodos:', input);
//         return;  // Exit early if input is invalid
//     }

//     todos.forEach(todo => {
//         // Create a div for each todo:
//         const todoDiv = document.createElement('div');
//         todoDiv.classList.add('todo_div');  // Class for CSS grid styling

//         // Create a checkbox for completion:
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         // This explains what to happen when checked:
//         checkbox.checked = todo.complete;
//         checkbox.addEventListener('change', () => {
//             todo.toggleComplete();
//             // This part saves the data to storage.js using the imported function: 
//             saveData();
//             //    Removes todo when checked after 2 seconds:
//             if (todo.complete) {
//                 setTimeout(() => {
//                     todoDiv.remove();
//                 }, 2000);
//             }
//         });
//         todoDiv.appendChild(checkbox);

//         // Add the title of the todo - Will I need this? ***:
//         const todoTitle = document.createElement('div');
//         todoTitle.classList.add('todo_title');
//         todoTitle.textContent = todo.title;
//         todoDiv.appendChild(todoTitle);

//         // Add the due date:
//         const dueDate = document.createElement('div');
//         dueDate.classList.add('todo_due_date');
//         dueDate.textContent = `Due: ${todo.dueDate}`;
//         todoDiv.appendChild(dueDate);

//         // Add the priority:
//         const priority = document.createElement('div');
//         priority.classList.add('todo_priority');
//         priority.textContent = `Priority: ${todo.priority}`;
//         todoDiv.appendChild(priority);

//         // Append the completed todo div to the content area:
//         content.appendChild(todoDiv);
//     });
// }

window.getTodosDueToday = getTodosDueToday;
window.getTodosDueThisWeek = getTodosDueThisWeek;
window.getHighPriority = getHighPriority;
window.getCompletedTodos = getCompletedTodos;
window.getProjectNames = getProjectNames;
window.getUncompletedByDueDate = getUncompletedByDueDate;
window.appendProjectNames = appendProjectNames;
window.renderTodos = renderTodos;