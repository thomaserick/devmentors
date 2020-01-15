# ECMAScript 2015

Também conhecido como ES6 ou ECMAScript 6.

## Novas Funcionalidades

### Declaração de variáveis em escopo com __let__

#### Em um bloco

##### Problema de escopo
````javascript
var valor = 123;

  if (true) {
    var valor = 456;
  }
  console.log('Valor: ' + valor);
  // 456
````

##### Solução do problema com __let__
````javascript
let valor = 123;

  if (true) {
    let valor = 456;
  }
  console.log('Valor: ' + valor);
  // 123
````

#### Em um loop
````javascript
for (let x=0;x<10;x++)
  console.log(x);
  console.log(x); // erro undefined!
````

### Constantes

Similar ao Java, constantes são valores que não podem ser reatribuídos após inicialização.

````javascript
const PI = 3.14159;
console.log('PI: ' + PI);
PI = 3.14; // erro!
````

### Arrow Functions

Nova maneira de se declarar funções.

````javascript
// Pré-ES6
function soma(a, b) {
      return a + b;
}

// ES6
let somaArrow = (a, b) => {
      return a + b;
}

let somaArrow2 = (a, b) => a + b;

console.log(somaArrow(2, 2));
console.log(somaArrow2(2, 7));
````


Contexto __this__

````javascript
 function RelatorioController() {

    this.reportPath = '/model/relatorio.jasper';
    var _self = this; // workaround

    document.addEventListener('click', function() {

      alert('Caminho do relatório: ' + this.reportPath); // undefined
      alert('Caminho do relatório: ' + _self.reportPath); // exibe o valor

    });

    document.addEventListener('click', () => {
      alert('Caminho do relatório: ' + this.reportPath); // exibe o valor
    });

  }
````

### Parâmetros Padrões

Permite que parâmetros padrões sejam definidos na declaração de uma função.

````javascript
function soma(a,b)
{
    return a+b;
}

console.log(soma(2)); // NaN!

// Tratativa de erro
function soma(a,b)
{
    var b = (typeof(b) !== 'undefined' ? b : 0);
    return a + b;
}

console.log(soma(2)); // 2

// ES6
let soma2 = (a, b=0) => {
		return a+b;
}
console.log(soma2(2)); // 2  

````

### Destructuring

Facilita o acesso a dados dentro de um array ou objeto.

````javascript
let a=0, b=0;
console.log('a: ' + a, 'b: ' + b); // a: 0 b: 0

// Associa as posições do array
[a, b] = [32, 64];
console.log('a: ' + a, 'b: ' + b); //a: 32 b: 64

// Associa as chaves do objeto
let objeto = {
    nome: 'Foo',
    sobrenome: 'Bar'
};

let {nome, sobrenome} = objeto;

console.log('nome: ' +nome, 'sobrenome: ' + sobrenome);
// nome: Foo sobrenome: Bar

// Valor padrão
let objeto2 = {
    cidade: 'Joinville',
    estado: 'SC'
};

let {cidade, estado, bairro='América'} = objeto2;
console.log('cidade: ' +cidade, 'estado: ' + estado, 'bairro: ' + bairro);
// cidade: Joinville estado: SC bairro: América

````

### Parâmetros Rest

Transforma o "resto" dos argumentos de uma função em um array.

Similar ao __var-args__ (__variable arguments__) do Java.

````javascript

let imprimeValores(v1, v2, v3, v4, v5) => {};

let imprimeValores(...v) {}

let converteMoeda = (cotacao, ...valores) =>
{
 console.log(cotacao, valores);
 return valores.map((val) => val * cotacao);
}

console.log(converteMoeda(4.20, 3, 5, 15.22, 32.33));
// (4) [12.600000000000001, 21, 63.92400000000001, 135.786]

````

### Spread Operator

Similar aos Parâmetros Rest, transforma um array em uma lista de argumentos.

````javascript
let arrValores = [1.99, 2.43];
console.log(converteMoeda(4.20, ...arrValores));
// [8.358, 10.206000000000001]

// Concatenar arrays
let arr1 = [2,4];
let arr2 = [4,8];
let arr3 = [...arr1, ...arr2];
console.log(arr3);

