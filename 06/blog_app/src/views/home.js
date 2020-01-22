import { LitElement, html, css } from "lit-element";
import apiServices from "../apiServices";

class Home extends LitElement {
  constructor() {
    super();
    this.getArticles();
  }

  async getArticles() {
    this.articles = apiServices.getArticle();
  }

  static get styles() {
    return css`
      .container {
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
        flex-direction: row;
        margin-top: 30px;
        background-color: #ffffff;
      }
      .menu-items {
        list-style: none;
        padding: 0;
      }

      .post {
        margin-bottom: 10px;
        border: 1px solid black;
        background-color: #ffffff;
      }

      .post-title {
        padding: 15px 30px;
        font-weight: bold;
        font-size: 28px;
      }
      .post-content {
        padding: 15px 30px;
      }
    `;
  }

  render() {
    return html`
      <div id="posts" class="container">
        <div class="post">
          <div class="post-title">Meu Post</div>
          <div class="post-content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div class="post">
          <div class="post-title">Meu Post</div>
          <div class="post-content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("home-view", Home);
