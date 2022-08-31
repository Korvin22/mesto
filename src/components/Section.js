export class Section {
  constructor({ items, renderer}, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    this.Container = document.querySelector(this.containerSelector);
  }

  addItem(cardElement) {
    this.Container.prepend(cardElement);

  }

  renderInitialItems() {
    this._items.forEach((item) => {
      this.renderer(item);
    });
  }
}
