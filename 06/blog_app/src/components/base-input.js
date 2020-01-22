import { LitElement, css } from "lit-element";

export class BaseInput extends LitElement {

    static get styles() {

        return css`

            :host([invalid]) .input-default {
                border-color: red;
            }   
            .input-default {
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

            .input-default:focus {
                outline: none;
            }
        `;
    }

    static get properties() {
        return {
            value: { type: String }
        }
    }

    dispatchChangeEvent(newValue) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: newValue
            }
        }));
    }
}