import { LitElement, html, css } from "lit-element";

class InputNum extends LitElement {
  constructor() {
    super();
    this.max = 100;
    this.min = 0;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  static get properties() {
    return {
      max: { type: Number },
      min: { type: Number },
      value: { type: Number }
    };
  }

  render() {
    return html`
      <input
        type="number"
        id="inputnum"
        max=${this.max}
        min=${this.min}
        value=${this.value}
        @change=${this.change}
      />
    `;
  }

  change(e) {
    this.value = e.target.value;

    if (this.max > this.value || this.min < this.value) {
      this.inputElementValid();
    } else {
      this.inputElementInValid();
    }
  }

  inputElementValid() {
    this.shadowRoot.querySelector("#inputnum").style.border = "2px solid red";
  }

  inputElementInValid() {
    this.shadowRoot.querySelector("#inputnum").style.border = "";
  }
}

window.customElements.define("input-num", InputNum);
