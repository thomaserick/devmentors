import { LitElement, html, css } from "lit-element";
import apiSevices from "../apiServices";
import "../components/text-input";
import "../components/dm-button";
import "../components/form-field";
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

      textarea {
        padding: 7px 15px;
        border-color: #cacaca;
        border-style: solid;
        border-radius: 4px;
        border-width: 2px;
        transition: border-color ease 0.2s;
        display: block;
        width: calc(100% - 30px);
        color: black;
      }

      textarea:focus {
        outline: none;
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
            @change="${this.handleChange("title")}"
          >
          </text-input>
        </form-field>

        <form-field
          title="Conteúdo"
          .errorMessage=${this.getInvalidMessage("content")}
        >
          <textarea
            ?invalid=${this.isFieldInvalid("content")}
            .value="${this.fields.content}"
            @change="${this.handleChange("content")}"
            rows="10"
            cols="100%"
          >
          </textarea>
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

  submit() {
    this.submitted = true;
    console.log(this.invalidMessages);

    if (
      Object.keys(this.invalidMessages).length > 0 ||
      this.invalidMessages === null
    ) {
      console.log("Invalid!", this.invalidMessages);
    } else {
      const post = {
        name: this.fields.title,
        content: this.fields.content
      };

      //const response = await apiSevices.newPost(post);
      //router.navigate('/home');
      console.log(this.post);

      //const response = new apiSevices.NewArticle(post);
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
