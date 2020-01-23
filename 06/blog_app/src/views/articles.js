import { LitElement, html, css } from "lit-element";
import apiServices from "../apiServices";

class Articles extends LitElement {
  constructor() {
    super();
    //this.getArticlesId();
  }

  static get properties() {
    return {
      // Number, Boolean, Object, Array, String
      articleId: { type: Number }
    };
  }

  // async getArticlesId() {
  //   this.article = await apiServices.getArticleId();

  //   console.log(this.articles);
  // }

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
        margin-bottom: 10px;
        border: 0px solid black;
        border-radius: 10px;
        background-color: #f1efef;
      }

      .post-title {
        padding: 5px 20px;
        font-weight: bold;
        font-size: 28px;
        background-color: #f1efef;
      }
      .post-content {
        padding: 15px 30px;
      }

      .container:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }
    `;
  }

  render() {
    console.log(this.articleId);
    // return html`
    //   <div id="posts" class="main-section">
    //     <div class="post">
    //       <div class="post-title">Meu Post</div>
    //       <div class="post-content">
    //         Lorem Ipsum is simply dummy text of the printing and typesetting
    //         industry. Lorem Ipsum has been the industry's standard dummy text
    //         ever since the 1500s, when an unknown printer took a galley of type
    //         and scrambled it to make a type specimen book. It has survived not
    //         only five centuries, but also the leap into electronic typesetting,
    //         remaining essentially unchanged. It was popularised in the 1960s
    //         with the release of Letraset sheets containing Lorem Ipsum passages,
    //         and more recently with desktop publishing software like Aldus
    //         PageMaker including versions of Lorem Ipsum.
    //       </div>
    //     </div>
    //   </div>
    //`;
  }
}

window.customElements.define("articles-view", Articles);
