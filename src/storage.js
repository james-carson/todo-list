import { Projects } from './projects';
import { Todos } from './todos';

// Save projects to localStorage, with a key and its data
export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
    // Create a variable, savedProjects, which either parses the data from localStorage,
    // Or creates an empty array if there isn't any (to avoid a crash)
    const savedData = JSON.parse(localStorage.getItem(key)) || [];
    
    // Checks if savedData exists and is an array...
    if (!Array.isArray(savedData)) {
    // And if this is true (it's not an array) returns an empty array
        return []; 
    }
    // Maps over the data (in whichever form) and runs a function on each item
    return savedData.map(loadedProject => {
        // Creates a new variable, project, and creates a new Project class using the name
        // to populate it along with an empty array where the todos will go soon.
        const project = new Projects(loadedProject.name, []);
        
        // For each of these new projects...
        loadedProject.todos.forEach(savedTodo => {
            // Creates a new Todo using the information from the loaded data
            const todo = new Todos(
                savedTodo.id,
                savedTodo.title,
                savedTodo.dueDate,
                savedTodo.priority,
                savedTodo.notes,
                savedTodo.complete
            );
            // Adds the relevant todo to the relevant project
            project.addTodo(todo);
        });
        console.log(project)
        return project;
    });
}
// ^^This seems to be working at the momet^^

window.saveData = saveData;
window.loadData = loadData;