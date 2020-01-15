class CountView extends HTMLElement {
  constructor() {
    super();
    this.qtclick = 0;
    this.innerHTML = `
          Botão clicado <b class="count">${this.qtclick}</b>
          `;
  }

  get qtclick() {
    return this.getAttribute("qtclick");
  }

  set qtclick(value) {
    this.setAttribute("qtclick", value);
  }

  connectedCallback() {
    console.log("Connected");
  }

  disconnectedCallback() {
    console.log("Disconnected");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "qtclique" && oldVal !== newVal) {
      this.qtdclique = newVal;
      const cont = document.querySelector(".count");
      cont.innerHTML = this.qtclick;
    }
  }

  static get observedAttributes() {
    return ["qtclick"];
  }
}

window.customElements.define("count-view", CountView);
