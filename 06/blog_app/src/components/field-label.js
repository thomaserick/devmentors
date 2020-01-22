import { LitElement, css, html } from "lit-element";

class FieldLabel extends LitElement {

    constructor() {
        super();
    }

    static get styles() {
        return css`

            :host {
                display: block;
                width: 100%;
                font-weight: bold;
                font-size: 12pt;
                color: #252525;
            }
        `;
    }

    static get properties() {
        return {
            value: { type: String }
        }
    }

    render() {
        return html`${(this.value + ':') || ''}`
    }

}

window.customElements.define('field-label', FieldLabel);