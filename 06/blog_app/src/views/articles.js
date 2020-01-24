import { LitElement, html, css } from "lit-element";
import apiServices from "../apiServices";
import "../components/text-input";
import "../components/dm-button";
import "../components/form-field";

class Articles extends LitElement {
  constructor() {
    super();
    this.article = {};
    this.invalidMessages = {};
    this.fields = {
      comment: ""
    };
    this.comments = [];
  }

  static get properties() {
    return {
      // Number, Boolean, Object, Array, String
      articleId: { type: Number },
      article: { type: Array },
      comments: { type: Array },
      invalidMessages: { type: Object },
      fields: { type: Object },
      submitted: { type: Boolean }
    };
  }

  async getArticlesId() {
    this.article = await apiServices.getArticleId(this.articleId);
    this.comments = await apiServices.getComments(this.articleId);
  }

  static get styles() {
    return css`
      .container {        
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
        flex-direction: row;
        margin-top: 30px;
      }
      .post {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        margin-bottom: 10px;
        border: 0px solid black;
        border-radius: 10px;
        background-color: white;
      }

      .post-content{
        padding: 20px;
      }
      .post-title {
        padding: 5px 20px;
        font-weight: bold;
        font-size: 28px;        
        color:#fff!important;
        background-color:#2196F3 !important}
      }
          
      .post:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }
      .post-author {
        padding: 10px;
        float: right;
        font-size: 12px;
        font-weight: normal;
      }
      .post-link {
        font-weight: bold;
        padding: 5px;
      }
      .post-link a {
        cursor: pointer;
      }
     
      .comments {
         box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        padding: 2px 16px;
        margin-bottom: 10px;
        background-color: white;
        border-radius: 10px;
      }
      
      .comments:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
      }
         
      .comments-title{
        font-weight: bold;
        font-size: 20px;       
        padding:5px;

      }

      .comments-date{ 
        padding: 5px;
        float:right;
        font-size: 12px;  
        font-weight: normal;
      }
      .footer {
        padding:5px;
        text-align: right;
      }
      form-field{
        margin-bottom:0;
      }


    `;
  }

  render() {
    let { title, author, creationDate, content } = this.article;

    return html`
      <div id="posts" class="container">
        <div class="post">
          <div class="post-title">
            ${title}
            <div class="post-author">
              Postado por: ${author} ${new Date(creationDate).toLocaleString()}
            </div>
          </div>
          <div class="post-content">${content}</div>
        </div>
        <h3>${this.comments.length} Comentários</h3>

        ${this.comments.map(
          comment =>
            html`
              <div class="comments">
                <div class="comments-title">
                  ${comment.author}
                  <div class="comments-date">
                    ${new Date(comment.creationDate).toLocaleString()}
                  </div>
                </div>
                <div class="comments-list">
                  <p>${comment.comment}</p>
                </div>
              </div>
            `
        )}

        <form-field
          title="Comenta"
          .errorMessage=${this.getInvalidMessage("comment")}
        >
          <text-input
            ?invalid=${this.isFieldInvalid("comment")}
            .value="${this.fields.comment}"
            maxlength="255"
            @change="${this.handleChange("comment")}"
          >
          </text-input>
        </form-field>
        <div class="footer">
          <dm-button primary value="Enviar" @click="${this.submit}"></dm-button>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.getArticlesId();
  }

  async submit() {
    this.submitted = true;

    if (
      Object.keys(this.invalidMessages).length > 0 ||
      this.fields.comment == ""
    ) {
      console.log("Invalid!", this.invalidMessages);
    } else {
      const newComment = {
        articleId: this.articleId,
        comment: this.fields.comment
      };

      const response = await apiServices.addComments(newComment);
      if (response.ok) {
        //alert("Comentário cadastrado com Sucesso!");
        this.fields.comment = "";
        this.getArticlesId();
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
    requiredValidation("comment");
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

window.customElements.define("articles-view", Articles);
