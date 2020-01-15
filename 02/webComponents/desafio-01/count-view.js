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
    //Teste para não ficar em Loop
    if (attrName === "qtclick" && oldVal !== newVal) {
      this.qtclick = newVal;
      const cont = document.querySelector(".count");
      cont.innerHTML = this.qtclick;
    }
  }

  static get observedAttributes() {
    return ["qtclick"];
  }
}

window.customElements.define("count-view", CountView);
