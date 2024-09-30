import { getTodosDueToday, getHighPriority, getTodosDueThisWeek, getCompletedTodos, getProjectNames, getUncompletedByDueDate, appendProjectNames, renderStaticTodos, renderDynamicTodos } from './functions.js';

// Added function wrapper to use on DOM loading:
export function attachEventListeners() {

    // Add event listener for clicks for Due Today:
    const dueTodayButton = document.getElementById('due_today');
    dueTodayButton.addEventListener('click', () => {
        console.log('Due Today Clicked')
        const dueTodayTodos = getTodosDueToday();
        renderStaticTodos(dueTodayTodos, 'Due Today');
    });

    // Add event listener for clicks for This Week:
    const dueThisWeekButton = document.getElementById('due_this_week');
    console.log('Due This Week Clicked')
    dueThisWeekButton.addEventListener('click', () => {
        const dueThisWeekTodos = getTodosDueThisWeek();
        renderStaticTodos(dueThisWeekTodos, 'Due This Week');
    });

    // Add event listener for clicks for High Priority:
    const highPriorityButton = document.getElementById('high_priority');
    console.log('High Priority Clicked')
    highPriorityButton.addEventListener('click', () => {
        const highPriorityTodos = getHighPriority();
        renderStaticTodos(highPriorityTodos, 'High Priority');
    });

    // Add event listener for clicks for Completed:
    const completedButton = document.getElementById('completed_list');
    console.log('Completed Clicked')
    completedButton.addEventListener('click', () => {
        const completedTodos = getCompletedTodos();
        renderStaticTodos(completedTodos, 'Completed');
    });
};