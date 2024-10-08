// ui.js contains the functions that will manipulate the DOM. These will usually be used internally or
// ...through index.js

import { getAllProjectNames, getOverdueTodos } from './functions.js';
import flagImage from './images/flag.svg';

// Does this need inputs, or is it going to use the loaded data every time anyway?
function renderSidebar() {
    console.log('Initialised renderSidebar()')

    // Define the project list element
    const projectList = document.getElementById('project_list');
    projectList.textContent = '';

    // Get a list of projects (getProjectNames)
    const currentProjects = getAllProjectNames();
    console.log(`currentProjects variable initialised as ${currentProjects}`);

    // For each...
    currentProjects.forEach(project => {
        // -Create a div element  
        const projectItem = document.createElement('h3');
        // -Populate the text content with the project name
        projectItem.textContent = project;
        console.log(`The name of this project is ${project}`)
        projectItem.classList.add('project_name');

        // Append the click listeners

        // Haven't decided how to work this yet!

        // projectItem.addEventListener('click', () => {
        //     currentView = { type: 'project', name: project.name };
        //     updateView();

        // attachSidebarClickListeners()

        // -Append it to the project list
        projectList.appendChild(projectItem);
    });
}

function renderContent(project, todos) {
    console.log(`running renderContent(${project}, ${todos}`)

    // Define the content area and clear it
    const content = document.getElementById('content');
    content.textContent = '';

    // Get the specified project (from input)
    // Append the project name as a title
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project;
    projectTitle.classList.add('project_title');
    content.appendChild(projectTitle);

    // Get the todos for this specific project
    // For each of them, create the required divs and append them to the content area
    todos.forEach(todo => {
        // Create a div for each todo:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo_div');  // Class for CSS grid styling

        // Create a checkbox for completion:
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // This explains what to happen when checked:
        checkbox.checked = todo.complete;

        // Adding an event listener that saves the change
        checkbox.addEventListener('click', () => {
            // Do I need to ID this todo somehow?
            toggleTodoCompleted();
        });
        todoDiv.appendChild(checkbox);

        // Add a grid for layout purposes:
        const todoGrid = document.createElement('div');
        todoGrid.classList.add('todo_grid');
        todoDiv.appendChild(todoGrid);

        // Add the title of the todo:
        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo_title');
        todoTitle.textContent = todo.title;
        todoGrid.appendChild(todoTitle);

        // Add the due date:
        const dueDate = document.createElement('div');
        dueDate.classList.add('todo_due_date');
        dueDate.textContent = `Due: ${todo.dueDate}`;
        todoGrid.appendChild(dueDate);

        // Add the priority:
        const priority = document.createElement('div');
        // If the priority is high, add the class 'todo_priority_high'
        if (todo.priority === 'high') {
            priority.classList.add('todo_priority_high');
            // Or, if it's medium, add 'todo_priority_medium'
        } else if (todo.priority === 'medium') {
            priority.classList.add('todo_priority_medium');
            // Or, if it's low, add 'todo_priority_low'
        } else {
            priority.classList.add('todo_priority_low');
        }
        todoGrid.appendChild(priority);

        const priority_flag = document.createElement('img');
        priority_flag.src = flagImage
        priority_flag.classList.add('priority_flag');
        priority.appendChild(priority_flag)

        // Add an edit button - NOT FUNCTIONAL YET!
        const editTodo = document.createElement('div');
        editTodo.classList.add('todo_edit');
        editTodo.textContent = 'Edit'
        todoGrid.appendChild(editTodo);

        // Append the completed todo div to the content area:
        content.appendChild(todoDiv);

        // Append the click listeners - both edit and checkbox:
        // As a function or specified here?
    });
};

// Not sure that the below is needed
function attachAllUiEventListeners() {
    attachSidebarClickListeners();
    attachCheckboxClickListeners();
    attachEditButtonClickListeners();
    console.log('All UI event listeners appended');
}

function attachSidebarClickListeners() {

}

function attachCheckboxClickListeners() {

}

function attachEditButtonClickListeners() {

}

// I AM HERE: NEED TO WORK OUT HOW TO ID THE PROJECTS? 
// TODOS COMING UP AS OBJECT OBJECT


