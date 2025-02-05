// Selecionar elementos
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Recuperar tarefas do LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Função para salvar no LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
}

// Função para renderizar tarefas
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Função para alternar status da tarefa (concluído/não concluído)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Função para deletar tarefa com animação
function deleteTask(index) {
    const taskItems = document.querySelectorAll(".task-item");
    const taskToRemove = taskItems[index];

    if (taskToRemove) {
        taskToRemove.classList.add("removing");

        // Espera a animação terminar antes de remover
        setTimeout(() => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }, 300);
    }
}

// Evento para adicionar tarefa
addTaskBtn.addEventListener("click", addTask);

// Renderizar tarefas ao carregar a página
renderTasks();
