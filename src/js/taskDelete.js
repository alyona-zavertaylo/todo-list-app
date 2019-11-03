import { saveTaskList } from './localStorage.js';

export function initTaskDeleteHandler(taskArr) { 
    document.addEventListener('click', function deleteTask(event) {
        const target = event.target; 
        if (!target.classList.contains('task-delete')) {
            return;
        }
        const taskElem = target.closest('.task');
        const taskId = taskElem.getAttribute('data-task-id');
        const task = taskArr.find((task) => {
            return task.id == taskId;
        });
        taskArr.splice(taskArr.indexOf(task), 1);
        const todoList = taskElem.parentElement;
        todoList.removeChild(taskElem);
        saveTaskList(taskArr);
    });
}