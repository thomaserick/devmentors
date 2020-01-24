import { LitElement, html, css } from "lit-element";
import apiServices from "../apiServices";

class Articles extends LitElement {
  constructor() {
    super();
    this.article = {};
    this.comments = [];
  }

  static get properties() {
    return {
      // Number, Boolean, Object, Array, String
      articleId: { type: Number },
      article: { type: Array },
      comments: { type: Array }
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

        <h3>Comentar</h3>
      </div>
    `;
  }

  firstUpdated() {
    this.getArticlesId();
  }
}

window.customElements.define("articles-view", Articles);
