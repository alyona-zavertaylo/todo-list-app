export function initTaskEditHandler(taskArr) { 
    
    const popUpTitle = document.querySelector('main .modal-dialog .modal-content .form-group input');
    const popUpDescription = document.querySelector('main .modal-dialog .modal-content .form-group textArea');
    const popUpPriority = document.querySelector('main .modal-dialog .modal-content .form-group select');
    const popUpEdit = document.querySelector('main .modal-dialog .modal-content');   

    document.addEventListener('click', function editPopUp(event) {
        const target = event.target; 
    
        if (!target.classList.contains('task-edit')) {
            return;
        }
    
        const taskElem = target.closest('.task');
        const taskId = taskElem.getAttribute('data-task-id');
        const task = taskArr.find((task) => {
            return task.id == taskId;
        });
        
        // Set task id on popup to detect edit mode
        popUpEdit.setAttribute('data-popup-task-id', taskId);
        
        // Set task values
        popUpTitle.value = task.title;
        popUpDescription.value = task.description;
        popUpPriority.value = task.priority;
        
    });
}