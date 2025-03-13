<template>
    <div class="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg p-8 h-[80vh]">
        <div>
            <h1 class="text-3xl font-extrabold text-center text-pink-600 mb-6">To-Do List</h1>

            <table class="min-w-full table-auto border-separate border-spacing-2 border border-white dark:border-white rounded-xl">
                <thead>
                    <tr>
                        <th class="text-pink-600 text-left font-semibold py-3 px-6 border-b">To-Do Detay</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="todo">
                        <td class="px-6 py-4 text-gray-800">
                            <p class="text-pink-600 text-left font-semibold py-3 px-6 border-b">Görev: {{ todo.title }}</p>
                            <p class="text-pink-600 text-left font-semibold py-3 px-6 border-b">Durum:
                                <span :class="{ 'text-left font-semibold py-3 px-6 border-b text-green-600': todo.completed, 'text-gray-800': !todo.completed }">
                                    {{ todo.completed ? "Tamamlandı" : "Devam Ediyor" }}
                                </span>
                            </p>

                            <div class="mt-4">
                                <input v-model="updatedTitle" type="text" class="border border-gray-300 p-3 rounded-md w-full mb-4" placeholder="To-Do Güncelle">
                                <button @click="updateTodo" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold">
                                    Güncelle
                                </button>
                            </div>

                            <NuxtLink to="/" class="mt-6 inline-block text-blue-500 hover:underline text-center">Geri Dön</NuxtLink>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="px-6 py-4 text-center font-bold text-gray-800">To-Do Yükleniyor...</td>
                    </tr>
                </tbody>
            </table>              
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";


const route = useRoute();
const router = useRouter();
const todo:any = ref(null);
const updatedTitle = ref("");


const fetchTodo = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${route.params.id}`); // API den veri çekeriz.
    if (!response.ok) {
      throw new Error("Görev bulunamadı!");
    }
    todo.value = await response.json();
    updatedTitle.value = todo.value.title;

//Local storageye kaydediyoruz.
    localStorage.setItem(`todo-${route.params.id}`, JSON.stringify(todo.value));
    
  } catch (error) {
    //API çağrısı başarısız olursa local storage kontrol edilir.
    const localTodo = localStorage.getItem(`todo-${route.params.id}`);

    if (localTodo) {
        //LocalStorage da veri varsa bu kullanılır.
        todo.value = JSON.parse(localTodo);
        updatedTitle.value = todo.value.title;
        alert("Görev localStorage'dan alındı.")
    } else {
        alert("Veri Bulunamadı!");
    }
  }
};

const updateTodo = async () => {
    debugger;
  if (!updatedTitle.value.trim()) return;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${route.params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...todo.value, title: updatedTitle.value
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
    const updateTodo = await response.json();
    todo.value = updateTodo;

    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const index = todos.findIndex((t:any )=> t.id == todo.value.id );
    if (index !== -1) {
        todos[index] = updateTodo;
         
    }
    localStorage.setItem('todos', JSON.stringify(todos));  
    alert("Görev başarıyla güncellendi.")

    router.push('/');  
  } catch (error) {
    alert("Bir hata oluştu! Lütfen tekrar deneyin.");
  }
};


onMounted(() => {  // To-Do detayda veriyi getiriyor.
    fetchTodo();
});
</script>
