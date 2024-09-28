import { saveData, loadData } from './storage.js';
import './style.css';

// May need to change 'projects' to something else later, depending on list of projects name, currently 'Project'


// Checking for existence and assigning an empty array if there isn't one - avoids a crash:
let projects = loadData('projects') || [];

const savedProjects = loadData('projects');
if (savedProjects) {
    projects = savedProjects; // Reassign the projects array
}

saveData('projects', projects);

// Storing for later - this logic would add a new todo to storage:
// projects[0].todos.push(newTodo);
// saveData('projects', projects);