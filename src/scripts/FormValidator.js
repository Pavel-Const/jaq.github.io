export class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(this.form.querySelectorAll("input"));
    this.button = this.form.querySelector("button");
  }

  checkInputValidity(input) {
    // (согласен)Все же немного вы слукавили не использовали встроенные методы валидации
    // А зря, это был бы полезный опыт
    const errElem = document.querySelector(`#error-${input.id}`);
    errElem.textContent = "";
    if (input.value.length === 0) {
      errElem.textContent = "Это обязательное поле";
      return false;
    } else if (input.value.length < 2 || input.value.length > 30) {
      errElem.textContent = "Должно быть от 2 до 30 символов";
      return false;
      // +else после return не нужен
    } return true;
  }

  setSubmitButtonState(isValidForm) {
    if (!isValidForm) {
      this.button.setAttribute("disabled", true);
      this.button.classList.remove("button__disabled", "popup__button_dis");
    } else {
      this.button.removeAttribute("disabled");
      this.button.classList.add("button__disabled", "popup__button_dis");
    }
  }

  setEventListeners() {
    this.form.addEventListener("input", () => {
      let isValidForm = true;
      this.inputs.forEach((input) => {
        if (!this.checkInputValidity(input)) {
          isValidForm = false;
        }
      });
      this.setSubmitButtonState(isValidForm);
    });
  }
}

