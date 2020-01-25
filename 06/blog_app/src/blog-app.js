import { LitElement, html, css } from "lit-element";
import Navigo from "navigo";
import "./components/nav-bar";
import "./components/nav-item";
import apiServices from "./services/apiServices";

export const router = new Navigo("/", true, "#");

class BlogApp extends LitElement {
  constructor() {
    super();

    router

      .on("home", async () => {
        this.getCurrentUser();
        this.router = "home";
        await import("./views/home.js");
        this.currentRoute = html`
          <home-view></home-view>
        `;
      })
      .on("login", async () => {
        this.route = "login";
        await import("./views/login.js");
        this.currentRoute = html`
          <login-view></login-view>
        `;
      })
      .on("register", async () => {
        this.route = "register";
        await import("./views/user-register.js");
        this.currentRoute = html`
          <user-register></user-register>
        `;
      })
      .on("new-article", async () => {
        this.route = "new-article";
        await import("./views/new-article.js");
        this.currentRoute = html`
          <new-article-view></new-article-view>
        `;
      })
      .on("article/:id", async params => {
        this.route = `article ${params}`;
        await import("./views/articles.js");
        this.currentRoute = html`
          <articles-view .articleId="${params.id}"></articles-view>
        `;
      })
      .on("", () => {
        router.navigate("/home");
      })
      .notFound(() => {
        this.route = "not found";
      })
      .resolve();
  }

  static get properties() {
    return {
      route: { type: String },
      currentRoute: { type: Object },
      currentUser: { type: Boolean },
      nameCurrentUser: { type: String }
    };
  }

  static get styles() {
    return css`
      p {
        margin: auto;
        padding-right: 20px;
      }
    `;
  }

  render() {
    return html`
      <nav-bar>
        <div slot="left">
          <nav-item
            ?active=${this.route === "home"}
            @click=${() => router.navigate("/home")}
            >Home</nav-item
          >

          ${this.currentUser
            ? html`
                <nav-item
                  ?active=${this.route === "new-article"}
                  @click=${() => router.navigate("/new-article")}
                  >Criar Artigos</nav-item
                >
              `
            : ""}
        </div>

        <div slot="right">
          ${this.currentUser
            ? html`
                <p>Bem vindo: ${this.nameCurrentUser}</p>
                <nav-item
                  ?active=${this.route === "logout"}
                  @click=${this.logout}
                  >Logout</nav-item
                >
              `
            : html`
                <nav-item
                  ?active=${this.route === "login"}
                  @click=${() => router.navigate("/login")}
                  >Login</nav-item
                >
              `}
        </div>
      </nav-bar>
      <div>
        ${this.currentRoute}
      </div>
    `;
  }

  async logout() {
    const response = await apiServices.logout();
    if (response.ok) {
      alert("Usuário deslogado com Sucesso!");
      this.currentUser = false;
      router.navigate("/home");
    }
  }

  async getCurrentUser() {
    this.currentUser = false;
    const response = await apiServices.getCurrentUser();
    if (response.id > 0) {
      this.currentUser = true;
      this.nameCurrentUser = response.name;
    }
  }
}
// 🚀
window.customElements.define("blog-app", BlogApp);
