import { LitElement, html, css } from "lit-element";

class DmButton extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      value: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        background-image: none;
        border: 1px solid;
        border-color: transparent;
        cursor: pointer;
        display: inline-block;
        font-weight: bold;
        padding: 8px 35px;
        font-size: 14px;
        line-height: 22px;
        border-radius: 2px;
        text-align: center;
        transition: none !important;
        touch-action: manipulation;
        vertical-align: middle;
        white-space: nowrap;
        user-select: none;
      }
      :host([primary]) {
        color: #ffffff;
        background-color: #0086c7;
      }
      :host([primary]:hover) {
        background-color: #0173aa !important;
      }
      :host([danger]) {
        background-color: #dc3545;
        color: #fff;
        border-color: #dc3545;
      }
      :host([danger]:hover) {
        background-color: #c82333 !important;
      }
      :host([success]) {
        background-color: #28a745;
        color: #fff;
        border-color: #28a745;
      }
      :host([success]:hover) {
        background-color: #218838 !important;
      }

      :host([warning]) {
        background-color: #ffc107;
        color: #212529;
        border-color: #ffc107;
      }
      :host([warning]:hover) {
        background-color: #e0a800 !important;
      }
    `;
  }

  render() {
    return html`
      ${this.value}
    `;
  }
}

window.customElements.define("dm-button", DmButton);
