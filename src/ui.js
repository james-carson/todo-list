// ui.js contains the functions that will manipulate the DOM. These will usually be used internally or
// ...through index.js

import { getAllTodos, getTodosDueToday, getOverdueTodos, getTodosDueThisWeek, getHighPriorityTodos, getCompletedTodos, getTodosForSpecificProject, getAllProjectNames } from './functions.js';
import { toggleTodoCompleted, createNewTodo } from './todo.js';
import flagImage from './images/flag.svg';
import { loadData, saveData, saveState, loadState } from './storage.js';
import { format, isToday, isTomorrow, isThisWeek, isThisYear } from 'date-fns';
import { createNewProject, Project } from './project.js';
import { deleteTodo } from './todo.js';

export function renderSidebar() {
    console.log('Initialised renderSidebar()')

    // Define the project list element
    const projectList = document.getElementById('project_list');
    projectList.textContent = '';

    // Get a list of projects (getProjectNames)
    const currentProjects = loadData('projects');
    console.log(`currentProjects loaded as: ${currentProjects}`)

    // For each project...
    currentProjects.forEach(project => {

        const projectHolder = document.createElement('div');
        projectHolder.classList.add('project_holder');

        // Set the ID as an attribute so that it can be passed into addOrEditProject
        projectHolder.setAttribute('project-id', project.id);
        console.log(`Sidebar rendered project with ID: ${project.id}`)

        // -Create a div element  
        const projectItem = document.createElement('h3');
        // -Populate the text content with the project name
        projectItem.textContent = project.name;
        projectItem.classList.add('project_name');
        projectHolder.appendChild(projectItem);

        const projectEditButton = document.createElement('div');
        projectEditButton.classList.add('project_edit_button')
        projectEditButton.textContent = 'Edit';
        projectEditButton.addEventListener('click', () => {
            console.log(`Sidebar project clicked - project.id is ${project.id}`);
            addOrEditProject('edit', project.id);
            // How do I stop renderSidebar() from running?
        })
        projectHolder.appendChild(projectEditButton);

        // Append the click listeners
        projectHolder.addEventListener('click', () => {
            // Find the todos for this project using its name
            // Save the current state so that the correct todos are used:
            saveState('state', 'dynamic')
            // Pass this through updateScreen
            updateScreen(project.name, []);
        });

        // -Append it to the project list
        projectList.appendChild(projectHolder);
    });

    const addNewProjectButton = document.createElement('h3')
    addNewProjectButton.textContent = '+ New Project'
    addNewProjectButton.classList.add('add_new_project_button')
    addNewProjectButton.addEventListener('click', () => {
        addOrEditProject('add');
        // How do I stop renderSidebar() from running?
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
        saveState('currentTodos', todos);
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
        saveState('currentTodos', todos);
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
        saveState('currentTodos', todos);
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
        todoDiv.classList.add('todo_div');

        // Set the ID as an attribute so that it can be passed into addOrEditTodo
        todoDiv.setAttribute('todo-id', todo.id);

        // Create a checkbox for completion:
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        if (project === 'Completed' || todo.completed === true) {
            checkbox.checked = true; // Ensure it's ticked for completed todos
        } else {
            checkbox.checked = false; // For incomplete todos, it's unticked
        }

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
            console.log('Todo ID clicked:', todo.id)
            addOrEditTodo('edit', todo.id);
        });
        todoGrid.appendChild(todoTitle);

        // Add the due date:
        const dueDate = document.createElement('div');
        dueDate.classList.add('todo_due_date');
        const todoDate = new Date(todo.dueDate);
        let formattedDate;
        if (isThisYear(todoDate)) {
            if (isToday(todoDate)) {
                formattedDate = 'Today';
            } else if (isTomorrow(todoDate)) {
                formattedDate = 'Tomorrow';
            } else if (isThisWeek(todoDate)) {
                // Day of the Week
                formattedDate = format(todoDate, 'EEEE');
            } else {
                // Full date
                formattedDate = format(todoDate, 'do MMMM');
            }
        } else {
            formattedDate = format(todoDate, 'do MMM YYYY');
        }
        dueDate.textContent = formattedDate;
        dueDate.addEventListener('click', () => {
            console.log('Todo ID clicked:', todo.id)
            addOrEditTodo('edit', todo.id);
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
            console.log('Todo ID clicked:', todo.id)
            addOrEditTodo('edit', todo.id);
        });
        todoGrid.appendChild(priority);

        const priority_flag = document.createElement('img');
        priority_flag.src = flagImage
        priority_flag.classList.add('priority_flag');
        priority.appendChild(priority_flag)

        const deleteTodoButton = document.createElement('div');
        deleteTodoButton.classList.add('todo_delete');
        deleteTodoButton.textContent = 'Delete'
        deleteTodoButton.addEventListener('click', () => {
            if (todo.id) {
                console.log(`Attempting to delete todo with ID: (${todo.id})`)
                console.log('Todo to delete:', todo.id);
                deleteTodo(todo.id);
                updateScreen(project);
            } else {
                console.log('Error deleting todos');
            }
        });
        todoGrid.appendChild(deleteTodoButton);

        // Append the completed todo div to the content area:
        content.appendChild(todoDiv);
    });
    const addNewTodoButton = document.createElement('div')
    addNewTodoButton.textContent = '+ New Todo'
    addNewTodoButton.classList.add('add_new_todo_button')
    addNewTodoButton.addEventListener('click', () => {
        addOrEditTodo('add');
    });
    content.appendChild(addNewTodoButton);
};

