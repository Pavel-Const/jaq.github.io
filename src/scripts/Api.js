export class Api {
  // Можно лучше: В качестве параметров при создании можно передать, например, базовый url сервера и авторизационный токен.
  // Которые можно использовать в каждом запросе.
  /*constructor() {


  }*/

  getInitialCards() {
    return (
      fetch("https://praktikum.tk/cohort10/cards", {
        headers: {
          authorization: "18dbabcb-4ed2-42c4-b8c7-108cd4642ac8",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  getInfoUser() {
    return (
      fetch("https://praktikum.tk/cohort10/users/me", {
        method: "GET",
        headers: {
          authorization: "18dbabcb-4ed2-42c4-b8c7-108cd4642ac8",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  setUser(newName, newJob) {
    return fetch("https://praktikum.tk/cohort10/users/me", {
      method: "PATCH",
      headers: {
        authorization: "18dbabcb-4ed2-42c4-b8c7-108cd4642ac8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        about: newJob,
      }),
    }).catch((err) => {
      console.log(err);
    });
  }
}
