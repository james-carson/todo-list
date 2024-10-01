// Here we have a class for todos, which constructs new projects (which include todos) and contains methods
export class Projects {

    // Constructor for Projects:
    constructor(name, todos) {
        this.name = name
        this.todos = todos
    }

    // Add a todo to the project
    addTodo(todo) {
        this.todos.push(todo);
    }

    // Remove a todo from the project by index or reference
    removeTodo(todoIndex) {
        this.todos.splice(todoIndex, 1);
    }

    // Get all todos so that they can be viewed
    getTodos() {
        return this.todos;
    }

    // Get a specific todo by index - Is this useful? Better to sort by dates etc?
    getTodoByIndex(index) {
        return this.todos[index];
    }
}