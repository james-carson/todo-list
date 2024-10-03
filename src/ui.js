import { getTodosDueToday, getHighPriority, getTodosDueThisWeek, getCompletedTodos, getProjectNames, getUncompletedByDueDate, appendProjectNames, renderTodos } from './functions.js';
import { loadData } from './storage.js'

// Set 'Due This Week' as default
let currentView = { type: 'filtered', name: 'Due This Week' };

export function updateView() {
    if (currentView.type === 'filtered') {
        if (currentView.name === 'Due Today') {
            const updatedTodos = getTodosDueToday();
            renderTodos(updatedTodos, 'Due Today');
        } else if (currentView.name === 'Due This Week') {
            const updatedTodos = getTodosDueThisWeek();
            renderTodos(updatedTodos, 'Due This Week');
        } else if (currentView.name === 'High Priority') {
            const updatedTodos = getHighPriority();
            renderTodos(updatedTodos, 'High Priority');
        } else if (currentView.name === 'Completed') {
            const updatedTodos = getCompletedTodos();
            renderTodos(updatedTodos, 'Completed')
        };
    } else if (currentView.type === 'project') {
        const project = loadData('projects').find(p => p.name === currentView.name);
        renderTodos(project.getTodos(), project.name);
    }
};


// Added function wrapper to use on DOM loading:
export function attachEventListeners() {

    // Add event listener for clicks for Due Today:
    const dueTodayButton = document.getElementById('due_today');
    dueTodayButton.addEventListener('click', () => {
        console.log('Due Today Clicked')
        currentView = { type: 'filtered', name: 'Due Today' };
        updateView();
    });

    // Add event listener for clicks for This Week:
    const dueThisWeekButton = document.getElementById('due_this_week');
    console.log('Due This Week Clicked')
    dueThisWeekButton.addEventListener('click', () => {
        currentView = { type: 'filtered', name: 'Due This Week' };
        updateView();
    });

    // Add event listener for clicks for High Priority:
    const highPriorityButton = document.getElementById('high_priority');
    console.log('High Priority Clicked')
    highPriorityButton.addEventListener('click', () => {
        currentView = { type: 'filtered', name: 'High Priority' };
        updateView();
    });

    // Add event listener for clicks for Completed:
    const completedButton = document.getElementById('completed_list');
    console.log('Completed Clicked')
    completedButton.addEventListener('click', () => {
        currentView = { type: 'filtered', name: 'Completed' };
        updateView();
    });
};