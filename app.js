// ===== DOM Elements =====
const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// ===== Task Array =====
let tasks = [];

// ===== Update task count badge =====
function updateCount() {
  const n = tasks.length;
  taskCount.textContent = n === 0 ? '0 việc' : `${n} việc`;
}

// ===== Show/hide empty state =====
function toggleEmptyState() {
  const existing = taskList.querySelector('.empty-state');
  if (tasks.length === 0) {
    if (!existing) {
      const li = document.createElement('li');
      li.className = 'empty-state';
      li.innerHTML = `
        <span class="empty-icon">🌿</span>
        <p>Chưa có công việc nào. Hãy thêm một việc mới!</p>`;
      taskList.appendChild(li);
    }
  } else {
    if (existing) existing.remove();
  }
}

// ===== Delete task =====
function deleteTask(index) {
  const items = taskList.querySelectorAll('.task-item');
  if (items[index]) {
    items[index].style.animation = 'slideOut 0.25s ease forwards';
    setTimeout(() => {
      tasks.splice(index, 1);
      renderTasks();
    }, 230);
  }
}

// ===== Render task list =====
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <div class="task-item-left">
        <span class="task-bullet"></span>
        <span class="task-name">${task}</span>
      </div>
      <button class="delete-btn" title="Xóa công việc" onclick="deleteTask(${index})">✕</button>`;
    taskList.appendChild(li);
  });
  toggleEmptyState();
  updateCount();
}

// ===== Add task =====
function addTask() {
  const value = taskInput.value.trim();
  if (!value) {
    taskInput.focus();
    return;
  }
  tasks.push(value);
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

// ===== Event Listeners =====
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// ===== Initial render =====
renderTasks();
