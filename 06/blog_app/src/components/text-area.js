import { LitElement, html, css } from "lit-element";

class TextArea extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.rows = 3;
    this.cols = 0;
  }
  static get properties() {
    return {
      value: { type: String },
      rows: { type: Number },
      maxlength: { type: Number }
    };
  }
  static get styles() {
    return css`
      :host([invalid]) .textarea-default {
        border-color: red;
      }
      .textarea-default {
        padding: 7px 15px;
        border-color: #cacaca;
        border-style: solid;
        border-radius: 4px;
        border-width: 2px;
        transition: border-color ease 0.2s;
        display: block;
        width: calc(100% - 30px);
        color: black;
      }

      .textarea-default:focus {
        outline: none;
      }
    `;
  }

  render() {
    return html`
      <textarea
        class="textarea-default"
        rows="${this.rows}"
        maxlength="${this.maxlength}"
        .value=${this.value}
        @change=${this.handleChange}
      />
    `;
  }

  handleChange(e) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: e.target.value
        }
      })
    );
  }
}

window.customElements.define("text-area", TextArea);
