<template>
    <li class="flex justify-between items-center bg-gray-800 shadow p-4 mb-4">
        <span 
        :class="{ 'line-through text-gray-400': todo.completed }"
        class="flex-1 cursor-pointer"
        @click="toggleComplete(todo)"
        >
        {{ todo.title }}
    </span>

    <NuxtLink :to="`/todos/${todo.id}`" class="text-blue-500 hover:text-blue-700 px-2">Detaylar</NuxtLink>
        <button @click="toggleComplete(todo)" class="text-green-600 hover:text-green-700 px-2">Tamamlandı</button>
        <button @click="deleteTodo(todo.id)" class="text-red-600 hover:text-red-700 px-2">Sil</button>
    </li>
</template>

<script setup>
defineProps({
    todo: Object,
    toggleComplete: Function,
    deleteTodo: Function
});

</script>

<style scoped>
.line-through {
    text-decoration: line-through;
}
</style>