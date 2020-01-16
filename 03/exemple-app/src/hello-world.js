import { LitElement, html, css } from "lit-element";

class HelloWorld extends LitElement {
  constructor() {
    super();
    this.name = "World";
    this.items = [];
    this.isInputDisabled = true;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .hello-name {
        color: blue;
      }
    `;
  }

  static get properties() {
    return {
      // Number, Boolean, Object, Array, String
      name: { type: String },
      items: { type: Array },
      isInputDisabled: { type: Boolean }
    };
  }

  render() {
    return html`
      Hello <b class="hello-name">${this.name}</b>

      <ul>
        ${this.items.map(
          item => html`
            <li>Item: ${item}</li>
          `
        )}
      </ul>

      <input ?disabled=${this.isInputDisabled} type="text" />
      <button @click=${this.toggleDisabled}>Toggle Disable</button>
    `;
  }

  firstUpdated() {
    console.log("first updated");
  }

  updated(changedProperties) {}

  toggleDisabled() {
    this.isInputDisabled = !this.isInputDisabled;
  }
}

window.customElements.define("hello-world", HelloWorld);