export function addOrEditTodo(type, todoId = '') {

    const projects = loadData('projects');
    let todo;
    let currentProject;
    let originalProject;

    if (type === 'edit' && todoId) {
        for (let project of projects) {
            console.log('Checking project:', project);
            todo = project.todoList.find(t => t.id === todoId);
            if (todo) {
                currentProject = project;
                originalProject = project;
                console.log(`Todo with ID ${todoId} found in project: ${project}!`);
                break;
            }
        }
        if (!todo) {
            console.error('Todo not found by ID')
            return
        }
    };

    // Add the overlay window
    const todoPopupOverlay = document.createElement('div');
    todoPopupOverlay.classList.add('todo_popup_overlay');
    document.body.appendChild(todoPopupOverlay);

    // Add the Grid layout
    const todoPopupGrid = document.createElement('div');
    todoPopupGrid.classList.add('todo_popup_grid');
    todoPopupOverlay.appendChild(todoPopupGrid);

    // Add the title, depending on input
    const todoPopupTitle = document.createElement('div');
    todoPopupTitle.classList.add('todo_popup_title');
    if (type === 'edit' && todoId) {
        todoPopupTitle.textContent = `Edit '${todo.title}'`
    } else if (type === 'add') {
        todoPopupTitle.textContent = 'Add Todo';
    } else {
        todoPopupTitle.textContent = 'Error loading todo title';
    };
    todoPopupGrid.appendChild(todoPopupTitle);

    // Append the name input
    const todoPopupName = document.createElement('div');
    todoPopupName.classList.add('todo_popup_name');
    todoPopupName.classList.add('flex');
    const todoPopupNameLabel = document.createElement('h4');
    todoPopupNameLabel.textContent = 'Title: *';
    todoPopupName.appendChild(todoPopupNameLabel);
    const todoPopupNameInput = document.createElement('input');
    todoPopupNameInput.setAttribute('type', 'text');
    todoPopupNameInput.setAttribute('name', 'name');
    todoPopupNameInput.setAttribute('id', 'todo_name');
    todoPopupNameInput.setAttribute('minlength', '1');
    todoPopupNameInput.setAttribute('tabindex', '0');
    if (type === 'edit' && todoId) {
        todoPopupNameInput.value = todo.title;
    }

    todoPopupName.appendChild(todoPopupNameInput);
    todoPopupGrid.appendChild(todoPopupName);

    // Append the priority input
    const todoPopupPriority = document.createElement('div');
    todoPopupPriority.classList.add('todo_popup_priority');
    todoPopupPriority.classList.add('flex');
    const todoPopupPriorityLabel = document.createElement('h4');
    todoPopupPriorityLabel.textContent = 'Priority: *';
    todoPopupPriority.appendChild(todoPopupPriorityLabel);
    // Create the select
    const todoPopupPriorityInput = document.createElement('select');
    todoPopupPriorityInput.setAttribute('id', 'todo_priority')
    todoPopupPriorityInput.setAttribute('tabindex', '1');
    // Create the options for the select / High
    const todoPopupPriorityInputHigh = document.createElement('option');
    todoPopupPriorityInputHigh.setAttribute('value', 'high');
    todoPopupPriorityInputHigh.textContent = 'High';
    todoPopupPriorityInput.appendChild(todoPopupPriorityInputHigh);
    // Medium
    const todoPopupPriorityInputMedium = document.createElement('option');
    todoPopupPriorityInputMedium.setAttribute('value', 'medium');
    todoPopupPriorityInputMedium.textContent = 'Medium';
    todoPopupPriorityInput.appendChild(todoPopupPriorityInputMedium);
    // Low
    const todoPopupPriorityInputLow = document.createElement('option');
    todoPopupPriorityInputLow.setAttribute('value', 'low');
    todoPopupPriorityInputLow.textContent = 'Low';
    todoPopupPriorityInput.appendChild(todoPopupPriorityInputLow);
    // Append the whole thing
    todoPopupPriority.appendChild(todoPopupPriorityInput);
    todoPopupGrid.appendChild(todoPopupPriority);
    // Set the default priority value:
    if (type === 'edit' && todoId) {
        todoPopupPriorityInput.value = todo.priority;
    }

    // Append the due date input (if it works...)
    const todoPopupDueDate = document.createElement('div');
    todoPopupDueDate.classList.add('todo_popup_duedate');
    todoPopupDueDate.classList.add('flex');
    const todoPopupDueDateLabel = document.createElement('h4');
    todoPopupDueDateLabel.textContent = 'Due Date: *';
    todoPopupDueDate.appendChild(todoPopupDueDateLabel);
    const todoPopupDueDateInput = document.createElement('input');
    todoPopupDueDateInput.setAttribute('type', 'date');
    todoPopupDueDateInput.setAttribute('name', 'duedate');
    todoPopupDueDateInput.setAttribute('id', 'todo_duedate');
    todoPopupDueDateInput.setAttribute('minlength', '1');
    todoPopupDueDateInput.setAttribute('tabindex', '2');
    if (type === 'edit' && todoId) {
        todoPopupDueDateInput.value = todo.dueDate;
    }
    todoPopupDueDate.appendChild(todoPopupDueDateInput);
    todoPopupGrid.appendChild(todoPopupDueDate);

    // Append the completed section:
    if (type === 'edit') {
        const todoPopupCompleted = document.createElement('div');
        todoPopupCompleted.classList.add('todo_popup_completed');
        todoPopupCompleted.classList.add('flex');
        const todoPopupCompletedLabel = document.createElement('h4');
        todoPopupCompletedLabel.textContent = 'Completed:';
        todoPopupCompleted.appendChild(todoPopupCompletedLabel);
        const todoPopupCompletedCheckbox = document.createElement('input');
        todoPopupCompletedCheckbox.setAttribute('type', 'checkbox');
        todoPopupCompletedCheckbox.setAttribute('id', 'todo_completed');
        todoPopupCompletedCheckbox.setAttribute('tabindex', '3');
        if (todoId) {
            todoPopupCompletedCheckbox.checked = todo.completed;
        }
        todoPopupCompleted.appendChild(todoPopupCompletedCheckbox);
        todoPopupGrid.appendChild(todoPopupCompleted);
    }

    // Append the project section:
    const todoPopupProject = document.createElement('div');
    todoPopupProject.classList.add('todo_popup_project');
    todoPopupProject.classList.add('flex');
    const todoPopupProjectLabel = document.createElement('h4');
    todoPopupProjectLabel.textContent = 'Project: *'
    todoPopupProject.appendChild(todoPopupProjectLabel);
    const todoPopupProjectInput = document.createElement('select');
    todoPopupProjectInput.setAttribute('id', 'todo_project')
    todoPopupProjectInput.setAttribute('tabindex', '4');
    // Need to loop through each project name and add it as a value:
    projects.forEach(project => {
        const todoPopupProjectInputOption = document.createElement('option');
        todoPopupProjectInputOption.setAttribute('value', project.name);
        todoPopupProjectInputOption.textContent = project.name;
        todoPopupProjectInput.appendChild(todoPopupProjectInputOption);
    });
    if (type === 'edit' && todoId) {
        todoPopupProjectInput.value = currentProject.name;
    }
    todoPopupProject.appendChild(todoPopupProjectInput)
    todoPopupGrid.appendChild(todoPopupProject);

    // Append just the notes label section:
    const todoPopupNotesLabel = document.createElement('div');
    todoPopupNotesLabel.classList.add('todo_notes_label')
    todoPopupNotesLabel.classList.add('flex');
    todoPopupNotesLabel.textContent = 'Notes: '
    todoPopupGrid.appendChild(todoPopupNotesLabel);

    // Append the notes input section:
    const todoPopupNotesInput = document.createElement('textarea');
    todoPopupNotesInput.setAttribute('id', 'todo_notes')
    todoPopupNotesInput.classList.add('todo_notes_input');
    if (type === 'edit' && todoId) {
        todoPopupNotesInput.value = todo.notes;
    }
    todoPopupGrid.appendChild(todoPopupNotesInput);

    // Add a label for required:
    const todoRequiredText = document.createElement('div');
    todoRequiredText.classList.add('todo_required_text');
    todoRequiredText.textContent = '* = Required field'
    todoPopupGrid.appendChild(todoRequiredText);

    // Add a buttons container
    const todoButtonsDiv = document.createElement('div');
    todoButtonsDiv.classList.add('todo_buttons_div');
    todoButtonsDiv.classList.add('flex');
    todoPopupGrid.appendChild(todoButtonsDiv);

    // Append the cancel button:
    const todoPopupCancelButton = document.createElement('div');
    todoPopupCancelButton.classList.add('todo_cancel_button');
    todoPopupCancelButton.textContent = 'Cancel';
    todoPopupCancelButton.addEventListener('click', () => {
        popupCancel('todo');
    });
    todoButtonsDiv.appendChild(todoPopupCancelButton);

    // Append the Delete button:
    if (type === 'edit') {
        const todoPopupDeleteButton = document.createElement('div');
        todoPopupDeleteButton.classList.add('todo_delete_button');
        todoPopupDeleteButton.textContent = 'Delete';
        todoPopupDeleteButton.addEventListener('click', () => {
            let currentData = loadData('projects')
            let currentState = loadState('state')

            const project = currentData.find(p => p.id === currentProject.id);

            if (todo.id && project) {
                console.log(`Attempting to delete todo with ID: (${todo.id})`)
                project.deleteTodoFromProject(todo.id);
                saveData('projects', currentData);
                saveState('state', currentState);
                popupCancel('todo');
                updateScreen(currentProject.name, []);
            } else {
                console.log('Error deleting todos');
            }
        })
        todoButtonsDiv.appendChild(todoPopupDeleteButton);
    }

    // Append the save button:
    const todoPopupSaveButton = document.createElement('div');
    todoPopupSaveButton.classList.add('todo_save_button');
    todoPopupSaveButton.textContent = 'Save';

    // Initially disabled depending on form validation:
    todoPopupSaveButton.disabled = true;
    todoPopupSaveButton.style.opacity = 0.5;

    // Checking for required input:
    const validateTodoForm = () => {
        const title = todoPopupNameInput.value;
        const dueDate = todoPopupDueDateInput.value;
        const priority = todoPopupPriorityInput.value;
        const project = todoPopupProjectInput.value;

        // Add or remove red border based on whether fields are filled
        if (!title) {
            todoPopupNameInput.style.borderColor = 'var(--priority-high)';
        } else {
            todoPopupNameInput.style.borderColor = '';
        }

        if (!dueDate) {
            todoPopupDueDateInput.style.borderColor = 'var(--priority-high)';
        } else {
            todoPopupDueDateInput.style.borderColor = '';
        }

        if (!priority) {
            todoPopupPriorityInput.style.borderColor = 'var(--priority-high)';
        } else {
            todoPopupPriorityInput.style.borderColor = '';
        }

        if (!project) {
            todoPopupProjectInput.style.borderColor = 'var(--priority-high)';
        } else {
            todoPopupProjectInput.style.borderColor = '';
        }

        // Enable save button only if all required fields are filled
        if (title && dueDate && priority && project) {
            todoPopupSaveButton.disabled = false;
            // Make button fully visible if all is good
            todoPopupSaveButton.style.opacity = 1;
        } else {
            todoPopupSaveButton.disabled = true;
            // Keep the button visually disabled if validation fails
            todoPopupSaveButton.style.opacity = 0.5;
        }
    }

    // Attach the validation listener to inputs
    todoPopupNameInput.addEventListener('input', validateTodoForm);
    todoPopupDueDateInput.addEventListener('input', validateTodoForm);
    todoPopupPriorityInput.addEventListener('change', validateTodoForm);
    todoPopupProjectInput.addEventListener('change', validateTodoForm);

    validateTodoForm();

    // Click listener for save button:
    todoPopupSaveButton.addEventListener('click', () => {
        if (type === 'add') {
            const title = todoPopupNameInput.value;
            const dueDate = todoPopupDueDateInput.value
            const priority = todoPopupPriorityInput.value;
            const notes = todoPopupNotesInput.value;
            const projectName = todoPopupProjectInput.value;

            // Check if the required fields are filled in:
            if (title === '' || dueDate === '' || priority === '' || projectName === '') {
                alert('Please fill in all required fields.');
                return;
            }

            createNewTodo(title, dueDate, priority, notes, projectName);
            popupCancel('todo')

            const updatedProject = projects.find(p => p.name === projectName);
            if (updatedProject) {
                updateScreen(updatedProject.name, updatedProject.todoList);
            }

        } else if (type === 'edit') {

            const newTitle = todoPopupNameInput.value;
            const newDueDate = todoPopupDueDateInput.value;
            const newPriority = todoPopupPriorityInput.value;
            const newNotes = todoPopupNotesInput.value;
            const newProjectName = todoPopupProjectInput.value;

            // Update the existing todo properties
            todo.title = newTitle;
            todo.dueDate = newDueDate;
            todo.priority = newPriority;
            todo.notes = newNotes;

            // Check if the project has changed by comparing with `originalProject`
            console.log(`Comparing originalProject.name: "${originalProject.name}" with newProjectName: "${newProjectName}"`);
            if (originalProject.name !== newProjectName) {
                // Remove the todo from the original project
                console.log('Before removing todo from originalProject:', originalProject.todoList);
                originalProject.todoList = originalProject.todoList.filter(t => t.id !== todo.id);
                console.log('After removing todo from originalProject:', originalProject.todoList);

                // Find the new project and add the todo to its todo list
                const newProject = projects.find(p => p.name === newProjectName);
                console.log('New project identified:', newProject);
                if (newProject) {
                    console.log('Before adding todo to newProject:', newProject.todoList);
                    newProject.todoList.push(todo);
                    console.log('After adding todo to newProject:', newProject.todoList);

                    saveData('projects', projects);
                    const savedData = loadData('projects');
                    console.log('Updated projects after save:', savedData);
                    popupCancel('todo');
                    updateScreen(newProject.name, newProject.todoList);
                } else {
                    console.error(`Project with name "${newProjectName}" not found.`);
                }
            } else {
                // If the project hasn't changed, update the todo in the original project
                const todoIndex = originalProject.todoList.findIndex(t => t.id === todo.id);
                originalProject.todoList[todoIndex] = todo;

                // Save data and refresh screen
                saveData('projects', projects);
                popupCancel('todo');
                updateScreen(originalProject.name, originalProject.todoList);
            }
        } else {
            console.error('Problem with saving after Save button clicked')
        }
    })
    todoButtonsDiv.appendChild(todoPopupSaveButton);
}

