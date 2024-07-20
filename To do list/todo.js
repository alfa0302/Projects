let tasks = [];
let listItem = document.querySelector('.add input');

document.querySelector('.add button').addEventListener('click', () => {
  if (!listItem.value) {
    alert('You must write something!');
  } else {
    const newTask = { text: listItem.value, checked: false };
    tasks.push(newTask);
    updateTaskDisplay();
    saveData();
  }
  listItem.value = '';
});

function updateTaskDisplay() {
  const listContainer = document.querySelector('.list');
  listContainer.innerHTML = ''; // Clear current list
  tasks.forEach((task, index) => {
    const listItemHTML = `
      <div class="listblk" data-index="${index}">
        <img src="${task.checked ? 'images/checked.png' : 'images/unchecked.png'}" alt="">
        <div class="list-item"><p class="${task.checked ? 'checked' : ''}">${task.text}</p></div>
        <button>&#215;</button>
      </div>`;
    listContainer.insertAdjacentHTML('beforeend', listItemHTML);//insetead of listItemHTML +=
  });
  document.querySelector('.list-display').style.display = tasks.length ? 'block' : 'none'; // Hide if no tasks
}

document.querySelector('.list').addEventListener('click', function (e) {
  const listItemElement = e.target.closest('.listblk');
  if (listItemElement) {
    const index = Number(listItemElement.dataset.index);
    if (index >= 0 && index < tasks.length) { // Ensure index is valid
      if (e.target.tagName === 'P') {
        tasks[index].checked = !tasks[index].checked; // Toggle checked state
        updateTaskDisplay();
        saveData();
      } else if (e.target.tagName === 'BUTTON') {
        tasks.splice(index, 1); // Remove the task from the array
        updateTaskDisplay();
        saveData();
      }
    }
  }
}, true);

function saveData() {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks as JSON
}

function showTask() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (Array.isArray(savedTasks)) {
    tasks = savedTasks; // Load saved tasks
    updateTaskDisplay(); // Update the display
  }
}

// Call showTask when the page loads
document.addEventListener('DOMContentLoaded', showTask);
