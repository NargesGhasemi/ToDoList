"use strict";

var taskLists = [];
var _filterTaskLists = [];
var _currentTab = "all";

//render tasklist
function render() {
  var myTable = "";
  if (_filterTaskLists.length == 0) {
    myTable += "<tr><td> nothing to do... </td>";
  }

  for (var i = 0; i < _filterTaskLists.length; i++) {
    if (_filterTaskLists[i].isComplete) {
      myTable += "<tr><td class='leftTd'>" + i + "</td><td class='leftTd complete'>";
    }
    else {
      myTable += "<tr><td class='leftTd'>" + i + "</td><td class='leftTd'>";
    }
    myTable += _filterTaskLists[i].text + "</td>" +
      "<td class='rightTd'><button class='deleteBtn' onclick ='remove(" + _filterTaskLists[i].id + "," + i + ")'>delete</button></td>" +
      "<td class='rightTd'><button class='editBtn'onclick ='edit(" + _filterTaskLists[i].id + "," + i + " )'>edit</button></td>" +
      "<td class='rightTd'><button class='completeBtn' onclick ='Complete(" + _filterTaskLists[i].id + "," + i + ")'>complete</button></td>" +
      "</tr>";
  }
  document.getElementById("todoListTable").innerHTML = myTable;
}

//add to list
function add() {
  var newTask = document.getElementById("inputTask");
  if (!newTask.value) {
    alert("plese enter your new task!");
    return;
  }
  var task = {
    id: taskLists.length > 0 ? taskLists[taskLists.length - 1].id + 1 : 1,
    text: newTask.value,
    isComplete: false
  }
  taskLists.push(task);
  newTask.value = "";
  filterTaskList(_currentTab);
  render();
}

//when user click the complete button
function Complete(id) {
  taskLists = taskLists.map(todo =>
    todo.id === id ? { id: todo.id, text: todo.text, isComplete: !todo.isComplete } : todo);
  filterTaskList(_currentTab);
  render();
}

//when user click the delete button
function remove(id) {
  if (!confirm("Are you sure to delete this one?")) { return }
  taskLists.splice(todo => todo.id !== id, 1);
  filterTaskList(_currentTab);
  render();
}

//when user click the edit button
function edit(id, index) {
  var editeElem = document.getElementsByClassName("editBtn");
  var selectTask = editeElem[index].parentElement.parentElement.childNodes[1].textContent;
  var editedTask = prompt("please edit task", selectTask);

  if (!editedTask) return
  taskLists = taskLists.map(todo =>
    todo.id === id ? { id: todo.id, text: editedTask, isComplete: todo.isComplete } : todo);

  filterTaskList(_currentTab);
  render();
}

//when user click one button in link List
function tabLinkClick(myButton, currentTab) {
  _currentTab = currentTab;
  filterTaskList(currentTab);
  render();

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
      _filterTaskLists = taskLists.filter(taskLists => !taskLists.isComplete);
      break;
    case "complete":
      _filterTaskLists = taskLists.filter(taskLists => taskLists.isComplete);
      break;
    default:
      _filterTaskLists = taskLists;
      break;
  }
}


