// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions

function addTodo(event) {
    // console.log("Hello");
    // Prevent form from submitting
    event.preventDefault();

    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("completed-btn");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(completedButton);

    // Check trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear todo input value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;

    // Delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            
        }
    });
}

function saveLocalTodos(todo) {
    // Check whether the todo exists
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    // Check whether the todo exists
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        // Check mark button
        const completedButton = document.createElement("button");
        completedButton.classList.add("completed-btn");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        todoDiv.appendChild(completedButton);

        // Check trash button
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        todoDiv.appendChild(trashButton);

        // Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    // Check whether the todo exists
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo.children[0].innerText);
    const todoContent = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoContent), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}