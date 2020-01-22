import { BaseInput } from "./base-input";
import { html } from "lit-element";

class TextInput extends BaseInput {


    constructor() {
        super();
        this.value = '';
    }
    static get properties() {
        return {
            value: { type: String }
        }
    }
    render() {
        return html`
            <input class="input-default" .value=${this.value} @change=${this.handleChange}/>
        `
    }

    handleChange(e) {
        super.dispatchChangeEvent(e.target.value);
    }


}

window.customElements.define('text-input', TextInput);