// Concatenar objetos
let obj = { foo: 1, bar: 1 };
let obj2 = { ...obj, rnd: 1 };
console.log(obj2);
````

### Template Strings

Possibilita a interpolação e quebra de linhas automática em Strings.

````javascript
// pré ES6
function imprimeValores(valor1, valor2)
{
    console.log(valor1 + ' - ' + valor2);
}

// ES6
let imprimeValoresEs6 = (valor1, valor2) => {
    console.log(`${valor1} - ${valor2}`);
}

// Operações
let multiplica = (v1, v2) => `O resultado é: ${v1*v2}`;
console.log(multiplica(2,4));
// O resultado é: 8 

// Operações #2
let multiplicaImpl = (v1, v2) => v1*v2;
let multiplica = (v1, v2) => `O resultado é: ${multiplicaImpl(v1,v2)}`;
// O resultado é: 8 

// pré ES6
function quebraLinha() {
 return 'Joinville, 17\n' +
'de Dezembro\n' +
'de 2019'
}

// ES6
let quebraLinha = ()=> {
 return `Joinville, 17
de Dezembro
de 2019
`;
}

// Joinville, 17
// de Dezembro
// de 2019
````

### Classes

Introdução do conceito de classes, com herança, similar a outras linguagens de programação.

````javascript
class Carro
{
  constructor(modelo, ano)
  {
  	this.modelo = modelo;
    this.ano = ano;
  }
}
let carro = new Carro('Gol', '1998');
console.log(carro);
// Carro {modelo: "Gol", ano: "1998"}

// Herança
class Pessoa
{
  constructor(genero, nome)
  {
    this.genero = genero;
    this.nome = nome;
  }
}

class Homem extends Pessoa
{
 
}

class Mulher extends Pessoa
{

}

let joao = new Homem('Masculino', 'João');
let maria = new Mulher('Feminino', 'Maria');
console.log(joao);
console.log(maria);
// Homem {genero: "Masculino", nome: "João"}
// Mulher {genero: "Feminino", nome: "Maria"}
````



### Async / Await

Sintaxe especial para se trabalhar com callbacks.

Função:
````javascript
 function obtemDadosUsuario(code) {
    return new Promise(
      function(resolve, reject) {
        var json = JSON.parse('{"nome": "Fábio", "sobrenome": "Haertel"}');
        resolve(json);
      })
  }
````
Como utilizamos:

````javascript
function obtemDados() {
    obtemDadosUsuario('fabio').then(function(response) {
      var nome = response.nome;
      var sobrenome = response.sobrenome;
      console.log('obtemDados()');
      console.log('Nome: ', nome, 'Sobrenome: ', sobrenome);
    });
  }
````
Como fica com async/await

````javascript
async function obtemDados2() {
    let response = await obtemDadosUsuario('fabio');
    let nomeUsuario = response.nome;
    let sobrenomeUsuario = response.sobrenome;
    console.log('obtemDados2()');
    console.log('Nome: ', nomeUsuario, 'Sobrenome: ', sobrenomeUsuario);

    // Com destructuring
    let {
      nome,
      sobrenome
    } = await obtemDadosUsuario('fabio');
    console.log('Nome: ', nome, 'Sobrenome: ', sobrenome);

  }
````
## Transpiler: Babel

Torna o código ES6 compatível com navegadores ou sistemas antigos.

Ex: código ES6

````javascript
let funcao = (nome='fábio') => nome;
````

Código convertido
````javascript
var funcao = function funcao() {
  var nome = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fábio';
  return nome;
};
````
### Modules

Separação de arquivos em módulos, garantindo melhor organização de código.

neo_utils.js
````javascript
export const soma = (a,b) => {
    return a+b;
} 
export const subt = (a,b) => {
    return a-b;
}
````

Importar dentro de outro script: main.js
````javascript
import {soma, subt} from './neo_utils';

console.log(soma(2,3));
// 5
console.log(subt(2,3));
// -1
````

Importar em um HTML
````html
<head>
    <script type="module">
            import  {soma, subt} from './neo_utils.js';
            console.log(soma(1,2));
    </script>
</head>
````