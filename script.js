(function () {
  const container = document.querySelector(".root");
  const containerCard = container.querySelector(".places-list");
  const popup = container.querySelector(".popup");
  const popupEdit = container.querySelector(".popup-edit");
  const userName = container.querySelector(".user-info__name");
  const userJob = container.querySelector(".user-info__job");
  const userAva = container.querySelector(".user-info__photo");
  const popupImage = container.querySelector(".popup-image");
  const placeCard = container.querySelector(".place-card__imageOpen");
  const openBtn = container.querySelectorAll(".button-popup");
  const errorName = container.querySelector("#error-name");
  const errorJob = container.querySelector("#error-job");
  const addButtonEdit = popupEdit.querySelector(".popup__button");
  const formEdit = document.forms.newEdit;
  const inputName = formEdit.elements.nameEdit;
  const inputJob = formEdit.elements.jobEdit;

  const formEditValid = new FormValidator(formEdit);
  formEditValid.setEventListeners();

  const form = document.forms.new;

  const name = form.elements.name;
  const link = form.elements.link;
  const addButton = container.querySelector(".popup__button");

  // Запросы к серверу

  const infoApi = new Api();

  // Можно лучше: Лучше не присваивать переменной данные разного типа, сначала строка, потом эксземпляр класса.
  // Можно оставить undefined в качестве начального значения.
  let cardlist = "";
  infoApi.getInitialCards().then((result) => {
    if (result !== undefined) {
      const initial = result.map(function (card) {
        const newCard = new Card(card.name, card.link, containerCard);
        // Можно лучше: Данный код можно упростить до return newCard.create();
        return newCard.create();
      });
      cardlist = new Cardlist(containerCard, initial);
      cardlist.render(initial);
    }
  });

  infoApi.getInfoUser().then((res) => {
    if (res !== undefined) {
      userName.textContent = res.name;
      userJob.textContent = res.about;
      userAva.style.backgroundImage = `url(${res.avatar})`;
    }
  });

  const newEditUserInfo = new UserInfo(userName, userJob);

  formEdit.addEventListener("submit", function (event) {
    event.preventDefault();
    infoApi.setUser(inputName.value, inputJob.value).then((res) => {
      if (res !== undefined) {
        if (res.ok) {
          newEditUserInfo.setUserInfo(inputName.value, inputJob.value);
          newEditUserInfo.updateUserInfo(userName, userJob);
          popUpEdit.close();
        }
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const newCard = new Card(name.value, link.value, containerCard);
    // Можно лучше: cardlist может быть пустой строкой (в текущем варианте), если getInitialCards завершится с ошибкой.
    cardlist.addCard(newCard.create());
    form.reset();
    popup.classList.remove("popup_is-opened");
    addButton.setAttribute("disabled", "");
    addButton.classList.remove("button__disabled", "popup__button_dis");
  });

  const popUp = new Popup(popup);
  const popupImageClass = new Popup(popupImage);
  const popUpEdit = new Popup(popupEdit);
  openBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.classList.contains("info__button")) {
        popUp.open();
      } else if (event.target.classList.contains("edit__button")) {
        inputName.value = userName.textContent;
        inputJob.value = userJob.textContent;
        errorName.textContent = "";
        errorJob.textContent = "";
        addButtonEdit.classList.add("button__disabled", "popup__button_dis");
        popUpEdit.open();
      }
    });
  });
  container.addEventListener("click", function (event) {
    if (event.target.classList.contains("place-card__image")) {
      placeCard.src = event.target.style.backgroundImage.slice(5, -2);
      popupImageClass.open();
    }
  });
})();

// Спасибо за работу, у вас всё получилось!
//
// Что можно улучшить:
// - параметры api (базовый url, токен) передавать в констуктор;
// - проверять существование cardlist.
