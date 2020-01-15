class HelloWord extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `Hello <strong class="hello-name">${this.name}</strong>`;
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(name) {
    this.setAttribute("name", name);
  }

  connectedCallback() {
    console.log("Connected");
  }

  disconnectedCallback() {
    console.log("Disconnected");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "name" && oldVal !== newVal) {
      this.name = newVal;

      const helloName = this.querySelector(".hello-name");
      helloName.innerHTML = this.name;
    }
  }

  static get observedAttributes() {
    return ["name"];
  }
}

window.customElements.define("hello-world", HelloWord);
