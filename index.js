if (!localStorage.getItem("todo")) {
  localStorage.setItem("todo", JSON.stringify([]));
}

// Defining Elements
let title = document.getElementById("title");
let desc = document.getElementById("description");
let sdate = document.getElementById("sdate");
let edate = document.getElementById("edate");
let ele = document.getElementsByName("rbutton");
let submit = document.getElementById("submit");

// Get existing array from localstorage
let todos = JSON.parse(localStorage.getItem("todo"));
console.log(todos.length);

// if there is no todo then print no todos
if (todos.length == 0) {
  let display = document.getElementById("display");
  display.innerHTML = "<h1>NO TODOS TO DISPLAY</h1>";
}

// Created rendertodo function to render existing todos 
const renderTodos = (todos) => {
  console.log("pass");
  let display = document.getElementById("display");
  if (todos.length !== 0) {
    display.innerHTML = null;
  }
  for (let i = 0; i < todos.length; i++) {
    let divForTodo = document.createElement("div1");
    let titleDisplay = document.createElement("h3");
    let descriptionDisplay = document.createElement("p1");
    let sdateDisplay = document.createElement("code");
    let edateDisplay = document.createElement("code");
    let radioDisplay = document.createElement("p1");
    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");

    divForTodo.id = "displayTodo";
    divForTodo.style.display = "flex";
    editbtn.textContent = "edit";
    deletebtn.textContent = "delete";
    deletebtn.id = i;
    editbtn.id = "e" + i;

    display.appendChild(divForTodo);
    divForTodo.appendChild(titleDisplay);
    divForTodo.appendChild(descriptionDisplay);
    divForTodo.appendChild(sdateDisplay);
    divForTodo.appendChild(edateDisplay);
    divForTodo.appendChild(radioDisplay);
    divForTodo.appendChild(editbtn);
    divForTodo.appendChild(deletebtn);

    titleDisplay.innerHTML = todos[i].title;
    descriptionDisplay.innerHTML = todos[i].desc;
    sdateDisplay.innerHTML = todos[i].sdate;
    edateDisplay.innerHTML = todos[i].edate;
    radioDisplay.innerHTML = todos[i].radio;
  }
};

// when page render this will run
(function () {
  // your page initialization code here
  // the DOM will be available here
  renderTodos(todos);
})();

// Add todo eventListener
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let radio = 0;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) radio = i;
  }

  const dict = ["In Progress", "Pending", "Completed"];

  const todo = {
    title: title.value,
    desc: desc.value,
    sdate: sdate.value,
    edate: edate.value,
    radio: dict[radio],
  };
  todos.push(todo);
  localStorage.setItem("todo", JSON.stringify(todos));

  renderTodos(todos);
  window.location.reload();
});

// Code to add events in edit and delete button (for every todos)
for (let j = 0; j < todos.length; j++) {
  let deletebtnOfj = document.getElementById(j);
  let editbtnOfj = document.getElementById("e" + j);
  deletebtnOfj.addEventListener("click", (e) => {
    e.preventDefault();
    todos.splice(j, 1);
    localStorage.setItem("todo", JSON.stringify(todos));
    renderTodos(todos);
    window.location.reload();
  });
  editbtnOfj.addEventListener("click", (e) => {
    document.getElementById("update").disabled = false;
    e.preventDefault();
    console.log(todos[j]);
    title.value = todos[j].title;
    desc.value = todos[j].desc;
    sdate.value = todos[j].sdate;
    edate.value = todos[j].edate;
    const dict = ["In Progress", "Pending", "Completed"];
    // console.log(typeof todos[j].radio);
    let index = dict.findIndex((val) => val === todos[j].radio)
    console.log(index);
    ele[index].checked = true
    localStorage.setItem("edit", j);
  });
}

// When click edit button this code will fetch data from particular todo and render to the form 
document.getElementById("update").addEventListener("click", (e) => {
  e.preventDefault();
  let radio = 0;
  for (let i1 = 0; i1 < ele.length; i1++) {
    if (ele[i1].checked) radio = i1;
  }

  const dict = ["In Progress", "Pending", "Completed"];
  const todo = {
    title: title.value,
    desc: desc.value,
    sdate: sdate.value,
    edate: edate.value,
    radio: dict[radio],
  };
  updateTodo(todo, localStorage.getItem("edit"));
});

// This code will update todo to localstorage
const updateTodo = (todo, id) => {
  todos[id] = todo;
  localStorage.setItem("todo", JSON.stringify(todos));
  renderTodos(todos);
  window.location.reload();
};
