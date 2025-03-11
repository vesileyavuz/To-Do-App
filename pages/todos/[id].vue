<template>
    <div class="flex items-center justify-center">
        <div class="max-w-lg mx-auto mt-10">
        <h1 class="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent">Görev Detayı</h1>

        <div v-if="todo" class="bg-gray-800 p-4 rounded-md shadow-md">
            <p class=" text-white text-lg font-semibold">Görev: {{ todo.title}}</p>
            <p class=" text-white mt-2">Durum:
                <span :class="{ 'text-green-600': todo.completed, 'text-red-700': !todo.completed }">
                    {{ todo.completed ? 'Tamamlandı' : 'Tamamlanmadı' }}

                </span>
            </p>

            <div class="mt-4">
                <input v-model="updatedTitle" type="text" class="border border-gray-300 p-2 rounded-md w-full" placeholder="Görev adını güncelle">
                <div class="flex flex-col space-y-2 mt-4">
                    

                </div>
            </div>       
        </div>
    </div>
</div>  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router"

const route = useRoute();
const router = useRouter();
const todo = ref(null);
const updatedTitle = ref("");


const updateTodo = async () => {
};

</script>