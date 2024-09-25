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

function getUncompletedByDueDate(todos) {
    return todos
        // Filter for incomplete:
        .filter(todo => !todo.complete)
        // Sort by due date
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

// Add event listeners for clicks

const dueTodayButton = document.getElementById('due_today');
dueTodayButton.addEventListener('click')
// Coming back to this - creating renderTodos() first!***

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
        });
        // ***I need more here - I need this to save to storage and then possibly have the todo disappear from the list after a few seconds. Check the functionality below:
        todoDiv.appendChild(checkbox);

        // checkbox.addEventListener('change', () => {
        //     todo.complete = checkbox.checked;
        
        //     // Save the updated todos to localStorage (or whatever storage you're using)
        //     saveData(); 
        
        //     if (todo.complete) {
        //         // Set a timeout to remove the todo from the DOM after 2 seconds
        //         setTimeout(() => {
        //             todoDiv.remove();
        //         }, 2000);
        //     }
        // });

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

        // Append the completed todo div to the content area:
        content.appendChild(todoDiv);
    });
}