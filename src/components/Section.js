export class Section {
  constructor({ items, renderer}, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
  }

  addItem(cardElement) {
    document.querySelector(this.containerSelector).prepend(cardElement);

  }

  renderInitialItems() {
    this._items.forEach((item) => {
      this.renderer(item);
    });
  }
}
