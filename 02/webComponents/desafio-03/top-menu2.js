class TopMenu extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <style>
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #333333;
        }
        
        li {
        float: left;
        }
        
        li a {
        display: block;
        color: white;
        text-align: center;
        padding: 16px;
        text-decoration: none;
        }
        
        li a:hover {
        background-color: #111111;
        }    
        <div>
            <ul>
                <li><a id="title">${this.title}</a></li>
            </ul>
          </div>
      </style>
    `;
  }

  get title() {
    return this.getAttribute("title");
  }

  set title(title) {
    this.setAttribute("title", title);
  }

  get items() {
    this.setAttribute("items");
  }

  set items(items) {
    this.setAttribute("items", items);
  }

  connectedCallback() {
    console.log("Connected");
  }

  disconnectedCallBack() {}

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName == "title" && oldVal !== newVal) {
      const title = this.querySelector("#title");
      title.innerHTML = newVal;
    }
  }

  static get observedAttributes() {
    return ["title"];
  }
}

window.customElements.define("top-menu", TopMenu);
