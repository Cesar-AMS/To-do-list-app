// Selecionar elementos
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Array para armazenar tarefas
let tasks = [];

// Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
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
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Função para deletar tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Evento para adicionar tarefa
addTaskBtn.addEventListener("click", addTask);

// Renderizar tarefas ao carregar a página
renderTasks();