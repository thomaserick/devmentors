import { LitElement, html, css } from "lit-element";
import apiSevices from "../services/apiServices";
import "../components/text-input";
import "../components/dm-button";
import "../components/form-field";
import "../components/text-area";
import { router } from "../blog-app";

class NewArticle extends LitElement {
  constructor() {
    super();
    this.invalidMessages = {};
    this.fields = {
      title: "",
      content: ""
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
        max-width: 900px;
        margin: 0 auto 100px;
        padding: 40px;
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
        <h2 class="view-title">Cadastrar Posts</h2>

        <form-field
          title="Title"
          .errorMessage=${this.getInvalidMessage("title")}
        >
          <text-input
            ?invalid=${this.isFieldInvalid("title")}
            .value="${this.fields.title}"
            maxlength="255"
            @change="${this.handleChange("title")}"
          >
          </text-input>
        </form-field>

        <form-field
          title="Conteúdo"
          .errorMessage=${this.getInvalidMessage("content")}
        >
          <text-area
            ?invalid=${this.isFieldInvalid("content")}
            .value="${this.fields.content}"
            rows="8"
            maxlength="4000"
            @change="${this.handleChange("content")}"
          >
          </text-area>
        </form-field>

        <div class="footer">
          <dm-button
            success
            value="Cadastrar"
            @click="${this.submit}"
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
      const post = {
        content: this.fields.content,
        title: this.fields.title
      };

      const response = await apiSevices.addPost(post);
      if (response.ok) {
        router.navigate("/home");
      } else {
        if (response.status === 401) {
          alert("Você precisa fazer login ou se inscrever antes de continuar.");
          router.navigate("/login");
        }
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
    requiredValidation("title");
    requiredValidation("content");

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

window.customElements.define("new-article-view", NewArticle);
