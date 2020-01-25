import { LitElement, html, css } from "lit-element";
import "../components/form-field";
import "../components/text-input";
import "../components/password-input";
import "../components/dm-button";
import apiSevices from "../apiServices";
import { router } from "../blog-app";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends LitElement {
  constructor() {
    super();
    this.invalidMessages = {};
    this.fields = {
      email: "",
      password: ""
    };
    this.submitted = false;
    this.login = "";
  }

  static get properties() {
    return {
      invalidMessages: { type: Object },
      fields: { type: Object },
      submitted: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      .container {
        position: relative;
        z-index: 1;
        background: #ffffff;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: left;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2),
          0 5px 5px 0 rgba(0, 0, 0, 0.24);
      }

      .view-title {
        text-align: center;
        margin: 0 0 40px 0;
        font-family: Arial, Helvetica, sans-serif;
      }
      .footer {
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <h2 class="view-title">Portal do Usuário</h2>
        <br />
        <form-field title="E-mail"
        .errorMessage=${this.getInvalidMessage("email")}
        >
          <text-input
           @change="${this.handleChange("email")}"
          ?invalid=${this.isFieldInvalid("email")}
          .value="${this.fields.email}"          
          "></text-input>
        </form-field>

        <form-field title="Senha" 
        .errorMessage=${this.getInvalidMessage("password")}
        >
          <password-input
            ?invalid=${this.isFieldInvalid("password")}
            .value="${this.fields.password}"
            @change="${this.handleChange("password")}"
          ></password-input>
        </form-field>

        <div class="footer">
          <dm-button success value="Logar" @click="${this.submit}"></dm-button>
          <dm-button
            warning
            value="Cadastrar"
            @click="${() => router.navigate("/register")}"
          ></dm-button>
        </div>
      </div>
    `;
  }

  async submit() {
    this.submitted = true;

    if (
      Object.keys(this.invalidMessages).length > 0 ||
      this.fields.email == ""
    ) {
      console.log("Invalid!", this.invalidMessages);
    } else {
      const user = {
        email: this.fields.email,
        password: this.fields.password
      };

      const response = await apiSevices.postLogin(user);
      if (response.ok) {
        alert("Usuário autenticado com Sucesso!");
        router.navigate("/home");
      } else {
        let reject = await response.json();
        alert("Não foi possivel autenticar o Login! \n\n" + reject.message);
      }
    }
  }

  validate() {
    const invalidMessages = {};

    const requiredValidation = name => {
      if (this.submitted && !this.fields[name]) {
        invalidMessages[name] = "Este campo é obrigatório.";
        return false;
      }
      return true;
    };

    if (requiredValidation("email")) {
      if (this.fields.email && !emailRegex.test(this.fields.email)) {
        invalidMessages.email = "E-mail inválido";
      }
    }
    requiredValidation("password");

    this.invalidMessages = invalidMessages;
  }

  getInvalidMessage(fieldName) {
    if (this.invalidMessages.hasOwnProperty(fieldName)) {
      return this.invalidMessages[fieldName];
    }
    return undefined;
  }

  isFieldInvalid(key) {
    if (this.invalidMessages.hasOwnProperty(key)) {
      return this.invalidMessages[key];
    }
    return undefined;
  }

  handleChange(field) {
    return e => {
      this.fields = { ...this.fields, [field]: e.detail.value };
    };
  }

  updated(changedProperties) {
    if (changedProperties.has("fields") || changedProperties.has("submitted")) {
      this.validate();
    }
  }
}

window.customElements.define("login-view", Login);
