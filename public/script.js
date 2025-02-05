// Selecionar elementos do DOM
const taskInput = document.getElementById("taskInput"); // Campo de entrada de texto para tarefas
const addTaskBtn = document.getElementById("addTaskBtn"); // Botão para adicionar nova tarefa
const taskList = document.getElementById("taskList"); // Lista onde as tarefas serão exibidas

// Array para armazenar as tarefas
let tasks = []; // Inicializa um array vazio para armazenar as tarefas

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim(); // Pega o texto digitado no campo de entrada e remove espaços extras
    if (taskText !== "") { // Verifica se o campo não está vazio
        // Adiciona a tarefa ao array com o status de "não concluída"
        tasks.push({ text: taskText, completed: false });
        taskInput.value = ""; // Limpa o campo de entrada após adicionar a tarefa
        renderTasks(); // Chama a função para atualizar a lista de tarefas exibida
    }
}

// Função para renderizar as tarefas na lista
function renderTasks() {
    taskList.innerHTML = ""; // Limpa a lista de tarefas para evitar duplicações
    tasks.forEach((task, index) => { // Itera sobre o array de tarefas
        const taskItem = document.createElement("li"); // Cria um novo item de lista (<li>) para cada tarefa
        taskItem.className = "task-item"; // Atribui uma classe CSS para o item
        taskItem.innerHTML = `
            <span>${task.text}</span> <!-- Exibe o texto da tarefa -->
            <button class="delete-btn" onclick="deleteTask(${index})">✕</button> <!-- Botão para deletar a tarefa -->
        `;
        taskList.appendChild(taskItem); // Adiciona o item à lista de tarefas no HTML
    });
}

// Função para deletar uma tarefa
function deleteTask(index) {
    tasks.splice(index, 1); // Remove a tarefa do array de acordo com o índice
    renderTasks(); // Atualiza a lista de tarefas após a remoção
}

// Evento que dispara a função addTask quando o botão de adicionar é clicado
addTaskBtn.addEventListener("click", addTask);

// Renderiza as tarefas quando a página é carregada
renderTasks();
