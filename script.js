document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("allTasks").addEventListener("click", showAll);
document.getElementById("completedTasks").addEventListener("click", showCompleted);
document.getElementById("pendingTasks").addEventListener("click", showPending);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    document.getElementById("taskList").innerHTML = "";
    tasks.forEach((task, index) => createTaskElement(task, index));
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() === "") return;

    let newTask = { text: taskInput.value, completed: false };
    tasks.push(newTask);
    saveTasks();
    createTaskElement(newTask, tasks.length - 1);
    taskInput.value = "";
}

function createTaskElement(task, index) {
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="toggleTask(${index})">✅</button>
        <button onclick="deleteTask(${index})">❌</button>
    `;
    document.getElementById("taskList").appendChild(li);
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    loadTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
}

function showAll() {
    loadTasks();
}

function showCompleted() {
    let filtered = tasks.filter(task => task.completed);
    renderFiltered(filtered);
}

function filterTasks(condition) {
    let filtered = tasks.filter(condition);
    document.getElementById("taskList").innerHTML = "";
    filtered.forEach((task, index) => createTaskElement(task, index));
}

function showCompleted() {
    filterTasks(task => task.completed);
}

function showPending() {
    filterTasks(task => !task.completed);
}

