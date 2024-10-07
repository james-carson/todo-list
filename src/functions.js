// functions.js will house the main functions that will help the app to run, and that are not associated
// ...with the UI, dummy data, or initialisation from the 'main' file

import { Project } from "./project";
import { saveData, loadData, setCounter, getCounter, addToCounter } from "./storage"

// Completed:
function getAllTodos() {
    console.log('Initiated getAllTodos()')
    // Load Data into a variable, loadedData
    const loadedData = loadData('projects');
    // Create a variable, allTodos, made from taking the projects object, which is
    // now an array, and maps (performs a function on every item of the array), in this
    // case (project => project.todoList). This simply gets all the todos
    // from each of the projects. It then flattens this array, which results in a flat array of
    // all of the todos from every project.
    const allTodos = loadedData.flatMap(project => project.todoList);
    console.log('Finished running getAllTodos()')
    return allTodos
}

function getTodosDueToday() {
    console.log('Initiated getTodosDueToday()')
    // Load Data in getAllTodos and assign to a variable
    const allTodos = getAllTodos();
    // This list is then filtered by...
    return allTodos.filter(todo => {
        // Converting dueDate to a Date object...
        const dueDate = new Date(todo.dueDate);
        // and checking if the todo is due today and is also uncompleted, then
        // returning those that match
        return isToday(dueDate) && !todo.complete;
    });
};

function getOverdueTodos() {
    console.log('Initiated getOverdueTodos()')
    // Load Data in getAllTodos and assign to a variable
    const allTodos = getAllTodos();
    // This list is then filtered by...
    return allTodos.filter(todo => {
        // Converting dueDate to a Date object...
        const dueDate = new Date(todo.dueDate);
        // and checking if the todo is due before today and is also uncompleted, then
        // returning those that match
        return dueDate < new Date() && !todo.complete;
    });
    console.log('Finished running getOverdueTodos()')
}

function getTodosDueThisWeek() {
    console.log('Initiated getTodosDueThisWeek()')
    
    console.log('Finished running getTodosDueThisWeek()')
}

function getHighPriorityTodos() {
    console.log('Initiated getHighPriorityTodos()')
    // Load Data
    const loadedData = loadData('projects');
    console.log('Finished running getHighPriorityTodos()')
}

function getCompletedTodos() {
    console.log('Initiated getCompletedTodos()')
    // Load Data
    const loadedData = loadData('projects');
    console.log('Finished running getCompletedTodos()')
}

// Is this necessary? Or just use the method?
// function getTodosForSpecificProject(projectName) {
//     console.log(`Initiated getTodosForSpecificProject(${projectName})`)
//     // Load Data
//     const loadedData = loadData('projects');
//     console.log('Finished running getTodosForSpecificProject(${projectName}')
// }

function getAllProjectNames() {
    console.log('Initiated getAllProjectNames()');
    // Load Data
    const loadedData = loadData('projects');
    // Create variable that will contain all project names
    const allNames = loadedData.map(project => project.name);
    console.log('Finished running getAllProjectNames()', allNames)
    return allNames;
    // Return it

}

function getNextId(type) {
    return addToCounter(type);
}

function createProject(name) {
    const newProject = new Project(getNextId('project'), name, [])
    return newProject;
}



//  ------------------------------------------------------------------------------------------------------



// import { loadData, saveData } from './storage';
// import { isToday, isThisWeek } from 'date-fns';
// import { Todos } from './todos';
// import { Projects } from './projects';
// import flagImage from './images/flag.svg';
// import { appendProjectNames } from './ui.js'


// // Filter lists by date (and uncompleted):
// // Export the function to be used elsewhere
// export function getTodosDueToday() {
//     // Console log for testing
//     console.log('running getTodosDueToday()')
//     // Create a variable, projects, which is populated with loaded data from localStorage
//     const projects = loadData('projects') || [];
//     // Create a variable, projects, made from taking the projects object, which is
//     // now an array, and maps (performs a function on every item of the array), in this
//     // case the getTodos method (returns this.todos) within the Project class. This simply gets all the todos
//     // from each of the projects. It then flattens this array, which results in a list of
//     // all of the todos from every project.
//     const todos = projects.flatMap(project => project.getTodos() || []);
//     // This list is then filtered by...
//     return todos.filter(todo => {
//         // Converting dueDate to a Date object...
//         const dueDate = new Date(todo.dueDate);
//         // and checking if the todo is due today and is also uncompleted, then
//         // returning those that match
//         return isToday(dueDate) && !todo.complete;
//     });
// }

// // Same as above, but with this week rather than today:
// export function getTodosDueThisWeek() {
//     console.log('running getTodosDueThisWeek()')
//     const projects = loadData('projects') || [];
//     const todos = projects.flatMap(project => project.getTodos() || []);
//     return todos.filter(todo => {
//         const dueDate = new Date(todo.dueDate);
//         return isThisWeek(dueDate) && !todo.complete;
//     });
// }

// // Filter lists for high priority (and uncompleted)
// export function getHighPriority() {
//     console.log('running getHighPriority()')
//     const projects = loadData('projects') || [];
//     const todos = projects.flatMap(project => project.getTodos() || []);
//     return todos.filter(todo => todo.priority === 'high' && !todo.complete);
// }

