import { BaseInput } from "./base-input";
import { html } from "lit-element";

class TextInput extends BaseInput {
  constructor() {
    super();
    this.value = "";
    this.maxlength = Infinity;
  }
  static get properties() {
    return {
      value: { type: String },
      maxlength: { type: Number }
    };
  }
  render() {
    return html`
      <input
        class="input-default"
        .value=${this.value}
        maxlength="${this.maxlength}"
        @change=${this.handleChange}
      />
    `;
  }

  handleChange(e) {
    super.dispatchChangeEvent(e.target.value);
  }
}

window.customElements.define("text-input", TextInput);
