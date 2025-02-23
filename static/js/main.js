
document.addEventListener("DOMContentLoaded", (ev) => {
  document.getElementById("add_btn").onclick = addTask;

  const lists = document.querySelectorAll(".task-list");

        lists.forEach(list => {
            new Sortable(list, {
                group: "shared",  // 같은 그룹이면 서로 이동 가능
                animation: 150,   // 애니메이션 효과
                ghostClass: "dragging", // 드래그 중인 요소 스타일 변경 가능
                onEnd: function (evt) {
                    console.log(`Moved "${evt.item.textContent}" to ${evt.to.id}`);
                }
            });
        });
})

// let task_header = ["task_start", "task_process", "task_done"];

function addTask() {
  const taskInput = document.getElementById("task_input");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("task_start");
  const listItem = document.createElement("li");
  listItem.className = "task-item";
  listItem.draggable = true;
  listItem.innerHTML = `<span>${taskText}</span> <button>❌</button>`;

  // listItem.addEventListener("dragstart", handleDragStart);
  // listItem.addEventListener("dragover", handleDragOver);
  // listItem.addEventListener("drop", handleDrop);
  // listItem.addEventListener("dragend", handleDragEnd);

  taskList.appendChild(listItem);
  taskInput.value = "";
}

function removeTask(button) {
  button.parentElement.remove();
}

// let draggedItem = null;

// function handleDragStart(event) {
//   draggedItem = event.currentTarget;
//   event.currentTarget.classList.add("dragging");
// }

// function handleDragOver(event) {
//   event.preventDefault();
//   // for(var i=0; i<task_header.length; i++){
//     const taskList = getDragedTaskContainer(event.clientX, event.clientY);
//     console.log("@@@", taskList)
//     const afterElement = getDragAfterElement(taskList, event.clientY);
//     console.log("@@@@@@@@@@@", afterElement)
//     if (afterElement == null) {
//       taskList.appendChild(draggedItem);
//     } else {
//       taskList.insertBefore(draggedItem, afterElement);
//     }
//   // }
  
// }

// function handleDrop(event) {
//   event.preventDefault();
// }

// function handleDragEnd(event) {
//   event.currentTarget.classList.remove("dragging");
//   draggedItem = null;
// }

// function getDragAfterElement(container, y) {
//   const draggableElements = [...container.querySelectorAll(".task-item:not(.dragging)")];
//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect();
//     const offset = y - box.top - box.height / 2;
//     if (offset < 0 && offset > closest.offset) {
//       console.log({ offset, element: child })
//       return { offset, element: child };
//     } else {
//       console.log(offset)
//       return closest;
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element;
// }

// function getDragedTaskContainer(x, y){
//   const container = document.getElementById("todo_list_container");
//   const draggableElements = [...container.querySelectorAll(".task_sub_container")];
  
//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect();
//     const offset = { x : x - box.left, y : y - box.top - box.height / 2 };
    
//     console.log(offset, box.left)
//     if ( (offset.x > 0 && offset.x < closest.offset.x) && (offset.y > 0 && offset.y < closest.offset.y)) {      
//       // console.log({ offset, element: child })
//       return { offset, element: child };
//     } else {      
//       // console.log("closets", closest)
//       return closest;
//     }
//   }, { offset: { x : x, y: y } }).element;
// }




function test(data) {
  console.log("@@$#@#", data);
}
get_renderer.regist_receive("get_sqlite_todo", test);
get_renderer.send_data("get_todo", "");


// // insert one row into the student table
// db.run(`select * from Todo);`, function (err) {
//     if (err) {
//         return console.log(err.message);
//     }
//     // get the last insert id
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
// });

