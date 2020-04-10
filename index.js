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
  myTable +=  "<tr><td class='leftTd'>" + i + ".</td><td class='leftTd'>" + taskLists[i].text + "</td></tr>" ;
}

document.getElementById("todoListTable").innerHTML = myTable;
document.getElementById("inputTask").value = "";
}
