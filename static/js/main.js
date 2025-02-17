alert("main .js")

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.draggable = true;
    listItem.innerHTML = `<span>${taskText}</span> <button onclick="removeTask(this)">❌</button>`;
    
    listItem.addEventListener("dragstart", handleDragStart);
    listItem.addEventListener("dragover", handleDragOver);
    listItem.addEventListener("drop", handleDrop);
    listItem.addEventListener("dragend", handleDragEnd);
    
    taskList.appendChild(listItem);
    taskInput.value = "";
  }

  function removeTask(button) {
    button.parentElement.remove();
  }

  let draggedItem = null;

  function handleDragStart(event) {
    draggedItem = event.currentTarget;
    event.currentTarget.classList.add("dragging");
  }

  function handleDragOver(event) {
    event.preventDefault();
    const taskList = document.getElementById("taskList");
    const afterElement = getDragAfterElement(taskList, event.clientY);
    if (afterElement == null) {
      taskList.appendChild(draggedItem);
    } else {
      taskList.insertBefore(draggedItem, afterElement);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
  }

  function handleDragEnd(event) {
    event.currentTarget.classList.remove("dragging");
    draggedItem = null;
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".task-item:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }




  function test(data){
    console.log("@@$#@#",data);
  }
  get_renderer.regist_receive("get_sqlite33", test);
  get_renderer.send_data("get_todo", "");


// // insert one row into the student table
// db.run(`select * from Todo);`, function (err) {
//     if (err) {
//         return console.log(err.message);
//     }
//     // get the last insert id
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
// });

