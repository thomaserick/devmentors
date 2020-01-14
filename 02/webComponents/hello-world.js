import { disconnect } from "cluster";


class HellWorld extends HTMLElement {


    constructor(){
        super();
        this.innerHTML = `Hello <b class="hello-name"`
    }

    get name(){
        return this.getAttribute('name');
    }
    set name(value){
        this.setAttribute
        
    }

  connectedCallback() {
      console.log('disconnected')
 
    if(this.hasAttribute('name')){
        name = this.getAttribute('name');
        this.innerHTML = `Hello <b>Wolrd</b>`;
    }
    else {
      name = 'World'
  }
}

disconnectCallback() {
console.log('disconnected');

}

attributeChangedCallBack(attrName,oldVal,newVal){
    if(attName == 'name' && oldVal !== newVal){
        this.name = newVal
        const helloNome = this.querySelector('.hello-name');
        helloNome.innerHTML = this.name;
    }
   
}

static get observedAttributes(){
return ['name']

}

window.customElements.define("hello-world", HellWorld);
