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

  async getArticlesId() {
    this.article = await apiServices.getArticleId();

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
    console.log(this.articleId);
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

        <h3>Comentários</h4>

        <div class="comments">        
          <div class="comments-title">
            Jane Doe
            <div class="comments-date">10/10/2019</div>
          </div>

          <div class="comments-list">
            <p>Interior Designer</p>
          </div>

        </div>

        <div class="comments">        
          <div class="comments-title">
            Jane Doe
            <div class="comments-date">10/10/2019</div>
          </div>

          <div class="comments-list">
            <p>Interior Designer</p>
          </div>

        </div>
        
        
      </div>
    `;
  }
}

window.customElements.define("articles-view", Articles);
