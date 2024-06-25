document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".list__form");
  const todoInput = document.querySelector(".list__input");
  const todoList = document.querySelector(".list");
  const todoError = document.querySelector(".list__error");

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //валидация на пустой ввод в input
    const todoText = todoInput.value.trim();
    if (todoText === "") {
      todoError.textContent = "Введите задачу";
      return;
    } else {
      todoError.textContent = "";
    }

    // создание элементов списка задач
    const listItem = document.createElement("li");
    listItem.classList.add("list__item");

    const textSpan = document.createElement("span");
    textSpan.classList.add("list__task");
    textSpan.textContent = todoText;

    listItem.appendChild(textSpan);
    listItem.addEventListener("click", function () {
      textSpan.classList.toggle("list__item--completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.classList.add("list__btn--delete");
    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      todoList.removeChild(listItem);
    });

    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);

    // очистка и фокус input
    todoInput.value = "";
    todoInput.focus();
  });
});
