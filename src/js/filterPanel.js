import { generateTaskList } from './generateTask.js';

const searchElem = document.querySelector('main .search input');
const statusElem = document.querySelector('main .status');
const priorityElem = document.querySelector('main .priority');

export function filterTasks(taskArr) {
    debugger;
    const searchValue = searchElem.value.toLowerCase();
    const statusValue = statusElem.value;
    const priorityValue = priorityElem.value;

    const filteredTaskArr = taskArr.filter((task) => {
        const isSearchOk = task.title.toLowerCase().includes(searchValue);
        const isStatusOk = (statusValue === 'all') || (statusValue === task.status);
        const isPriorityOk = (priorityValue === 'all') || (priorityValue === task.priority);
        return isSearchOk && isStatusOk && isPriorityOk;
    });
    document.querySelector('main .todo-list').innerHTML = '';
    generateTaskList(filteredTaskArr);
}

export function initFilterPanel (taskArr) {
    searchElem.addEventListener('input', () => {
        filterTasks(taskArr);
    });
    statusElem.addEventListener('change', () => {
        filterTasks(taskArr);
    });
    priorityElem.addEventListener('change', () => {
        filterTasks(taskArr);
    });
}
