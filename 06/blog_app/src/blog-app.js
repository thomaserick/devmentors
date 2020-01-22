import { LitElement, html, css } from "lit-element";
import Navigo from "navigo";
import "./components/nav-bar";
import "./components/nav-item";

export const router = new Navigo("/", true, "#");

class BlogApp extends LitElement {
  constructor() {
    super();

    router
      .on("home", async () => {
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
      .on("article/:id", params => {
        this.route = `artigo ${params.id}`;
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
      currentRoute: { type: Object }
    };
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
          <nav-item
            ?active=${this.route === "login"}
            @click=${() => router.navigate("/login")}
            >Login</nav-item
          >
        </div>

        <div slot="right">
          🚀
        </div>
      </nav-bar>
      <div>
        ${this.currentRoute}
      </div>
    `;
  }
}

window.customElements.define("blog-app", BlogApp);
