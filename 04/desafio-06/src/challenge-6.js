import { LitElement, html, css } from "lit-element";
import "./components/integer-input";
/**
 Desafio 6 
    Construir um componente de input numérico.
    Atributos:
    - max (valor numérico máximo aceito)
    - min (valor numérico mínimo aceito)
    - value (valor atual)

    Eventos:
    - change
    - invalid-input

    Ao inserir algum valor inválido, o input deve ficar com a borda vermelha.
 */
class Challenge6 extends LitElement {
  constructor() {
    super();
    this.invalidMessage = null;
    this.min = 60;
    this.max = 600;
    this.fieldValue = 5;
  }

  static get properties() {
    return {
      invalidMessage: { type: String },
      min: { type: Number },
      max: { type: Number }
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .container {
        max-width: 600px;
        width: 100%;
        margin: 20px auto;
        padding: 15px;
      }

      .invalid-text {
        color: red;
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <div>
          <b> Min </b>
          <integer-input
            .value=${this.min}
            @change=${e => (this.min = e.detail.value)}
          ></integer-input>
        </div>
        <div>
          <b> Max </b>
          <integer-input
            .value=${this.max}
            @change=${e => (this.max = e.detail.value)}
          ></integer-input>
        </div>
        <div>
          <b> Valor </b>
          <integer-input
            min="${this.min}"
            max="${this.max}"
            .value="${this.fieldValue}"
            @change=${e => (this.fieldValue = e.detail.value)}
            @invalid-input=${this.onInvalidInput}
            @valid-input=${this.onValidInput}
          ></integer-input>

          ${this.invalidMessage === null
            ? ""
            : html`
                <div class="invalid-text">${this.invalidMessage}</div>
              `}
        </div>
      </div>
    `;
  }

  onInvalidInput(e) {
    this.invalidMessage = e.detail.message;
  }
  onValidInput(e) {
    this.invalidMessage = null;
  }
}

window.customElements.define("challenge-6", Challenge6);
