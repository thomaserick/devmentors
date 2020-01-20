import { LitElement, html, css } from "lit-element";

class UserNew extends LitElement {
  constructor() {
    super();
    this.todos = [];
    this.name = "";
    this.lastname = "";
    this.email = "";
    this.passwd = "";
    this.confPasswd = "";
    this.termos = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      lasname: { type: String },
      email: { type: String },
      passwd: { type: String },
      confPasswd: { type: String },
      termos: { type: Boolean },
      todos: { type: Array }
    };
  }

  render() {
    return html`
      <input type="text" id="name" placeholder="Nome" ></input></br></br>
      <input type="text" id="lastname" placeholder="Sobrenome" /></br></br>
      <input type="text" id="email" placeholder="e-mail" /></br></br>
      <input type="text" id="passwd" placeholder="senha" /></br></br>
      <input type="text" id="confPasswd"placeholder="Confirma Senha"/></br></br>
      <input type="checkbox" ?checked=${this.termos}  @change=${this.change} />aceitar termos de condições.
      </br></br>  
      <button @click="${this.addUser}" >Confirmar</button>

    `;
  }

  addUser() {
    console.log("Nome" + this.name);
    let inputName = this.shadowRoot.querySelector("#name");
    let inputLastName = this.shadowRoot.querySelector("#lastname");
    let inputEmail = this.shadowRoot.querySelector("#email");
    let inputPasswd = this.shadowRoot.querySelector("#passwd");
    let inputConfPasswd = this.shadowRoot.querySelector("#confPasswd");

    this.name = inputName.value;
    this.lastname = inputLastName.value;
    this.email = inputEmail.value;
    this.passwd = inputPasswd.value;
    this.confPasswd = inputConfPasswd.value;

    if (this.name === "") {
      alert("Preencha o campo Nome");
      inputName.focus();
      return false;
    }

    this.todos = [
      {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        passwd: this.passwd,
        confPasswd: this.confPasswd,
        termos: this.termos
      }
    ];

    console.log(this.todos);
  }

  change(e) {
    this.termos = e.target.checked;
  }

  updated(changedProperties) {
    if (changedProperties.has("checked")) {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            checked: this.termos
          }
        })
      );
    }
  }
}

window.customElements.define("user-new", UserNew);
