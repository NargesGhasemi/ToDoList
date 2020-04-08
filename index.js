"use strict";

var taskLists = [];

//when user click the add button
function addBtnClick () {
  var newTask = document.getElementById("inputTask").value;
if(!newTask) {
  alert("plese enter your new task!");
  return;
}

var task = {
    text: newTask,
    isComplete: false
}
taskLists.push(task);
console.log('task list',taskLists);
var i = 0;
var myTable ="";

for (i; i < taskLists.length; i++)
{
  if(taskLists[i].isComplete)
  {
    myTable += "<tr><td class='leftTd'>" + i + "</td><td class='leftTd complete'>" ;
  }
  else
  {
    myTable += "<tr><td class='leftTd'>" + i + "</td><td class='leftTd'>" ;
  }
    myTable +=  taskLists[i].text + "</td>" +
    "<td class='rightTd'><button class='deleteBtn' onclick='deleteFunc(" + i + ")'>delete</button></td>" +
    "<td class='rightTd'><button class='editBtn'onclick='editFunc(" + i + ")'>edit</button></td>" +
    "<td class='rightTd'><button class='completeBtn' onclick='CompleteFunc(" + i + ")'>complete</button></td>" +
    "</tr>" ;
}

document.getElementById("todoListTable").innerHTML = myTable;
document.getElementById("inputTask").value = "";
}

//when user click the complete button
function  CompleteFunc (id){
  var complete = document.getElementsByClassName("completeBtn");
      var selectTr = complete[id].parentElement.parentElement.childNodes[1];
      //  completeButton = complete[id].classList.toggle("completeBtn2");
      //  completeButton = selectTr.classList.toggle("complete");
      selectTr.className = "leftTd complete";
      taskLists[id].isComplete = true;
}

//when user click the delete button
function  deleteFunc (id){
 if( !confirm("Are you sure to delete this one?")){
  return;
 }
  var deleteElem = document.getElementsByClassName("deleteBtn");
      var selectTr = deleteElem[id].parentElement.parentElement;
      selectTr.style.display = "none";
      taskLists.splice(id,1);
      if(taskLists.length == 0 || !taskLists){
        var myTable ="";
        myTable += "<tr><td class='leftTd'>nothing to do...</td></tr>" ;
        document.getElementById("todoListTable").innerHTML = myTable;
      }
}

//when user click the edit button
function  editFunc (id){
  if(taskLists != undefined && taskLists[id] != undefined && taskLists[id].isComplete){
    alert("this task is completed and edit is not possible.");
    return;
  }
  var editeElem = document.getElementsByClassName("editBtn");
      var selectTask = editeElem[id].parentElement.parentElement.childNodes[1].textContent;
      var editedTask = prompt("please edit task",selectTask);
      if (editedTask == ""){
        alert("plese enter your new task!");
        return;
      }
      else if (editedTask == null){s
        return;
      }
      editeElem[id].parentElement.parentElement.childNodes[1].innerHTML = editedTask;
      taskLists[id].text = editedTask ;
}