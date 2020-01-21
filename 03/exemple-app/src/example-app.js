import { LitElement, html, css } from "lit-element";
import "./hello-world";
import "./desafio-01/count-view";
import "./desafio-02/dm-checkbox";
import "./desafio-06/input-num";
import "./desafio-07/user-new";

class ExampleApp extends LitElement {
  constructor() {
    super();
    this.name = "Thomas";
    this.helloItems = ["Item teste 1", "Item teste 2"];
  }

  static get styles() {
    return css`
      .container {
        max-width: 600px;
        width: 100%;
        margin: 20px auto;
        padding: 15px;
      }
    `;
  }
  render() {
    // return html`
    //    <hello-world name=${this.name} .items=${this.helloItems}></hello-world>
    //    <br /><br />
    //    <count-view></count-view>
    //    <br /><br />
    //    <dm-checkbox label="CheckBox" @change=${this.changeBox}></dm-checkbox>
    //    <br /><br />
    //    <input-num></input-num>
    //   <user></user>
    // `;

    return html`
      <div class="container">
        <user-new></user-new>
      </div>
    `;
  }

  changeBox(e) {
    console.log(e.detail.checked);
  }
}

window.customElements.define("example-app", ExampleApp);
