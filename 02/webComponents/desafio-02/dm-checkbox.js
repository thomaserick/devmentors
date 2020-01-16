class DmCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `        
    <input type="checkbox" id="ckbox">
    <label id="label" for="label" >${this.label}</label>`;
  }

  get label() {
    return this.getAttribute("label");
  }

  set label(label) {
    this.setAttribute("label", label);
  }

  get checked() {
    return this.hasAttribute("checked");
  }

  set checked(checked) {
    this.setAttribute("checked", checked);

    if (checked) {
      this.setAttribute("checked");
    } else {
      this.removeAttribute("checked");
    }
  }

  connectedCallback() {
    console.log("Connected");
    this.shadowRoot.querySelector("#ckbox").addEventListener("change", e => {
      this.checked = e.target.hasAttribute("checked");
      //this.checked = !this.checked

      if (this.checked !== e.target.checked) {
        this.checked = e.target.checked;
      }
      debugger;
    });
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    //debugger;
    //Label
    if (attrName === "label" && oldVal !== newVal) {
      this.shadowRoot.querySelector("#label").innerHTML = newVal;
    }

    //checkbox
    if (attrName === "checked" && oldVal !== newVal) {
      const check = this.shadowRoot.querySelector("#ckbox");
      if (newVal != null) {
        check.setAttribute("checked", "true");
      } else {
        check.removeAttribute("checked");
      }
    }
  }

  static get observedAttributes() {
    return ["label", "checked"];
  }
}
window.customElements.define("dm-checkbox", DmCheckbox);
