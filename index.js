"use strict";

var taskLists = [];
var i = 0;
var myTable = "";

//when user click the add button
function addBtnClick() {
  var newTask = document.getElementById("inputTask").value;
  if (!newTask) {
    alert("plese enter your new task!");
    return;
  }

  var task = {
    text: newTask,
    isComplete: false
  }
  taskLists.push(task);
  console.log('task list', taskLists);
  createTable(taskLists);
  document.getElementById("inputTask").value = "";
}

//create a table from a input list
function createTable(TaskLists) {
  myTable = "";
  if (TaskLists.length == 0 || !TaskLists.length) {
    myTable += "<tr><td> nothing to do... </td>";
  }
  for (i = 0; i < TaskLists.length; i++) {
    if (TaskLists[i].isComplete) {
      myTable += "<tr><td class='leftTd'>" + i + "</td><td class='leftTd complete'>";
    }
    else {
      myTable += "<tr><td class='leftTd'>" + i + "</td><td class='leftTd'>";
    }
    myTable += TaskLists[i].text + "</td>" +
      "<td class='rightTd'><button class='deleteBtn' onclick='deleteFunc(" + i + ")'>delete</button></td>" +
      "<td class='rightTd'><button class='editBtn'onclick='editFunc(" + i + ")'>edit</button></td>" +
      "<td class='rightTd'><button class='completeBtn' onclick='CompleteFunc(" + i + ")'>complete</button></td>" +
      "</tr>";
  }
  document.getElementById("todoListTable").innerHTML = myTable;
}

//when user click the complete button
function CompleteFunc(id) {
  var complete = document.getElementsByClassName("completeBtn");
  var selectTr = complete[id].parentElement.parentElement.childNodes[1];
  //complete[id].classList.toggle("completeBtn2");
  selectTr.classList.toggle("complete");
  //selectTr.className = "leftTd complete";
  //taskLists[id].isComplete = true;
  //toggle the value of isComplete in taskList object
  if (taskLists[id].isComplete) {
    taskLists[id].isComplete = false;
  }
  else {
    taskLists[id].isComplete = true;
  }
}

//when user click the delete button
function deleteFunc(id) {
  if (!confirm("Are you sure to delete this one?")) {
    return;
  }
  var deleteElem = document.getElementsByClassName("deleteBtn");
  var selectTr = deleteElem[id].parentElement.parentElement;
  selectTr.style.display = "none";
  taskLists.splice(id, 1);
  if (taskLists.length == 0 || !taskLists) {
    var myTable = "";
    myTable += "<tr><td class='leftTd'>nothing to do...</td></tr>";
    document.getElementById("todoListTable").innerHTML = myTable;
  }
}

//when user click the edit button
function editFunc(id) {
  if (taskLists != undefined && taskLists[id] != undefined && taskLists[id].isComplete) {
    alert("this task is completed and edit is not possible.");
    return;
  }
  var editeElem = document.getElementsByClassName("editBtn");
  var selectTask = editeElem[id].parentElement.parentElement.childNodes[1].textContent;
  var editedTask = prompt("please edit task", selectTask);
  if (editedTask == "") {
    alert("plese enter your new task!");
    return;
  }
  else if (editedTask == null) {
    s
    return;
  }
  editeElem[id].parentElement.parentElement.childNodes[1].innerHTML = editedTask;
  taskLists[id].text = editedTask;
}

//when user click one button in link List
function tabLinkClick(myButton, btnName) {
  var mytaskLists = [];

  switch (btnName) {
    case "all":
      mytaskLists = taskLists;
      break;
    case "active":
      for (i = 0; i < taskLists.length; i++) {
        if (!taskLists[i].isComplete) {
          mytaskLists.push(taskLists[i]);
        }
      }
      break;
    case "complete":
      for (i = 0; i < taskLists.length; i++) {
        if (taskLists[i].isComplete) {
          mytaskLists.push(taskLists[i]);
        }
      }
      break;
    default:
      mytaskLists = null;
      break;
  }
  createTable(mytaskLists);
  //set active class for current tab 
  var tabLink = document.getElementsByClassName("tabLink");
  for (let index = 0; index < tabLink.length; index++) {
    tabLink[index].classList.remove("active");
  }
  myButton.classList.add("active");
}
