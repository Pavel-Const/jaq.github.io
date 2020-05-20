export class Popup {
  constructor(popup) {
    this.popup = popup;
    this.listener();
  }

  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }

  listener() {
    this.popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
  }
}
