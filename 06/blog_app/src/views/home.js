import { LitElement, html, css } from "lit-element";
import apiServices from "../apiServices";

class Home extends LitElement {
  constructor() {
    super();
    this.articles = [];
    this.getArticles();
  }

  static get properties() {
    return {
      // Number, Boolean, Object, Array, String
      articles: { type: Array }
    };
  }

  async getArticles() {
    this.articles = await apiServices.getArticle();

    console.log(this.articles);
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

      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 40%;
      }

      .container:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }
    `;
  }

  render() {
    return html`
        ${this.articles.map(
          articles => html`
            <div id="posts" class="container">
              <div class="post">
                <div class="post-title">${articles.title}</div>
                <hr />
                <div class="post-content">${articles.content}</div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

window.customElements.define("home-view", Home);
