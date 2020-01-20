class TopMenu extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
          <style>
              :host {
                  display: block;
                  background-color: var(--top-menu-bg-color, #cacaca);
                  color: var(--top-menu-text-color, #000);
                  display: flex;
                  padding: 15px;
              }
              #items {
                  display: flex;
              }
              #title {
                  font-weight: bold;
                  margin-right: 15px;
              }
              .item:not(:last-child) {
                  margin-right: 10px
              }
              .item {
                  cursor: pointer;
              }
              
          </style>
          <div id="title"></div>
          <div id="items"></div>
      `;
    this.items = [];
  }

  set title(value) {
    this.setAttribute("title", value);
  }

  get title() {
    return this.getAttribute("title");
  }

  set items(value) {
    debugger;
    this._items = value;
    this.updateItems();
  }

  get items() {
    return this._items;
  }

  updateItems() {
    debugger;
    const itemsContainer = this.shadowRoot.querySelector("#items");
    if (this._items) {
      itemsContainer.innerHTML = "";
      for (let item of this._items) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = item;
        itemElement.addEventListener("click", () => {
          this.dispatchEvent(
            new CustomEvent("menu-item-clicked", {
              detail: {
                item
              }
            })
          );
        });
        itemsContainer.appendChild(itemElement);
      }
    } else {
      itemsContainer.innerHTML = "";
    }
  }

  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "title") {
      this.shadowRoot.querySelector("#title").innerHTML = newVal;
    }
  }
}

window.customElements.define("top-menu", TopMenu);
