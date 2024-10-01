import { Projects } from './projects';
import { Todos } from './todos';

// Save projects to localStorage
export function saveData(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// As Todos and Projects are Classes, their methods are not saved when they are added to 
// localStorage (I have seen this termed as 'dehration'). This attempts to solve this 
// issue by mapping the data upon loading it, then setting (re-setting) its prototype
// So that it 'regains' its methods. If this doesn't work, changing the classes to 
// factory functions would be the next step, although I want to try to make classes work.
export function loadData() {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    
    return savedProjects.map(storedProject => {
        const project = new Projects(storedProject.name, []); // Initialize with an empty array for todos
        Object.setPrototypeOf(project, Projects.prototype);
        
        storedProject.todos.forEach(storedTodo => { // Use 'todos' to match your Projects class
            const todo = new Todos(
                storedTodo.title,
                storedTodo.dueDate,
                storedTodo.priority,
                storedTodo.notes,
                storedTodo.complete
            );
            Object.setPrototypeOf(todo, Todos.prototype);
            project.addTodo(todo);
        });
        
        return project;
    });
}


window.saveData = saveData;
window.loadData = loadData;