var newTask = document.getElementById("new_task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskList = document.getElementById("toDoList");
var completedTaskList = document.getElementById("completedTasks");

//New Task List Item
var createItem = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); // text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
      //Each element needs modifying
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
    
      // each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add a new task
var addTask = function() {
 
  //Create a new list item with the text from #new-task:
  var listItem = createItem(newTask.value);
  //Append listItem to incompleteTasksHolder
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  newTask.value = "";   
}

// Edit an existing task
var editTask = function() {
 
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode 
  if(containsClass) {
      //switch from .editMode 
      //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
    // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
 
}


// Delete an existing task
var deleteTask = function() {
 
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

// Mark a task as complete 
var taskCompleted = function() {
  
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
 
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

