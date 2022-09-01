export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    this.container = document.querySelector(this.containerSelector);
  }

  addItem(cardElement) {
    this.container.prepend(cardElement);
  }

  renderInitialItems() {
    this._items.forEach((item) => {
      this.renderer(item);
    });
  }
}
