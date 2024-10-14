// ui.js contains the functions that will manipulate the DOM. These will usually be used internally or
// ...through index.js

import { getAllTodos, getTodosDueToday, getOverdueTodos, getTodosDueThisWeek, getHighPriorityTodos, getCompletedTodos, getTodosForSpecificProject, getAllProjectNames } from './functions.js';
import { toggleTodoCompleted } from './todo.js';
import flagImage from './images/flag.svg';
import { loadData, saveState, loadState } from './storage.js';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';

export function renderSidebar() {
    console.log('Initialised renderSidebar()')

    // Define the project list element
    const projectList = document.getElementById('project_list');
    projectList.textContent = '';

    // Get a list of projects (getProjectNames)
    const currentProjects = getAllProjectNames();

    // For each project...
    currentProjects.forEach(project => {

        const projectHolder = document.createElement('div');
        projectHolder.classList.add('project_holder');

        // -Create a div element  
        const projectItem = document.createElement('h3');
        // -Populate the text content with the project name
        projectItem.textContent = project;
        projectItem.classList.add('project_name');
        projectHolder.appendChild(projectItem);

        const projectEditButton = document.createElement('div');
        projectEditButton.classList.add('project_edit_button')
        projectEditButton.textContent = 'Edit';
        projectHolder.appendChild(projectEditButton);

        // Append the click listeners
        projectHolder.addEventListener('click', () => {
            // Find the todos for this project using its name
             // Save the current state so that the correct todos are used:
            saveState('state', 'dynamic')
            // Pass this through updateScreen
            updateScreen(project, []);
        });

        // -Append it to the project list
        projectList.appendChild(projectHolder);
    });

    const addNewProjectButton = document.createElement('h3')
    addNewProjectButton.textContent = '+ New Project'
    addNewProjectButton.classList.add('add_new_project_button')
    addNewProjectButton.addEventListener('click', () => {
        // NEEDS TO RUN A FUNCTION / OPEN A POPUP THAT ADDS A NEW PROJECT TO THE DATABASE!
    });
    projectList.appendChild(addNewProjectButton);



    attachStaticSidebarClickListeners();
}

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
        const project = 'Due Today'
        const todos = getTodosDueToday();
        // console.log(`Due Today: ${todos}`)
        // Save the current state so that the correct todos are used:
        saveState('state', 'static')
        saveState('currentProject', project)
        // Pass this through updateScreen
        updateScreen(project, todos);
    });

    dueThisWeekButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const project = 'Due This Week'
        const todos = getTodosDueThisWeek();
         // Save the current state so that the correct todos are used:
        saveState('state', 'static')
        saveState('currentProject', project)
         // Pass this through updateScreen
        updateScreen(project, todos);
    });
    overdueTodosButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const project = 'Overdue'
        const todos = getOverdueTodos();
         // Save the current state so that the correct todos are used:
        saveState('state', 'static')
        saveState('currentProject', project)
         // Pass this through updateScreen
        updateScreen(project, todos);
    });
    highPriorityButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const project = 'High Priority'
        const todos = getHighPriorityTodos();
         // Save the current state so that the correct todos are used:
        saveState('state', 'static')
        saveState('currentProject', project)
         // Pass this through updateScreen
        updateScreen(project, todos);
    });
    completedButton.addEventListener('click', () => {
        // Find the todos for this project using its name
        const project = 'Completed'
        const todos = getCompletedTodos();
         // Save the current state so that the correct todos are used:
        saveState('state', 'static')
        saveState('currentProject', project)
         // Pass this through updateScreen
        updateScreen(project, todos);
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
        project = 'Welcome to Todo(L)ist! Here is your inbox:'
        todos = getOverdueTodos();
        // Update state
        saveState('state', 'default');
        saveState('currentProject', project);
    } else if (currentState === 'static') {
        // console.log('Input was deemed as static')
        if (projectInput === 'Completed') {
            project = projectInput;
            todos = getCompletedTodos();
        } else {
            project = projectInput;
            todos = todosInput.filter(todo => !todo.completed);
        }
        // console.log(`Static project with name ${project} rendered.`)
        // Update state
        saveState('state', 'static');
        saveState('currentProject', project);
    } else if (currentState === 'dynamic') {
        // console.log('Input was deemed as dynamic')
        // Perform actions
        project = projectInput;
        const todosToFilter = getTodosForSpecificProject(projectInput);
        todos = todosToFilter.filter(todo => !todo.completed);
        // console.log(`Dynamic project with name ${projectInput} rendered.`)
        // Update state
        saveState('state', 'dynamic');
        saveState('currentProject', project);
    } else {
        console.error('updateScreen() not run correctly')
    }
    // Now, render the content...
    renderContent(project, todos)
    console.log('Content Rendered within updateScreen(). Screen updated')
}

export function renderContent(project, todos) {
    console.log(`running renderContent(${project}, ${todos}`)

    // Define the content area and clear it
    const content = document.getElementById('content');
    content.textContent = '';

    todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

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
        todoTitle.addEventListener('click', () => {
            // NEEDS TO RUN A FUNCTION / OPEN A POPUP THAT EDITS A TODO!
        });
        todoGrid.appendChild(todoTitle);

        // Add the due date:
        const dueDate = document.createElement('div');
        dueDate.classList.add('todo_due_date');
        const todoDate = new Date(todo.dueDate);
        let formattedDate;
        if (isToday(todoDate)) {
            formattedDate = 'Today';
        } else if (isTomorrow(todoDate)) {
            formattedDate = 'Tomorrow';
        } else if (isThisWeek(todoDate)) {
            // Day of the Week
            formattedDate = format(todoDate, 'EEEE');
        } else {
            // Full date
            formattedDate = format(todoDate, 'do MMMM yyyy');
        }
        dueDate.textContent = formattedDate;
        dueDate.addEventListener('click', () => {
            // NEEDS TO RUN A FUNCTION / OPEN A POPUP THAT EDITS A TODO!
        });
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
        priority.addEventListener('click', () => {
            // NEEDS TO RUN A FUNCTION / OPEN A POPUP THAT EDITS A TODO!
        });
        todoGrid.appendChild(priority);

        const priority_flag = document.createElement('img');
        priority_flag.src = flagImage
        priority_flag.classList.add('priority_flag');
        priority.appendChild(priority_flag)

        const deleteTodo = document.createElement('div');
        deleteTodo.classList.add('todo_delete');
        deleteTodo.textContent = 'Delete'
        deleteTodo.addEventListener('click', () => {
            // NEEDS TO RUN A FUNCTION / OPEN A POPUP TO CONFIRM A DELETE!
        });
        todoGrid.appendChild(deleteTodo);

        // Append the completed todo div to the content area:
        content.appendChild(todoDiv);
    });
    const addNewTodoButton = document.createElement('div')
    addNewTodoButton.textContent = '+ New Todo'
    addNewTodoButton.classList.add('add_new_todo_button')
    addNewTodoButton.addEventListener('click', () => {
        // NEEDS TO RUN A FUNCTION / OPEN A POPUP THAT ADDS A NEW TODO TO THE DATABASE!
    });
    content.appendChild(addNewTodoButton);
};

function launchTodoPopup() {
    // Not sure yet!
}