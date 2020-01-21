import { LitElement, html, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map'

class IntegerInput extends LitElement {

    constructor() {
        super();
        this.min = -Infinity;
        this.max = Infinity;
        this.fieldValid = true;
        this.value = 0;
    }

    static get properties() 
    {
        return {
            min: { type: Number },
            max: { type: Number },
            value: { type: Number },
            fieldValid: { type: Boolean }
        }
    }

    static get styles() {
        return css`
            .form-control {
                border: 2px solid #7a7b7c;
                padding: 7px;
                width: 100%;
                border-radius: 5px;
                transition: border-color ease 0.15s;
            }

            .form-control:focus {
                outline: none !important;
                border-color: #344ec3;
            }

            .invalid {
                border-color: red;
            }
        `;
    }

    render() {
        return html`
            <input
                class=${classMap({
                    'form-control': true,
                    invalid: !this.fieldValid
                })}
                type="text" 
                .value=${this.value}
                @change="${this.onFieldChange}" />
        `;
    }

    onFieldChange(e) {
        this.value =  Number(e.target.value);

        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.value
            }
        }));

        this.validate();
    }
    
    validate() {
        
        let valid = true;
        let message = null;

        if(this.value > this.max) {
            valid = false;
            message = `O valor do campo deve ser inferior a ${this.max}`;
        }

        if(this.value < this.min) {
            valid = false;
            message = `O valor do campo deve ser superior a ${this.min}`;
        }

        if(!valid) {
            this.dispatchEvent(new CustomEvent('invalid-input', {
                detail: {
                    message
                }
            }))
        } else {
            this.dispatchEvent(new CustomEvent('valid-input')); 
        }

        this.fieldValid = valid;

    }

    updated(changedProperties) {
        this.validate();
    }
}

window.customElements.define('integer-input', IntegerInput);
