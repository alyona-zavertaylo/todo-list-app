export function getTaskList() {
    return JSON.parse(localStorage.getItem('todoTaskList')) || [];
}

export function saveTaskList(arr) {
    const json = JSON.stringify(arr);
    localStorage.setItem('todoTaskList', json);
}