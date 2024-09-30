import { getTodosDueToday, getHighPriority, getTodosDueThisWeek, getCompletedTodos, getProjectNames, getUncompletedByDueDate, appendProjectNames, renderTodos } from './functions.js';

// Add event listener for clicks for Due Today:
const dueTodayButton = document.getElementById('due_today');
dueTodayButton.addEventListener('click', () => {
    const dueTodayTodos = getTodosDueToday();
    renderTodos(dueTodayTodos, 'Due Today');
});

// Add event listener for clicks for This Week:
const dueThisWeekButton = document.getElementById('due_this_week');
dueThisWeekButton.addEventListener('click', () => {
    const dueThisWeekTodos = getTodosDueThisWeek();
    renderTodos(dueThisWeekTodos, 'Due This Week');
});

// Add event listener for clicks for High Priority:
const highPriorityButton = document.getElementById('high_priority');
highPriorityButton.addEventListener('click', () => {
    const highPriorityTodos = getHighPriority();
    renderTodos(highPriorityTodos, 'High Priority');
});

// Add event listener for clicks for Completed:
const completedButton = document.getElementById('completed_list');
completedButton.addEventListener('click', () => {
    const completedTodos = getCompletedTodos();
    renderTodos(completedTodos, 'Completed');
});

// Event listener to append the Project Names: - THIS WAS MOVED TO INDEX.JS
// document.addEventListener('DOMContentLoaded', () => {
//     appendProjectNames();
// });