// // Filter for completed:
// export function getCompletedTodos() {
//     console.log('running getCompletedTodos()')
//     const projects = loadData('projects') || [];
//     const todos = projects.flatMap(project => project.getTodos() || []);
//     return todos.filter(todo => todo.complete);
// }

// // Get names of all lists
// export function getProjectNames() {
//     console.log('running getProjectNames()')
//     const projects = loadData('projects') || [];
//     console.log(`Here is the data: ${projects}`)
//     return projects;
// }

// // Render all in order
// export function getUncompletedByDueDate() {
//     console.log('running getUncompletedByDueDate()')
//     const projects = loadData('projects') || [];
//     const todos = projects.flatMap(project => project.getTodos() || []);
//     return todos
//         .filter(todo => !todo.complete)
//         .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
// };

// // Render todos onto content - must be passed a list of todos, not a project:
// export function renderTodos(todos, title = '') {
//     console.log(`running renderTodos(${todos}, ${title}`)

//     // Clear the content div:
//     const content = document.getElementById('content');
//     content.textContent = '';

//     // Add a project title:
//     const projectTitle = document.createElement('h2');
//     projectTitle.textContent = title;
//     projectTitle.classList.add('project_title');
//     content.appendChild(projectTitle);

//     // Loop through the todos and render them:
//     todos.forEach(todo => {
//         // Create a div for each todo:
//         const todoDiv = document.createElement('div');
//         todoDiv.classList.add('todo_div');  // Class for CSS grid styling

//         // Create a checkbox for completion:
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         // This explains what to happen when checked:
//         checkbox.checked = todo.complete;

//         // Adding an event listener that saves the change
//         checkbox.addEventListener('click', () => {
//             // let currentProjects = loadData('projects')
//             toggleComplete(todo.id);
//         });
//         todoDiv.appendChild(checkbox);

//         // Add a grid for layout purposes:
//         const todoGrid = document.createElement('div');
//         todoGrid.classList.add('todo_grid');
//         todoDiv.appendChild(todoGrid);

//         // Add the title of the todo:
//         const todoTitle = document.createElement('div');
//         todoTitle.classList.add('todo_title');
//         todoTitle.textContent = todo.title;
//         todoGrid.appendChild(todoTitle);

//         // Add the due date:
//         const dueDate = document.createElement('div');
//         dueDate.classList.add('todo_due_date');
//         dueDate.textContent = `Due: ${todo.dueDate}`;
//         todoGrid.appendChild(dueDate);

//         // Add the priority:
//         const priority = document.createElement('div');
//         // If the priority is high, add the class 'todo_priority_high'
//         if (todo.priority === 'high') {
//             priority.classList.add('todo_priority_high');
//         // Or, if it's medium, add 'todo_priority_medium'
//         } else if (todo.priority === 'medium') {
//             priority.classList.add('todo_priority_medium');
//         // Or, if it's low, add 'todo_priority_low'
//         } else {
//             priority.classList.add('todo_priority_low');
//         }
//         todoGrid.appendChild(priority);

//         const priority_flag = document.createElement('img');
//         priority_flag.src = flagImage
//         priority_flag.classList.add('priority_flag');
//         priority.appendChild(priority_flag)

//         // Add an edit button - NOT FUNCTIONAL YET!
//         const editTodo = document.createElement('div');
//         editTodo.classList.add('todo_edit');
//         editTodo.textContent = 'Edit'
//         todoGrid.appendChild(editTodo);

//         // Append the completed todo div to the content area:
//         content.appendChild(todoDiv);
//     });
// };

// // Function to toggle todo as complete/incomplete  -- SHOULD THIS BE MOVED OUT OF THE CLASS?
// function toggleComplete(todoId) {
//     const currentProjects = loadData('projects');

//     // console.log(`Searching for todo with ID ${todoId}`);

//     // Loop through the projects to find the todo by ID
//     for (let project of currentProjects) {
//         // console.log(`Checking project: ${project.name}`);
//         // console.log(`Todos in ${project.name}:`, project.todos.map(t => t.id));

//         // Find the todo in the project
//         const todo = project.todos.find(todo => todo.id === todoId);
//         // console.log(`Found todo for ID ${todoId}:`, todo);

//         if (todo) {
//             // Toggle the completion status
//             todo.complete = !todo.complete;
//             console.log(`Todo with ID ${todoId} has been updated to ${todo.complete}`);

//             // Save the updated projects back to localStorage
//             saveData('projects', currentProjects);
//             // console.log('todo has been toggled and data has been saved.')
//             return;
//         } else {
//             console.log(`No todo found in project ${project.name} with ID ${todoId}`);
//         }
//     }
// };

// window.getTodosDueToday = getTodosDueToday;
// window.getTodosDueThisWeek = getTodosDueThisWeek;
// window.getHighPriority = getHighPriority;
// window.getCompletedTodos = getCompletedTodos;
// window.getProjectNames = getProjectNames;
// window.getUncompletedByDueDate = getUncompletedByDueDate;
// window.appendProjectNames = appendProjectNames;
// window.renderTodos = renderTodos;
// window.toggleComplete = toggleComplete;