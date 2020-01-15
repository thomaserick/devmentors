class ContaClique extends HTMLElement {
  constructor() {
    super();
    this.qtclique = 0;
    this.innerHTML = `
          Botão clicado <b class="contador">${this.qtclique}</b>
          `;
  }

  get qtclique() {
    return this.getAttribute("qtclique");
  }

  set qtclique(value) {
    this.setAttribute("qtclique", value);
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
      const contador = document.querySelector(".contador");
      contador.innerHTML = this.qtclique;
    }
  }

  static get observedAttributes() {
    return ["qtclique"];
  }
}

window.customElements.define("conta-clique", ContaClique);
