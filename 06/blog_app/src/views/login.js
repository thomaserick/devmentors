import { LitElement, html, css } from "lit-element";
import "../components/form-field";
import "../components/text-input";
import "../components/password-input";
import "../components/dm-button";
import apiSevices from "../apiServices";
import { router } from "../blog-app";

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
        <form-field title="E-mail">
          <text-input @change="${this.handleChange("email")}"></text-input>
        </form-field>

        <form-field title="Senha">
          <password-input
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

    if (Object.keys(this.invalidMessages).length > 0) {
      console.log("Invalid!", this.invalidMessages);
    } else {
      const user = {
        email: this.fields.email,
        password: this.fields.password
      };

      const response = await apiSevices.postLogin(user);
      if (response.ok) {
        router.navigate("/home");
      }
    }
  }

  handleChange(field) {
    return e => {
      this.fields = { ...this.fields, [field]: e.detail.value };
    };
  }
}

window.customElements.define("login-view", Login);
