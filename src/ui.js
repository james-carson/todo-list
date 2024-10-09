// ui.js contains the functions that will manipulate the DOM. These will usually be used internally or
// ...through index.js

import { getAllTodos, getTodosDueToday, getOverdueTodos, getTodosDueThisWeek, getHighPriorityTodos, getCompletedTodos, getTodosForSpecificProject, getAllProjectNames } from './functions.js';
import { toggleTodoCompleted } from './todo.js';
import flagImage from './images/flag.svg';
import { loadData, saveState, loadState, saveProject, loadProject } from './storage.js';

export function renderSidebar() {
    console.log('Initialised renderSidebar()')

    // Define the project list element
    const projectList = document.getElementById('project_list');
    projectList.textContent = '';

    // Get a list of projects (getProjectNames)
    const currentProjects = getAllProjectNames();

    // console.log(`currentProjects variable initialised as ${currentProjects}`);

    // For each...
    currentProjects.forEach(project => {
        // -Create a div element  
        const projectItem = document.createElement('h3');
        // -Populate the text content with the project name
        projectItem.textContent = project;
        
        // console.log(`The name of this project is ${project}`)

        projectItem.classList.add('project_name');

        // Append the click listeners

        projectItem.addEventListener('click', () => {
            // Find the todos for this project using its name
             // Save the current state so that the correct todos are used:
            saveState('state', 'dynamic')
            // Pass this through updateScreen
            updateScreen(project, []);
        });

        // -Append it to the project list
        projectList.appendChild(projectItem);
    });

    attachStaticSidebarClickListeners();
}

export function renderContent(project, todos) {
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
            toggleTodoCompleted(todo.id);
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
    });
};

export function attachStaticSidebarClickListeners() {
    // ID the 'buttons' (divs)
    const dueTodayButton = document.getElementById('due_today');
    const dueThisWeekButton = document.getElementById('due_this_week');
    const overdueTodosButton = document.getElementById('overdue_todos');
    const highPriorityButton = document.getElementById('high_priority');
    const completedButton = document.getElementById('completed_list');

    // Attach event listeners that run renderContent() on click
    dueTodayButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getTodosDueToday();
        // console.log(`Due Today: ${todos}`)
        // Save the current state so that the correct todos are used:
        saveState('state', 'static')
        // Pass this through updateScreen
        updateScreen('Due Today', todos);
    });

    dueThisWeekButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getTodosDueThisWeek();
         // Save the current state so that the correct todos are used:
         saveState('state', 'static')
         // Pass this through updateScreen
        updateScreen('Due This Week', todos);
    });
    overdueTodosButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getOverdueTodos();
         // Save the current state so that the correct todos are used:
         saveState('state', 'static')
         // Pass this through updateScreen
        updateScreen('Overdue', todos);
    });
    highPriorityButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getHighPriorityTodos();
         // Save the current state so that the correct todos are used:
         saveState('state', 'static')
         // Pass this through updateScreen
        updateScreen('High Priority', todos);
    });
    completedButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getCompletedTodos();
         // Save the current state so that the correct todos are used:
         saveState('state', 'static')
         // Pass this through updateScreen
        updateScreen('Completed', todos);
    });
}

// Input is set to blank by default
export function updateScreen(projectInput = '', todosInput = []) {
    // Initialise the variables that will be fed into renderContent
    let currentState = loadState('state');
    let project;
    let todos;

    if (currentState === 'default') {
        console.log('Input was deemed as default')
        // Perform actions
        project = 'Welcome to Todo(L)ist!'
        todos = getOverdueTodos();
        // Update state
        saveState('state', 'default');
        saveProject('project', project);
    } else if (currentState === 'static') {
        // console.log('Input was deemed as static')
        // Perform actions
        project = projectInput;
        todos = todosInput;
        // console.log(`Static project with name ${project} rendered.`)
        // Update state
        saveState('state', 'static');
        saveProject('project', project);
    } else if (currentState === 'dynamic') {
        // console.log('Input was deemed as dynamic')
        // Perform actions
        project = projectInput;
        todos = getTodosForSpecificProject(projectInput);
        // console.log(`Dynamic project with name ${projectInput} rendered.`)
        // Update state
        saveState('state', 'dynamic');
        saveProject('project', project);
    } else {
        console.error('updateScreen() not run correctly')
    }
    // Now, render the content...
    renderContent(project, todos)
    // console.log('Content Rendered within updateScreen(). Screen updated')
}

function launchTodoPopup() {
    // Not sure yet!
}