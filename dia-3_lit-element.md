
# Lit Element
https://www.polymer-project.org/
## Setup do projeto

```sh
npm i -g yarn
mkdir meu-projeto
yarn init
yarn add -D es-dev-server
yarn add lit-element
mkdir src
```

- Criar index.html
- Alterar o arquivo `package.json`, adicionando o conteúdo abaixo:

```json
"scripts": {
    "start": "es-dev-server --node-resolve --watch"
}

```

- Executar `yarn start` na pasta raiz do projeto

- Instalar o plugin `lit-plugin` no VS Code

## Hello world

```js
import { LitElement } from 'lit-element';
class HelloWorld extends LitElement {

}

window.customElements.define('hello-world', HelloWorld);
```
```html
<hello-world></hello-world>
```

### Renderização

```js
import { LitElement, html } from 'lit-element';
class HelloWorld extends LitElement {
    render() {
        return html`
            Hello <b>World</b>
        `;
    }
}
window.customElements.define('hello-world', HelloWorld);
```
```html
<hello-world></hello-world>
```


### Estilos

```js
import { LitElement, html } from 'lit-element';
class HelloWorld extends LitElement {

    static get styles() {
        // pode ser um array, super.styles
        return css`
            :host {
                display: block;
            }
        `;
    }

    render() {
        return html`
            Hello <b>World</b>
        `;
    }

}
window.customElements.define('hello-world', HelloWorld);
```
```html
<hello-world></hello-world>
```

### Atributos e propriedades

```js
import { LitElement, html } from 'lit-element';
class HelloWorld extends LitElement {

    constructor() {
        super();
        this.name = 'World';
    }

    static get properties() {
        return {
            // String, Number, Boolean, Array, Object
            name: { type: String }
        }
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    render() {
        return html`Hello <b>${this.name}</b>`;
    }
}
window.customElements.define('hello-world', HelloWorld);
```
```html
<hello-world name="Rafael"></hello-world>
```

Equivalente em TypeScript
```ts
import { LitElement, html, property, customElement } from 'lit-element';

@customElement('hello-world')
class HelloWorld extends LitElement {

    @property()
    public name = 'World';

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    render() {
        return html`Hello <b>${this.name}</b>`;
    }
}
```
### Detecção de alterações

```js
import { LitElement, html } from 'lit-element';
class HelloWorld extends LitElement {

    constructor() {
        super();
        this.name = 'World';
    }

    static get properties() {
        return {
            name: { type: String }
        }
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    render() {
        return html`
            Hello <b>${this.name}</b>
        `;
    }

    firstUpdated() {
        console.log('first updated');
    }

    updated(changedProperties) {
        console.log(changedProperties);
        if(changedProperties.has('name')) {
            console.log(`name changed, from ${changedProperties.name} to ${this.name}`);
        }
    }
}
window.customElements.define('hello-world', HelloWorld);
```
```html
<hello-world name="Rafael"></hello-world>
```

## Boas práticas
https://lit-element.polymer-project.org/guide/templates
```
Make sure the render function:

    Does not change the element’s state.
    Does not have any side effects.
    Only depends on the element’s properties.
    Returns the same result when given the same property values.

Also, avoid making DOM updates outside of render. Instead, express the element’s template as a function of its state, and capture its state in properties.
```

```js

// Anti-pattern. Avoid!

constructor() {
  super();
  this.addEventListener('stuff-loaded', (e) => {
    this.shadowRoot.getElementById('message').innerHTML=e.detail;
  });
  this.loadStuff();
}
render() {
  return html`
    <p id="message">Loading</p>
  `;
}
```

## Example App

- Agora tudo fica dentro de um app
- `<example-app></example-app>`

##  Templates

- loops
- condicionais
- binding
  - atributo
  - atributo booleano
  - propriedade
  - evento
- slots
- composition


## Desafio 5
Refazer o desafio 1 e 2 utilizando lit-element


## Desafio 6 
Construir um componente de input numérico.
Atributos:
- max (valor numérico máximo aceito)
- min (valor numérico mínimo aceito)
- value (valor atual)

Eventos:
- change
- invalid-input

Ao inserir algum valor inválido, o input deve ficar com a borda vermelha.






## Configurações avançadas das propriedades

- converter: Conversão entre atributos e propriedades
- attribute: Configure observed attributes.
- reflect: Configure reflected attributes.
- noAccessor: Se deve configurar os getters/setters padrões
- hasChanged: Altera o comportamento de detecção de mudançar para uma propriedade