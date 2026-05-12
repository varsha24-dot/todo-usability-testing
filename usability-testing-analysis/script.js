const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");


// ADD TASK FUNCTION
function addTask() {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        taskInput.style.border = "2px solid red";

setTimeout(() => {
    taskInput.style.border = "2px solid #ddd";
}, 2000);

return;
        return;
    }

    // CREATE TASK ITEM
    const li = document.createElement("li");
    li.classList.add("task-item");

    // TASK TEXT
    const span = document.createElement("span");
    span.innerText = taskText;

    // MARK COMPLETED
    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    // ADD ELEMENTS
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // CLEAR INPUT
    taskInput.value = "";

    saveTasks();
}


// ADD BUTTON EVENT
addBtn.addEventListener("click", addTask);


// ENTER KEY SUPPORT
taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});


// SHOW ALL TASKS
allBtn.addEventListener("click", () => {

    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {
        task.style.display = "flex";
    });

});


// SHOW COMPLETED TASKS
completedBtn.addEventListener("click", () => {

    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {

        const span = task.querySelector("span");

        if(span.classList.contains("completed")){
            task.style.display = "flex";
        }
        else{
            task.style.display = "none";
        }

    });

});


// SHOW PENDING TASKS
pendingBtn.addEventListener("click", () => {

    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {

        const span = task.querySelector("span");

        if(!span.classList.contains("completed")){
            task.style.display = "flex";
        }
        else{
            task.style.display = "none";
        }

    });

});


// SAVE TASKS
function saveTasks(){

    const tasks = [];

    document.querySelectorAll(".task-item").forEach(task => {

        const span = task.querySelector("span");

        tasks.push({
            text: span.innerText,
            completed: span.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// LOAD TASKS
function loadTasks(){

    const storedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    storedTasks.forEach(task => {

        const li = document.createElement("li");
        li.classList.add("task-item");

        const span = document.createElement("span");
        span.innerText = task.text;

        if(task.completed){
            span.classList.add("completed");
        }

        span.addEventListener("click", () => {
            span.classList.toggle("completed");
            saveTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}


// RUN LOAD FUNCTION
loadTasks();