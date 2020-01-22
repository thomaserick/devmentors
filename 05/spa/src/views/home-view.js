import { LitElement, html } from "lit-element";

class HomeView extends LitElement {


    render() {
        return html`
            Home
        `
    };

}

window.customElements.define('home-view', HomeView);