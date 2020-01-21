import { LitElement, html, css } from "lit-element";

class UserNew extends LitElement {
  constructor() {
    super();

    this.newUser = {
      name: "",
      lastname: "",
      email: "",
      passwd: "",
      confPasswd: "",
      termos: false
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      input {
        border: 2px solid #7a7b7c;
        padding: 7px;
        width: 100%;
        border-radius: 5px;
        transition: border-color ease 0.15s;
      }

      button {
        background-color: green;
        padding: 15px 25px;
        border: none;
        color: white;
        font-size: 15px;
        border-radius: 6px;
      }
    `;
  }

  static get properties() {
    return {
      value: { type: String }
    };
  }

  render() {
    return html`
    <input type="text" id="name" placeholder="Nome"  @change="${this.changeName}" ></input></br></br>
    <input type="text" id="lastname" placeholder="Sobrenome" @change="${this.changeLastName}"  /></br></br>
    <input type="text" id="email" placeholder="e-mail" @change="${this.changeEmail}" /></br></br>
    <input type="text" id="passwd" placeholder="senha" @change="${this.changePasswd}"  /></br></br>
    <input type="text" id="confPasswd" placeholder="Confirma Senha" @change="${this.changeConfPasswd}" /></br></br>
    <input type="checkbox" ?checked=${this.termos}  @change=${this.changeTermos}/>aceitar termos de condições 
    </br></br>  
    <button @click="${this.addUser}" >Confirmar</button>

    `;
  }

  changeName(e) {
    this.newUser.name = e.target.value;
  }
  changeLastName(e) {
    this.newUser.lastname = e.target.value;
  }
  changeEmail(e) {
    this.newUser.email = e.target.value;
  }
  changePasswd(e) {
    this.newUser.passwd = e.target.value;
  }
  changeConfPasswd(e) {
    this.newUser.confPasswd = e.target.value;
  }

  changeTermos(e) {
    this.termos = e.target.checked;
  }

  addUser() {
    //let valid = true;
    //let message = null;

    if (this.newUser.name === "") {
      alert("Preencha o campo Nome");
      return false;
    }

    if (this.newUser.lastname === "") {
      alert("Preencha o campo Sobrenome");
      return false;
    }
    if (this.newUser.email === "") {
      alert("Preencha o campo Email");
      return false;
    }
    if (this.newUser.passwd) {
      alert("Preencha o campo Senha");
      return false;
    }
    if (this.newUser.confPasswd === "") {
      alert("Preencha o campo Confirmar Senha");
      return false;
    }
    if (this.newUser.senha !== this.confPasswd) {
      alert("A senha não Confere!");
      return false;
    }

    console.log(this.newUser);
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
