import { LitElement, html, css } from "lit-element";
import apiSevices from "../apiServices";
import "../components/text-input";
import "../components/password-input";
import "../components/dm-button";
import "../components/dm-checkbox";
import "../components/form-field";
import { router } from "../blog-app";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class UserRegister extends LitElement {
  constructor() {
    super();
    this.invalidMessages = {};
    this.fields = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };

    this.submitted = false;
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
      .field-container {
        margin-bottom: 20px;
      }
      .view-title {
        text-align: center;
        margin: 0 0 40px 0;
      }

      .field-label {
        font-size: 15px;
        font-weight: bold;
      }
      .footer {
        text-align: right;
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <h2 class="view-title">Cadastro de Usuário</h2>

        <form-field
          title="Nome"
          .errorMessage=${this.getInvalidMessage("name")}
        >
          <text-input
            ?invalid=${this.isFieldInvalid("name")}
            .value="${this.fields.name}"
            @change="${this.handleChange("name")}"
          >
          </text-input>
        </form-field>

        <form-field
          title="E-mail"
          .errorMessage=${this.getInvalidMessage("email")}
        >
          <text-input
            ?invalid=${this.isFieldInvalid("email")}
            .value="${this.fields.email}"
            @change="${this.handleChange("email")}"
          >
          </text-input>
        </form-field>

        <form-field
          title="Senha"
          .errorMessage=${this.getInvalidMessage("password")}
        >
          <password-input
            ?invalid=${this.isFieldInvalid("password")}
            .value="${this.fields.password}"
            @change="${this.handleChange("password")}"
          >
          </password-input>
        </form-field>

        <form-field
          title="Confirmar Senha"
          .errorMessage=${this.getInvalidMessage("password2")}
        >
          <password-input
            ?invalid=${this.isFieldInvalid("password2")}
            .value="${this.fields.password2}"
            @change="${this.handleChange("password2")}"
          >
          </password-input>
        </form-field>

        <div class="footer">
          <dm-button
            danger
            value="Cancelar"
            @click="${this.cancel}"
          ></dm-button>
          <dm-button success value="Enviar" @click="${this.submit}"></dm-button>
        </div>
      </div>
    `;
  }

  cancel() {
    this.fields = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };

    router.navigate("/login");
  }

  submit() {
    this.submitted = true;

    if (Object.keys(this.invalidMessages).length > 0) {
      console.log("Invalid!", this.invalidMessages);
    } else {
      const user = {
        name: this.fields.name,
        email: this.fields.email,
        password: this.fields.password
      };

      const response = apiSevices.postNewUser(user);
      console.log(response);
      if (response.status == 204) {
        router.navigate("/login");
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
    requiredValidation("name");

    if (requiredValidation("email")) {
      if (this.fields.email && !emailRegex.test(this.fields.email)) {
        invalidMessages.email = "E-mail inválido";
      }
    }
    requiredValidation("password");

    if (requiredValidation("password2")) {
      if (this.fields.password !== this.fields.password2) {
        invalidMessages.password2 = "Senhas não conferem";
      }
    }

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

window.customElements.define("user-register", UserRegister);
