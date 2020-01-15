class HelloWord extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
      .hello-name{
        color:var(--hello-name-color,blue);
      }
    </style>
    <span id="hello">Hello</span>
    Hello <b class="hello-name">${this.name}</b>
    `;

    // this.innerHTML = `
    //         Hello <b class="hello-name">${this.name}</b>
    //         `;
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(value) {
    this.setAttribute("name", value);
  }

  connectedCallback() {
    console.log("connected");
    this.shadowRoot.querySelector("#hello").addEventListener('click',(){
      this.dispatchEvent(new CustomEvent(hello))
    })
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "name" && oldVal !== newVal) {
      this.name = newVal;
      const helloName = this.shadowRoot.querySelector(".hello-name");
      helloName.innerHTML = this.name;
    }
  }

  static get observedAttributes() {
    return ["name"];
  }
}

window.customElements.define("hello-world", HelloWord);
