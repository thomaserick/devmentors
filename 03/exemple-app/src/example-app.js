import { LitElement, html } from "lit-element";
import "./hello-world";
import "./desafio-01/count-view";
import "./desafio-02/dm-checkbox";

class ExampleApp extends LitElement {
  constructor() {
    super();
    this.name = "Thomas";
    this.helloItems = ["Item teste 1", "Item teste 2"];
  }
  render() {
    return html`
      <hello-world name=${this.name} .items=${this.helloItems}></hello-world>
      <br />
      <count-view></count-view>
      <br />
      <dm-checkbox></dm-checkbox>
    `;
  }
}

window.customElements.define("example-app", ExampleApp);
