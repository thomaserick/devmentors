# Web Components

- Custom Elements
- Shadow DOM
- https://custom-elements-everywhere.com/
- https://sap.github.io/ui5-webcomponents/
- https://sap.github.io/ui5-webcomponents/playground

## Custom Elements

### Criação de novas tags HTML

```js
class HelloWorld extends HTMLElement {}

// registra o elemento
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world>
```

### Renderização

```js
class HelloWorld extends HTMLElement {
  // elemento foi inserido
  connectedCallback() {
    this.innerHTML = `Hello <b>World</b>!`;
  }
}

// registra o elemento
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world>
```

### Estrutura

```js
class HelloWorld extends HTMLElement {
  // Oportunidade para inicializar variáveis, event listeners, entre outros
  constructor() {
    super();
  }

  // Executado ao inserir o elemento no DOM, pode ser utilizado para renderização inicial
  connectedCallback() {
    this.innerHTML = `Hello <b>World</b>!`;
  }

  //  Executado ao remover o elemento do DOM
  disconnectedCallback() {
    console.log("disconnected");
  }

  // Chamado quando um atributo é alterado, oportunidade para atualizar o HTML com novos valores
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log(
      `Attribute: ${attrName}, Old value: ${oldVal}, New value: ${newVal}`
    );
  }

  // Atributos observados, somente testes vão disparar o callback acima
  static get observedAttributes() {
    return [];
  }
}

// registra o elemento
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world>
```

## Propriedades e Atributos

### Atributos

```html
<input type="text" /> <hello-world name="Rafael"></hello-world>
```

### Propriedades

```html
<hello-world id="hello" name="Rafael"></hello-world>
<script>
  const hello = document.querySelector("#hello");
  hello.name = "Rafael";
</script>
```

## Exemplo

### Atributo

```js
class HelloWorld extends HTMLElement {
  connectedCallback() {
    let name;
    if (this.hasAttribute("name")) {
      name = this.getAttribute("name");
    } else {
      name = "World";
    }

    this.innerHTML = `Hello <b>${name}</b>!`;
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world> <hello-world name="Rafael"></hello-world>
```

### Propriedade

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
  }
  connectedCallback() {
    this.innerHTML = `Hello <b>${this.name}</b>!`;
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world> <hello-world name="Rafael"></hello-world>
```

### Refletir propriedades nos atributos

É uma boa prática manter os atributos em sincronia com as propriedades.

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(value) {
    this.setAttribute("name", value);
  }

  connectedCallback() {
    this.innerHTML = `Hello <b>${this.name}</b>!`;
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world> <hello-world name="Rafael"></hello-world>
```

### Observando atributos

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
  }

  static get observedAttributes() {
    return ["name"];
  }

  get name() {
    return this.getAttribute("name");
    // this.hasAttribute
  }

  set name(value) {
    this.setAttribute("name", value);
    // this.removeAttribute
  }

  connectedCallback() {
    this.innerHTML = `Hello <b class="hello-name">${this.name}</b>!`;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "name") {
      const target = this.querySelector(".hello-name");
      target.innerHTML = newValue;
    }
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world> <hello-world name="Rafael"></hello-world>
```

## Desafio 1

Criar um Custom Element que exibe um número de cliques em um botão

- count-viewer -> Botão foi clicado X vezes
  - count
- button
  - click -> incrementa o count do viewer

## Desafio 2

Criar um Custom Element para checkbox com label

- dm-checkbox
  - checked (boolean)
  - label (string)

## Shadow DOM

Isolamento do DOM e CSS

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name"];
  }

  get name() {
    return this.getAttribute("name");
    // this.hasAttribute
  }

  set name(value) {
    this.setAttribute("name", value);
    // this.removeAttribute
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `Hello <b class="hello-name">${this.name}</b>!`;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "name") {
      const target = this.shadowRoot.querySelector(".hello-name");
      target.innerHTML = newValue;
    }
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world> <hello-world name="Rafael"></hello-world>
```

### Shadow DOM vs Light DOM

### Estilos

