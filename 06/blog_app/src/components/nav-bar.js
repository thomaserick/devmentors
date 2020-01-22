import { LitElement, css, html } from "lit-element";

export class NavBar extends LitElement {
  static get properties() {
    return {
      title: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        --color-default: #596172;
        --color-default-text-light: #fff;
        --var-menu-padding-vertical: 30px;
        min-height: 30px;
        padding: 10px var(--var-menu-padding-vertical);
        background-color: var(--color-default);
        color: var(--color-default-text-light);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        display: flex;
        width: calc(100% - (var(--var-menu-padding-vertical) * 2));
        justify-content: space-between;
        align-items: center;
      }
      ::slotted(*) {
        display: flex;
      }
    `;
  }

  render() {
    return html`
      <slot class="left-slot" name="left"></slot>
      <slot class="right-slot" name="right"></slot>
    `;
  }
}

window.customElements.define("nav-bar", NavBar);
