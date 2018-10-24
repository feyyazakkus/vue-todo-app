/**
 * TodoService
 * 
 * Contains all storage operations for to do list
 */

const STORAGE_KEY = "vue-todos";

export default {
    
    getTodos() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    },

    addTodo(todo) {        
        let todos = this.getTodos();

        todo.id = this.generateTodoId();
        todos.unshift(todo);

        this.saveTodos(todos);

        return true;
    },

    updateTodo(data) {
        let todos = this.getTodos();

        let todoArr = todos.map(todo => {
            return todo.id == data.id ? data : todo;
        });

        this.saveTodos(todoArr);

        return true;
    },

    removeTodo(id) {
        let todos = this.getTodos();
        
        let todoArr = todos.filter(todo => {
            return todo.id != id;
        });

        this.saveTodos(todoArr);

        return true;
    },

    saveTodos(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    },

    generateTodoId() {
        return Date.now() + Math.random().toString().slice(10);
    }
}
