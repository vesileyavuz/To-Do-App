<template>
    <div class="background-container">

        <main class="container mx-auto p-4">
            <slot></slot>
        </main>

        <footer class="fixed bottom-0 w-full text-center py-4 text-gray-600 bg-gray-200">
            <p>&copy; 2025 ToDo List</p>
        </footer>

    </div>
</template>


<style scoped>
.background-container {
  width: 100%;
  height: 100vh; /* Tüm ekran yüksekliği */
  background-image: url('@/assets/images/res.pg.jpg'); 
  background-size: cover;
  background-position: center;
}
</style>