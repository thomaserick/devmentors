import { LitElement, html, css } from "lit-element";
import Navigo from "navigo";
import "./components/menu-bar";
import "./components/menu-item";

export const router = new Navigo("/", true, "#");

class BlogApp extends LitElement {
  constructor() {
    super();

    router
      .on("home", async () => {
        this.route = "home";
        await import("./views/home-view");
        this.currentRoute = html`
          <home-view></home-view>
        `;
      })
      .on("login", () => {
        this.route = "login";
      })
      .on("article/:id", params => {
        this.route = `artigo ${params.id}`;
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
      <menu-bar>
        <div slot="left">
          <menu-item
            ?active=${this.route === "home"}
            @click=${() => router.navigate("/home")}
            >Home</menu-item
          >
          <menu-item
            ?active=${this.route === "login"}
            @click=${() => router.navigate("/login")}
            >Login</menu-item
          >
        </div>
        <div slot="right">
          🚀
        </div>
      </menu-bar>

      <div>
        ${this.currentRoute}
      </div>
    `;
  }
}

window.customElements.define("blog-app", BlogApp);