export function loadDefaultView() {
    console.log('Initialised loadDefaultView()')
    const defaultTodos = getOverdueTodos()
    // This returns an array of todo objects, which can be passed into another function
    console.log(`defaultTodos initialised as ${defaultTodos}`)
    // Need to now use renderContent(defaultTodos)
    renderContent('Inbox', defaultTodos);
    console.log('renderContent attempted with defaultTodos')
    // This should render the correct (overdue) todos onto the content area.
}

// Input is set to blank by default
export function updateScreen(project = '') {
    console.log('Initialised updateScreen');
    // Load data
    renderSidebar();
    console.log('Sidebar rendered within updateScreen()');
    // If the project input was blank, then the default view (overdue and today) will be loaded instead
    if (project.length !== 0) {
        renderContent(project);
        console.log(`${project} rendered.`)
    } else {
        loadDefaultView();
        console.log('Rendered using loadDefaultView()');
    }
    console.log('Content Rendered within updateScreen()')
    // attachAllUiEventListeners();
    // console.log('Event listeners attached within updateScreen()')
    console.log('updateScreen() would have attached event listeners here - not ready yet!')
    console.log('Screen updated')
}

function launchTodoPopup() {
    // Not sure yet!
}


//  ------------------------------------------------------------------------------------------------------



// import { getTodosDueToday, getHighPriority, getTodosDueThisWeek, getCompletedTodos, getProjectNames, getUncompletedByDueDate, renderTodos } from './functions.js';
// import { loadData } from './storage.js'

// // Set 'Due This Week' as default
// let currentView = { type: 'filtered', name: 'Due This Week' };

// export function updateView() {
//     if (currentView.type === 'filtered') {
//         if (currentView.name === 'Due Today') {
//             const updatedTodos = getTodosDueToday();
//             renderTodos(updatedTodos, 'Due Today');
//         } else if (currentView.name === 'Due This Week') {
//             const updatedTodos = getTodosDueThisWeek();
//             renderTodos(updatedTodos, 'Due This Week');
//         } else if (currentView.name === 'High Priority') {
//             const updatedTodos = getHighPriority();
//             renderTodos(updatedTodos, 'High Priority');
//         } else if (currentView.name === 'Completed') {
//             const updatedTodos = getCompletedTodos();
//             renderTodos(updatedTodos, 'Completed')
//         };
//     } else if (currentView.type === 'project') {
//         const project = loadData('projects').find(p => p.name === currentView.name);
//         renderTodos(project.getTodos(), project.name);
//     }
// };


// // Added function wrapper to use on DOM loading:
// export function attachEventListeners() {

//     // Add event listener for clicks for Due Today:
//     const dueTodayButton = document.getElementById('due_today');
//     dueTodayButton.addEventListener('click', () => {
//         console.log('Due Today Clicked')
//         currentView = { type: 'filtered', name: 'Due Today' };
//         updateView();
//     });

//     // Add event listener for clicks for This Week:
//     const dueThisWeekButton = document.getElementById('due_this_week');
//     console.log('Due This Week Clicked')
//     dueThisWeekButton.addEventListener('click', () => {
//         currentView = { type: 'filtered', name: 'Due This Week' };
//         updateView();
//     });

//     // Add event listener for clicks for High Priority:
//     const highPriorityButton = document.getElementById('high_priority');
//     console.log('High Priority Clicked')
//     highPriorityButton.addEventListener('click', () => {
//         currentView = { type: 'filtered', name: 'High Priority' };
//         updateView();
//     });

//     // Add event listener for clicks for Completed:
//     const completedButton = document.getElementById('completed_list');
//     console.log('Completed Clicked')
//     completedButton.addEventListener('click', () => {
//         currentView = { type: 'filtered', name: 'Completed' };
//         updateView();
//     });
// };

// // Logic for rendering project list on sidebar:
// export function appendProjectNames() {
//     console.log('running appendProjectNames()')
//     const projectList = document.getElementById('project_list');
//     projectList.textContent = '';
//     const projects = loadData('projects') || [];

//     projects.forEach(project => {
//         const projectItem = document.createElement('h3');
//         projectItem.textContent = project.name;
//         console.log(`The name of this project is ${project.name}`)
//         projectItem.classList.add('project_name');

//         // Adding event listener to listen for clicks here:
//         projectItem.addEventListener('click', () => {
//             currentView = { type: 'project', name: project.name };
//             updateView();
//         });
//         projectList.appendChild(projectItem);
//     });
// };

// export function loadDefaultView() {
//     updateView();
// }