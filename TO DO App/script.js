"use strict";

const taskContainer = document.querySelector(".tasks");
const taskList = document.querySelector(".task-list");
const taskItem = document.querySelector(".item");

let tickBtn, trashBtn;

taskItem.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const task = taskItem.value;
    const html = `
            <li class="task-list__item">
                ${task}
                <div class="icons">
                    <span class="tick__icon">✔</span>
                    <span class="trash__icon">❌</span>
                </div>
            </li>

        `;
    taskList.insertAdjacentHTML("beforeend", html);
    taskItem.value = "";
    tickBtn = document.querySelector(".tick__icon");
    trashBtn = document.querySelector(".trash__icon");

    // when click on tick
    tickBtn.addEventListener("click", function () {
      this.closest(".task-list__item").style.backgroundColor = "#B4FF88";
      this.closest(".task-list__item").style.textDecoration = "line-through";
      this.closest(".task-list__item").style.color = "#000";
    });

    // when click on trash
    trashBtn.addEventListener("click", function () {
      this.closest(".task-list__item").classList.add("hidden");
    });
  }
});
