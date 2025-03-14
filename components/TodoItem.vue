<template>
    <tr class="p-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-200 rounded-md">
        
        <input type="checkbox" :checked="todo.completed" @click="completeTodo(todo.id)" />
        <td :class="{ 'text-green-400': todo.completed, 'text-gray-800': !todo.completed }">
            {{ todo.completed ? "Tamamlandı" : "Devam Ediyor" }}
        </td>
        <td>
            <span 
            :class="{ 'line-through text-gray-600': todo.completed }"
            class="mx-2 flex-1 cursor-pointer"
            @click="updateTodo">{{ todo.title }}
            </span>
        </td>
        <td class="text-center">  
            <NuxtLink :to="`/todos/${todo.id}`" class="transition-all bg-blue-400 hover:bg-blue-500 text-white rounded-md mx-2 px-2">Güncelle</NuxtLink>
            <button @click="deleteTodo(todo.id)" class="transition-all bg-red-400 hover:bg-red-500 text-white rounded-md mx-2 px-2">Sil</button>
        </td>
        
            
    </tr>
</template>

<script setup>
defineProps({
    todo: Object,
    updateTodo: Function,
    deleteTodo: Function,
    completeTodo: Function
});
</script>

<style scoped>
.line-through {
    text-decoration: line-through;
}
</style>