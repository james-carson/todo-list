class Todo {

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

// Dummy data for testing:
const todos = [
    new Todo("Buy groceries", "2024-09-26", "high", "Get milk, bread, and eggs", false),
    new Todo("Finish project report", "2024-09-27", "medium", "Complete the draft and send it for review", false),
    new Todo("Call the plumber", "2024-09-25", "low", "Fix the kitchen sink", true),
    new Todo("Book flight tickets", "2024-09-28", "high", "Look for the cheapest fares", false),
    new Todo("Attend meeting with client", "2024-10-01", "medium", "Prepare the presentation", false),
    new Todo("Pay electricity bill", "2024-09-29", "low", "Check the bill details", true),
    new Todo("Dentist appointment", "2024-09-30", "high", "Teeth cleaning appointment", false),
    new Todo("Renew car insurance", "2024-10-05", "medium", "Compare insurance plans", false),
    new Todo("Plan birthday party", "2024-09-26", "low", "Send out invitations and book the venue", false),
    new Todo("Submit tax returns", "2024-09-30", "high", "Ensure all forms are filled correctly", true)
];

export { todos };