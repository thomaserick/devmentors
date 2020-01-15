class DmCheckbox extends HTMLElement {
  constructor() {
    super();
    this.label = "NoChecked";
    this.checked = false;
    this.innerHTML = `<input type="checkbox" id="ckbox">
    <label id="label" for="label" >${this.label}</label>`;
  }

  get label() {
    return this.getAttribute("label");
  }

  set label(label) {
    this.setAttribute("label", label);
  }

  get checked() {
    return this.attribute("checked");
  }

  set checked(checked) {
    this.setAttribute("checked", checked);
  }

  connectedCallback() {
    console.log("Connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    //Label
    if (attrName === "label" && oldVal !== newVal) {
      this.label = newVal;

      const label = document.querySelector("#label");
      label.innerHTML = this.label;
    }

    //checkbox
    if (attrName === "checked" && oldVal !== newVal) {
      this.check = newVal;

      const check = document.querySelector("#ckbox");
      check.checked = newVal === "true";
    }
  }

  static get observedAttributes() {
    return ["label", "checked"];
  }
}
window.customElements.define("dm-checkbox", DmCheckbox);
