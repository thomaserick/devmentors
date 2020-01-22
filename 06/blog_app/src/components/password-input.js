import { BaseInput } from "./base-input";
import { html, css } from "lit-element";

class PasswordInput extends BaseInput {

    constructor() {
        super();
        this.currentType = 'password';
        this.passwordVisible = false;
    }

    static get styles() {
        return [
            super.styles,
            css`
             
                .password-input {
                    display: block;                    
                }

                .display-btn {
                    cursor: pointer;
                    display: block;
                    float: right;
                }
            `
        ]
    }
    render() {
        return html`
            <input 
                class="input-default password-input" 
                @change=${this.handleChange}
                .type=${this.currentType}
            />
            <span class="display-btn" @click=${this.togglePasswordVisibility}>
                ${this.passwordVisible ? 'Esconder' : 'Mostrar'} senha</span>
        `
    }

    handleChange(e) {
        super.dispatchChangeEvent(e.target.value);
    }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
        this.currentType = this.passwordVisible ? 'text' : 'password';
        this.requestUpdate();
    }


}

window.customElements.define('password-input', PasswordInput);