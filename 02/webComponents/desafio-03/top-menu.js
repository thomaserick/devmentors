class TopMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    
    :host{
        display:block
        background-color: var(--top-menu-bg-color,#cacaca)
        color: var(--top-menu-text-color,#000)

    }
      
    #items{
      display:flex;
    }
    #title{
      font-weght: bold;
      margin-left:15px;
    }



    </style>
 
   <div id="title"></div>
   <div id="items"></div>
   


    `;
    this.items = [];
  }

  get title() {
    return this.getAttribute("title");
  }

  set title(title) {
    this.setAttribute("title", title);
  }

  get items() {
    return this._items;
  }

  set items(items) {
    this._items = items;
    this.updateItems();
  }

  updateItems() {
    const itemsContainer = this.shadowRoot.querySelector("#items");
    if (this._items) {
      for (let items of this._items) {
        const item = document.createElement("div");
        item.classList.add('items');
        item.innerHTML = item;
        item.addEventListener('click',()=>{
          this.dispatchEvent(new CustomEvent('menu-item-checked',{
            detail: {
              
            }
          }))
        })


        itemsContainer.innerHTML += ${items}</div>`;
      }
    } else {
      itemsContainer.innerHTML = "";
    }
  }

  connectedCallback() {
    console.log("Connected");
  }

  disconnectedCallBack() {}

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName == "title" && oldVal !== newVal) {
      this.shadowRoot.querySelector("#title").innerHTML = newVal;
    }
  }

  static get observedAttributes() {
    return ["title"];
  }
}

window.customElements.define("top-menu", TopMenu);
