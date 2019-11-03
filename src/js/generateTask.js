export function generateTask(task) {
  const main = document.querySelector("main .todo-list");
  const div = document.createElement("div");

  div.className = "task";
  div.setAttribute("data-task-id", task.id);
  if(task.status === 'done') {
    div.classList.add('task-finished');
  }
  const taskDiv = `
        <div class="check-done"><i class="fas fa-check-circle"></i></div>
        <div class="title">${task.title}</div>
        <div class="description">${task.description}</div>
        <div class="priority priority-${task.priority}">${task.priority}</div>
        <div class="status">
            <div class="dropdown">
                <button type="button" class="btn btn-primary edit" data-toggle="dropdown">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu">
                <a class="dropdown-item task-done" href="#">Done</a>
                <a class="dropdown-item task-edit" href="#" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit</a>
                <a class="dropdown-item task-delete" href="#">Delete</a>
                </div>
            </div>
        </div>
    `;

  div.innerHTML = taskDiv;
  main.append(div);
  return div;
}

export function generateTaskList(taskArr) {
  taskArr.forEach(task => {
    generateTask(task);
  });
}

export function updateTask(task) {
    
    const taskElem = document.querySelector(`[data-task-id="${task.id}"]`);
    const titleElem = taskElem.querySelector('.title');
    const descriptionElem = taskElem.querySelector('.description');
    const priorityElem = taskElem.querySelector('.priority');
    titleElem.innerHTML = task.title;
    descriptionElem.innerHTML = task.description;
    priorityElem.innerHTML = task.priority;

}