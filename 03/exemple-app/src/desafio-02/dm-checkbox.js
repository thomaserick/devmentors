import { LitElement, html } from "lit-element";

class DmCheckbox extends LitElement {
  constructor() {
    super();
  }

  static get styles() {}

  static get properties() {
    return {
      checked: { type: Boolean }
    };
  }
  render() {
    return html`
      <input
        id="check"
        ?checked=${this.checked}
        @change=${this.change}
        type="checkbox"
      />
      <label id="label" for="label"></label>
    `;
  }

  change(e) {
    console.log(e.target.checked);

    if (this.checked !== e.target.checked) {
      this.checked = e.target.checked;
    }
  }
}
window.customElements.define("dm-checkbox", DmCheckbox);
