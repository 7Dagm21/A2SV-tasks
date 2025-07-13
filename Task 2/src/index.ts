type Task={
    text: string;
}

let tasks: Task[]=[];

window.addEventListener("load", () => {
  loadTasks();
});


function addTask() {
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = { text: taskText };
  tasks.push(task);
  saveTasks();

  renderTasks();
  taskInput.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  if (!taskList)
    return;
  (taskList as HTMLUListElement).innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input") as HTMLInputElement;
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      li.classList.toggle("strikethrough", checkbox.checked);
    });
    

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(taskText);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      editTask(index);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function editTask(index: number):void {
  const task = tasks[index];
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = function () {
    const newText = input.value.trim();
    if (newText !== "") {
      tasks[index].text = newText;
      saveTasks();
      renderTasks();
    }
  };

  li.appendChild(input);
  li.appendChild(saveButton);

  const taskList = document.getElementById("taskList") as HTMLUListElement;
  taskList.replaceChild(li, taskList.childNodes[index]);
}

function deleteTask(index: number):void {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}
