<template>
    <div class="ui segments" v-if="todos.length">
        <todo v-for="todo in todos" :key="todo.id" v-bind:todo="todo" @todo:remove="removeTodo" @todo:update="updateTodo"></todo>
    </div>
</template>

<script type = "text/javascript" >

import Todo from './Todo';
import TodoService from '../services/TodoService.js';


export default {
    props: ['todos'],
    components: {
        Todo
    },
    methods: {
        updateTodo(data) {
            if (TodoService.updateTodo(data)) {
                this.$emit('todos:update');
            }  
        },

        removeTodo(todoId) {
            if (TodoService.removeTodo(todoId)) {
                this.$emit('todos:update');
            }
        }
    }
};

</script>
<style>
</style>