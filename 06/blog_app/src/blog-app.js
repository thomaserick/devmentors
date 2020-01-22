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
        this.router = "route";
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
      <nav-bar>
        <div slot="left"></div>
        <nav-item></nav-item>
        <div slot="right"></div>
      </nav-bar>
      <div>
        ${this.currentRoute}
      </div>
    `;
  }
}

window.customElements.define("blog-app", BlogApp);
