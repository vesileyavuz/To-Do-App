import { ref, onMounted, computed } from 'vue';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const todos = ref<Todo[]>([]);

const fetchTodos = async () => {
    try {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            todos.value = JSON.parse(storedTodos);
        } else {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!response.ok) {
                throw new Error("Görevler yüklenemedi.");
            }
            todos.value = await response.json();
            localStorage.setItem('todos', JSON.stringify(todos.value));
        }
    } catch (error) {
        alert("Görevler yüklenirken hata oluştu.");
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
    } catch (error) {
        alert("Görev eklenirken hata oluştu.");
    }
};

const updateTodo = async (id: number, newTitle: string) => {
    if (!newTitle.trim()) return;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: newTitle }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Görev güncellenemedi.");
        }

        const updatedTodo = await response.json();
        const index = todos.value.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.value[index].title = updatedTodo.title;
        }
        localStorage.setItem('todos', JSON.stringify(todos.value));
        await fetchTodos();
        alert('Görev başarıyla güncellendi');
    } catch (error) {
        alert('Görev güncellenirken bir hata oluştu');
    }
};

const deleteTodo = async (id: number) => {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE",
        });
        todos.value = todos.value.filter(todo => todo.id !== id);
    } catch (error) {
        alert("Görev silinirken hata oluştu.");
    }
};

const completedTodos = computed(() => todos.value.filter(todo => todo.completed));
const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed));

onMounted(fetchTodos);

export default function useTodos() {
    return {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        completedTodos,
        pendingTodos
    };
}