- :host
- :host-context
- ::slotted

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name"];
  }

  get name() {
    return this.getAttribute("name");
    // this.hasAttribute
  }

  set name(value) {
    this.setAttribute("name", value);
    // this.removeAttribute
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 15px;
                box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
            }

            .content {
                color: blue;
            }
        </style>
        <span class="content">
            Hello <b class="hello-name">${this.name}</b>!
        </span>
        `;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "name") {
      const target = this.shadowRoot.querySelector(".hello-name");
      target.innerHTML = newValue;
    }
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<hello-world></hello-world> <hello-world name="Rafael"></hello-world>
```

## CSS Properties

Uma forma de personalizar os estilos de fora do elemento

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name"];
  }

  get name() {
    return this.getAttribute("name");
    // this.hasAttribute
  }

  set name(value) {
    this.setAttribute("name", value);
    // this.removeAttribute
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 15px;
                box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
            }

            .content {
                --hello-world-text-color: blue;
                color: var(--hello-world-text-color);
            }
        </style>
        <span class="content">
            Hello <b class="hello-name">${this.name}</b>!
        </span>
        `;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "name") {
      const target = this.shadowRoot.querySelector(".hello-name");
      target.innerHTML = newValue;
    }
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<style>
  body {
    --hello-world-text-color: red;
  }
</style>
```

## Custom Events

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
    this.attachShadow({ mode: "open" });
    this.helloClickedCount = 0;
  }

  static get observedAttributes() {
    return ["name"];
  }

  get name() {
    return this.getAttribute("name");
    // this.hasAttribute
  }

  set name(value) {
    this.setAttribute("name", value);
    // this.removeAttribute
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 15px;
                box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
            }

            .content {
                --hello-world-text-color: blue;
                color: var(--hello-world-text-color);
            }
        </style>
        <span class="content">
            <span id="hello">Hello</span> <b class="hello-name">${this.name}</b>!
        </span>
        `;

    this.shadowRoot.querySelector("#hello").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("hello-clicked", {
          detail: {
            count: ++this.helloClickedCount
          }
        })
      );
    });
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "name") {
      const target = this.shadowRoot.querySelector(".hello-name");
      target.innerHTML = newValue;
    }
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<style>
  body {
    --hello-world-text-color: red;
  }
</style>
```

## Desafio 3

array de string (nomes de titulos);

dizer qual item foi clicado.

Criar um componente chamado top-menu, ele deve receber o atributo "title" e uma propriedade "items", e disparar o evento "menu-item-clicked". Deve também ser possível personalizar a cor de fundo dele e a cor da fonte por meio de propriedades css.

```
---------------------------------------------------
|   Titulo | Item 1 | Item 2 | Item 3             |
---------------------------------------------------
```

## Slots

- slot
- slot nomeado
- valor padrão
- slotchange
- ::slotted

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = "World";
    this.attachShadow({ mode: "open" });
    this.helloClickedCount = 0;
  }

  static get observedAttributes() {
    return ["name"];
  }

  get name() {
    return this.getAttribute("name");
    // this.hasAttribute
  }

  set name(value) {
    this.setAttribute("name", value);
    // this.removeAttribute
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 15px;
                box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
            }

            .content {
                --hello-world-text-color: blue;
                color: var(--hello-world-text-color);
            }
        </style>
        <span class="content">
            <span id="hello">Hello</span> 
            <b class="hello-name">${this.name}</b>
            <slot></slot>
            <!--<slot name="teste1"></slot>-->
        </span>
        `;

    this.shadowRoot.querySelector("#hello").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("hello-clicked", {
          detail: {
            count: ++this.helloClickedCount
          }
        })
      );
    });
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "name") {
      const target = this.shadowRoot.querySelector(".hello-name");
      target.innerHTML = newValue;
    }
  }
}
window.customElements.define("hello-world", HelloWorld);
```

```html
<style>
  body {
    --hello-world-text-color: red;
  }
</style>

<hello-world>
  Conteúdo
  <span slot="teste1">Slot Nomeado</span>
</hello-world>
```

## Desafio 4

Alterar o desafio anterior, criar dois slots, "left" e "right", agora o conteúdo do menu será passado via slots, e alinhados de acordo com o nome, o right na direita do menu e left na esquerda.

```
----------------------------------------
|  Left                          Right |
----------------------------------------
```
