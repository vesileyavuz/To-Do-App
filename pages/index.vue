<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-500">
        <div class="mx-auto max-w-md overflow-hidden rounded-xl bg-gray-800 p-6 h-[80vh]">
            <h1 class="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent">TO-DO</h1>

            <div class="bg-gradient-to-r from-pink-500 to-violet-500 h-2 w-50 my-4"></div>

            <form @submit.prevent="handleAddTodo" class="flex mb-4">
                <input v-model="newTodo" type="text" class="border border-gray-300 dark:border-gray-700" placeholder="Yeni görev ekle">
                <button class="bg-indigo-500 hover:bg-fuchsia-500 text-white py-2 px-4 rounded ml-2">Ekle</button>
            </form>
            <div class="max-h-80 overflow-y-auto border rounded-md p-2 shadow-md">
                <ul class="overflow-auto text-white">
                <TodoItem
                    v-for="todo in todos"
                    :key="todo.id"
                    :todo="todo"
                    :toggleComplete="toggleComplete"
                    :deleteTodo="deleteTodo"/>
                </ul>
            </div> 
        </div>
    </div>
</template>

<script setup>
import TodoItem from '~/components/TodoItem.vue';
const { todos, addTodo, toggleComplete, deleteTodo } = useTodos();
const newTodo = ref('');

const handleAddTodo = () => {
    if (newTodo.value.trim() === '') return;
    addTodo(newTodo.value);
    newTodo.value = '';
};
</script>
