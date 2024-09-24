import { saveData, loadData } from './storage.js';

// May need to change 'projects' to something else later, depending on list of projects name, currently 'Project'

saveData('projects', projects);

const savedProjects = loadData('projects');
if (savedProjects) {
    projects = savedProjects; // Reassign the projects array
}

// Checking for existence and assigning an empty array if there isn't one - avoids a crash:

const projects = loadData('projects') || [];

// Storing for later - this logic would add a new todo to storage:
// projects[0].todos.push(newTodo);
// saveData('projects', projects);