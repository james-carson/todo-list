import { saveData, loadData } from './storage.js';
import { defaultProjects, initialiseData } from './data.js';
import { appendProjectNames } from './functions.js'
import { attachEventListeners } from './ui.js'
import './styles.css';

initialiseData();

// Event listener to append the Project Names:
document.addEventListener('DOMContentLoaded', () => {
    appendProjectNames();
    attachEventListeners();
    console.log(`appendProjectNames() and attachEventListeners() ran successfully after DOM Content Loaded`)
    const dueThisWeekTodos = getTodosDueThisWeek();
    renderTodos(dueThisWeekTodos, 'Due This Week');
    console.log('Due This Week loaded as default');
});

// Storing for later - this logic would add a new todo to storage:
// projects[0].todos.push(newTodo);
// saveData('projects', projects);