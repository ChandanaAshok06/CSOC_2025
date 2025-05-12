document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach((task) => {
            if (!task.hasOwnProperty("lastNotified")) {
                task.lastNotified = null;
            }
            tasks.push(task);
        });
        updateTasksList();
        updateStats();
    }

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
        document.getElementById("themeToggle").innerText = "☀️";
    }

    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const text = taskInput.value.trim();
    const dueDate = taskDate.value;

    if (text && dueDate) {
        tasks.push({ text: text, dueDate: dueDate, completed: false, lastNotified: null });
        taskInput.value = "";
        taskDate.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    taskInput.value = tasks[index].text;
    taskDate.value = tasks[index].dueDate;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const checkReminder = (task, index) => {
    const taskDueDate = new Date(task.dueDate);
    const today = new Date();

    const taskDateStr = taskDueDate.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];

    if (
        !task.completed &&
        taskDateStr === todayStr &&
        task.lastNotified !== todayStr
    ) {
        if (Notification.permission === "granted") {
            new Notification("Task Reminder", {
                body: `Your task "${task.text}" is due today!`,
                icon: "icon.png",
            });
            tasks[index].lastNotified = todayStr;
            saveTasks();
        }
    }
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completedTasks}/${totalTasks}`;

    if (tasks.length && completedTasks === totalTasks) {
        blast();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const dateObj = new Date(task.dueDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const taskDueDate = `${day}-${month}-${year}`;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <span class="due-date">${taskDueDate}</span>
                <div class="icons">
                    <img src="edit.jpg" onclick="editTask(${index})" />
                    <img src="bin.jpg" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
        checkReminder(task, index);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    document.getElementById("themeToggle").innerText = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

const blast = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
};
