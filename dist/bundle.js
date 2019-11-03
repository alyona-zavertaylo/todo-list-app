(function () {
'use strict';

function generateTask(task) {
  var main = document.querySelector("main .todo-list");
  var div = document.createElement("div");
  div.className = "task";
  div.setAttribute("data-task-id", task.id);

  if (task.status === 'done') {
    div.classList.add('task-finished');
  }

  var taskDiv = "\n        <div class=\"check-done\"><i class=\"fas fa-check-circle\"></i></div>\n        <div class=\"title\">".concat(task.title, "</div>\n        <div class=\"description\">").concat(task.description, "</div>\n        <div class=\"priority priority-").concat(task.priority, "\">").concat(task.priority, "</div>\n        <div class=\"status\">\n            <div class=\"dropdown\">\n                <button type=\"button\" class=\"btn btn-primary edit\" data-toggle=\"dropdown\">\n                    <i class=\"fas fa-ellipsis-h\"></i>\n                </button>\n                <div class=\"dropdown-menu\">\n                <a class=\"dropdown-item task-done\" href=\"#\">Done</a>\n                <a class=\"dropdown-item task-edit\" href=\"#\" data-toggle=\"modal\" data-target=\"#exampleModal\" data-whatever=\"@mdo\">Edit</a>\n                <a class=\"dropdown-item task-delete\" href=\"#\">Delete</a>\n                </div>\n            </div>\n        </div>\n    ");
  div.innerHTML = taskDiv;
  main.append(div);
  return div;
}
function generateTaskList(taskArr) {
  taskArr.forEach(function (task) {
    generateTask(task);
  });
}
function updateTask(task) {
  var taskElem = document.querySelector("[data-task-id=\"".concat(task.id, "\"]"));
  var titleElem = taskElem.querySelector('.title');
  var descriptionElem = taskElem.querySelector('.description');
  var priorityElem = taskElem.querySelector('.priority');
  titleElem.innerHTML = task.title;
  descriptionElem.innerHTML = task.description;
  priorityElem.innerHTML = task.priority;
}

function getTaskList() {
  return JSON.parse(localStorage.getItem('todoTaskList')) || [];
}
function saveTaskList(arr) {
  var json = JSON.stringify(arr);
  localStorage.setItem('todoTaskList', json);
}

var searchElem = document.querySelector('main .search input');
var statusElem = document.querySelector('main .status');
var priorityElem = document.querySelector('main .priority');
function filterTasks(taskArr) {
  debugger;
  var searchValue = searchElem.value.toLowerCase();
  var statusValue = statusElem.value;
  var priorityValue = priorityElem.value;
  var filteredTaskArr = taskArr.filter(function (task) {
    var isSearchOk = task.title.toLowerCase().includes(searchValue);
    var isStatusOk = statusValue === 'all' || statusValue === task.status;
    var isPriorityOk = priorityValue === 'all' || priorityValue === task.priority;
    return isSearchOk && isStatusOk && isPriorityOk;
  });
  document.querySelector('main .todo-list').innerHTML = '';
  generateTaskList(filteredTaskArr);
}
function initFilterPanel(taskArr) {
  searchElem.addEventListener('input', function () {
    filterTasks(taskArr);
  });
  statusElem.addEventListener('change', function () {
    filterTasks(taskArr);
  });
  priorityElem.addEventListener('change', function () {
    filterTasks(taskArr);
  });
}

function initTaskDoneHandler(taskArr) {
  document.addEventListener('click', function doneTask(event) {
    var target = event.target;

    if (!target.classList.contains('task-done')) {
      return;
    }

    var taskElem = target.closest('.task');
    taskElem.classList.add('task-finished');
    var taskId = taskElem.getAttribute('data-task-id');
    var task = taskArr.find(function (task) {
      return task.id == taskId;
    });
    task.status = 'done';
    saveTaskList(taskArr);
    filterTasks(taskArr);
  });
}

function initTaskEditHandler(taskArr) {
  var popUpTitle = document.querySelector('main .modal-dialog .modal-content .form-group input');
  var popUpDescription = document.querySelector('main .modal-dialog .modal-content .form-group textArea');
  var popUpPriority = document.querySelector('main .modal-dialog .modal-content .form-group select');
  var popUpEdit = document.querySelector('main .modal-dialog .modal-content');
  document.addEventListener('click', function editPopUp(event) {
    var target = event.target;

    if (!target.classList.contains('task-edit')) {
      return;
    }

    var taskElem = target.closest('.task');
    var taskId = taskElem.getAttribute('data-task-id');
    var task = taskArr.find(function (task) {
      return task.id == taskId;
    }); // Set task id on popup to detect edit mode

    popUpEdit.setAttribute('data-popup-task-id', taskId); // Set task values

    popUpTitle.value = task.title;
    popUpDescription.value = task.description;
    popUpPriority.value = task.priority;
  });
}

function initTaskDeleteHandler(taskArr) {
  document.addEventListener('click', function deleteTask(event) {
    var target = event.target;

    if (!target.classList.contains('task-delete')) {
      return;
    }

    var taskElem = target.closest('.task');
    var taskId = taskElem.getAttribute('data-task-id');
    var task = taskArr.find(function (task) {
      return task.id == taskId;
    });
    taskArr.splice(taskArr.indexOf(task), 1);
    var todoList = taskElem.parentElement;
    todoList.removeChild(taskElem);
    saveTaskList(taskArr);
  });
}

var saveButton = document.querySelector('main .modal-content .save');
var main = document.querySelector('main .todo-list');
var taskArr = getTaskList();
generateTaskList(taskArr);
saveButton.addEventListener("click", function () {
  var popUp = document.querySelector('main .modal-dialog .modal-content');
  var taskId = popUp.getAttribute('data-popup-task-id');
  var titleElem = document.querySelector("main .modal-content form input");
  var descriptionElem = document.querySelector("main .modal-content form textarea");
  var priorityElem = document.querySelector("main .modal-content form select");
  var buttonSave = document.querySelector("main .modal-content .save"); // check validation and prevent popUp close

  if (titleElem.value == '') {
    titleElem.style.border = '1px solid red';
    buttonSave.setAttribute('data-dismiss', '');
  } else {
    if (taskId) {
      var task = taskArr.find(function (task) {
        return task.id == taskId;
      });
      task.title = titleElem.value;
      task.description = descriptionElem.value;
      task.priority = priorityElem.value;
      updateTask(task);
    } else {
      var _task = {
        title: titleElem.value,
        description: descriptionElem.value,
        priority: priorityElem.value,
        id: uuidv1(),
        status: 'open'
      };
      generateTask(_task);
      taskArr.push(_task);
    } // removes validation, enables close popUp


    titleElem.style.border = '1px solid #ced4da';
    buttonSave.setAttribute('data-dismiss', 'modal');
    saveTaskList(taskArr);
    filterTasks(taskArr);
  }

  titleElem.value = '';
  descriptionElem.value = '';
  priorityElem.value = 'high';
});
initTaskEditHandler(taskArr);
initTaskDoneHandler(taskArr);
initTaskDeleteHandler(taskArr);
initFilterPanel(taskArr);

}());
