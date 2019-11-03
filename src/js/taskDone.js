import { saveTaskList } from './localStorage.js';
import { filterTasks } from './filterPanel.js';
export function initTaskDoneHandler(taskArr) {
    document.addEventListener('click', function doneTask(event) {
        const target = event.target; 
        if (!target.classList.contains('task-done')) {
            return;
        }
        const taskElem = target.closest('.task');
        taskElem.classList.add('task-finished');
        const taskId = taskElem.getAttribute('data-task-id');
        const task = taskArr.find((task) => {
            return task.id == taskId;
        });
        task.status = 'done';
        saveTaskList(taskArr);
        filterTasks(taskArr);
    });
}