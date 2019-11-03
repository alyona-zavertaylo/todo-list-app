import { generateTask, generateTaskList, updateTask } from './generateTask.js';
import { saveTaskList, getTaskList } from './localStorage.js';
import { initTaskDoneHandler } from './taskDone.js';
import { initTaskEditHandler } from './taskEdit.js';
import { initTaskDeleteHandler } from './taskDelete.js';
import { filterTasks, initFilterPanel } from './filterPanel.js';

const saveButton = document.querySelector('main .modal-content .save');
const main = document.querySelector('main .todo-list');

const taskArr = getTaskList();
generateTaskList(taskArr);


saveButton.addEventListener("click", function() {
    const popUp = document.querySelector('main .modal-dialog .modal-content');   
    const taskId = popUp.getAttribute('data-popup-task-id');
    const titleElem =  document.querySelector("main .modal-content form input"); 
    const descriptionElem = document.querySelector("main .modal-content form textarea");
    const priorityElem = document.querySelector("main .modal-content form select");
    const buttonSave = document.querySelector("main .modal-content .save");

    // check validation and prevent popUp close
    if(titleElem.value == '')  {
        titleElem.style.border = '1px solid red';
        buttonSave.setAttribute('data-dismiss', '');
    } else {
        if(taskId) {
            const task = taskArr.find((task) => {
                return task.id == taskId;
            });
            task.title = titleElem.value;
            task.description = descriptionElem.value;
            task.priority = priorityElem.value;
            
            updateTask(task);

        } else {
            const task = {
                title: titleElem.value,
                description: descriptionElem.value,
                priority:  priorityElem.value,
                id: uuidv1(),
                status: 'open'
            }
            generateTask(task);
            taskArr.push(task);

        }
        // removes validation, enables close popUp
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
