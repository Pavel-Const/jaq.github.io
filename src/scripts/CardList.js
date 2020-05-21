export class Cardlist {
  constructor(domelem, array) {
    this.domelem = domelem;
    this.array = array;
  }
  addCard(card) {
    this.domelem.appendChild(card);
    this.array.push(card);
  }
  render(array) {
    array.forEach((elem) => {
      this.addCard(elem);
    });
  }
}
