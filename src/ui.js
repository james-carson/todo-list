// ui.js contains the functions that will manipulate the DOM. These will usually be used internally or
// ...through index.js

import { getAllTodos, getTodosDueToday, getOverdueTodos, getTodosDueThisWeek, getHighPriorityTodos, getCompletedTodos, getTodosForSpecificProject, getAllProjectNames } from './functions.js';
import { toggleTodoCompleted } from './todo.js';
import flagImage from './images/flag.svg';
import { loadData } from './storage.js';

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

        projectItem.addEventListener('click', () => {
            // Find the todos for this project using its name
            const todos = getTodosForSpecificProject(project)
            // Pass this through the renderContent()
            renderContent(project, todos);
        });

        // -Append it to the project list
        projectList.appendChild(projectItem);
    });

    console.log('Attaching static sidebar listeners')
    attachStaticSidebarClickListeners();
    console.log('Completed running renderSidebar()')
}

function renderContent(projectName, todos) {
    console.log(`running renderContent(${projectName}, ${todos}`)

    // Define the content area and clear it
    const content = document.getElementById('content');
    content.textContent = '';

    // Get the specified project (from input)
    // Append the project name as a title
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = projectName;
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

        // Append the click listeners - both edit and checkbox:
        // As a function or specified here?
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
        // Pass this through the renderContent()
        renderContent('Due Today', todos);
    });
    dueThisWeekButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getTodosDueThisWeek();
        // Pass this through the renderContent()
        renderContent('Due This Week', todos);
    });
    overdueTodosButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getOverdueTodos();
        // Pass this through the renderContent()
        renderContent('Overdue', todos);
    });
    highPriorityButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getHighPriorityTodos();
        // Pass this through the renderContent()
        renderContent('High Priority', todos);
    });
    completedButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const todos = getCompletedTodos();
        // Pass this through the renderContent()
        renderContent('Completed', todos);
    });
}

export function loadDefaultView() {
    console.log('Initialised loadDefaultView()')
    const defaultTodos = getOverdueTodos()
    // This returns an array of todo objects, which can be passed into another function
    console.log(`defaultTodos initialised as ${defaultTodos}`)
    // Need to now use renderContent(defaultTodos)
    console.log('renderContent attempted with defaultTodos')
    return 'Welcome to Todo(L)ist', defaultTodos;
    // This should render the correct (overdue) todos onto the content area when fed into renderContent
}

// Input is set to blank by default
export function updateScreen(staticProject = '', staticTodos, dynamicProject = '', defaultProject = '') {
    console.log('Initialised updateScreen');
    // Load data
    renderSidebar();
    console.log('Sidebar rendered within updateScreen()');
    // If the project input was blank, then the default view (overdue and today) will be loaded instead
    if (defaultProject) {
        return loadDefaultView();
    } else if (dynamicProject) {
        const todos = getTodosForSpecificProject(dynamicProject);
        return dynamicProject, todos;
        console.log(`Project with ID ${dynamicProject} rendered.`)
    } else if (staticProject) {
        return staticProject, staticTodos;
        console.log('Rendered default todos using renderContent(getOverdueTodos())');
    }
    renderContent(project, todos)
    console.log('Content Rendered within updateScreen(). Screen updated')
}

// THIS IS WHERE I AM: GETTING updateScreen() TO WORK!
// ALSO STATIC TODOS ARE NOT RENDERING!


function launchTodoPopup() {
    // Not sure yet!
}

// PREVIOUS CODE USED FOR SEARCHING BY PROJECT NAME/ID AND TODO:
// // Load data:
    // const loadedData = loadData('projects');

    // // The project needs to firstly be identified
    // const project = (() => {
    //     // First, check for a matching project ID:
    //     const projectById = loadedData.find(project => project.id === projectIdentifier);
    //     if (projectById) {
    //         return projectById;
    //     } else {
    //         console.log(`Project cannot be identified by ID. Attempting to identify by name...`);
    //     }
        
    //     // If not, check for it by ID:
    //     const projectByName = loadedData.find(project => project.name === projectIdentifier);
    //     if (projectByName) {
    //         return projectByName;
    //     } // else return an error
    //     else {
    //         console.error(`Project with identifier ${projectIdentifier} cannot be found`);
    //     };
    // })();

    // if (!project) {
    //     console.error('No project found. Terminating function.')
    //     return;
    // }

    // // Then, if todos are provided, use them:
    // const todos = (() => {
    //     if (Array.isArray(todosIdentifier) && todosIdentifier.length > 0) {
    //         return todosIdentifier;
    //     } // else find them
    //     else if (!todosIdentifier) {
    //         return project.todoList;
    //     } else {
    //         console.error(`Todos with identifier ${todosIdentifier} cannot be found`);
    //         return [];
    //     }
    // })();