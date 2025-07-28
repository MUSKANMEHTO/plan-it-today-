let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push({ name: task, completed: false });
    taskInput.value = "";
    renderTasks();
    updateChart();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  updateChart();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      ${task.name}
      <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Done"}</button>
    `;
    taskList.appendChild(li);
  });
}

function updateChart() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  if (window.chartInstance) window.chartInstance.destroy();

  const ctx = document.getElementById("completionChart").getContext("2d");
  window.chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending"],
      datasets: [{
        data: [completed, total - completed],
        backgroundColor: ["#a18cd1", "#ee9ca7"]
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function startTimer() {
  const input = document.getElementById("timerInput").value;
  let time = parseInt(input) * 60;
  const display = document.getElementById("timerDisplay");

  if (isNaN(time) || time <= 0) {
    display.textContent = "Invalid time";
    return;
  }

  const interval = setInterval(() => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    time--;

    if (time < 0) {
      clearInterval(interval);
      display.textContent = "Time's up!";
    }
  }, 1000);
}

