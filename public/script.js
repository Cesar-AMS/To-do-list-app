// Selecionar elementos
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const toggleDarkMode = document.getElementById("toggleDarkMode");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Salvar e carregar do LocalStorage
const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));
const loadTasks = () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
};

// Adicionar tarefa
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
};

// Renderizar tarefas
const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.onclick = () => toggleTask(index);
        
        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = task.text;
        inputEdit.className = "edit-input hidden";
        
        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.onclick = () => editTask(index, taskText, inputEdit, editBtn);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.onclick = () => deleteTask(index);
        
        taskItem.append(taskText, inputEdit, editBtn, deleteBtn);
        taskList.appendChild(taskItem);
    });
};

// Editar tarefa
const editTask = (index, taskText, inputEdit, editBtn) => {
    const editing = inputEdit.classList.toggle("hidden");
    taskText.style.display = editing ? "none" : "inline";
    editBtn.textContent = editing ? "💾" : "✎";
    if (!editing) {
        tasks[index].text = inputEdit.value;
        taskText.textContent = inputEdit.value;
        saveTasks();
    }
};

// Alternar status da tarefa
const toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

// Deletar tarefa com animação
const deleteTask = (index) => {
    document.querySelectorAll(".task-item")[index].classList.add("removing");
    setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }, 500);
};

// Alternar Dark Mode
toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});
if (localStorage.getItem("darkMode") === "enabled") document.body.classList.add("dark-mode");

// Eventos
document.addEventListener("DOMContentLoaded", loadTasks);
addTaskBtn.addEventListener("click", addTask);
