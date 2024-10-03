import { loadData, saveData } from './storage';
import { isToday, isThisWeek } from 'date-fns';
import { Todos } from './todos';
import { Projects } from './projects';
import flagImage from './images/flag.svg';


// Filter lists by date (and uncompleted):
// Export the function to be used elsewhere
export function getTodosDueToday() {
    // Console log for testing
    console.log('running getTodosDueToday()')
    // Create a variable, projects, which is populated with loaded data from localStorage
    const projects = loadData('projects') || [];
    // Create a variable, projects, made from taking the projects variable, which is
    // now an array, and maps (performs a function on every item of the array), in this
    // case the getTodos method (returns this.todos) within the Project class. This simply gets all the todos
    // from each of the projects. It then flattens this array, which results in a list of
    // all of the todos from every project.
    const todos = projects.flatMap(project => project.getTodos() || []);
    // This list is then filtered by...
    return todos.filter(todo => {
        // Converting dueDate to a Date object...
        const dueDate = new Date(todo.dueDate);
        // and checking if the todo is due today and is also uncompleted, then
        // returning those that match
        return isToday(dueDate) && !todo.complete;
    });
}

// Same as above, but with this week rather than today:
export function getTodosDueThisWeek() {
    console.log('running getTodosDueThisWeek()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.getTodos() || []);
    return todos.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return isThisWeek(dueDate) && !todo.complete;
    });
}

// Filter lists for high priority (and uncompleted)
export function getHighPriority() {
    console.log('running getHighPriority()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.getTodos() || []);
    return todos.filter(todo => todo.priority === 'high' && !todo.complete);
}

// Filter for completed:
export function getCompletedTodos() {
    console.log('running getCompletedTodos()')
    const projects = loadData('projects') || [];
    const todos = projects.flatMap(project => project.getTodos() || []);
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
    const todos = projects.flatMap(project => project.getTodos() || []);
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
    projectTitle.classList.add('project_title');
    content.appendChild(projectTitle);

    // Loop through the todos and render them:
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
            // let currentProjects = loadData('projects')
            // I NEED TO ENSURE THAT I AM TOGGLING THE CORRECT COMPLETE SECTION
            todo.toggleComplete();
            // This part saves the data to storage.js using the imported function: 
            // I NEED TO ENSURE THAT CURRENTPROJECTS IS THE UPDATED VERSION OF THE DATA
            // saveData('projects', currentProjects);
            //    Removes todo when checked after 2 seconds:
            // if (todo.complete) {
            //     setTimeout(() => {
            //         todoDiv.remove();
            //     }, 2000);
            // }
        });
        todoDiv.appendChild(checkbox);

        // TOGGLING IS NOT YET WORKING! THE TODOS ARE DISAPPEARING AND NOT REAPPEARING IN THE COMPLETED SECTION

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

// Dynamic render version:
export function renderDynamicTodos(project, title = '') {
    console.log('running renderDynamicTodos');
    // Clear the content div:
    const content = document.getElementById('content');
    content.textContent = '';

    // Add a project title:
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = title;
    projectTitle.classList.add('project_title');
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

            // THIS PART NEEDS TO BE WORKED ON - TOGGLING NOT WORKING!

            let currentProjects = loadData('projects')
            todo.toggleComplete();
            saveData('projects', currentProjects);  // TOGGLING IS NOT WORKING YET
            // if (todo.complete) {
            //     setTimeout(() => {
            //         todoDiv.remove();
            //     }, 2000);
            // }
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

        // Append the todo div to the content area:
        content.appendChild(todoDiv);
    });
}

window.getTodosDueToday = getTodosDueToday;
window.getTodosDueThisWeek = getTodosDueThisWeek;
window.getHighPriority = getHighPriority;
window.getCompletedTodos = getCompletedTodos;
window.getProjectNames = getProjectNames;
window.getUncompletedByDueDate = getUncompletedByDueDate;
window.appendProjectNames = appendProjectNames;
window.renderStaticTodos = renderStaticTodos;
window.renderDynamicTodos = renderDynamicTodos;