export function addOrEditProject(type, projectId = '') {

    let projects = loadData('projects');
    let currentProject;

    if (type === 'edit' && projectId) {
        for (let project of projects) {
            if (project.id === projectId) {
                currentProject = project;
                break;
            }
        }
        if (!currentProject) {
            console.log(`Project with ID ${projectId} found!`)
            return;
        }
    }

    // Add the overlay window
    const projectPopupOverlay = document.createElement('div');
    projectPopupOverlay.classList.add('project_popup_overlay');
    document.body.appendChild(projectPopupOverlay);

    // Add the Grid layout
    const projectPopupGrid = document.createElement('div');
    projectPopupGrid.classList.add('project_popup_grid');
    projectPopupOverlay.appendChild(projectPopupGrid);

    // Add the title, depending on input
    const projectPopupTitle = document.createElement('div');
    projectPopupTitle.classList.add('project_popup_title');
    if (type === 'edit' && projectId) {
        projectPopupTitle.textContent = `Edit '${currentProject.name}'`
    } else if (type === 'add') {
        projectPopupTitle.textContent = 'Add Project';
    } else {
        projectPopupTitle.textContent = 'Error loading project title';
    };
    projectPopupGrid.appendChild(projectPopupTitle);

    // Append the name input
    const projectPopupName = document.createElement('div');
    projectPopupName.classList.add('project_popup_name');
    projectPopupName.classList.add('flex');
    const projectPopupNameLabel = document.createElement('h4');
    projectPopupNameLabel.classList.add('project_popup_name_label');
    projectPopupNameLabel.textContent = 'Name: *';
    projectPopupName.appendChild(projectPopupNameLabel);
    const projectPopupNameInput = document.createElement('input');
    projectPopupNameInput.classList.add('project_popup_name_input');
    projectPopupNameInput.setAttribute('type', 'text');
    projectPopupNameInput.setAttribute('name', 'name');
    projectPopupNameInput.setAttribute('id', 'project_name');
    projectPopupNameInput.setAttribute('minlength', '1');
    projectPopupNameInput.setAttribute('tabindex', '0');
    if (type === 'edit' && projectId) {
        projectPopupNameInput.value = currentProject.name;
    }
    projectPopupName.appendChild(projectPopupNameInput);
    projectPopupGrid.appendChild(projectPopupName);

    // Add a label for required:
    const projectRequiredText = document.createElement('div');
    projectRequiredText.classList.add('project_required_text');
    projectRequiredText.textContent = '* = Required field'
    projectPopupGrid.appendChild(projectRequiredText);

    // Add a buttons container
    const projectButtonsDiv = document.createElement('div');
    projectButtonsDiv.classList.add('project_buttons_div');
    projectButtonsDiv.classList.add('flex');
    projectPopupGrid.appendChild(projectButtonsDiv);

    // Append the cancel button:
    const projectPopupCancelButton = document.createElement('div');
    projectPopupCancelButton.classList.add('project_cancel_button');
    projectPopupCancelButton.textContent = 'Cancel';
    projectPopupCancelButton.addEventListener('click', () => {
        popupCancel('project');
    });
    projectButtonsDiv.appendChild(projectPopupCancelButton);

    // Append the Delete button:
    if (type === 'edit') {
        const projectPopupDeleteButton = document.createElement('div');
        projectPopupDeleteButton.classList.add('project_delete_button');
        projectPopupDeleteButton.textContent = 'Delete';
        projectPopupDeleteButton.addEventListener('click', () => {
            if (type === 'edit') {
                deleteTodoConfirmationPopup(currentProject.id);
            } else if (type === 'add')
                alert('Can only delete in edit mode!')
            // Change this to something better!
        })
        projectButtonsDiv.appendChild(projectPopupDeleteButton);
    }

    // Append the save button:
    const projectPopupSaveButton = document.createElement('div');
    projectPopupSaveButton.classList.add('project_save_button');
    projectPopupSaveButton.textContent = 'Save';

    projectPopupSaveButton.disabled = true;
    projectPopupSaveButton.style.opacity = 0.5;

    // Checking for required input:
    const validateProjectForm = () => {
        const projectName = projectPopupNameInput.value;

        // Add or remove red border based on whether fields are filled
        if (!projectName) {
            projectPopupNameInput.style.borderColor = 'var(--priority-high)';
        } else {
            projectPopupNameInput.style.borderColor = '';
        }

        // Enable save button only if all required fields are filled
        if (projectName) {
            projectPopupSaveButton.disabled = false;
            // Make button fully visible if all is good
            projectPopupSaveButton.style.opacity = 1;
        } else {
            projectPopupSaveButton.disabled = true;
            // Keep the button visually disabled if validation fails
            projectPopupSaveButton.style.opacity = 0.5;
        }
    };

    // Attach the validation listener to inputs
    projectPopupNameInput.addEventListener('input', validateProjectForm);

    // Immediately validate the form to check initial input states
    validateProjectForm();

    projectPopupSaveButton.addEventListener('click', () => {
        const newProjectName = projectPopupNameInput.value;

        if (type === 'add') {
            if (newProjectName === '') {
                alert('Please provide a name for the project.');
                return; // Stop the save process if name is empty
            }
            createNewProject(newProjectName);
            popupCancel('project');

        } else if (type === 'edit') {
            currentProject.name = newProjectName;
            saveData('projects', projects);
            popupCancel('project');

        } else {
            console.log('Problem with saving after Save button clicked')
        }
        renderSidebar();
        updateScreen(currentProject.name, currentProject.todoList)
    });
    projectButtonsDiv.appendChild(projectPopupSaveButton);
}

