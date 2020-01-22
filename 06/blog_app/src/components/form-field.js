import { LitElement, html, css } from "lit-element";
import './field-label';
class FormField extends LitElement {
    constructor() {
        super();
        this.invalidText = '';
    }

    static get properties() {
        return {
            title: { type: String },
            errorMessage: { type: String }
        }
    }

    static get styles() {
        return css`

            :host {
                --invalid-text-font-size: 11pt;
                display: block;
                position: relative;
                margin-bottom: 15px;
            }

           
            .invalid-text {
                line-height: var(--invalid-text-font-size);
                height: var(--invalid-text-font-size);
                color: red;
                font-size: 11pt;
                margin-top: 3px;
            }
        `;
    }
    render() {
        return html`
            ${this.title ? html`
                <div class="label"><field-label .value="${this.title}"></field-label></div>
            ` : ''}
            <div class="field"><slot></slot></div> 
            <div class="invalid-text">${this.errorMessage}</div>
        `;
    }
}

window.customElements.define('form-field', FormField);