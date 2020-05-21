export class Card {
  constructor(name, link, container) {
    this.name = name;
    this.link = link;
    this.container = container;
    this.remove = this.remove.bind(this);
  }

  create() {
    const place = document.createElement("div");
    place.classList.add("place-card");
    place.innerHTML = `<div class="place-card__image">
     <button class="place-card__delete-icon"></button>
   </div>
   <div class="place-card__description">
     <h3 class="place-card__name"></h3>
     <button class="place-card__like-icon"></button>
   </div>`;
    const cardImage = place.querySelector(".place-card__image");
    cardImage.setAttribute("style", `background-image: url(${this.link})`);

    const cardHeader = place.querySelector(".place-card__name");
    cardHeader.textContent = this.name;
    // +Обе переменные не используются

    this.place = place;
    this.methodeLikeRemove();
    return place;
  }

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  remove(event) {
    // + Надо испраить
    // Получается что обработчики удаляем в любом случае,
    // а вот элемент карты надо проверить куда нажали?
    // Проверки не должно быть, у вас обработчик висит четко на "корзинке"
    // проверка лишняя
    // И лучше сначала слушатели удалить, потом элемент
    event.target.removeEventListener("click", this.remove);
    this.place
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    const card = event.target.closest(".place-card");
    this.container.removeChild(card);
  }
  methodeLikeRemove() {
    this.place
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.place
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
  }
}


