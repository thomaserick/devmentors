import { LitElement, html, css } from "lit-element";

class InputNum extends LitElement {
  constructor() {
    super();
    this.max = 100;
    this.min = 0;
  }

  static get styles() {



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

        const invalidInput = document.querySelector("#inputnum");
        invalidInput.innerHTML = 


    }
    console.log(this.value, this.max, this.min);
  }
}
window.customElements.define("input-num", InputNum);
