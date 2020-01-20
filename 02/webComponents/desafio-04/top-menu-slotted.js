class TopMenuSlotted extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = ` 
            <style>
                :host {
                    display: flex;
                    background-color: var(--top-menu-bg-color, #cacaca);
                    color: var(--top-menu-text-color, #000);
                    padding: 15px;
                    justify-content: space-between;
                }

            </style>
            <slot name="left"></slot>
            <slot name="right"></slot>
        `;
  }
}

window.customElements.define("top-menu-slotted", TopMenuSlotted);
