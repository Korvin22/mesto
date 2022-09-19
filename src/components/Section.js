export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  appendItem(element) {
    this._container.append(element);
  }

  renderInitialItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
