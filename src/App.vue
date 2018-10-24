<template>
    <div class="ui text container" id="app">
        <h3 class="ui center aligned header">Vue Todo App</h3>
        
        <div class="ui segments">
            <div class="ui segment grid">

                <div class="eight wide column center aligned">
                    Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}
                </div>

                <div class="eight wide column center aligned">
                    Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}
                </div>

            </div>
            
            <div class="ui segment grid">

                <div class="thirteen wide column title">
                    <div class="ui form">
                        <div class="field">
                            <input type="text" v-model="inputVal" @keyup.enter="addTodo()" placeholder="What needs to be done?">
                        </div>
                    </div>
                </div>

                <div class="three wide column title">
                    <button class="ui positive button fluid" @click="addTodo()">
                        Add
                    </button>
                </div>

            </div>
        </div>
        
        <todo-list v-bind:todos="filteredTodos" v-on:todos:update="updateTodos"></todo-list>

        <div class="filters" v-if="todos.length">
            <a class="ui label" v-bind:class="{ teal: visibility == 'all' }" @click="filterTodos('all')">
                <i class="tasks icon"></i> All
            </a>

            <a class="ui label" v-bind:class="{ green: visibility == 'completed' }" @click="filterTodos('completed')">
                <i class="check icon"></i> Completed
            </a>

            <a class="ui label" v-bind:class="{ yellow: visibility == 'pending' }" @click="filterTodos('pending')">
                <i class="clock outline icon"></i> Pending
            </a>
        </div>
        
    </div>
</template>

<script>

import TodoList from './components/TodoList';
import TodoService from './services/TodoService.js';

export default {
    name: 'app',
    components: {
        TodoList
    },
    data() {
        return {
            inputVal: '',
            todos: TodoService.getTodos(),
            visibility: 'all'
        };
    },
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.todos);
        }
    },
    methods: {
        addTodo() {
            if (this.inputVal === '') {
                return;
            }

            let todo = {
                title: this.inputVal,
                done: false
            };

            if (TodoService.addTodo(todo)) {
                this.updateTodos();
                this.inputVal = '';
            }
        },

        filterTodos(filter) {
            this.visibility = filter;
        },

        updateTodos() {
            this.$set(this, "todos", TodoService.getTodos());
        }
    }
    
};

var filters = {
    all: function(todos) {
        return todos;
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.done;
        });
    },
    pending: function(todos) {
        return todos.filter(function(todo) {
            return !todo.done;
        });
    }
}

</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 30px;
}
.filters {
    margin-top: 10px;        
}
</style>
