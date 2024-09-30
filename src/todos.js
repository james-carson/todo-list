export class Todos {

// Todo item constructor:
    constructor(title, dueDate, priority, notes, complete) {
        this.title = title
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.complete = complete
    }

// Method to edit items:
    editTodo(newTitle, newDueDate, newPriority, newNotes) {
        this.title = newTitle || this.title;
        this.dueDate = newDueDate || this.dueDate;
        this.priority = newPriority || this.priority;
        this.notes = newNotes || this.notes;
}

// Method to toggle todo as complete/incomplete:
toggleComplete() {
    this.complete = !this.complete;
}

// Deleting will be done through Projects
}