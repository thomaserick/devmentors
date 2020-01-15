class ContaClique extends HTMLElement {
  constructor() {
    super();
    this.qtdclique = 0;
    this.innerHTML = `
          Botão clicado <b class="contador">${this.qtdclique}</b>
          `;
  }

  get qtdclique() {
    return this.getAttribute("qtdclique");
  }

  set qtdclique(value) {
    this.setAttribute("qtdclique", value);
  }

  connectedCallback() {
    console.log("Connected");
  }

  disconnectedCallback() {
    console.log("Disconnected");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "qtdclique" && oldVal !== newVal) {
      this.qtdclique = newVal;
      const contador = document.querySelector(".contador");
      contador.innerHTML = this.qtdclique;
    }
  }

  static get observedAttributes() {
    return ["qtdclique"];
  }
}

window.customElements.define("conta-clique", ContaClique);
