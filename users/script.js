document.addEventListener("DOMContentLoaded", function () {
  const userListContainer = document.querySelector(".user__list");
  const userDetailsContainer = document.querySelector(".user__details");

  // получение списка пользователей
  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const users = await response.json();

      // Сортировка по алфавиту
      users.sort((a, b) => a.name.localeCompare(b.name));

      displayUserList(users);
    } catch (error) {
      console.error("Ошибка при получении данных:", error.message);
      displayErrorMessage(
        "Не удалось загрузить список пользователей. Пожалуйста, попробуйте позже."
      );
    }
  }

  // Отображение сообщения об ошибке
  function displayErrorMessage(message) {
    const userListContainer = document.querySelector(".user__list");
    userListContainer.innerHTML = `<p class="error">${message}</p>`;
  }

  // отображение списка пользователей
  function displayUserList(users) {
    const userList = document.createElement("ul");
    userList.classList.add("user__list");

    users.forEach((user) => {
      const userItem = document.createElement("li");
      userItem.classList.add("user__item");
      userItem.textContent = user.name;
      userItem.addEventListener("click", () => fetchUserDetails(user.id));
      userList.appendChild(userItem);
    });

    userListContainer.appendChild(userList);
  }

  // Получение деталей о пользователе
  async function fetchUserDetails(userId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const user = await response.json();
      displayUserDetails(user);
    } catch (error) {
      console.error("Ошибка при получении данных:", error.message);
      displayErrorMessage(
        "Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже."
      );
    }
  }

  // Отображениe деталей о пользователe
  function displayUserDetails(user) {
    userListContainer.style.display = "none";
    userDetailsContainer.style.display = "flex";

    userDetailsContainer.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: <a class="user__contact" href="mailto:${user.email}">${user.email}</a></p>
            <p>Phone: <a class="user__contact" href="tel:${user.phone}">${user.phone}</a></p>
            <p>Website: <a class="user__contact" href="http://${user.website}" target="_blank">${user.website}</a></p>
            <button class="user__btn">Назад к списку</button>
        `;

    document.querySelector(".user__btn").addEventListener("click", () => {
      userDetailsContainer.style.display = "none";
      userListContainer.style.display = "block";
    });
  }

  fetchUsers();
});
