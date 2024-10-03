import { saveData } from "./storage"

// Here we have a class for todos, which constructs new todos and contains methods
export class Todos {

    // Todo item constructor:
    constructor(title, dueDate, priority, notes, complete) {
        this.title = title
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.complete = complete
    }

    // Method to edit items: -- SHOULD THIS BE MOVED OUT OF THE CLASS?
    editTodo(newTitle, newDueDate, newPriority, newNotes) {
        this.title = newTitle || this.title;
        this.dueDate = newDueDate || this.dueDate;
        this.priority = newPriority || this.priority;
        this.notes = newNotes || this.notes;
    }

    // Method to toggle todo as complete/incomplete  -- SHOULD THIS BE MOVED OUT OF THE CLASS?
    toggleComplete() {
        let currentProjects = loadData('projects');
        this.complete = !this.complete;
        saveData('projects', currentProjects);
    }
}