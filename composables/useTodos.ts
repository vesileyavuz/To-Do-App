import { ref, onMounted, computed } from 'vue';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const todos = ref<Todo[]>([]);

const fetchTodos = async () => {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        todos.value = await response.json();
    }   catch (error) {
        console.error(error);
    }
};

const addTodo = async (title: string) => {
    if (!title.trim()) return;
    const newTodo: Todo = { title, completed: false, userId: 1, id: Date.now() };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: { 'Content-Type': 'application/json' },
        });
        const addedTodo = await response.json();
        addedTodo.id = newTodo.id;
        todos.value.push(addedTodo);

        console.log("Yeni eklenen görev ID:", addedTodo.id);
    }   catch (error) {
        console.error("Görev eklenirken hata oluştu:", error);
    }
};

        const updatedTodo = async (id: number, newTitle: string) => {

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title: newTitle }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error("Görev güncellenemedi.");

        }
        const updatedTodo = await response.json();
        const index = todos.value.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.value[index].title = updatedTodo.title;
        }
        console.log("Görev güncellendi:", updatedTodo);
        
    }   catch (error) {
        console.error("Görev güncellenirken hata oluştu:", error);
    }
};
   const deleteTodo = async (id: number) => {
    console.log("Silinmek istenen görev ID:", id);
    console.log("Silinmeden önceki görev listesi:", todos.value.map(todo => todo.id));
    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE",
        });
        todos.value = todos.value.filter(todo => todo.id !== id);
        console.log("Silindikten sonraki görev listesi:", todos.value.map(todo => todo.id));
    }   catch (error) {
        console.error("Görev silinirken hata oluştu:", error);
    }
};

const completedTodos = computed(() => todos.value.filter(todo => todo.completed));
const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed));

onMounted(fetchTodos);

export default function useTodos() {
    return { todos, addTodo, updatedTodo, deleteTodo, completedTodos, pendingTodos };
}
