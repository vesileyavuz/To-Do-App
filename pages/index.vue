<template>
    
    <div class="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg p-4 ">
            <h1 class=" text-pink-600 gradient-text italic font-bold">TO-DO LİST</h1>
            <div class="bg-gradient-to-r from-pink-500 to-violet-500 h-2 w-50 my-4"></div>

            <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
            <form @submit.prevent="handleAddTodo" class="flex gap-2">
                <input v-model="newTodo" type="text" class="border border-gray-300 dark:border-white p-2 rounded-xl" placeholder="Yeni görev ekle">
                <button class="bg-indigo-500 hover:bg-fuchsia-500 text-white p-2 rounded-xl">Ekle</button>
            </form>
                <input v-model="searchQuery" type="text" placeholder="Görev ara" class="border border-gray-300 dark:border-white p-2 rounded-xl" @input="filteredTodos(searchQuery)"/>
            </div>
               
            <div class="task-list-container overflow-y-auto h-[65vh]">
            <table class="min-w-full table-auto border-separate border-spacing-2 border border-white dark:border-white rounded-xl">
                <thead>
                    <tr>
                        <th class=" text-pink-600 border border-gray-700 dark:border-white rounded-xl"> </th>
                        <th class=" text-pink-600 border border-gray-700 dark:border-white rounded-xl">Durum</th>
                        <th class=" text-pink-600 border border-gray-700 dark:border-white rounded-xl">Görev Adı</th>
                        <th class=" text-pink-600 border border-gray-700 dark:border-white rounded-xl">İşlemler</th>
                                 
                    </tr> 
                </thead>
                <tbody>
                    <TodoItem
                        v-for="todo in todos"
                        :key="todo.id"
                        :todo="todo"
                        :updateTodo="updateTodo"
                        :deleteTodo="deleteTodo"
                        :completeTodo="completeTodo"/>
                </tbody>
            </table>
            </div>
        </div>
</template>


<script setup>
import { ref } from 'vue';
import useTodos from '~/composables/useTodos';
import TodoItem from '~/components/TodoItem.vue';

const { todos, addTodo, updateTodo, deleteTodo, fetchTodos, completeTodo, searchQuery, filteredTodos } = useTodos();
const newTodo = ref('');

const handleAddTodo = () => {
    
    if (newTodo.value.trim() === '') return;
    addTodo(newTodo.value);
    newTodo.value = '';
};


 onMounted(async () => {
     const savedTodos = localStorage.getItem('todos');
     if (savedTodos) {
         //Eğer localStorage'da veriler varsa, veriyi alıp todos'a atıyoruz
         todos.value = JSON.parse(savedTodos);
         
     } else {
         try { // Eğer localStorage'da veri yoksa, servise istek atarak verileri çekiyoruz.
             const response = await fetch('https://jsonplaceholder.typicode.com/todos');

             if (response.ok) {
                 const data = await response.json();
                 todos.value = data;

                 localStorage.setItem('todos', JSON.stringify(data)); // Veriyi LocalStorage kaydediyoruz.
                 
             } else {
                 alert("Veriler alınırken bir hata oluştu.");
             }
         } catch (error) {
             alert("Veriler alınırken bir hata oluştu lütfen tekrar deneyiniz.");
     }
 }
 });

</script>
