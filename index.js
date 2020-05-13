"use strict";

var newTask = document.getElementById("inputTask");
var taskLists = [];
// var _filterTaskLists = [];
var _currentTab = "all";

//render tasklist
function render(taskLists) {
  var myTable = "";
  if (taskLists.length == 0) {
    myTable += "<div class='tr'> nothing to do... </div>";
  }

  for (var i = 0; i < taskLists.length; i++) {
    if (taskLists[i].isComplete) {
      myTable += "<div class='tr'><div class='td leftTd'>" + i + "</div><div class='td leftTd complete'>";
    }
    else {
      myTable += "<div class='tr'><div class='td leftTd'>" + i + "</div><div class='td leftTd'>";
    }
    myTable += taskLists[i].text + "</div>" +
      "<div class='td rightTd'><button class='deleteBtn' onclick ='remove(" + taskLists[i].id + "," + i + ")'>delete</button></div>" +
      "<div class='td rightTd'><button class='editBtn'onclick ='edit(" + taskLists[i].id + "," + i + " )'>edit</button></div>" +
      "<div class='td rightTd'><button class='completeBtn' onclick ='Complete(" + taskLists[i].id + "," + i + ")'>complete</button></div>" +
      "</div>";
  }
  document.getElementById("todoListTable").innerHTML = myTable;
}

//add to list
function add() {
  var newTodo = newTask.value;
  if (!newTodo) {
    alert("plese enter your new task!");
    return;
  }
  var task = {
    id: taskLists.length > 0 ? taskLists[taskLists.length - 1].id + 1 : 1,
    text: newTodo,
    isComplete: false
  }
  taskLists.push(task);
  newTask.value = "";
  filterTaskList(_currentTab);
}

//when user click the complete button
function Complete(id) {
  taskLists = taskLists.map(todo =>
    todo.id === id ? { id: todo.id, text: todo.text, isComplete: !todo.isComplete } : todo);
  filterTaskList(_currentTab);
}

//when user click the delete button
function remove(id) {
  if (!confirm("Are you sure to delete this one?")) { return }
  // taskLists.splice(todo => todo.id == id, 1);
  taskLists = taskLists.filter(todo => todo.id !== id, 1);
  filterTaskList(_currentTab);
}

//when user click the edit button
function edit(id, index) {
  // var editeElem = document.getElementsByClassName("editBtn");
  // var selectTask = editeElem[index].parentElement.parentElement.childNodes[1].textContent;

  var selectTask = event.target.parentElement.parentElement.childNodes[1].textContent;
  var editedTask = prompt("please edit task", selectTask);

  if (!editedTask) return
  taskLists = taskLists.map(todo =>
    todo.id === id ? { id: todo.id, text: editedTask, isComplete: todo.isComplete } : todo);

  filterTaskList(_currentTab);
}

//when user click one button in link List
function tabLinkClick(myButton, currentTab) {
  _currentTab = currentTab;
  filterTaskList(currentTab);

  //set active class for current tab 
  var tabLink = document.getElementsByClassName("tabLink");
  for (let index = 0; index < tabLink.length; index++) {
    tabLink[index].classList.remove("active");
  }
  myButton.classList.add("active");
}

//filter taskList acording selected tab
function filterTaskList(currentTab) {
  switch (currentTab) {
    case "active":
      render(taskLists.filter(taskLists => !taskLists.isComplete));
      break;
    case "complete":
      render(taskLists.filter(taskLists => taskLists.isComplete));
      break;
    default:
      render(taskLists);
      break;
  }
}


