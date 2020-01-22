
import { LitElement, html, css } from 'lit-element';

class DmCheckbox extends LitElement {

    static get properties() {
        return {
            checked: {type: Boolean},
            label: {type: String}
        }
    }


    render() {
        return html`
            <input type="checkbox" ?checked=${this.checked} @change=${this.checkboxChanged} />
            <label>${this.label}</label>
        `;
    }

    checkboxChanged(e) {
        this.checked = e.target.checked;
    }


    updated(changedProperties) {
        if(changedProperties.has('checked')) {
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: this.checked
                }
            }));
        }
    }
}

window.customElements.define('dm-checkbox', DmCheckbox)