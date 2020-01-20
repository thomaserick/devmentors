import { LitElement, html } from "lit-element";

class DmCheckbox extends LitElement {
  constructor() {
    super();
  }

  static get styles() {}

  static get properties() {
    return {
      checked: { type: Boolean },
      label: { type: String }
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
      <label id="label" for="label">${this.label}</label>
    `;
  }

  change(e) {
    console.log(e.target.checked);
    this.checked = e.target.checked;
  }

  updated() {
    if (changedProperties.has("checked")) {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            checked: this.checked
          }
        })
      );
    }
  }
}
window.customElements.define("dm-checkbox", DmCheckbox);
