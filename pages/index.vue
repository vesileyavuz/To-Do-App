<template>
    
    <div class="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg p-4 ">
            <h1 class=" text-pink-600 gradient-text italic font-bold">TO-DO</h1>
            <div class="bg-gradient-to-r from-pink-500 to-violet-500 h-2 w-50 my-4"></div>

            <form @submit.prevent="handleAddTodo" class="flex mb-4">
                <input v-model="newTodo" type="text" class="border border-gray-300 dark:border-white mr-4 rounded-xl" placeholder="Yeni görev ekle">
                <button class="bg-indigo-500 hover:bg-fuchsia-500 text-white py-2 px-4 rounded-xl">Ekle</button>
            </form>
            <div class="task-list-container overflow-y-auto max-h-96">
            <table class="min-w-full table-auto border-separate border-spacing-2 border border-white dark:border-white rounded-xl">
                <thead>
                    <tr>
                        <th class=" text-pink-600 border border-gray-700 dark:border-white rounded-xl">GÖREVLER</th>
                    </tr>
                </thead>
                <tbody>
                    <TodoItem
                        v-for="todo in todos"
                        :key="todo.id"
                        :todo="todo"
                        :updateTodo="updateTodo"
                        :deleteTodo="deleteTodo"/>
                </tbody>
            </table>
            </div>
        </div>
</template>


<script setup>
import { ref } from 'vue';
import useTodos from '~/composables/useTodos';
import TodoItem from '~/components/TodoItem.vue';

const { todos, addTodo, updateTodo, deleteTodo, fetchTodos } = useTodos();
const newTodo = ref('');

const handleAddTodo = () => {
    if (newTodo.value.trim() === '') return;
    addTodo(newTodo.value);
    newTodo.value = '';
};

onMounted(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos.value = JSON.parse(savedTodos); // LocalStorage'dan veriyi alıp, todos'a atayın
    }
});

</script>