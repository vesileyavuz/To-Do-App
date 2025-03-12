<template>
    
    <div class="flex justify-between items-center bg-white shadow p-4 mb-4 rounded-xl">
        <span 
            :class="{ 'line-through text-gray-600': todo.completed }"
            class="flex-1 cursor-pointer"
            @click="updateTodo">{{ todo.title }}
        </span>

        <NuxtLink :to="`/todos/${todo.id}`" class="text-blue-500 hover:text-blue-700 px-2">Güncelle</NuxtLink>
        <button @click="deleteTodo(todo.id)" class="text-red-600 hover:text-red-700 px-2">Sil</button>
    </div>
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