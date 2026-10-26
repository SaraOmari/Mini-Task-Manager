    let tasks = JSON.parse(localStorage.getItem("tasks"))||[];//لحفظ المعلزمات عند الادخال وتحويلها الى json لاسترجاعهل حتى اذا عملت refresh للصفحة

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }// كل ما استدعي هذه الدالة يتم حفظ المهام في localStorage


    function setTask(name, priority, category,date) {
        let newTask = {
            name: name,
            priority: priority,
            category: category,
            date:date,
            completed: false
        };
    tasks.push(newTask);
    saveTasks();}

    function getTask(){
        return tasks;
    }   
    function clearTask() {
        document.getElementById("task-name").value = "";
    }
    function displayTask(task) {
        let taskcontainer = document.getElementsByClassName("cards");

        let card = document.createElement("div");
        card.className = "task-card";

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${task.name}</h5>
                <p class="card-text">Priority: ${task.priority}</p>
                <p class="card-text">Category: ${task.category}</p>
                <p class="card-text">Due Date: ${task.date || "No date"}</p>

            </div>
        `;
        // Create checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Create label
        let label = document.createElement("label");
        label.appendChild(checkbox);
        label.appendChild(
        document.createTextNode(
            task.completed ? " Completed" : " Complete"
        )
    );

        // Get the task title
        let title = card.querySelector(".card-title");
        if (task.completed) {
        title.classList.add("completed-task");
    }

        // Check if task is completed
        checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
    saveTasks();
    displayTasks();});

        card.querySelector(".card-body").appendChild(label);
    let deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.className = "delete-btn";

    deletebtn.addEventListener("click", function () {
        let index = tasks.indexOf(task);

        if (index > -1) {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        }
    });

        card.querySelector(".card-body").appendChild(deletebtn);

        taskcontainer[0].appendChild(card);
    }
    function displayTasks() {
        let taskcontainer = document.getElementsByClassName("cards");
        taskcontainer[0].innerHTML = "";

        let search = document.getElementById("search-task").value.toLowerCase();
        let priorityFilter = document.getElementById("filter-priority").value;
        let categoryFilter = document.getElementById("filter-category").value;
        let statusFilter = document.getElementById("filter-status").value;

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            let matchName = task.name.toLowerCase().includes(search);
            let matchPriority = priorityFilter === "all" ||
                                task.priority === priorityFilter;
            let matchCategory = categoryFilter === "all" ||
                                task.category === categoryFilter;
            let matchStatus = statusFilter === "all" ||
                            (statusFilter === "completed" && task.completed) ||
                            (statusFilter === "incomplete" && !task.completed);

            if (matchName && matchPriority && matchCategory && matchStatus) {
                displayTask(task);
            }
        }
                    displayStatistics();

    }
    document.getElementById("search-task").addEventListener("input", displayTasks);

    document.getElementById("filter-priority").addEventListener("change", displayTasks);

    document.getElementById("filter-category").addEventListener("change", displayTasks);

    document.getElementById("filter-status").addEventListener("change", displayTasks);
    let addBtn = document.getElementById("addBtn");
    addBtn.addEventListener("click",function(){
        let name=document.getElementById("task-name").value;
        let priority=document.getElementById("task-priority").value;
        let category=document.getElementById("task-category").value;
                let date = document.getElementById("task-due-date").value;

        if(name.trim()===""){
            alert("Please enter a task name");
            return;
        }
        setTask(name, priority, category,date);
    displayTasks();
    clearTask();
    });
    displayTasks();

    function displayStatistics() {
        let total = tasks.length;
        let completed = 0;

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                completed++;
            }
        }

        let incomplete = total - completed;

        document.getElementById("total-tasks").textContent = total;
        document.getElementById("completed-tasks").textContent = completed;
        document.getElementById("incomplete-tasks").textContent = incomplete;
    }
async function getQuote() {
    let quoteElement = document.getElementById("quote");

    try {
        quoteElement.textContent = "Loading...";

        let response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        let data = await response.json();

        quoteElement.textContent = data.quote + " — " + data.author;

    } catch (error) {
        quoteElement.textContent = "Keep going! Every small step counts.";
        console.log(error);
    }
}

document.getElementById("quote-btn").addEventListener("click", getQuote);