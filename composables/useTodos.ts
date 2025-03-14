import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const todos = ref<{ id: number; title: string; completed: boolean }[]>([]);
const newTodoTitle = ref<string>('');
const router = useRouter();

const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos.value = JSON.parse(savedTodos);
    }
};

const saveTodosToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
};

const fetchTodos = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        todos.value = await response.json();
        saveTodosToLocalStorage();
    } catch (error) {
        alert("Görevler yüklenirken hata oluştu.");
        loadTodosFromLocalStorage();
    }
};

const addTodo = async (title:string) => {
    
    if (!title.trim()) return;

    const newTodo: Todo = {
        id: Date.now(), // Todo'ya benzersiz bir id atıyoruz
        title: title,
        completed: false,
        userId: 1
    };

    // Yeni todo'yu localStorage'a kaydediyoruz
    todos.value.push(newTodo);
    saveTodosToLocalStorage();

    // Kullanıcıyı yeni todo'nun detay sayfasına yönlendiriyoruz
    await router.push(`/todos/${newTodo.id}`);  // Detay sayfasına yönlendirme
};

const updateTodo = async (id: number, newTitle: string) => {
    try {
        const index = todos.value.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.value[index].title = newTitle;
            saveTodosToLocalStorage();
        }
    } catch (error) {
        alert("Görev güncellenirken hata oluştu.");
    }
};

const deleteTodo = async (id: number) => {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE",
        });
        todos.value = todos.value.filter(todo => todo.id !== id);
        saveTodosToLocalStorage();
    } catch (error) {
        alert("Görev silinirken hata oluştu.");
    }
};

const completeTodo = async (id:number) => {
    const todo = todos.value.find((t) => t.id == id);
  if (todo) {
    todo.completed = !todo.completed; // Tamamlandı bilgisini tersine çevirdik
    saveTodosToLocalStorage(); //  LocalStorage güncellendi
    alert("Görev durumu değişti.")
  }
};



const completedTodos = computed(() => todos.value.filter(todo => todo.completed));
const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed));

onMounted(fetchTodos);

export default function useTodos() {
    return {
        todos,
        newTodoTitle,
        addTodo,
        updateTodo,
        deleteTodo,
        completedTodos,
        pendingTodos,
        completeTodo
    };
}