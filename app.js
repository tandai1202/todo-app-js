const todoInput = document.querySelector(".input");
const todoList = document.querySelector(".todo-list");
const filters = document.querySelectorAll(".filters li");
const clearAll = document.querySelector(".clear-btn");

let todos = JSON.parse(localStorage.getItem("todo-list"));

let editId;
let isEdited = false;

todoInput.addEventListener("keyup", (e) => {
  let todoVal = todoInput.value.trim();
  if (e.key == "Enter" && todoVal) {
    if (!isEdited) {
      if (!todos) {
        todos = [];
      }
      let todoInfo = { name: todoVal, status: "uncompleted" };
      todos.push(todoInfo);
    } else {
      isEdited = false;
      todos[editId].name = todoVal;
    }
    todoInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    renderTodo("all");
  }
});

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("li.active").classList.remove("active");
    btn.classList.add("active");
    renderTodo(btn.id);
  });
});

clearAll.addEventListener("click", () => {
  isEdited = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  renderTodo("");
});

function renderTodo(filter) {
  let li = "";
  todos.forEach((todo, id) => {
    let isChecked = todo.status == "completed" ? "checked" : "";
    if (filter == todo.status || filter === "all") {
      li += `<li class="todo-item">
      <label for="${id}">
      <input onclick="toggleStatus(this)" type="checkbox" id="${id}" class="input-checkbox" ${isChecked} />
      <p class="${todo.status == "completed" ? "completed" : ""}">${
        todo.name
      }</p>
      </label>
      
      <ul class="menu">
      <li onclick="editTodo(${id}, '${
        todo.name
      }')"><i class="fa-solid fa-pen"></i></li>
      <li onclick="deleteTodo(${id})"><i class="fa-solid fa-trash"></i></li>
      </ul>
      </li>`;
    }
  });
  todoList.innerHTML = li || `<span>You don't have any todo here</span>`;
}

renderTodo("all");

function toggleStatus(selector) {
  let todoSelector = selector.parentElement.lastElementChild;
  if (selector.checked) {
    todoSelector.classList.add("completed");
    todos[selector.id].status = "completed";
  } else {
    todoSelector.classList.remove("completed");
    todos[selector.id].status = "uncompleted";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function deleteTodo(todoId) {
  todos.splice(todoId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  renderTodo("all");
}

function editTodo(todoId, todoName) {
  editId = todoId;
  isEdited = true;
  todoInput.value = todoName;
  todoInput.focus();
}
