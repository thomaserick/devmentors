import { LitElement, html, css } from "lit-element";

class CountView extends LitElement {
  constructor() {
    super();
    this.count = 0;
  }

  static get styles() {
    return css`
      .count {
        color: green;
      }
    `;
  }

  static get properties() {
    return {
      count: { type: Number }
    };
  }

  render() {
    return html`
      <button @click=${this.increment}>Clique Aqui!</button>
      Botão clicado <b class="count">${this.count}</b>
    `;
  }

  increment() {
    this.count++;
  }
}

window.customElements.define("count-view", CountView);
