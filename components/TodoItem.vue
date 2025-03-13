<template>
    <tr class="p-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-200 rounded-md">
        <td class="p-2">
            <span 
            :class="{ 'line-through text-gray-600': todo.completed }"
            class="flex-1 cursor-pointer"
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
    deleteTodo: Function
});
</script>

<style scoped>
.line-through {
    text-decoration: line-through;
}
</style>