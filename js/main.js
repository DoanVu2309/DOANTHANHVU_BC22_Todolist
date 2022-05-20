const todoInput = document.querySelector('#newTask');
const addTodoButton = document.querySelector('#addItem');
const todoList = document.querySelector('#todo');

let createElements = (value) => {
    // create div container
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create element li 
    const newTodo = document.createElement('li');
    newTodo.innerText= value;
    newTodo.classList.add('todo-item');

    // make newTodo child from todoDiv
    todoDiv.appendChild(newTodo);

    // create button delete
    const deleteButton = document.createElement('buttons');
    deleteButton.classList.add('fas', 'fa-trash', 'remove')
    todoDiv.appendChild(deleteButton);

    
    // make todoDiv child from todoList
    todoList.appendChild(todoDiv);
}

//functions
function addTodo (e) {
    // prevent form to submitting
    e.preventDefault();
    
    createElements( todoInput.value);

    // add item todo list to localstorage
    saveTodoInLocalStorage(todoInput.value);

    // clear Input todo after add todo item
    todoInput.value = "";
}

// function check or delete what user click
let deleteTodo = (e) => {
    const item = e.target;

    // delete item todo list
    if (item.classList[2] === "remove"){
        const todo = item.parentElement;
        removeTodoFromLocalStorage(todo);
        todo.remove();
    }
}

// check if item todo list is already exist in local storage or not
let existOrNot = () => {
    let items
    if (localStorage.getItem('items') === null) {
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items
}

let saveTodoInLocalStorage = (item) => {
    let items = existOrNot();

    items.push(item);

    console.log(items);
    localStorage.setItem("items", JSON.stringify(items));
}

let getTodoFromLocalStorage = () => {

    let items = existOrNot();

    items.forEach(item => {
        
        createElements(item);

    });
}

let removeTodoFromLocalStorage = (item) => {
    
    let items = existOrNot();

    //  set index item want to delete
    const itemIndex = item.children[0].innerText

    // delete element from array with method splice, 1 is number how many element / item we delete
    items.splice(items.indexOf(itemIndex), 1);

    // refresh data in local storage
    localStorage.setItem('items', JSON.stringify(items));
}


// Event Listener
document.addEventListener('DOMContentLoaded', getTodoFromLocalStorage);
addTodoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);