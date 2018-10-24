<template>
    <div class="ui segment grid">
        <div class="thirteen wide column title">
            
            <div v-if="!isEditing">
                <i class="check green icon" v-show="todo.done"></i>
                <i class="clock outline yellow icon" v-show="!todo.done"></i>
                {{ todo.title }}
            </div>

            <div class="ui form" v-else>
                <div class="field">
                    <input type="text" v-model="todo.title" @keyup.esc="cancelEdit(todo)">
                </div>
            </div>
        </div>

        <div class="three wide column right aligned">
            
            <div class="ui floating pointing top right dropdown icon button teal basic" v-show="!isEditing">
                <i class="dropdown icon"></i>
                <div class="menu">
                    <div class="item" @click="showForm">
                        <i class="edit icon"></i> Edit Todo
                    </div>
                    <div class="item" @click="removeTodo(todo)">
                        <i class="trash  icon"></i> Remove Todo
                    </div>
                    <div class="item" v-if="!todo.done" @click="updateTodoStatus(todo, true)">
                        <i class="check icon"></i> Mark as completed
                    </div>
                    <div class="item" v-else @click="updateTodoStatus(todo, false)">
                        <i class="clock outline icon"></i> Mark as pending
                    </div>
                </div>
            </div>

            <button class="ui primary button fluid" v-on:click="saveTodo(todo)" v-show="isEditing">
                Save
            </button>
            
        </div>
    </div>
    
</template>

<script type="text/javascript">

export default {
    props: ['todo'],
    data() {
        return {
            isEditing: false,
            todoTitleCache: ''
        }
    },
    mounted() {
        $('.ui.dropdown')
        .dropdown();
    },
    methods: {
        showForm() {
            this.isEditing = true;
            this.todoTitleCache = this.$props.todo.title;
        },

        hideForm() {
            this.isEditing = false;
        },

        cancelEdit(todo) {
            this.isEditing = false;
            todo.title = this.todoTitleCache;
        },

        saveTodo(todo) {
            if (todo.title.length < 1) {
                this.cancelEdit(todo);
                return;
            }

            this.$emit("todo:update", todo);

            this.isEditing = false;
            this.todoTitleCache = '';
        },
        
        removeTodo(todo) {
            this.$emit("todo:remove", todo.id);
        },

        updateTodoStatus(todo, status) {
            todo.done = status;
            this.saveTodo(todo);
        }
    }
};

</script>

<style>
.title {
    font-size: 16px;
}
.ui.grid+.grid {
    margin-top: 0;
}
</style>