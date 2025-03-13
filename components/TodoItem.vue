<template>
    <tr class="p-2 bg-white rounded-md">
        <td class="p-2">
            <span 
            :class="{ 'line-through text-gray-600': todo.completed }"
            class="flex-1 cursor-pointer"
            @click="updateTodo">{{ todo.title }}
            </span>
        </td>
        <td class="text-center">  <NuxtLink :to="`/todos/${todo.id}`" class="text-blue-500 hover:text-blue-700 px-2 bg-white rounded-md">Güncelle</NuxtLink>
            <button @click="deleteTodo(todo.id)" class="transition-all bg-red-600 hover:bg-red-700 text-white rounded-md mx-2 px-2">Sil</button>
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