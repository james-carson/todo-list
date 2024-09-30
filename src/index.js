import { saveData, loadData } from './storage.js';
import { saveProjectsToLocalStorage, defaultProjects, initialiseData } from './data.js';
import { appendProjectNames } from './functions.js'
import './styles.css';
    
initialiseData();

// Checking for existence and assigning an empty array if there isn't one - avoids a crash:
let projects = loadData('projects') || [];

const savedProjects = loadData('projects');
if (savedProjects) {
    projects = savedProjects; // Reassign the projects array
}

saveData('projects', projects);

// Event listener to append the Project Names:
document.addEventListener('DOMContentLoaded', () => {
    appendProjectNames();
});

// Putting window to make the scope global:

window.appendProjectNames = appendProjectNames;

// Storing for later - this logic would add a new todo to storage:
// projects[0].todos.push(newTodo);
// saveData('projects', projects);