function deleteProject(projectId) {
    let currentData = loadData('projects');
    let currentProjectIndex;

    if (projectId) {
        currentProjectIndex = currentData.findIndex(project => project.id === projectId)

        // Check for error:
        if (currentProjectIndex === -1) {
            console.error(`Project with ID ${projectId} not found!`);
            return;
        }

        currentData.splice(currentProjectIndex, 1);
        saveData('projects', currentData);
        saveState('state', 'default');
        updateScreen();
        console.log(`Project with ID ${projectId} deleted successfully!`);
    }
};

function popupCancel(type) {
    if (type === 'todo') {
        const target = document.querySelector('.todo_popup_overlay');
        const divs = target.querySelectorAll('div');
        divs.forEach(div => div.remove());
        target.remove();
    } else if (type === 'project') {
        const target = document.querySelector('.project_popup_overlay');
        const divs = target.querySelectorAll('div');
        divs.forEach(div => div.remove());
        target.remove();
    } else if (type === 'delete') {
        // Will fill in later when delete functionality is complete
    } else {
        console.error('Overlay not found. Cancel aborted.');
    }
};

function deleteTodoConfirmationPopup(project) {
    // Add the overlay window
    const confirmationPopupOverlay = document.createElement('div');
    confirmationPopupOverlay.classList.add('confirmation_popup_overlay');
    document.body.appendChild(confirmationPopupOverlay);

    // Add the Grid layout
    const confirmationPopupGrid = document.createElement('div');
    confirmationPopupGrid.classList.add('confirmation_popup_grid');
    confirmationPopupOverlay.appendChild(confirmationPopupGrid);

    // Add the message to the popup
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('confirmation_message');
    confirmationMessage.textContent = `Are you sure you want to delete this todo? This cannot be undone.`
    confirmationPopupGrid.appendChild(confirmationMessage);

    // Add a buttons container
    const confirmationButtonsDiv = document.createElement('div');
    confirmationButtonsDiv.classList.add('confirmation_buttons_div');
    confirmationButtonsDiv.classList.add('flex');
    confirmationPopupGrid.appendChild(confirmationButtonsDiv);

    // Append the cancel button
    const confirmationCancelButton = document.createElement('div');
    confirmationCancelButton.classList.add('confirmation_cancel_button');
    confirmationCancelButton.textContent = 'Cancel';
    confirmationCancelButton.addEventListener('click', () => {
        confirmationPopupOverlay.remove();
    });
    confirmationButtonsDiv.appendChild(confirmationCancelButton);

    // Append the confirm button
    const confirmationConfirmButton = document.createElement('div');
    confirmationConfirmButton.classList.add('confirmation_confirm_button');
    confirmationConfirmButton.textContent = 'Delete';
    confirmationConfirmButton.addEventListener('click', () => {
        confirmationPopupOverlay.remove();
        deleteProject(project)
        popupCancel('project');
        renderSidebar();
    });
    confirmationButtonsDiv.appendChild(confirmationConfirmButton);
}


window.addOrEditTodo = addOrEditTodo;