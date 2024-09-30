export class Projects {

    // Constructor for Projects:
    constructor(name, todoList) {
        this.name = name
        this.todoList = todoList
    }

    // Add a todo to the project
    addTodo(todo) {
        this.todoList.push(todo);
    }

    // Remove a todo from the project by index or reference
    removeTodo(todoIndex) {
        this.todoList.splice(todoIndex, 1);
    }

    // Get all todos so that they can be viewed
    getTodos() {
        return this.todoList;
    }

    // Get a specific todo by index - Is this useful? Better to sort by dates etc?
    getTodoByIndex(index) {
        return this.todoList[index];
    }
}