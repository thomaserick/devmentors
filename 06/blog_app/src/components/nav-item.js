import { LitElement, html, css } from "lit-element";

class NavItem extends LitElement {
  static get styles() {
    return css`
      :host {
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        opacity: 0.8;
        transition: opacity ease 0.1s;
      }
      :host(:not(:last-child)) {
        margin-right: 15px;
      }

      :host([active]),
      :host(:hover) {
        opacity: 1;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

window.customElements.define("nav-item", NavItem);
